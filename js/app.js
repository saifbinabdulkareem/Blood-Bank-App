
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDVFFEYw10YGLjgeENlL1ZfRLmyqas7hvE",
  authDomain: "realtimedbsw.firebaseapp.com",
  databaseURL: "https://realtimedbsw.firebaseio.com",
  projectId: "realtimedbsw",
  storageBucket: "realtimedbsw.appspot.com",
  messagingSenderId: "280126593937"
};

firebase.initializeApp(config);

function signUp(){
  var name = document.getElementById("full-name").value;
  var email = document.getElementById('mail').value;
  var address = document.getElementById('address').value;
  var age = document.getElementById('age').value;
  var gen = document.getElementById("gender").value;
  var phoneNumber = document.getElementById('phone-number').value;
  var password = document.getElementById('pwd').value;

  console.log({name, email, address})

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      let userObj = {
        name,
        email,
        address,
        age,
        gen,
        phoneNumber
      }
      let userUid = firebase.auth().currentUser.uid
      
      firebase.database().ref('users/' + userUid).set(userObj)
        .then(() => {

          window.location = '../pages/login.html'
        })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      swal({
        title: "Error",
        text: errorMessage,
        icon: "warning",
        button: "Ok"
      })
    });
}

function logIn() {
  var email = document.getElementById("mail").value;
  var password = document.getElementById("pwd").value;

  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((success) => {
      console.log(success)
      localStorage.setItem("userAuth", JSON.stringify(success))
      window.location = '../pages/home.html'
      // localStorage.setItem("user",success.user.uid)
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      // ...
    });
}


