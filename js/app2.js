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
  
  function dSignUp() {
    var name = document.getElementById("full-name").value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var bloodGroup = document.getElementById('bg-selectore').value;
    var phoneNumber = document.getElementById('phone-number').value;
    var password = document.getElementById('password').value;
  
    console.log(name)
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        let userObj = {
          email,
          name,
          address,
          age,
          phoneNumber
        }
        let userUid = firebase.auth().currentUser.uid
        firebase
          .database()
          .ref('Donor/' + userUid)
          .set(userObj)
          .then(() => {
            swal({
              icon: "success",
              title: "You've been registered",
              text: "Thank for registering with us!"
            })
            window.location = '../pages/login.html'
          })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
      });
  }
  
  function logIn() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((success) => {
        // console.log(success)
        localStorage.setItem("userAuth", JSON.stringify(success))
        window.location = '../pages/home.html'
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
      });
  }
  