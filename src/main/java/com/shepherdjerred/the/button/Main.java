package com.shepherdjerred.the.button;

import com.shepherdjerred.the.button.database.CounterDAO;
import com.shepherdjerred.the.button.template.thymeleaf.ThymeleafTemplateEngine;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.codejargon.fluentjdbc.api.FluentJdbc;
import org.codejargon.fluentjdbc.api.FluentJdbcBuilder;
import org.flywaydb.core.Flyway;
import spark.ModelAndView;
import spark.Spark;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static spark.Spark.*;

public class Main {

    // This is our counters UUID. We use this to store the counter in the database
    private static final UUID COUNTER_UUID = UUID.fromString("00000000-0000-0000-0000-000000000000");

    private static HikariDataSource hikariDataSource;
    private static FluentJdbc fluentJdbc;
    private static Counter counter;
    private static CounterDAO counterDAO;

    private static boolean databaseEnabled;

    public static void main(String[] args) {
        setupPort();
        setupDatabase();
        loadCounter();
        setupRoutes();
        Sessions.startTrimLoop();
    }

    private static void setupPort() {
        int port = getHerokuAssignedPort();
        port(port);
    }

    private static void setupDatabase() {
        String jdbcUrl = getHerokuJdbcUrl();

        if (databaseEnabled) {
            HikariConfig hikariConfig = new HikariConfig();
            hikariConfig.setJdbcUrl(jdbcUrl);
            hikariConfig.setPoolName("button");
            hikariConfig.setMaximumPoolSize(5);
            hikariConfig.addDataSourceProperty("cachePrepStmts", true);
            hikariConfig.addDataSourceProperty("prepStmtCacheSize", 250);
            hikariConfig.addDataSourceProperty("prepStmtCacheSqlLimit", 2048);
            hikariConfig.addDataSourceProperty("userServerPrepStmt", true);
            hikariConfig.addDataSourceProperty("dumpQueriesOnException", true);

            hikariDataSource = new HikariDataSource(hikariConfig);
            fluentJdbc = new FluentJdbcBuilder().connectionProvider(hikariDataSource).build();

            Flyway flyway = new Flyway();
            flyway.setDataSource(hikariDataSource);
            flyway.migrate();

            counterDAO = new CounterDAO(fluentJdbc);
        }
    }

    private static String getHerokuJdbcUrl() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("CLEARDB_DATABASE_URL") != null) {
            databaseEnabled = true;
            return "jdbc:" + processBuilder.environment().get("CLEARDB_DATABASE_URL");
        } else {
            databaseEnabled = false;
            return null;
        }
    }

    private static void loadCounter() {
        if (databaseEnabled) {
            counter = counterDAO.load(COUNTER_UUID);

            if (counter == null) {
                counter = new Counter(COUNTER_UUID, 0, 100000);
                counterDAO.insert(counter);
            }
        } else {
            counter = new Counter(COUNTER_UUID, 0, 100000);
        }
    }

    private static void setupRoutes() {
        staticFiles.location("/public");

        Map map = new HashMap();
        get("/", (req, res) -> {
            if (req.session().isNew()) {
                Sessions.addToSessions(req.session(true));
            }
            return new ThymeleafTemplateEngine().render(
                    new ModelAndView(map, "index")
            );
        });

        get("/api/getPressCount/", (req, res) -> counter.getCount());

        // TODO Rate limit
        post("/api/incrementPressCount/", (req, res) -> {
            counter.incrementCount();
            if (databaseEnabled) {
                counterDAO.updateCount(counter);
            }
            return counter.getCount();
        });

        get("/api/getActiveUsers/", (req, res) -> Sessions.getActiveSessionCount());
    }

    private static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 80;
    }

    public static void stop() {
        Spark.stop();
    }

}
