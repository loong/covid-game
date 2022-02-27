CFG = {
  ARRIVE_WAIT: 10,
  TEST_WAIT: 5,
  ISOLATE_WAIT: 20,

  ISOLATE_CAP: 2,
  TEST_CAP: 2,

  EVENT_LOG: {
    0: {event: 'new_arrival', num_arrival: 1},
    2: {event: 'new_arrival', num_arrival: 1},
    4: {event: 'new_arrival', num_arrival: 2}
  }
}