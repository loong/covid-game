CFG = {
  ARRIVE_WAIT: 30,
  TEST_WAIT: 5,
  ISOLATE_WAIT: 20,
  
  CAP_TEST: 5,
  CAP_TEST_BONUS: 30,
  CAP_ISOLATE: 5,
  CAP_ISOLATE_BONUS: 30,

  PROP_VAXXED: 0.5,
  PROP_COUGH: 0.2,

  TIME_EVENT_LOG: {
    0: {event: 'new_arrival', num_arrival: 1},
    5: {event: 'new_arrival', num_arrival: 3},
    15: {event: 'new_arrival', num_arrival: 3},
    20: {event: 'new_arrival', num_arrival: 3},
    25: {event: 'new_arrival', num_arrival: 1},
    30: {event: 'new_arrival', num_arrival: 10},
    35: {event: 'new_arrival', num_arrival: 3},
    40: {event: 'new_arrival', num_arrival: 5}
  },

  RELEASE_EVENT_LOG: {
    1: {event: 'activate_test_bonus'},
    3: {event: 'activate_isolate_bonus'},
    10: {event: 'activate_more_bonus'}
  }
}
