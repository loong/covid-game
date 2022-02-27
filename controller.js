let cases_in_community = 0;

function new_arrival(num_arrivals) {
  for (let i = 0; i < num_arrivals; i++) {
    let p = new Person(CFG.ARRIVE_WAIT);
    arrive_queue.enqueue(p)
  }
  render();
}

function update_element(id, inner) {
  let elem = document.getElementById(id);
  elem.innerHTML = inner;
}

function enable(id) {
  document.getElementById(id).disabled = false;
}

function disable(id) {
  document.getElementById(id).disabled = true;
}

function render_person_queue(queue, frame_id) {
  let frame = document.getElementById(frame_id);
  frame.replaceChildren(); // TODO get rid of this
  queue.data.forEach(p => p.attach(frame));
}

function render() {
  render_person_queue(arrive_queue, 'frame-arrive');
  render_person_queue(test_queue, 'frame-test');
  render_person_queue(isolate_queue, 'frame-isolate');

  update_element('stats-released', release_queue.length());
  update_element('stats-isolate', isolate_queue.length() + '/' + CFG.CAP_ISOLATE);
  update_element('stats-test', test_queue.length() + '/' + CFG.CAP_TEST);
  update_element('stats-arrive', arrive_queue.length());

  update_element('stats-cases', cases_in_community);
}

function set_transition_btn_event(btn_id, src_queue, dst_queue) {
  let btn = document.getElementById(btn_id);
  Rx.Observable.fromEvent(btn, 'click').subscribe(value => {
    // TODO handle case when empty  
    let p = src_queue.dequeue();
    dst_queue.enqueue(p);
    p.render();
    render();
  })
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
      render_countdown(Math.abs(t-900));

      let action = CFG.TIME_EVENT_LOG[t];
      if (action != undefined && action.event == 'new_arrival') {
	new_arrival(action.num_arrival);
      }
    });
}

function set_click_event(id, func) {
  let btn = document.getElementById(id);
  Rx.Observable.fromEvent(btn, 'click').subscribe(value => {
    func(btn, value);
  });
}

set_click_event('more-test-btn', (btn, value) => {
  CFG.CAP_TEST = CFG.CAP_TEST_BONUS;
  btn.disabled = true;
});

set_click_event('more-isolate-btn', (btn, value) => {
  CFG.CAP_ISOLATE = CFG.CAP_ISOLATE_BONUS;
  btn.disabled = true;  
});

set_click_event('more-more-btn', (btn, value) => {
  alert('Not implemented')
  btn.disabled = true;
});

function init() {
  init_event_log();
  document.getElementById('start-btn').style.display = "none";
}

init();
