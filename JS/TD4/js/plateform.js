import { morpion } from "./morpion.js";
import { morpionComplet } from "./morpionComplet.js";

let morp;

let isEmpty = (string) => {
    return string === '' || string === undefined;
}

let validate = () => {
    let j1 = document.getElementById("J1").value;
    let j2 = document.getElementById("J2").value;

    if (isEmpty(j1) || isEmpty(j2) || j1 === j2)
        alert("Les champs ne sont pas remplis, invalide ou les mêmes.");
    else {
        let taille = parseInt((document.querySelector('input[name="size"]:checked').value));
        let choix;

        if (document.getElementById("x3").checked) {
            //console.log("Morpion basique crée");
            morp = new morpion(j1, j2, taille, choix);
        } else {
            //console.log("Morpion complet crée");
            morp = new morpionComplet(j1, j2, taille, choix);
        }

        let form = document.getElementById("Form");
        form.hidden = true;
        let receptacle = document.getElementById("receptacle");
        receptacle.hidden = false;
        //console.log(morp.joueur1);
        showMorpion();
        showScore();
    }

}

let showScore = () => {
    let info = document.getElementById("info");
    info.hidden = false;
    info.innerHTML = '';
    info.innerText = "Score de " + morp.joueur1 + " : " + morp.score[morp.joueur1] + "   Score de " + morp.joueur2 + " : " + morp.score[morp.joueur2];
}

let disableButton = () => {
    let receptacle = document.getElementById("receptacle")
    receptacle.querySelectorAll("button").forEach(element => {
        element.disabled = true;
    });
}

let restart = () => {
    morp.recommence();
    showScore();
    showMorpion();
}

let showMenu = () => {
    let form = document.getElementById("Form");
    let receptacle = document.getElementById("receptacle");
    let info = document.getElementById("info");
    form.hidden = false;
    receptacle.hidden = true;
    info.innerHTML = '';

}


let victoire = () => {
    showEnd("Bien jouez a : " + morp.joueurActuel);
}

let egalite = () => {
    showEnd("Egalité !");
}

let showEnd = (msg) => {
    let info = document.getElementById("info");
    let btnRejouez = document.createElement("button");
    let btnRetour = document.createElement("button");
    let msgVictoire = document.createElement("p");
    msgVictoire.innerText = msg;
    btnRejouez.innerText = "Rejouez";
    btnRejouez.addEventListener("click", restart);
    btnRetour.innerText = "Retour";
    btnRetour.addEventListener("click", showMenu);
    info.innerHTML = '';
    info.style.display = "Flex";
    info.style.justifyContent = "Center";
    info.style.flexDirection = "column";
    disableButton();
    info.append(msgVictoire, btnRejouez, btnRetour);
}



let showMorpion = () => {
    let receptacle = document.getElementById("receptacle");
    receptacle.style.hidden = false;
    receptacle.innerHTML = '';
    for (let i = 0; i < morp.taille; i++) {
        let div = document.createElement("div");
        receptacle.appendChild(div);
        for (let y = 0; y < morp.taille; y++) {
            let button = document.createElement("button");
            button.innerText = "\n";
            div.appendChild(button);
            button.addEventListener("click", () => {
                let result = morp.joueSur(i, y);
                //j'affiche le joueur adverse car j'échange déjà les joueurs dans joueSur
                button.innerText = morp.symbols[morp.joueurAdverse()];
                // 0 rien ne se passe // 1 victoire du joueur présent // 2 égalité  // 3 case déjà utilisé
                if (result === 1) {
                    victoire(morp);
                } else if (result === 2) {
                    egalite();
                } else if (result === 3) {
                    alert("case déjà utilisé");
                }
            })
        }
    }
}


let btn2 = document.getElementById("validate")
btn2.addEventListener("click", validate);