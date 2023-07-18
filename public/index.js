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

//Signs User up
function signUp() {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      alert("Signed Up");
      window.location.href = "./internalPage.html";
    });
}

//Logs User in
function login() {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    var user = userCredential.user;
    alert("Logged In " + user.email);
    window.location.href = "./internalPage.html";
  });
}

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

/*When the show password checkbox is clicked the following functions changes the input 
type to text so that it shows the password, if unchecked it gets turned back into password*/
function showPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

// Forgot Password Modal
// Get the modal
var modal = document.getElementById("forgotPasswordModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal - remove
forgotPasswordBtn.onclick = function () {
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




// WORK IN PROGRESS - IGNORE
function getParameterByName(name) {
  if (name !== "" && name !== null && name != undefined) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  } else {
    var arr = location.href.split("/");
    return arr[arr.length - 1];
  }
}

function resetBtn(mode) {
  // Get the one-time code from the query parameter.
  var actionCode = getParameterByName("oobCode");
  // (Optional) Get the continue URL from the query parameter if available.
  var continueUrl = getParameterByName("continueUrl") || "./internalPage.html";
  // (Optional) Get the language code if available.
  var lang = getParameterByName("lang") || "en";

  // Handle the user management action.
  switch (mode) {
    case "resetPassword":
      // Display reset password handler and UI.
      handleResetPassword(auth, actionCode, continueUrl, lang);
      break;
    case "recoverEmail":
      // Display email recovery handler and UI.
      handleRecoverEmail(auth, actionCode, lang);
      break;
    case "verifyEmail":
      // Display email verification handler and UI.
      handleVerifyEmail(auth, actionCode, continueUrl, lang);
      break;
    default:
      // Error: invalid mode.
      console.log("Invalid Mode");
  }
}

function handleResetPassword(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.

  // Verify the password reset code is valid.
  auth
    .verifyPasswordResetCode(actionCode)
    .then((email) => {
      var accountEmail = email;

      // TODO: Show the reset screen with the user's email and ask the user for
      // the new password.
      var newPassword = "...";

      // Save the new password.
      auth
        .confirmPasswordReset(actionCode, newPassword)
        .then((resp) => {
          auth
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              var user = userCredential.user;
              alert("Logged In " + user.email);
              window.location.href = "./internalPage.html";
            });
        })
        .catch((error) => {
          // Error occurred during confirmation. The code might have expired or the
          // password is too weak.
          console.log("Error resetting password");
          alert("This is a work in progress"); // TODO: Remove this when working
          modal.style.display = "none";
        });
    })
    .catch((error) => {
      // Invalid or expired action code. Ask user to try to reset the password
      // again.
      console.log("Error resetting password - try again");
      alert("This is a work in progress"); // TODO: Remove this when working
      modal.style.display = "none";
    });
}

function handleRecoverEmail(auth, actionCode, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  var restoredEmail = null;
  // Confirm the action code is valid.
  auth
    .checkActionCode(actionCode)
    .then((info) => {
      // Get the restored email address.
      restoredEmail = info["data"]["email"];

      // Revert to the old email.
      return auth.applyActionCode(actionCode);
    })
    .then(() => {
      // Account email reverted to restoredEmail

      // TODO: Display a confirmation message to the user.

      // You might also want to give the user the option to reset their password
      // in case the account was compromised:
      auth
        .sendPasswordResetEmail(restoredEmail)
        .then(() => {
          // Password reset confirmation sent. Ask user to check their email.
        })
        .catch((error) => {
          // Error encountered while sending password reset code.
        });
    })
    .catch((error) => {
      // Invalid code.
    });
}

function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  // Try to apply the email verification code.
  auth
    .applyActionCode(actionCode)
    .then((resp) => {
      // Email address has been verified.
      // TODO: Display a confirmation message to the user.
      // You could also provide the user with a link back to the app.
      // TODO: If a continue URL is available, display a button which on
      // click redirects the user back to the app via continueUrl with
      // additional state determined from that URL's parameters.
    })
    .catch((error) => {
      // Code is invalid or expired. Ask the user to verify their email address
      // again.
    });
}

// Generating Password Reset Link
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for
  // this URL must be whitelisted in the Firebase Console.
  url: "https://taskbuddy-9c3f6.web.app/",
  // This must be true for email link sign-in.
  handleCodeInApp: false, // for now we do not have an app
};

// function resetBtn() {
//   console.log("Currently Working on this!");
//   let emailReset = document.getElementById("emailReset").value;
//   console.log("userEmail", emailReset);
//   auth
//     .generatePasswordResetLink(emailReset, actionCodeSettings)
//     .then((link) => {
//       // Construct password reset email template, embed the link and send
//       // using custom SMTP server.
//       return sendCustomPasswordResetEmail(emailReset, displayName, link);
//     })
//     .catch((error) => {
//       // Some error occurred.
//       console.log("Error occurred: ", error);
//     });
// }
