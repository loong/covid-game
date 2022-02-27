let persons = [];
class Person {
  constructor() {
    persons.push(this);
    this.vaccinated = true; // TODO randomize
    this.symptoms = 'coughing'; // TODO randomize from symptoms list
    this.covid = true;  // TODO randomize

    // TODO add timer
  }

  render(parent) {
    let frame = document.createElement('div');
    frame.classList.add("frame-person");
    frame.innerHTML = 'O';

    parent.appendChild(frame);
  }
}
