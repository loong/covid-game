let arrive_queue = new Queue();
let test_queue = new Queue();
let isolate_queue = new Queue();
let release_queue = new Queue(); // not needed but keeps code consistent

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
  p.set_timer(() => render(), () => {}, timeout)

  if (test_queue.length() == test_cap) {
    disable('arrive-test-btn');
  }
});

test_queue.set_dequeue_callback((p) => {
  enable('arrive-test-btn');
})

isolate_queue.set_enqueue_callback((p) => {
  timeout = CFG.ISOLATE_WAIT;
  p.unset_timer();
  p.time_left = timeout;
  p.set_timer(() => render(), () => {}, timeout);
  
  if (isolate_queue.length() == isolate_cap) {
    disable('arrive-isolate-btn');
  }
});

isolate_queue.set_dequeue_callback((p) => {
  enable('arrive-isolate-btn');
})
