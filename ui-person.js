let _id_counter = 0;
let persons = [];

class Person {
  constructor(arrival_wait) {
    this.parent = null;
    
    this.vaccinated = true; // TODO randomize
    this.symptoms = 'coughing'; // TODO randomize from symptoms list
    this.covid = true;  // TODO randomize
    
    this.time_left = arrival_wait;

    persons.push(this);
    this._id = _id_counter++;

    this.render();
  }

  set_timer(ticker_cb, timer_cb, timeout) {
    this.ticker = Rx.Observable.interval(1000)
		    .take(timeout-1)
		    .map(t => Math.abs(t-timeout))
		    .subscribe(t => {
		      this.time_left = t; // shows value of next render
		      this.render();
		      ticker_cb(this);
		    });
    this.timer =  Rx.Observable.timer((timeout+1) * 1000)
		    .subscribe(() => timer_cb(this));
  }

  unset_timer() {
    this.ticker.unsubscribe();
    this.timer.unsubscribe();
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
