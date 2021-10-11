import {morpion} from "./morpion.js";

let morp;

let isEmpty=(string)=>{
    return string==='' || string===undefined;
}

let validate=()=>{
    let j1=document.getElementById("J1").value;
    let j2=document.getElementById("J2").value;
    let receptacle=document.getElementById("receptacle");

    if(isEmpty(j1) || isEmpty(j2) || j1===j2)
        alert("Les champs ne sont pas remplis, invalide ou les mêmes.");
    else {
        let taille = parseInt((document.querySelector('input[name="size"]:checked').value));
        let choix;

        if (!document.getElementById("x3").checked) {
            choix = 'simple';
        } else {
            choix = 0;
        }

        morp = new morpion(j1, j2, taille, choix);

        let form = document.getElementById("Form");
        form.hidden = true;
        for (let i = 0; i < taille; i++) {
            let div = document.createElement("div");
            receptacle.appendChild(div);
            for (let y = 0; y < taille; y++) {
                let button = document.createElement("button");
                button.innerText = "\n";
                div.appendChild(button);
                button.addEventListener("click", () => {
                    let result = morp.clicBouton(i, y);
                    // 0 rien ne se passe // 1 victoire du joueur présent // 2 égalité
                    if (result === 0) {
                        button.innerText = morp.symbols[morp.joueurActuel];
                    } else if (result === 1) {
                        victoire();
                    } else if (result === 2) {
                        egalite();
                    }else if(result===3){
                        alert("case déjà utilisé");
                    }
                })
            }
        }
        morp.recommence();
    }

}

let victoire=()=>{
    alert("Victoire !");
}

let egalite=()=>{
    alert("egalite");
}


let btn2 = document.getElementById("validate")
btn2.addEventListener("click",validate);
