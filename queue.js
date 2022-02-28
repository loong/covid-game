import {CFG} from './cfg.js';

export class Queue {
  // Modified from
  // https://betterprogramming.pub/implementing-a-queue-in-javascript-59b332c7ff0d

  constructor() {
    this.data = [];
    this.rear = 0;
  }

  enqueue(element) {
    this.data[this.rear] = element;
    this.rear += 1;

    if (this.enqueue_cb) this.enqueue_cb(element);
  }

  set_enqueue_callback(cb) {
    this.enqueue_cb = cb;
  }

  length() {
    return this.rear;
  }

  is_empty() {
    return this.rear === 0;
  }

  get_front() {
    if (this.is_empty() === false) {
      return this.data[0];
    }
  }

  get_last() {
    if (this.is_empty() === false) {
      return this.data[this.rear - 1];
    }
  }

  dequeue() {
    if (this.is_empty() === false) {
      this.rear -= 1;
      const elem = this.data.shift();
      if (this.dequeue_cb) this.dequeue_cb();
      return elem;
    }
  }

  set_dequeue_callback(cb) {
    this.dequeue_cb = cb;
  }

  // TODO this could be better
  find_and_remove(element) {
    for (let i = 0; i < this.rear; ++i) {
      if (this.data[i] === element) {
        this.data.splice(i, 1);
        return;
      }
    }
  }

  print() {
    for (let i = 0; i < this.rear; ++i) {
      console.log(this.data[i]);
    }
  }

  clear() {
    this.data.length = 0;
    this.rear = 0;
  }
}
