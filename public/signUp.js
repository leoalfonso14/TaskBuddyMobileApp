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

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      alert("Signed Up");
      window.location.href = "./internalPage.html";
    });
}
