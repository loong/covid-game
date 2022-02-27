// https://betterprogramming.pub/implementing-a-queue-in-javascript-59b332c7ff0d

class Queue {
  
  constructor(){
    this.data = [];
    this.rear = 0;
  }
  
  enqueue(element) {
    this.data[this.rear] = element;
    this.rear = this.rear + 1;
  }

  length() { 
    return this.rear;
  }

  is_empty() {
    return this.rear === 0;
  }

  get_front() {
    if(this.is_empty() === false) {
      return this.data[0];
    }
  }

  get_last() {
    if(this.is_empty() === false) {
      return this.data[ this.rear - 1 ] ;
    }
  }

  dequeue() {
    if(this.is_empty() === false) {
      this.rear = this.rear-1;
      return this.data.shift();
    }
  }

  find_and_remove(element) {
    for(let i = 0; i < this.rear; ++i) {
      if (this.data[i] === element) {
	this.data.splice(i, 1);
	return;
      }
    }
  }
  
  print() { 
    for(let i = 0; i < this.rear; ++i) {
      console.log(this.data[i]);
    }
  }
  
  clear() {
    this.data.length = 0;
    this.rear = 0;
  }
  
}
