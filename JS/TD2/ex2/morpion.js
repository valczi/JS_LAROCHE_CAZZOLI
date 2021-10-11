

let joueursSymbols;
let joueurActuel;
let joueursScore;
let j1;
let j2;
let choixWinn=0;

let isEmpty=(string)=>{
    return string==='' || string===undefined;
}

//déclanché lorsque les joueurs débutent la partie (appuie sur le bouton validez)
let validate=()=>{
     j1=document.getElementById("J1").value;
     j2=document.getElementById("J2").value;

    if(isEmpty(j1) || isEmpty(j2) || j1===j2)
        alert("Les champs ne sont pas remplis, invalide ou les mêmes.");
    else{
        let form=document.getElementById("Form");
        joueursSymbols={
          [j1] : "X",
          [j2] : "O"
        };

        joueursScore={
            [j1] :0,
            [j2] :0
          };

        joueurActuel=j1;
        form.hidden=true;
        createMorpion();
    }

}

//affiche le joueur qui doit jouer
let displayName=(name,infoBox)=>{
    infoBox.innerText="Joueurs actuel : " + name;
}

//affiche les scores
let displayScore=()=>{
    let footer=document.getElementById("footer");
    footer.innerHTML='';
    let scoreJ1=document.createElement("p");
    let scoreJ2=document.createElement("p");
    scoreJ1.innerText="Score de "+j1+" : "+joueursScore[j1];
    scoreJ2.innerText="Score de "+j2+" : "+joueursScore[j2];
    footer.append(scoreJ1,scoreJ2);
}

//affichage du résultat final et création des boutons
let displayWinner=(name,infoBox,tie)=>{
    let btnReplay=document.createElement("button");
    let btnRetour=document.createElement("button");
    let btnBloc=document.createElement("div");
    let phrase=document.createElement("p");
    let receptacle=document.getElementById("receptacle");



    let allButton=receptacle.querySelectorAll("button");
    btnReplay.onclick=()=>{
        allButton.forEach(btn=>{
            btn.innerText="\n";
        });
        allButton.forEach(btn=>btn.disabled=false);
        infoBox.innerHTML='';
        displayName(name,infoBox);
    };

    btnRetour.onclick=()=>{
        document.getElementById("receptacle").innerHTML='';
        infoBox.innerHTML='';
        document.getElementById("Form").hidden=false;
    };
    infoBox.innerHTML='';
    //Style des bouton
        btnRetour.innerText="Retour"
        btnReplay.innerText="Rejouez"

        btnRetour.margin="auto"
        btnReplay.margin="auto"

        btnRetour.padding="5"
        btnReplay.padding="5"

        btnBloc.style.display="flex";
        btnBloc.style.justifyContent="space-between";
    ////////////////////

    allButton.forEach(btn=>btn.disabled=true);
    btnBloc.append(btnRetour,btnReplay);
    //Message a afficher
    if(tie===1){
        joueursScore[joueurActuel]++;
        displayScore();
        phrase.innerText="Bien jouer au gagnant "+name+" !";
    }else
        phrase.innerText="Aucune gagnant !";
    
    infoBox.append(phrase,btnBloc);
}


let createMorpion=()=>{
    //Recuperation des elements necessaire pour la grille
    let receptacle=document.getElementById("receptacle");
    let taille=parseInt((document.querySelector('input[name="size"]:checked').value));
    let infoBox=document.getElementById("info");
    displayName(joueurActuel,infoBox);
    displayScore();
    if(!document.getElementById("x3").checked){
        choixWinn=1;
    }else{
        choixWinn=0;
    }

    //Creation de la grille
    for(let i = 0 ; i < taille;i++){
        let div=document.createElement("div");
        receptacle.appendChild(div);
        for(let y = 0 ; y < taille;y++){
            let button=document.createElement("button");
            button.innerText="\n";
            div.appendChild(button);
        }
    }

    //Initialisation des boutons
    let allButton=receptacle.querySelectorAll("button");
     allButton.forEach(btn => {
       btn.addEventListener("click",()=>{
            if(btn.innerText!=="\n")
                alert("Case déjà utilisée");
            else{
                btn.innerText=joueursSymbols[joueurActuel];
                let resGame=Winner(allButton,joueursSymbols[joueurActuel],taille,choixWinn);
                if(resGame === 1 || resGame === 2){
                    displayWinner(joueurActuel,infoBox,resGame);
                }else{
                    exchangePlayer();
                    displayName(joueurActuel,infoBox);
                }   
            }
        });
    })
}


//Echange les joueurs
let exchangePlayer = () =>{
  if(joueurActuel===j1)
    joueurActuel=j2;
  else
    joueurActuel=j1;
}

let Winner=(allButton,symbol,size,choix)=>{
    if(choix===1){
    //Verification des lignes horizontales
        let horizonline=1;
        for(let i=0;i<size;i++){
            for(let y=0;y<size;y++){
                if(allButton[i+y].innerText!==symbol){
                    horizonline=0
                }
            }
            if(horizonline===1)
                break; 
        }
        if(horizonline===1)
            return 1;

        //Verification des lignes verticales
        let verticalLine;
        for(let i=0;i<size;i++){
            verticalLine=1;
            for(let y=0;y<size*size;y+=size){
                if(allButton[i+y].innerText!==symbol)
                    verticalLine=0;
            }
            if(verticalLine===1)
                break; 
        }

        if(verticalLine===1)
            return 1;

        //Verification des lignes diagonales (gauche a droite et droite a gauche)
        let diagonalLine=1;
        for(let i=0;i<size;i++){
            if(allButton[i*(size+1)].innerText!==symbol)
                diagonalLine=0;
        }

        if(diagonalLine===1)
            return 1;
        else
            diagonalLine=1;

        for(let i=0;i<size;i++){
            if(allButton[size-1+i*(size-1)].innerText!==symbol)
                diagonalLine=0;
        }
        if(diagonalLine===1)
            return 1;

}else{
    // Verification pour trois symbole a la suite dans une grille de taille n
    let valide=0;   
    for(let i=1;i<=size*size;i++){
        if(i%size!=0 && i%size!=1){
            if(allButton[i-1].innerText===symbol && allButton[i].innerText===symbol && allButton[i-2].innerText===symbol)
                valide=1;
        }
        if(i>size && i<=size*(size-1)){
            if(allButton[i-1].innerText===symbol && allButton[i+size-1].innerText===symbol && allButton[i-size-1].innerText===symbol)
                valide=1;
        }
        if(i%size!=0 && i%size!=1 && i>size && i<=size*(size-1)){
            if(allButton[i-1].innerText===symbol && allButton[i-2-size].innerText===symbol && allButton[i+size].innerText===symbol)
                valide=1;
            if(allButton[i-1].innerText===symbol && allButton[i-size].innerText===symbol && allButton[i+size-2].innerText===symbol)
                valide=1;
        }
    }
    if(valide===1)
        return 1;
}


//vérification s'il reste des cases disponibles
let moreSpace=2;
allButton.forEach(btn=>{
    if(btn.innerText==="\n")
        moreSpace=0;
});

return moreSpace;

}
