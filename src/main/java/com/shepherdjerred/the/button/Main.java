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

    public static void main(String[] args) {
        setupPort();
        setupDatabase();
        loadCounter();
        setupRoutes();
    }

    private static void setupPort() {
        int port = getHerokuAssignedPort();
        port(port);
    }

    private static void setupDatabase() {
        String jdbcUrl = getHerokuJdbcUrl();

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

    private static String getHerokuJdbcUrl() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("CLEARDB_DATABASE_URL") != null) {
            return "jdbc:" + processBuilder.environment().get("CLEARDB_DATABASE_URL");
        }
        return "";
    }

    private static void loadCounter() {
        counter = counterDAO.load(COUNTER_UUID);

        if (counter == null) {
            counter = new Counter(COUNTER_UUID, 0, 1000000000);
            counterDAO.insert(counter);
        }
    }

    private static void setupRoutes() {
        staticFiles.location("/public");

        Map map = new HashMap();
        get("/", (rq, rs) -> new ModelAndView(map, "index"), new ThymeleafTemplateEngine());

        get("/api/getPressCount/", (req, res) -> counter.getCount());

        // TODO Rate limit
        post("/api/incrementPressCount/", (req, res) -> {
            counter.incrementCount();
            counterDAO.updateCount(counter);
            return counter.getCount();
        });
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
