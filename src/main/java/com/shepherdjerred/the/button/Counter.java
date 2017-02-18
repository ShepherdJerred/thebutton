package com.shepherdjerred.the.button;

public class Counter {

    private long count;
    private final long MAX_COUNT = 1000000000;

    public Counter(long count) {
        this.count = count;
    }

    public void incrementCount() {
        count++;
    }

}
