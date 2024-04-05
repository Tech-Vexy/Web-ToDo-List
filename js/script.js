// Load username and avatar from local storage
document.addEventListener("DOMContentLoaded", function () {
  var savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    document.getElementById("username").value = savedUsername;
    displayGreeting(savedUsername);
  }

  var savedAvatar = localStorage.getItem("avatar");
  if (savedAvatar) {
    document.getElementById("avatar").value = savedAvatar;
  }
});

function setUsername() {
  var usernameInput = document.getElementById("username").value;
  if (usernameInput.trim() !== "") {
    localStorage.setItem("username", usernameInput);
    displayGreeting(usernameInput);
  } else {
    alert("Please enter a username!");
  }
}
function displayAvatarPreview(avatar) {
  var avatarPreviewDiv = document.getElementById("avatarPreview");
  avatarPreviewDiv.innerHTML = `<img src="${avatar}" alt="Avatar">`;
}

function setAvatar() {
  var avatarInput = document.getElementById("avatar").value;
  localStorage.setItem("avatar", avatarInput);
}

function displayGreeting(username) {
  var greetingDiv = document.getElementById("greeting");
  greetingDiv.innerHTML = "Hello, " + username + "!";
}

function addTodo() {
  var todoInput = document.getElementById("todoInput").value;
  var reminderInput = document.getElementById("reminderInput").value;

  if (todoInput.trim() !== "") {
    var todoList = document.getElementById("todoList");
    var li = document.createElement("li");
    li.textContent = todoInput;

    // Add event to Google Calendar if a reminder is set
    if (reminderInput.trim() !== "") {
      var eventDetails = {
        'summary': todoInput,
        'start': {
          'dateTime': reminderInput,
          'timeZone': 'Your_Time_Zone' // Set your desired time zone
        },
        'end': {
          'dateTime': reminderInput,
          'timeZone': 'Your_Time_Zone'
        }
      };

      // Call the function to add event to Google Calendar
      addEventToCalendar(eventDetails);
    }

    todoList.appendChild(li);
    document.getElementById("todoInput").value = "";
    document.getElementById("reminderInput").value = "";
  } else {
    alert("Please enter a task!");
  }
}

function addEventToCalendar(eventDetails) {
  gapi.load('client:auth2', function () {
    gapi.client.init({
      apiKey: 'YOUR_API_KEY',
      clientId: 'YOUR_CLIENT_ID',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: 'https://www.googleapis.com/auth/calendar.events'
    }).then(function () {
      var event = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': eventDetails
      });

      event.execute(function (response) {
        console.log(response);
        if (response.status === "confirmed") {
          alert("Task added to your Google Calendar!");
        } else {
          alert("Failed to add task to Google Calendar!");
        }
      });
    });
  });
}
