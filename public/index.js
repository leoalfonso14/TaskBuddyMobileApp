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
      console.log("Error!", error);
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
// Generating Password Reset Link
// The function runs when the reset button is clicked
function resetBtn() {
  let emailReset = document.getElementById("emailReset").value;
  // Sends the email with code

  // ENTER CODE TO VERIFY SCREEN SHOWS UP

  // Display the password change screen

  //When user clicks reset in this new screen it will change the user's password

  auth
    .generatePasswordResetLink(emailReset, actionCodeSettings)
    .then((link) => {
      // Construct password reset email template, embed the link and send
      // using custom SMTP server.
      console.log("link", link);
      return sendCustomPasswordResetEmail(userEmail, displayName, link);
    })
    .catch((error) => {
      // Some error occurred.
      console.log("Error");
    });
}

// MAYBE
// const actionCodeSettings = {
//   // URL you want to redirect back to. The domain (www.example.com) for
//   // this URL must be whitelisted in the Firebase Console.
//   url: "https://taskbuddy-9c3f6.web.app/",
//   // This must be true for email link sign-in.
//   handleCodeInApp: false, // for now we do not have an app
// };

// function getParameterByName(key) {
//   console.log("location:", window.location);
//   var search = window.location.search;
//   console.log("search: ", search);
//   let i = search.search(key);
//   let size = i.legnth; // maybe if search[i] != "" does not work
//   let result1 = "";
//   let result2 = "";
//   console.log("size", size);
//   console.log("search[i]", search[i]);
//   do {
//     //store from start of key until right before the & or end of search in result1 - example: "code=code"
//     result1 += search[i];
//     i++;
//   } while (search[i] != "&" || i != size - 1);

//   //then from "code=code" get the part after the = sign and assign it to result2
//   let j = search.search("=");
//   do {
//     //store from start of key until right before the & or end of search in result1 - example: "code=code"
//     result2 += search[j + 1];
//     j++;
//   } while (search[j] != "&" || j != size - 1);

//   console.log("result2", result2);
//   return result2;
// }

// function handleResetPassword(auth, actionCode, continueUrl) {
//   // Localize the UI to the selected language as determined by the lang
//   // parameter.

//   // Verify the password reset code is valid.
//   auth
//     .verifyPasswordResetCode(actionCode)
//     .then((email) => {
//       var accountEmail = email;

//       // TODO: Show the reset screen with the user's email and ask the user for the new password.
//       window.location.href = "./newPassword.html";
//       var newPassword = document.getElementById("newPassword").value;

//       // Save the new password. ??? Button needed ??
//       auth
//         .confirmPasswordReset(actionCode, newPassword)
//         .then((resp) => {
//           // Password reset has been confirmed and new password updated.

//           // Sign-in the user directly
//           auth.signInWithEmailAndPassword(accountEmail, newPassword);
//           window.location.href = "./internalPage.html";
//         })
//         .catch((error) => {
//           // Error occurred during confirmation. The code might have expired or the
//           // password is too weak.
//           console.log("Error changing password");
//         });
//     })
//     .catch((error) => {
//       // Invalid or expired action code. Ask user to try to reset the password
//       // again.
//       console.log("Error with code");
//     });
// }

// function resetBtn() {
//   // Get the action to complete.
//   var mode = getParameterByName("mode");
//   // Get the one-time code from the query parameter.
//   var actionCode = getParameterByName("oobCode");
//   // (Optional) Get the continue URL from the query parameter if available.
//   var continueUrl = "https://taskbuddy-9c3f6.web.app/";
//   // (Optional) Get the language code if available.
//   //var lang = getParameterByName("lang") || "en";

//   // Handle the user management action.
//   switch (mode) {
//     case "resetPassword":
//       // Display reset password handler and UI.
//       console.log("Here2");
//       handleResetPassword(auth, actionCode, continueUrl, lang);
//       break;
//     case "recoverEmail":
//       // Display email recovery handler and UI.
//       handleRecoverEmail(auth, actionCode, lang);
//       break;
//     case "verifyEmail":
//       // Display email verification handler and UI.
//       handleVerifyEmail(auth, actionCode, continueUrl, lang);
//       break;
//     default:
//     // Error: invalid mode.
//   }
// }
