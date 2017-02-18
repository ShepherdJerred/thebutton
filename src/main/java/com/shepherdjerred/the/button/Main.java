package com.shepherdjerred.the.button;

import com.shepherdjerred.the.button.template.thymeleaf.ThymeleafTemplateEngine;
import spark.ModelAndView;
import spark.Spark;

import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;

public class Main {

    public static void main(String[] args) {

        int port = getHerokuAssignedPort();

        port(port);

        staticFiles.location("/public");

        Map map = new HashMap();
        get("/", (rq, rs) -> new ModelAndView(map, "index"), new ThymeleafTemplateEngine());

        get("/api/getPressCount/", (req, res) -> "10");
        post("/api/incrementPressCount/", (req, res) -> {
            // Update database here
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
