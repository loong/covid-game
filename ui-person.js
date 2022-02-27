let _id_counter = 0;
let persons = [];

class Person {
  constructor() {
    this.vaccinated = true; // TODO randomize
    this.symptoms = 'coughing'; // TODO randomize from symptoms list
    this.covid = true;  // TODO randomize

    // TODO add timer

    persons.push(this);
    this._id = _id_counter++;

    this.render();
  }

  render() {
    this.frame = document.createElement('div');
    this.frame.classList.add("frame-person");
    this.frame.innerHTML = '(' + this._id + ')';
  }

  attach(parent) {
    parent.appendChild(this.frame);
  }
}
