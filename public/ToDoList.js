//Firebase Config Information
const firebaseConfig = {
  apiKey: "AIzaSyAW6xhxT_ycudLcNJL9OIt6Y5AAuzky-Po",
  authDomain: "taskbuddy-9c3f6.firebaseapp.com",
  projectId: "taskbuddy-9c3f6",
  storageBucket: "taskbuddy-9c3f6.appspot.com",
  messagingSenderId: "326763319334",
  appId: "1:326763319334:web:5aee080b91f1d7d85756e7",
  measurementId: "G-0KCSZMXRL0",
};

//Initialize firebase, auth, and our db references.
firebase.initializeApp(firebaseConfig);
auth = firebase.auth();
db = firebase.firestore();

var auth = firebase.auth();

auth.onAuthStateChanged((user) => {
  if (user == null) {
    // Sign-out successful.
    console.log("Sign-out successful");
    window.location.href = "./index.html";
  } else {
    // LOAD ALL THE USER DATA THAT IS NEEDED
    // LOGIC TO DISPLAY NAME BASED ON EMAIL - IF USER HAS ALREADY ENTERED A NAME IN THE SETTINGS CHOSE THAT
    var email = user.email;
    var position = email.search("@");
    var tempName = email.substring(0, position);
  }
});

const logoutClick = document.querySelector(".logout");
logoutClick.addEventListener("click", function () {
  // toggle the type attribute
  signOut();
});

function signOut() {
  firebase.auth().signOut();
}

// To do list starts
var state = [];

function setDefaultState() {
  var id = generateID();
  var baseState = {};
  baseState[id] = {
    status: "new",
    id: id,
    title: "This site uses 🍪to keep track of your tasks",
  };
  syncState(baseState);
}

function generateID() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}

function pushToState(title, status, id) {
  var baseState = getState();
  baseState[id] = { id: id, title: title, status: status };
  syncState(baseState);
}

function setToDone(id) {
  var baseState = getState();
  if (baseState[id].status === "new") {
    baseState[id].status = "done";
  } else {
    baseState[id].status = "new";
  }

  syncState(baseState);
}

function deleteTodo(id) {
  console.log(id);
  var baseState = getState();
  delete baseState[id];
  syncState(baseState);
}

function resetState() {
  localStorage.setItem("state", null);
}

function syncState(state) {
  localStorage.setItem("state", JSON.stringify(state));
}

function getState() {
  return JSON.parse(localStorage.getItem("state"));
}

function addItem(text, status, id, noUpdate) {
  var id = id ? id : generateID();
  var c = status === "done" ? "danger" : "";
  var item =
    '<li data-id="' +
    id +
    '" class="animated flipInX ' +
    c +
    '"><div class="checkbox"><span class="close"><i class="fa fa-times"></i></span><label><span class="checkbox-mask"></span><input type="checkbox" />' +
    text +
    "</label></div></li>";

  var isError = $(".form-control").hasClass("hidden");

  if (text === "") {
    $(".err").removeClass("hidden").addClass("animated bounceIn");
  } else {
    $(".err").addClass("hidden");
    $(".todo-list").append(item);
  }

  $(".refresh").removeClass("hidden");

  $(".no-items").addClass("hidden");

  $(".form-control").val("").attr("placeholder", "✍️ Add item...");
  setTimeout(function () {
    $(".todo-list li").removeClass("animated flipInX");
  }, 500);

  if (!noUpdate) {
    pushToState(text, "new", id);
  }
}

function refresh() {
  $(".todo-list li").each(function (i) {
    $(this)
      .delay(70 * i)
      .queue(function () {
        $(this).addClass("animated bounceOutLeft");
        $(this).dequeue();
      });
  });

  setTimeout(function () {
    $(".todo-list li").remove();
    $(".no-items").removeClass("hidden");
    $(".err").addClass("hidden");
  }, 800);
}

$(function () {
  var err = $(".err"),
    formControl = $(".form-control"),
    isError = formControl.hasClass("hidden");

  if (!isError) {
    formControl.blur(function () {
      err.addClass("hidden");
    });
  }

  $(".add-btn").on("click", function () {
    var itemVal = $(".form-control").val();
    addItem(itemVal);
    formControl.focus();
  });

  $(".refresh").on("click", refresh);

  $(".todo-list").on("click", 'input[type="checkbox"]', function () {
    var li = $(this).parent().parent().parent();
    li.toggleClass("danger");
    li.toggleClass("animated flipInX");

    setToDone(li.data().id);

    setTimeout(function () {
      li.removeClass("animated flipInX");
    }, 500);
  });

  $(".todo-list").on("click", ".close", function () {
    var box = $(this).parent().parent();

    if ($(".todo-list li").length == 1) {
      box
        .removeClass("animated flipInX")
        .addClass("animated                bounceOutLeft");
      setTimeout(function () {
        box.remove();
        $(".no-items").removeClass("hidden");
        $(".refresh").addClass("hidden");
      }, 500);
    } else {
      box.removeClass("animated flipInX").addClass("animated bounceOutLeft");
      setTimeout(function () {
        box.remove();
      }, 500);
    }

    deleteTodo(box.data().id);
  });

  $(".form-control").keypress(function (e) {
    if (e.which == 13) {
      var itemVal = $(".form-control").val();
      addItem(itemVal);
    }
  });
  $(".todo-list").sortable();
  $(".todo-list").disableSelection();
});

