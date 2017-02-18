package com.shepherdjerred.the.button;

import com.shepherdjerred.the.button.template.thymeleaf.ThymeleafTemplateEngine;
import com.zaxxer.hikari.HikariDataSource;
import org.codejargon.fluentjdbc.api.FluentJdbc;
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

    public static void main(String[] args) {
        setupPort();
        setupDatabase();
        createCounter();
        setupRoutes();
    }

    private static void setupPort() {
        int port = getHerokuAssignedPort();
        port(port);
    }

    private static void setupDatabase() {

    }

    private static void createCounter() {
        counter = new Counter(COUNTER_UUID, 0, 1000000000);
    }

    private static void setupRoutes() {
        staticFiles.location("/public");

        Map map = new HashMap();
        get("/", (rq, rs) -> new ModelAndView(map, "index"), new ThymeleafTemplateEngine());

        get("/api/getPressCount/", (req, res) -> counter.getCount());

        // TODO Rate limit
        post("/api/incrementPressCount/", (req, res) -> {
            // Update database here
            counter.incrementCount();
            return "Success";
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
