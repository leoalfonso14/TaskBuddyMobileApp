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

//Logs User in
function signIn() {
  email = document.getElementById("emailBox").value;
  password = document.getElementById("passwordBox").value;

  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    var user = userCredential.user;
    alert("Logged In " + user.email);
    window.location.href = "./internalPage.html";
  });
}

//GoToSignUp
function goToSignUp() {
  console.log("Redirecting to SignUpPage");
  window.location.href = "./signUp.html";
}

/*When the show password icon is clicked the following functions changes the input 
  type to text so that it shows the password, if unchecked it gets turned back into password*/
const togglePassword = document.querySelector("#togglePassword");
togglePassword.addEventListener("click", function () {
  // toggle the type attribute
  const type =
    passwordBox.getAttribute("type") === "password" ? "text" : "password";
  passwordBox.setAttribute("type", type);

  // toggle the icon
  this.classList.toggle("bi-eye");
});

function showPassword() {
  console.log("here");
  var x = document.getElementById("passwordBox");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

// Forgot Password Modal
// Get the modal
var passwordModal = document.getElementById("forgotPasswordModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal - remove
forgotPasswordBtn.onclick = function () {
  // Get the button that opens the modal - remove
  passwordModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  passwordModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == passwordModal) {
    passwordModal.style.display = "none";
  }
};

// Generating Password Reset Link
// The function runs when the reset button is clicked
function resetBtn() {
  let emailReset = document.getElementById("emailReset").value;
  auth
    .sendPasswordResetEmail(emailReset)
    .then(() => {
      //Sends email to user
      console.log("Email sent!");
      passwordModal.style.display = "none";
      alert("Email was sent!");
    })
    .catch((error) => {
      // Some error occurred.
      console.log("Error", error);
    });
}
