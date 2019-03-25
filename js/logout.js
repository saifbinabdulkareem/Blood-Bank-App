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


/	

function donateBlood() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("accept-btn").style.display = "none";
    document.getElementById("donate-btn").style.display = "none";
}
function acceptBlood() {
    document.getElementById("myFormA").style.display = "block";
    document.getElementById("donate-btn").style.display = "none";
    document.getElementById("accept-btn").style.display = "none";
}
function closeBtn() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("accept-btn").style.display = "block";
    document.getElementById("accept-btn").style.display = "inline-block";
    document.getElementById("donate-btn").style.display = "block";
    document.getElementById("donate-btn").style.display = "inline-block";
}
function closeBtnA() {
    document.getElementById("myFormA").style.display = "none";
    document.getElementById("accept-btn").style.display = "block";
    document.getElementById("accept-btn").style.display = "inline-block";
    document.getElementById("donate-btn").style.display = "block";
    document.getElementById("donate-btn").style.display = "inline-block";

}

function submitInfo() {
    var nameD = document.getElementById("nameD").value;
    var genderD = document.getElementById("genderD").value;
    var ageD = document.getElementById("ageD").value;
    var bloodGroupD = document.getElementById("blood-groupD").value;
    var weightD = document.getElementById("weightD").value;
    var addressD = document.getElementById("addressD").value;
    var emailD = document.getElementById("emailD").value;
    var cnicD = document.getElementById("cnicD").value;
    var phoneD = document.getElementById("phoneD").value;

    let userObjD = {
        nameD,
        genderD,
        ageD,
        bloodGroupD,
        weightD,
        addressD,
        emailD,
        cnicD,
        phoneD,
    }
    firebase.database().ref('Donor Info/' + bloodGroupD).set(userObjD)
        .then(() => {
            swal({
                title: "Request Submitted",
                text: "Thanks for donation",
                icon: "success",
                button: "OK",
            })
            document.getElementById("myForm").style.display = "none";
            document.getElementById("accept-btn").style.display = "block";
            document.getElementById("accept-btn").style.display = "inline-block";
            document.getElementById("donate-btn").style.display = "block";
            document.getElementById("donate-btn").style.display = "inline-block";
            document.getElementById("nameD").value = "";
            document.getElementById("genderD").value = "";;
            document.getElementById("ageD").value = "";;
            document.getElementById("blood-groupD").value = "";;
            document.getElementById("weightD").value = "";;
            document.getElementById("addressD").value = "";;
            document.getElementById("emailD").value = "";;
            document.getElementById("cnicD").value = "";;
            document.getElementById("phoneD").value = "";;
        })
    var database = firebase.database();
    console.log(database)
    var ref = database.ref("users");
    ref.on('value', gotData, errData);

    function gotData(data) {
        console.log(data);
    }

    function errData(error) {
        console.log("eroor")
        console.log(err);
    }
}
function submitInfoA() {
    var nameA = document.getElementById("nameA").value;
    var genderA = document.getElementById("genderA").value;
    var ageA = document.getElementById("ageA").value;
    var bloodGroupA = document.getElementById("blood-groupA").value;
    var weightA = document.getElementById("weightA").value;
    var addressA = document.getElementById("addressA").value;
    var emailA = document.getElementById("emailA").value;
    var cnicA = document.getElementById("cnicA").value;
    var phoneA = document.getElementById("phoneA").value;

    let userObjA = {
        nameA,
        genderA,
        ageA,
        bloodGroupA,
        weightA,
        addressA,
        emailA,
        cnicA,
        phoneA,
    }
    firebase.database().ref('Acceptor Info/' + bloodGroupA).set(userObjA)
        .then(() => {
            swal({
                title: "Welcome to Blood Bank",
                text: "Thanks for choosng us",
                icon: "success",
                button: "OK",
            })
            document.getElementById("myFormA").style.display = "none";
            document.getElementById("accept-btn").style.display = "none";
            document.getElementById("donate-btn").style.display = "none";
            document.getElementById("nameA").value = "";
            document.getElementById("genderA").value = "";;
            document.getElementById("ageA").value = "";;
            document.getElementById("blood-groupA").value = "";;
            document.getElementById("weightA").value = "";;
            document.getElementById("addressA").value = "";;
            document.getElementById("emailA").value = "";;
            document.getElementById("cnicA").value = "";;
            document.getElementById("phoneA").value = "";;
        })
}


function logOut() {
    firebase.auth().signOut()
        .then(() => {
            localStorage.setItem("userAuth", JSON.stringify({ user: 'null' }))
            // Sign-out successful.
            window.location = '../pages/logIn.html'
        }).catch((error) => {
            // An error happened.
            let errorMessage = error.message;
            swal({
                title: "Error",
                text: errorMessage,
                icon: "error",
                button: "Ok",
            });
        });



}

function createPost() {
    let userId = firebase.auth().currentUser.uid;

    if (userId !== null || userId !== undefined) {
        let name = document.getElementById('usr').value
        let mes = document.getElementById('mes').value
        let postObj = {
            name,
            mes
        }
        let myPost = document.getElementById("myPost")
        firebase.database().ref("posts/" + userId)
            .push(postObj)
            .then((suc) => {
                firebase.database().ref("posts/" + userId)
                    .once("value", (data) => {
                        let userData = data.val()
                        let array = []
                        console.log(userData)
                        for (var key in userData) {
                            array.push(userData[key])
                            // myPost.innerHTML +=
                            // `
                            // <div class="card bg-primary text-white">
                            //     <div class="card-body">${userData[key].name}</div>
                            //     <div class="card-body">${userData[key].mes}</div>
                            // </div>
                            // `
                        }
                        console.log(array)
                        array.map((v, i) => {
                            myPost.innerHTML +=
                                `
                                <div class="card bg-primary text-white">
                                <div class="card-body">${v.name}</div>
                                <div class="card-body">${v.mes}</div>
                                </div>
                            `
                        })
                    })
            })
            .catch((error) => {
                let errorMessage = error.message;
                swal({
                    title: "Error",
                    text: errorMessage,
                    icon: "error",
                    button: "Ok",
                });
            })
    } else {
        swal({
            title: "Error",
            text: "please Login First",
            icon: "error",
            button: "Ok",
        });
    }
}
