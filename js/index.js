pomodoro = function () {
  var start_time = 25,
      mins_n_secs = void 0,
      time = void 0,
      current_num = void 0,
      timer_running = "not_running",
      break_timer_running = false,
      default_break = 5,
      audio_ringer = document.getElementById("audio_"),
      pause_value = void 0,
      time_pause = void 0;

  function start_timer() {
    if (timer_running === "running") {
      return;
    } else if (timer_running === "paused") {
      run_timer();
    } else {
      var val = document.getElementById("input_time").value;
      current_num = check_desired_timer(val);
      mins_n_secs = convert_into_mins_and_secs();
      document.getElementById("time").innerHTML = mins_n_secs;
      run_timer();
    }
  }

  function run_timer() {
    timer_running = "running";
    time = setInterval(one_sec_at_a_time, 1000);
  }
  function one_sec_at_a_time() {
    if (current_num < 0) {
      clearInterval(time);
      timer_running = "not_running";
      start_break_timer();
    } else {
      document.getElementById("time").innerHTML = mins_n_secs;
      current_num--;
      mins_n_secs = convert_into_mins_and_secs();
    }
  }
  function check_desired_timer(val) {
    return val ? Math.round(val * 60) : 1500;
  }
  function convert_into_mins_and_secs() {
    var mins = Math.floor(current_num / 60);
    var secs = current_num % 60;
    return secs > 9 ? mins + ":" + secs : mins + ":0" + secs;
  }
  function start_break_timer() {
    hide_div();
    current_num = check_pause_timer();
    mins_n_secs = convert_into_mins_and_secs();
    document.getElementById("middle_text").innerHTML = mins_n_secs;
    time = setInterval(break_one_sec_at_a_time, 1000);
    audio_ringer.play();
    setTimeout(function () {
      audio_ringer.pause();
    }, 1500);
  }
  function check_pause_timer() {
    var val = document.getElementById("input_break").value;
    return val ? Math.round(val * 60) : 300;
  }
  function break_one_sec_at_a_time() {
    if (current_num <= 0) {
      clearInterval(time);
      var break_val = document.getElementById("input_break").value;
      current_num = check_desired_timer(break_val);
      mins_n_secs = convert_into_mins_and_secs();
      display_div();
      document.getElementById("time").innerHTML = mins_n_secs;
      run_timer();
    } else {
      document.getElementById("middle_text").innerHTML = mins_n_secs;
      current_num--;
      mins_n_secs = convert_into_mins_and_secs();
    }
  }

  function hide_div() {
    document.getElementById("div-left").style.display = "none";
    document.getElementById("div-right").style.display = "none";
    document.getElementById("div-left-hidden").style.display = "inline-block";
    document.getElementById("div-right-hidden").style.display = "inline-block";
  };
  function display_div() {
    document.getElementById("div-left").style.display = "inline-block";
    document.getElementById("div-right").style.display = "inline-block";
    document.getElementById("div-left-hidden").style.display = "none";
    document.getElementById("div-right-hidden").style.display = "none";
  }

  function pause_timer() {
    if (timer_running === "paused" || timer_running === "not_running") {
      return;
    } else {
      clearInterval(time);
      timer_running = "paused";
      current_num++;
      mins_n_secs = convert_into_mins_and_secs();
      document.getElementById("time").innerHTML = mins_n_secs;
    }
  }
  function reset_timer() {
    clearInterval(time);
    var val = document.getElementById("input_time").value;
    timer_running = "not_running";
    current_num = check_desired_timer(val);
    mins_n_secs = convert_into_mins_and_secs();
    document.getElementById("time").innerHTML = mins_n_secs;
  }
  function refresh_page() {
    clearInterval(time);
    display_div();
  }

  return {
    start_timer: start_timer,
    pause_timer: pause_timer,
    reset_timer: reset_timer,
    refresh_page: refresh_page
  };
}();