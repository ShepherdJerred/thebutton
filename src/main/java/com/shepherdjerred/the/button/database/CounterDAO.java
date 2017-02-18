package com.shepherdjerred.the.button.database;

import com.shepherdjerred.the.button.Counter;
import org.codejargon.fluentjdbc.api.FluentJdbc;
import org.codejargon.fluentjdbc.api.query.Mapper;
import org.codejargon.fluentjdbc.api.query.Query;

import java.util.Optional;
import java.util.UUID;

public class CounterDAO {

    private final FluentJdbc fluentJdbc;

    public CounterDAO(FluentJdbc fluentJdbc) {
        this.fluentJdbc = fluentJdbc;
    }

    public void insert(Counter counter) {
        Query query = fluentJdbc.query();

        query
                .update("INSERT INTO counters VALUES (?,?,?)")
                .params(
                        counter.getUuid().toString(),
                        counter.getCount(),
                        counter.getMaxCount()
                ).run();
    }

    public void updateCount(Counter counter) {
        Query query = fluentJdbc.query();

        query
                .update("UPDATE counters SET count = ? WHERE counter_uuid = ?")
                .params(
                        counter.getCount(),
                        counter.getUuid().toString()
                ).run();
    }

    public Counter load(UUID counterUuid) {
        Mapper<Counter> counterMapper = rs -> new Counter(
                counterUuid,
                rs.getLong("count"),
                rs.getLong("max_count")
        );

        Query query = fluentJdbc.query();

        Optional<Counter> counter = query
                .select("SELECT * FROM counters WHERE counter_uuid = ?")
                .params(
                        counterUuid.toString()
                ).firstResult(counterMapper);

        return counter.orElse(null);
    }

}
