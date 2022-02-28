export class Timer {
  constructor(parent) {
    this.frame = document.createElement('div');
    this.frame.innerHTML = '15:00';
    parent.appendChild(this.frame);
  }

  render(t) {
    const mins = (~~((t % 3600) / 60)).toString().padStart(2, '0');
    const secs = (~~t % 60).toString().padStart(2, '0');

    this.frame.innerHTML = `${mins}:${secs}`;
  }
}
