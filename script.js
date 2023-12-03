function validerForum() {
    var nomEl = document.getElementById("name").value;
    var ageEL = document.getElementById("age").value;
    var adresseEl = document.getElementById("adresse").value;
    var emailEl = document.getElementById("email").value;

    if (nomEl == "") {
        alert("Entrer votre nom");
        return false;
    }


    if (ageEL == "") {
        alert("Entrer votre age");
        return false
    }
    else if (ageEL < 18) {
        alert("Invalid Age veuillez saisir un nombre correct superieur à 18 ans");
        return false;
    }


    if (adresseEl == "") {
        alert("Entrer votre adresse");
        return false;
    }

    if (emailEl == "") {
        alert("Entrer votre email");
        return false
    }
    else if (!emailEl.includes("@")) {
        alert("Invalide Email");
        return false;
    }
    else if (!emailEl.includes(".")) {
        alert("Invalide Email");
        return false;
    }
    return true;
}
function voirData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>"
        html += "<td>" + element.Nom + "</td>"
        html += "<td>" + element.Age + "</td>"
        html += "<td>" + element.Adresse + "</td>"
        html += "<td>" + element.Email + "</td>"
        html += "<td>" + '<button onclick="supprimerData(' +
            index +
            ')" class="btn btn-danger" id="supprimer">Supprimer</button><button onclick = "modifierData(' +
            index +
            ')" class="btn btn-modifier" id="modifier">Modifier</button ></td>';
        html += "</tr>";
    });
    

    document.querySelector("#crudTable tbody").innerHTML = html
    document.querySelector("#supprimer").style.backgroundColor = "red"
    document.querySelector("#modifier").style.backgroundColor = "green"
    document.querySelector("#supprimer").style.borderRadius = "10px"
    document.querySelector("#modifier").style.borderRadius = "10px"
    document.querySelector("#modifier").style.width = "75px"

}

document.onload = voirData();

function ajouterData() {

    if (validerForum() == true) {
        var nomEl = document.getElementById("name").value;
        var ageEL = document.getElementById("age").value;
        var adresseEl = document.getElementById("adresse").value;
        var emailEl = document.getElementById("email").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            Nom: nomEl,
            Age: ageEL,
            Adresse: adresseEl,
            Email: emailEl
        })

        localStorage.setItem("peopleList", JSON.stringify
            (peopleList));
        voirData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("adresse").value = "";
        document.getElementById("email").value = "";


    }
}

function supprimerData(index) {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify
        (peopleList));
    voirData();
}

function modifierData(index) {

    document.getElementById("submit").style.border = "none"
    document.getElementById("Update").style.border = "block"

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].Nom;
    document.getElementById("age").value = peopleList[index].Age;
    document.getElementById("adresse").value = peopleList[index].Adresse;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function () {
        if (validerForum() == true) {
            peopleList[index].nom = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].adresse = document.getElementById("adresse").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            voirData()

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("adresse").value = "";
            document.getElementById("email").value = "";

            document.getElementById("submit").style.border = "block"
            document.getElementById("Update").style.border = "none"
        }

    }

}