let _id_counter = 0;
let persons = [];

const MAX_WAIT = 30;

class Person {
  constructor() {
    this.parent = null;
    
    this.vaccinated = true; // TODO randomize
    this.symptoms = 'coughing'; // TODO randomize from symptoms list
    this.covid = true;  // TODO randomize
    
    this.time_left = MAX_WAIT;
    this.timer = Rx.Observable.interval(1000)
		   .take(MAX_WAIT)
		   .map(t => Math.abs(t-MAX_WAIT))
		   .subscribe(t => {
		     this.time_left = t-1; // shows value of next render
		     this.render();
		   });
    

    persons.push(this);
    this._id = _id_counter++;

    this.render();
  }

  render() {
    this.frame = document.createElement('div');
    this.frame.classList.add("frame-person"); // TODO add css
    this.frame.innerHTML = '(' + this._id + ') : ' + this.time_left;
  }

  attach(parent) {
    this.parent = parent;
    parent.appendChild(this.frame);
  }
}
