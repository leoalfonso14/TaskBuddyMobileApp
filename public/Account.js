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

// todo: DISPLAY LOADER
//CHECK IF USER IS LOGGED IN - IF NOT SEND TO REGISTRATION/SIGNIN PAGE
//IF LOGGED IN THEN DISPLAY PAGE WITH USERS STUFF
var auth = firebase.auth();

// Get elements
const saveButton = document.getElementById("saveButton");
const nameInput = document.getElementById("AccountBox");
const popup = document.getElementById("popup");

// Load user's saved name from local storage on page load
auth.onAuthStateChanged((user) => {
  if (user == null) {
    // Sign-out successful.
    console.log("Sign-out successful");
    window.location.href = "./index.html";
  } else {
    // Get the userTitle element
    var UserID = user.uid;
    var email = user.email;
    var nickName;

    db.collection("users")
      .doc(UserID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          nickName = doc.data().fullName;
          console.log(nickName);
          if (nickName) {
            nameInput.value = nickName;
          }
        } else {
          // Handle case when user data doesn't exist
          console.log("No Such Document");
          nameInput.value = tempName;
        }
        // Display user's email
        document.getElementById("emailBox").value = email; // Set the email value in the AccountBox input
      });
  }
});

// Listen for Save button click
saveButton.addEventListener("click", () => {
  const newName = nameInput.value;
  update(newName);

  // Show the popup
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.opacity = 1;
  }, 100); // Add a small delay for the opacity transition to take effect

  // Hide the popup after a certain duration (e.g., 3 seconds)
  setTimeout(() => {
    popup.style.opacity = 0;
    setTimeout(() => {
      popup.style.display = "none";
    }, 300);
  }, 3000);
});

//Updates User data in firebase
function update(newName) {
  var UserID = auth.currentUser.uid;
  db.collection("users")
    .doc(UserID)
    .update({
      fullName: newName,
    })
    .then(() => {
      console.log("Success!");
    })
    .catch((error) => {
      set();
    });
}

function set(newName) {
  var UserID = auth.currentUser.uid;
  db.collection("users")
    .doc(UserID)
    .set({
      fullName: newName,
    })
    .then(() => {
      console.log("Success!");
    })
    .catch((error) => {
      console.log("Error!");
    });
}

const logoutClick = document.querySelector(".logout");
logoutClick.addEventListener("click", function () {
  // toggle the type attribute
  signOut();
});

function signOut() {
  firebase.auth().signOut();
}

// //Displays User data on the website
// function show() {
//   var UserID = auth.currentUser.uid;

//   db.collection("User")
//     .doc(UserID)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         //console.log("Document data: ", doc.data());
//         document.getElementById("nameDisplay").innerHTML = doc.data().name;
//         document.getElementById("petNameDisplay").innerHTML =
//           doc.data().petName;
//         document.getElementById("coinsDisplay").innerHTML = doc.data().coins;
//       } else {
//         console.log("No Such Document");
//         /* Added this part so it removes from the UI the data that was displayed, because if you delete data and then
//           try to show data it gives the error but is still displaying the data that was displayed earlier and deleted */
//         document.getElementById("nameDisplay").innerHTML = "";
//         document.getElementById("petNameDisplay").innerHTML = "";
//         document.getElementById("coinsDisplay").innerHTML = "";
//       }
//     });
// }

// //Deletes User data from Firebase
// function deleteData() {
//   var UserID = auth.currentUser.uid;
//   db.collection("User")
//     .doc(UserID)
//     .delete()
//     .then(() => {
//       console.log("Document Successfully deleted!");
//     })
//     .catch((error) => {
//       console.error("Error Removing document ", error);
//     });
// }
