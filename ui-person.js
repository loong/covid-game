let persons = [];
class Person {
  constructor() {
    persons.push(this);
    this.vaccinated = true; // TODO randomize
    this.symptoms = 'coughing'; // TODO randomize from symptoms list
    this.covid = true;  // TODO randomize

    // TODO add timer

    this.render();
  }

  render() {
    this.frame = document.createElement('div');
    this.frame.classList.add("frame-person");
    this.frame.innerHTML = 'O';
  }

  attach(parent) {
    parent.appendChild(this.frame);
  }
}
