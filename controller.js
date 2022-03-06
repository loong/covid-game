import {CFG} from './cfg.js';
import {Queue} from './queue.js';

import {Timer} from './ui-timer.js';
import {Person} from './ui-person.js';

export const arrive_queue = new Queue();
export const test_queue = new Queue();
export const isolate_queue = new Queue();
export const release_queue = new Queue(); // not needed but keeps code consistent

let cases_in_community = 0;

const timer_frame = document.getElementById('ui-timer');
let ui_timer = new Timer(timer_frame); // TODO not need to save instance?

function new_arrival(num_arrivals) {
  for (let i = 0; i < num_arrivals; i++) {
    const p = new Person(CFG.ARRIVE_WAIT);
    arrive_queue.enqueue(p);
  }
  console.log(num_arrivals + ' new arrivals!')
  render();
}

function update_element(id, inner) {
  const elem = document.getElementById(id);
  elem.innerHTML = inner;
}

function enable(id) {
  document.getElementById(id).disabled = false;
}

function disable(id) {
  document.getElementById(id).disabled = true;
}

function render_person_queue(queue, frame_id) {
  const frame = document.getElementById(frame_id);
  frame.replaceChildren(); // TODO get rid of this
  queue.data.forEach((p) => p.attach(frame));
}

export function render() {
  render_person_queue(arrive_queue, 'frame-arrive');
  render_person_queue(test_queue, 'frame-test');
  render_person_queue(isolate_queue, 'frame-isolate');

  update_element('stats-released', release_queue.length());
  update_element('stats-isolate', `${isolate_queue.length()}/${CFG.CAP_ISOLATE}`);
  update_element('stats-test', `${test_queue.length()}/${CFG.CAP_TEST}`);
  update_element('stats-arrive', arrive_queue.length());

  update_element('stats-cases', cases_in_community);
}

function set_transition_btn_event(btn_id, src_queue, dst_queue) {
  const btn = document.getElementById(btn_id);
  Rx.Observable.fromEvent(btn, 'click').subscribe((value) => {
    // TODO handle case when empty
    const p = src_queue.dequeue();
    dst_queue.enqueue(p);
    p.render();
    render();
  });
}

set_transition_btn_event('arrive-test-btn', arrive_queue, test_queue);
set_transition_btn_event('arrive-isolate-btn', arrive_queue, isolate_queue);
set_transition_btn_event('arrive-release-btn', arrive_queue, release_queue);
set_transition_btn_event('test-isolate-btn', test_queue, isolate_queue);
set_transition_btn_event('test-release-btn', test_queue, release_queue);
set_transition_btn_event('isolate-release-btn', isolate_queue, release_queue);

function init_event_log() {
  Rx.Observable.interval(1000)
    .take(900) // 15 min
    .subscribe((t) => {
      ui_timer.render(Math.abs(t - 900)); // TODO spaghetti ref

      const action = CFG.TIME_EVENT_LOG[t];
      if (action != undefined && action.event == 'new_arrival') {
        new_arrival(action.num_arrival);
      }
    });
}

function set_click_event(id, func) {
  const btn = document.getElementById(id);
  Rx.Observable.fromEvent(btn, 'click').subscribe((value) => {
    func(btn, value);
  });
}

arrive_queue.set_enqueue_callback((p) => {
  let timeout = CFG.ARRIVE_WAIT;
  p.time_left = timeout;
  p.set_timer(() => render(), (person) => {
    arrive_queue.remove(person);
    release_queue.enqueue(person);
    render();
  }, timeout);
});

test_queue.set_enqueue_callback((p) => {
  let timeout = CFG.TEST_WAIT;
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
  let timeout = CFG.ISOLATE_WAIT;
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

set_click_event('more-test-btn', (btn, value) => {
  CFG.CAP_TEST = CFG.CAP_TEST_BONUS;
  btn.disabled = true;
});

set_click_event('more-isolate-btn', (btn, value) => {
  CFG.CAP_ISOLATE = CFG.CAP_ISOLATE_BONUS;
  btn.disabled = true;
});

set_click_event('more-more-btn', (btn, value) => {
  alert('Not implemented');
  btn.disabled = true;
});

function init() {
  init_event_log();
  document.getElementById('start-btn').style.display = 'none';
}

init();
