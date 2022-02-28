const arrive_queue = new Queue();
const test_queue = new Queue();
const isolate_queue = new Queue();
const release_queue = new Queue(); // not needed but keeps code consistent

arrive_queue.set_enqueue_callback((p) => {
  timeout = CFG.ARRIVE_WAIT;
  p.time_left = timeout;
  p.set_timer(() => render(), (person) => {
    arrive_queue.find_and_remove(person);
    release_queue.enqueue(person);
    render();
  }, timeout);
});

test_queue.set_enqueue_callback((p) => {
  timeout = CFG.TEST_WAIT;
  p.unset_timer();
  p.time_left = timeout;
  p.set_timer(() => render(), () => {}, timeout);

  if (test_queue.length() == CFG.CAP_TEST) {
    disable('arrive-test-btn');
  }
});

test_queue.set_dequeue_callback((p) => {
  enable('arrive-test-btn');
});

isolate_queue.set_enqueue_callback((p) => {
  timeout = CFG.ISOLATE_WAIT;
  p.unset_timer();
  p.time_left = timeout;
  p.set_timer(() => render(), () => {}, timeout);

  if (isolate_queue.length() == CFG.CAP_ISOLATE) {
    disable('arrive-isolate-btn');
  }
});

isolate_queue.set_dequeue_callback((p) => {
  enable('arrive-isolate-btn');
});

release_queue.set_enqueue_callback((p) => {
  p.unset_timer();
  if (p.covid) {
    cases_in_community += 1;
  }

  const action = CFG.RELEASE_EVENT_LOG[release_queue.length()];
  if (action != undefined) {
    switch (action.event) {
      // TODO should use events
      case 'activate_test_bonus':
        enable('more-test-btn');
        break;
      case 'activate_isolate_bonus':
        enable('more-isolate-btn');
        break;
      case 'activate_more_bonus':
        enable('more-more-btn');
        break;
    }
  }
});
