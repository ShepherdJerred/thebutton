package com.shepherdjerred.the.button;

import java.util.UUID;

public class Counter {

    private UUID uuid;
    private long count;
    private long maxCount;

    public Counter(UUID uuid, long count, long maxCount) {
        this.uuid = uuid;
        this.count = count;
        this.maxCount = maxCount;
    }

    public void incrementCount() {
        count++;
    }

    public UUID getUuid() {
        return uuid;
    }

    public long getCount() {
        return count;
    }

    public long getMaxCount() {
        return maxCount;
    }
}
