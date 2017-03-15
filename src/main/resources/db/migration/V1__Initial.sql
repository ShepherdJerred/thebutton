CREATE TABLE counters (
  counter_uuid CHAR(36) PRIMARY KEY,
  count        LONG NOT NULL,
  max_count    LONG NOT NULL
)