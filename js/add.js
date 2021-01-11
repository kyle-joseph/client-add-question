var firebaseConfig = {
    apiKey: "AIzaSyD67WsmjfSeE174oaHs5Yq8aiEBX5ieQek",
    authDomain: "ndia-app-7e647.firebaseapp.com",
    projectId: "ndia-app-7e647",
    storageBucket: "ndia-app-7e647.appspot.com",
    messagingSenderId: "424587547380",
    appId: "1:424587547380:web:239767402914741477c4a1",
    measurementId: "G-2S8569LXZD",
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

var addForm = document.querySelector("#add-form");
addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Not Submitted");
    insertData();
});

var question = document.getElementById("question");
var a = document.getElementById("A");
var b = document.getElementById("B");
var c = document.getElementById("C");
var d = document.getElementById("D");
var category;
var correct;
var msg = document.querySelector(".message");

function hideAlert() {
    $(".msgSuccess").hide();
    $(".msgError").hide();
}

hideAlert();

function getCategory() {
    var categ = document.getElementsByName("category");
    var cat = null;
    categ.forEach((item) => {
        if (item.checked) {
            cat = item.value;
        }
    });

    return cat;
}
function getCorrect() {
    var corr = document.getElementsByName("correct");
    var cor = null;
    corr.forEach((item) => {
        if (item.checked) {
            cor = item.value;
        }
    });

    return cor;
}
function clearInputs() {
    question.value = "";
    a.value = "";
    b.value = "";
    c.value = "";
    d.value = "";
}
function clearCategory() {
    var categ = document.getElementsByName("category");
    for (var i = 0; i < categ.length; i++) {
        if (i == 0) {
            categ[i].checked = true;
        } else {
            categ[i].checked = false;
        }
    }
}
function clearCorrect() {
    var corr = document.getElementsByName("correct");
    for (var i = 0; i < corr.length; i++) {
        if (i == 0) {
            corr[i].checked = true;
        } else {
            corr[i].checked = false;
        }
    }
}

function insertData() {
    category = getCategory();
    correct = getCorrect();

    switch (correct) {
        case "A":
            correct = a.value;
            break;
        case "B":
            correct = b.value;
            break;
        case "C":
            correct = c.value;
            break;
        case "D":
            correct = d.value;
            break;
    }

    console.log(question.value);
    console.log(a.value);
    console.log(b.value);
    console.log(c.value);
    console.log(d.value);
    console.log(correct);
    console.log(category);

    db.collection("questions")
        .add({
            question: question.value,
            a: a.value,
            b: b.value,
            c: c.value,
            d: d.value,
            correct: correct,
            category: category,
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            $(".msgSuccess").show();
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            $(".msgError").show();
        });

    // $(".msgSuccess").show();
    clearInputs();
    clearCategory();
    clearCorrect();
}
