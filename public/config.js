  //Firebase Config Information
const firebaseConfig = {
    apiKey: "AIzaSyAW6xhxT_ycudLcNJL9OIt6Y5AAuzky-Po",
    authDomain: "taskbuddy-9c3f6.firebaseapp.com",
    projectId: "taskbuddy-9c3f6",
    storageBucket: "taskbuddy-9c3f6.appspot.com",
    messagingSenderId: "326763319334",
    appId: "1:326763319334:web:5aee080b91f1d7d85756e7",
    measurementId: "G-0KCSZMXRL0"
  };

  //Initialize firebase, auth, and our db references.
  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.firestore();

  //Signs User up
  function signUp(){

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email,password).then((userCredential) => {
            var user = userCredential.user;
            alert("Signed Up");
    })

  }

  //Logs User in
  function login(){

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email,password).then ((userCredential) => {
        var user=userCredential.user
        alert("Logged In" + user.email)

    })
  }

  //Sets User data in firebase
  function set(){
    var Studentname = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var id = document.getElementById('id').value;
    var semester = document.getElementById('semester').value;
    var UserID = auth.currentUser.uid;

    db.collection("User").doc(UserID).set({
      Studentname: Studentname,
      age: age,
      id: id,
      semester: firebase.firestore.FieldValue.arrayUnion(semester),
    }).then(()=>{
      console.log("Success!")
    }).catch((error) => {
      console.log("Error!")
    });
  }

  //Updates User data in firebase
  function update(){
    var Studentname = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var id = document.getElementById('id').value;
    var semester = document.getElementById('semester').value;
    var UserID = auth.currentUser.uid;

    db.collection("User").doc(UserID).update({
      Studentname: Studentname,
      age: age,
      id: id,
      semester: firebase.firestore.FieldValue.arrayUnion(semester),
    }).then(()=>{
      console.log("Success!")
    }).catch((error) => {
      console.log("Error!")
    });
  }

  //Displays User data on the website
  function show(){
    var UserID = auth.currentUser.uid;

    db.collection("User").doc(UserID).get().then((doc) => {
      if (doc.exists) {

        console.log("Document data: ", doc.data());

        document.getElementById('nameDisplay').innerHTML = doc.data().Studentname;
        document.getElementById('ageDisplay').innerHTML = doc.data().age;
        document.getElementById('idDisplay').innerHTML = doc.data().id;
        document.getElementById('semesterDisplay').innerHTML = doc.data().semester;

      } else{
        console.log("No Such Document");
      }
     

    })
  }

  //Deletes User data from Firebase
  function deleteData() {

    var UserID = auth.currentUser.uid;
    db.collection("User").doc(UserID).delete().then(() => {
      console.log("Document Successfully deleted!");
    }).catch((error) => {console.error("Error Removing document ", error)})

  }