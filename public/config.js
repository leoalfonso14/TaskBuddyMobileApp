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
      if (doc.exists) {
        console.log("Error, something went wrong!");
      } else {
        set();
      }
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
          doc.data().PetName;
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

function forgotPassword() {
  //Show Forgot Password Modal
  console.log("Currently Working on this!");
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
