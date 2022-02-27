let ui_timer = document.getElementById('ui-timer');
let countdown = document.createElement('div');
countdown.innerHTML = '15:00';
ui_timer.appendChild(countdown);

function render_countdown(t) {
  let mins = (~~((t % 3600) / 60)).toString().padStart(2, '0');
  let secs = (~~t % 60).toString().padStart(2, '0');

  countdown.innerHTML = mins + ':' + secs;
}
