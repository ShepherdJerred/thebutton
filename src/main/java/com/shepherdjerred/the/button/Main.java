package com.shepherdjerred.the.button;

import com.shepherdjerred.the.button.template.thymeleaf.ThymeleafTemplateEngine;
import spark.ModelAndView;
import spark.Spark;

import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;

public class Main {


    public static void main(String[] args) {

        port(80);

        staticFiles.location("/public");

        Map map = new HashMap();
        get("/", (rq, rs) -> new ModelAndView(map, "index"), new ThymeleafTemplateEngine());

        get("/api/currentBumpCount", (req, res) -> "1");
        post("/api/incrementBumpCount", (req, res) -> {

            return "";
        });

    }

    public static void stop() {
        Spark.stop();
    }

}
