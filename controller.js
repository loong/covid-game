let arrive_frame = document.getElementById('frame-arrive');
let test_frame = document.getElementById('frame-test');
let isolate_frame = document.getElementById('frame-isolate');
let release_frame = document.getElementById('frame-release');

let arrive_queue = new Queue();
let test_queue = new Queue();
let isolate_queue = new Queue();
let release_queue = new Queue(); // not needed but keeps code consistent

MAX_WAIT = 10;

function new_arrival(num_arrivals) {
  for (let i = 0; i < num_arrivals; i++) {
    let p = new Person();
    p.set_timer(
      (person) => render(),
      (person) => {
	arrive_queue.find_and_remove(person);
	release_queue.enqueue(person);
	render()
      },
      MAX_WAIT);
    arrive_queue.enqueue(p)
  }
  render();
}

function render_person_queue(queue, frame) {
  frame.replaceChildren(); // TODO get rid of this
  queue.data.forEach(p => p.attach(frame))
}

function render() {
  render_person_queue(arrive_queue, arrive_frame);
  render_person_queue(test_queue, test_frame);
  render_person_queue(isolate_queue, isolate_frame);
}

function set_transition_btn_event(btn_id, src_queue, dst_queue) {
  let btn = document.getElementById(btn_id);
  Rx.Observable.fromEvent(btn, 'click').subscribe(value => {
    // TODO log
    // TODO handle case when empty
  
    let p = src_queue.dequeue();
    p.unset_timer();
    p.time_left = MAX_WAIT;
    p.set_timer(() => {}, () => {}, MAX_WAIT)
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

      switch(t) {
	case 0: new_arrival(1); break;
	case 2: new_arrival(1); break; 
	case 4: new_arrival(2); break;
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

