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
const togglePassword = document.querySelector("#togglePassword");
togglePassword.addEventListener("click", function () {
  // toggle the type attribute
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  
  // toggle the icon
  this.classList.toggle("bi-eye");
});

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
  auth.sendPasswordResetEmail(emailReset).then(() => {
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
