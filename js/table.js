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

var question = document.getElementById("question");
var a = document.getElementById("A");
var b = document.getElementById("B");
var c = document.getElementById("C");
var d = document.getElementById("D");
var category = document.getElementsByName("category");
var correct = document.getElementsByName("correct");

var currentId = "";

var currentDisaster = "Earthquake";
fetchDataByCategory(currentDisaster);

var addForm = document.querySelector("#add-form");
addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Not Submitted");
    updateQuestion();
});

function hideAlert() {
    $(".msgSuccess").hide();
    $(".msgError").hide();
    $(".msgDeleted").hide();
}

hideAlert();

function fetchDataByCategory(category) {
    currentDisaster = category;
    var disaster;
    if (currentDisaster == "Volcanic Eruption") {
        disaster = currentDisaster.replace(" Eruption", "").toLowerCase();
    } else {
        disaster = currentDisaster.toLowerCase();
    }

    // console.log(disaster);

    var tbody = document.querySelector("#nav-" + disaster + " table tbody");
    tbody.innerHTML = "";

    db.collection("questions")
        .where("category", "==", currentDisaster)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                tbody.innerHTML += `
                <tr class="content">
                    <td>${doc.data()["question"]}</td>
                    <td>${doc.data()["category"]}</td>
                    <td>
                        <a href="#" data-toggle="modal" data-target="#exampleModal" onclick="fetchById('${
                            doc.id
                        }')"><i class="fas fa-edit"></i></a>
                        <a href="#" onclick="deleteQuestion('${
                            doc.id
                        }')"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
                `;
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

function fetchById(id) {
    currentId = id;
    var docRef = db.collection("questions").doc(id);

    docRef
        .get()
        .then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                editModalData(doc);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
        });
}

function editModalData(doc) {
    question.value = doc.data()["question"];
    a.value = doc.data()["a"];
    b.value = doc.data()["b"];
    c.value = doc.data()["c"];
    d.value = doc.data()["d"];
    showEditCategory(doc.data()["category"]);
    showEditCorrect(doc.data());
}

function showEditCategory(cat) {
    category.forEach((item) => {
        if (item.value == cat) {
            item.checked = true;
        } else {
            item.checked = false;
        }
    });
}
function showEditCorrect(cor) {
    var corr = cor["correct"];
    console.log(corr);

    correct.forEach((item) => {
        if (cor[item.value.toLowerCase()] == corr) {
            item.checked = true;
        } else {
            item.checked = false;
        }
    });
}

function getCategory() {
    var cat = null;
    category.forEach((item) => {
        if (item.checked) {
            cat = item.value;
        }
    });

    return cat;
}
function getCorrect() {
    var cor = null;
    correct.forEach((item) => {
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
    for (var i = 0; i < category.length; i++) {
        if (i == 0) {
            category[i].checked = true;
        } else {
            category[i].checked = false;
        }
    }
}
function clearCorrect() {
    for (var i = 0; i < correct.length; i++) {
        if (i == 0) {
            correct[i].checked = true;
        } else {
            correct[i].checked = false;
        }
    }
}

function updateQuestion() {
    var cor = getCorrect();
    var cat = getCategory();

    switch (cor) {
        case "A":
            cor = a.value;
            break;
        case "B":
            cor = b.value;
            break;
        case "C":
            cor = c.value;
            break;
        case "D":
            cor = d.value;
            break;
    }

    console.log("Clicked save");

    db.collection("questions")
        .doc(currentId)
        .update({
            question: question.value,
            a: a.value,
            b: b.value,
            c: c.value,
            d: d.value,
            correct: cor,
            category: cat,
        })
        .then(function () {
            console.log("Document successfully updated!");
            $(".msgSuccess").show();
            fetchDataByCategory(currentDisaster);
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
            $(".msgError").show();
        });
    $("#exampleModal").modal("toggle");
    clearInputs();
    clearCategory();
    clearCorrect();
}

function deleteQuestion(id) {
    if (confirm("Do you really want to delete question?")) {
        db.collection("questions")
            .doc(id)
            .delete()
            .then(function () {
                console.log("Document successfully deleted!");
                $(".msgDeleted").show();
                fetchDataByCategory(currentDisaster);
            })
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }
}
