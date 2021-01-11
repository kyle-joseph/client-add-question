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

// function addData() {
//     db.collection("employee")
//         .add({
//             first: "Ada",
//             last: "Lovelace",
//             born: 1815,
//         })
//         .then(function (docRef) {
//             console.log("Document written with ID: ", docRef.id);
//         })
//         .catch(function (error) {
//             console.error("Error adding document: ", error);
//         });
// }

var currentDisaster = "Earthquake";
fetchDataByCategory(currentDisaster);

function fetchDataByCategory(category) {
    currentDisaster = category;
    var disaster;
    if (currentDisaster == "Volcanic Eruption") {
        disaster = currentDisaster.replace(" Eruption", "").toLowerCase();
    } else {
        disaster = currentDisaster.toLowerCase();
    }

    console.log(disaster);

    var tbody = document.querySelector("#nav-" + disaster + " table tbody");
    tbody.innerHTML = "";

    db.collection("questions")
        .where("category", "==", currentDisaster)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                tbody.innerHTML += `
                <tr class="content">
                    <td>${doc.data()["question"]}</td>
                    <td>${doc.data()["category"]}</td>
                    <td>
                        <a href="#"><i class="fas fa-edit"></i></a>
                        <a href="#"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
                `;
            });
            fetchById();
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

function fetchById() {
    var docRef = db.collection("questions").doc("LzmwGtB56L3nYcZO4bR6");

    docRef
        .get()
        .then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
        });
}

function insertData() {}
