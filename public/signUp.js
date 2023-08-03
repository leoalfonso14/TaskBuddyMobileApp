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
  email = document.getElementById("emailBox").value;
  password = document.getElementById("passwordBox").value;
  confirmPassword = document.getElementById("passwordBoxConfirm").value;

  if (password === confirmPassword) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        // alert("Signed Up");
        window.location.href = "./internalPage.html";
      });
  } else {
    alert("Passwords do not match. Please try again");
  }
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

const togglePassword2 = document.querySelector("#togglePassword2");
togglePassword2.addEventListener("click", function () {
  // toggle the type attribute
  const type2 =
    passwordBoxConfirm.getAttribute("type") === "password"
      ? "text"
      : "password";
  passwordBoxConfirm.setAttribute("type", type2);

  // toggle the icon
  this.classList.toggle("bi-eye");
});
