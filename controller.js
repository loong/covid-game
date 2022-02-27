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
  update_element('stats-isolate', isolate_queue.length() + '/' + CFG.ISOLATE_CAP);
  update_element('stats-test', test_queue.length() + '/' + CFG.TEST_CAP);
  update_element('stats-arrive', arrive_queue.length());
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

      let action = CFG.EVENT_LOG[t];

      if (action != undefined && action.event == 'new_arrival') {
	new_arrival(action.num_arrival);
      }
    });
}

let start_btn = document.getElementById('start-btn');
Rx.Observable.fromEvent(start_btn, 'click').subscribe(value => {
  init_event_log();
  start_btn.style.display = "none";
});

function init() {
  init_event_log();
  start_btn.style.display = "none";
}

init();
