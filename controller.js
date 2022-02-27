let arrival_frame = document.getElementById('frame-arrive');
let test_frame = document.getElementById('frame-test');
let camp_frame = document.getElementById('frame-camp');
let release_frame = document.getElementById('frame-release');

function init() {
  let p = new Person();
  p.render(camp_frame);
}

init();
