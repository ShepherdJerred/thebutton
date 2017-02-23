package com.shepherdjerred.the.button;

import spark.Session;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Sessions {

    private static List<WeakReference<Session>> sessionList = Collections.synchronizedList(new ArrayList<>());
    private static long NUMBER_OF_MILLIS_IN_30_SECONDS = 30000;

    public static int getActiveSessionCount() {
        int total = 0;
        for (WeakReference<Session> sessionReference : sessionList) {
            if (sessionReference.get().lastAccessedTime() < NUMBER_OF_MILLIS_IN_30_SECONDS) {
                total++;
            }
        }
        return total;
    }

}
