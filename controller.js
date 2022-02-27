let arrival_frame = document.getElementById('frame-arrive');
let test_frame = document.getElementById('frame-test');
let camp_frame = document.getElementById('frame-camp');
let release_frame = document.getElementById('frame-release');


function new_arrival(num_arrivals) {
  for (let i = 0; i < num_arrivals; i++) {
    let p = new Person();
    p.attach(arrival_frame);
  }
}

new_arrival(5);

let button = document.getElementById('btn1');
Rx.Observable.fromEvent(button, 'click').subscribe(value => {
  persons[0].attach(test_frame);
});

