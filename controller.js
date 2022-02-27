let arrival_frame = document.getElementById('frame-arrive');
let test_frame = document.getElementById('frame-test');
let camp_frame = document.getElementById('frame-camp');
let release_frame = document.getElementById('frame-release');

let arrival_queue = new Queue();
let test_queue = new Queue();
let camp_queue = new Queue();

function new_arrival(num_arrivals) {
  for (let i = 0; i < num_arrivals; i++) {
    arrival_queue.enqueue(new Person());
  }
  render();
}

function render() {
  arrival_frame.replaceChildren();
  test_frame.replaceChildren();
  camp_frame.replaceChildren();
  release_frame.replaceChildren();
  
  arrival_queue.data.forEach(p => {
    p.attach(arrival_frame);
  });
  
  test_queue.data.forEach(p => {
    p.attach(test_frame);
  });
  
  camp_queue.data.forEach(p => {
    p.attach(camp_frame);
  });
}

new_arrival(5);

let button = document.getElementById('btn1');
Rx.Observable.fromEvent(button, 'click').subscribe(value => {
  persons[0].attach(test_frame);
});

let arrive_test_btn = document.getElementById('arrive-test-btn');
Rx.Observable.fromEvent(arrive_test_btn, 'click').subscribe(value => {
  console.log('Arrival -> Test')
  // TODO handle case when empty
  
  let p = arrival_queue.dequeue();
  test_queue.enqueue(p);
  render();
});

let arrive_camp_btn = document.getElementById('arrive-camp-btn');
Rx.Observable.fromEvent(arrive_camp_btn, 'click').subscribe(value => {
  console.log('Arrival -> Camp')
  // TODO handle case when empty
  
  let p = arrival_queue.dequeue();
  camp_queue.enqueue(p);
  render();
});

function release_person(person) {
  console.log('Person ' + person._id + ' released');
}

let arrive_release_btn = document.getElementById('arrive-release-btn');
Rx.Observable.fromEvent(arrive_release_btn, 'click').subscribe(value => {
  console.log('Arrival -> Release')
  // TODO handle case when empty
  
  let p = arrival_queue.dequeue();
  release_person(p);
  render();
});