var todayContainer = document.querySelector(".today");

var d = new Date();

var weekday = new Array(7);
weekday[0] = "Sunday 🖖";
weekday[1] = "Monday 💪😀";
weekday[2] = "Tuesday 😜";
weekday[3] = "Wednesday 😌☕️";
weekday[4] = "Thursday 🤗";
weekday[5] = "Friday 🍻";
weekday[6] = "Saturday 😴";

var n = weekday[d.getDay()];

var randomWordArray = Array(
  "Oh my, it's ",
  "Whoop, it's ",
  "Happy ",
  "Seems it's ",
  "Awesome, it's ",
  "Have a nice ",
  "Happy fabulous ",
  "Enjoy your "
);

var randomWord =
  randomWordArray[Math.floor(Math.random() * randomWordArray.length)];

todayContainer.innerHTML = randomWord + n;

$(document).ready(function () {
  var state = getState();

  if (!state) {
    setDefaultState();
    state = getState();
  }

  Object.keys(state).forEach(function (todoKey) {
    var todo = state[todoKey];
    addItem(todo.title, todo.status, todo.id, true);
  });

  var mins, secs, update;

  init();
  function init() {
    (mins = 25), (secs = 59);
  }

  set();
  function set() {
    $(".mins").text(mins);
  }

  $("#start").on("click", start_timer);
  $("#reset").on("click", reset);
  $("#inc").on("click", inc);
  $("#dec").on("click", dec);

  function start_timer() {
    set();

    $(".dis").attr("disabled", true);

    $(".mins").text(--mins);
    $(".separator").text(":");
    update_timer();

    update = setInterval(update_timer, 1000);
  }

  function update_timer() {
    $(".secs").text(secs);
    --secs;
    if (mins == 0 && secs < 0) {
      reset();
    } else if (secs < 0 && mins > 0) {
      secs = 59;
      --mins;
      $(".mins").text(mins);
    }
  }

  function reset() {
    clearInterval(update);
    $(".secs").text("");
    $(".separator").text("");
    init();
    $(".mins").text(mins);
    $(".dis").attr("disabled", false);
  }

  function inc() {
    mins++;
    $(".mins").text(mins);
  }

  function dec() {
    if (mins > 1) {
      mins--;
      $(".mins").text(mins);
    } else {
      alert("This is the minimum limit.");
    }
  }
});
$("#next").click(function () {
  var $next = $(".progress ul li.current")
    .removeClass("current")
    .addClass("complete")
    .next("li");
  if ($next.length) {
    $next.removeClass("complete").addClass("current");
    //console.log('Prev');
  } else {
    $(".progress ul li:first").removeClass("complete").addClass("current");
    if (".progress ul li:last") {
      $(".progress ul li")
        .removeClass("current")
        .removeClass("complete")
        .removeAttr("class");
      $(".progress ul li:first").addClass("current");
    }
    //console.log('Next');
  }
});
$("#prev").click(function () {
  var $prev = $(".progress ul li.current")
    .removeClass("current")
    .removeClass("complete")
    .removeAttr("class")
    .prev("li");
  if ($prev.length) {
    $prev.removeClass("complete").addClass("current");
    //console.log('Prev');
  } else {
    $(".progress ul li:first").removeClass("complete").addClass("current");
    $(".progress ul li:last")
      .removeClass("current")
      .removeClass("complete")
      .removeAttr("class");
    //console.log('Prev');
  }
});

// Progress bars
$(function () {
  $(".progress").each(function () {
    var value = $(this).attr("data-value");
    var left = $(this).find(".progress-left .progress-bar");
    var right = $(this).find(".progress-right .progress-bar");

    if (value > 0) {
      if (value <= 50) {
        right.css("transform", "rotate(" + percentageToDegrees(value) + "deg)");
      } else {
        right.css("transform", "rotate(180deg)");
        left.css(
          "transform",
          "rotate(" + percentageToDegrees(value - 50) + "deg)"
        );
      }
    }
  });

  function percentageToDegrees(percentage) {
    return (percentage / 100) * 360;
  }
});
