package com.shepherdjerred.the.button;

import spark.Session;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class Sessions {

    private static Set<Session> activeSessions = Collections.synchronizedSet(new HashSet<>());
    private static long NUMBER_OF_MILLIS_IN_30_SECONDS = 30000L;

    public static void addToSessions(Session session) {
        activeSessions.add(session);
    }

    public static int getActiveSessionCount() {
        return activeSessions.size();
    }

    private static void trim() {
        for (Session session : activeSessions) {
            if (System.currentTimeMillis() - session.lastAccessedTime() > NUMBER_OF_MILLIS_IN_30_SECONDS) {
                activeSessions.remove(session);
            } else {
                System.out.println(System.currentTimeMillis() - session.lastAccessedTime());
            }
        }
    }

    public static void startTrimLoop() {
        new Thread(() -> {
            while (true) {
                try {
                    trim();
                    Thread.sleep(10 * 1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

}
