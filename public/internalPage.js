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

//DISPLAY LOADER
// CHECK IF USER IS LOGGED IN - IF NOT SEND TO REGISTRATION/SIGNIN PAGE
//IF LOGGED IN THEN DISPLAY PAGE WITH USERS STUFF

//Sets User data in firebase
function set() {
  var name = document.getElementById("name").value;
  var petName = document.getElementById("petName").value;
  var coins = document.getElementById("coins").value;
  var UserID = auth.currentUser.uid;

  db.collection("User")
    .doc(UserID)
    .set({
      name: name,
      petName: petName,
      coins: coins,
    })
    .then(() => {
      console.log("Success!");
    })
    .catch((error) => {
      console.log("Error!");
    });
}

//Updates User data in firebase
function update() {
  var name = document.getElementById("name").value;
  var petName = document.getElementById("petName").value;
  var coins = document.getElementById("coins").value;
  var UserID = auth.currentUser.uid;

  db.collection("User")
    .doc(UserID)
    .update({
      name: name,
      petName: petName,
      coins: coins,
    })
    .then(() => {
      console.log("Success!");
    })
    .catch((error) => {
      set();
    });
}

//Displays User data on the website
function show() {
  var UserID = auth.currentUser.uid;

  db.collection("User")
    .doc(UserID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        //console.log("Document data: ", doc.data());
        document.getElementById("nameDisplay").innerHTML = doc.data().name;
        document.getElementById("petNameDisplay").innerHTML =
          doc.data().petName;
        document.getElementById("coinsDisplay").innerHTML = doc.data().coins;
      } else {
        console.log("No Such Document");
        /* Added this part so it removes from the UI the data that was displayed, because if you delete data and then 
          try to show data it gives the error but is still displaying the data that was displayed earlier and deleted */
        document.getElementById("nameDisplay").innerHTML = "";
        document.getElementById("petNameDisplay").innerHTML = "";
        document.getElementById("coinsDisplay").innerHTML = "";
      }
    });
}

//Deletes User data from Firebase
function deleteData() {
  var UserID = auth.currentUser.uid;
  db.collection("User")
    .doc(UserID)
    .delete()
    .then(() => {
      console.log("Document Successfully deleted!");
    })
    .catch((error) => {
      console.error("Error Removing document ", error);
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log();
      window.location.href = "./index.html";
    })
    .catch((error) => {
      // An error happened.
    });
}

// Forgot Password Modal
// Get the modal
function openModal() {
  var modal = document.getElementById("forgotPasswordModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal - remove
  PasswordResetBtn.onclick = function () {
    // Get the button that opens the modal - remove
    var PasswordResetBtn = document.getElementById("forgotPasswordBtn");
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Generating Password Reset Link
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for
  // this URL must be whitelisted in the Firebase Console.
  url: "https://taskbuddy-9c3f6.web.app/",
  // This must be true for email link sign-in.
  handleCodeInApp: false, // for now we do not have an app
};

function resetBtn() {
  console.log("Currently Working on this!");
  let emailReset = document.getElementById("emailReset").value;
  console.log("userEmail", emailReset);
  getAuth()
    .generatePasswordResetLink(emailReset, actionCodeSettings)
    .then((link) => {
      // Construct password reset email template, embed the link and send
      // using custom SMTP server.
      return sendCustomPasswordResetEmail(emailReset, displayName, link);
    })
    .catch((error) => {
      // Some error occurred.
      console.log("Error occurred: ", error);
    });
}
