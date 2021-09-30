

let joueursSymbols;
let joueurActuel;
let j1;
let j2;
let choixWinn=0;

let isEmpty=(string)=>{
    return string==='' || string===undefined;
}

let validate=()=>{
     j1=document.getElementById("J1").value;
     j2=document.getElementById("J2").value;

    if(isEmpty(j1) || isEmpty(j2))
        alert("Les champs ne sont pas remplis");
    else{
        let form=document.getElementById("Form");
        joueursSymbols={
          [j1] : "X",
          [j2] : "O"
        };
        joueurActuel=j1;
        form.hidden=true;
        createMorpion();
    }

}

let createMorpion=()=>{
    //Recuperation des elements necessaire pour la grille
    let receptacle=document.getElementById("receptacle");
    let taille=parseInt((document.querySelector('input[name="size"]:checked').value));
    if(!document.getElementById("x3").checked){
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
    allButton.forEach(btn=>{
        btn.addEventListener("click",()=>{
            btn.innerText=joueursSymbols[joueurActuel];
            if(Winner(allButton,joueursSymbols[joueurActuel],taille,choixWinn)){
                console.log("yeah");
            }
            exchangePlayer();
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
        let horizonline=true;
        for(let i=0;i<size;i++){
            for(let y=0;y<size;y++){
                if(allButton[i+y].innerText!==symbol){
                    horizonline=false
                    //console.log("ligne "+i+" false");
                }
            }
            if(horizonline===true)
                break; 
        }
        if(horizonline===true)
            return true;

        //Verification des lignes verticales
        let verticalLine;
        for(let i=0;i<size;i++){
            verticalLine=true;
            for(let y=0;y<size*size;y+=size){
                if(allButton[i+y].innerText!==symbol)
                    verticalLine=false;
            }
            if(verticalLine===true)
                break; 
        }

        if(verticalLine===true)
            return true;

        //Verification des lignes diagonales (gauche a droite et droite a gauche)
        let diagonalLine=true;
        for(let i=0;i<size;i++){
            //console.log("btn num " + (i*(size+2)) +" : " +  allButton[i*(size+1)].innerText);
            //console.log(allButton[i*(size+1)].innerText===symbol);
            if(allButton[i*(size+1)].innerText!==symbol)
                diagonalLine=false;
        }

        if(diagonalLine===true)
            return true;
        else
            diagonalLine=true;

        for(let i=0;i<size;i++){
        //console.log("btn num " + (size-1+i*(size-1)));
            //console.log(allButton[size-1+i*(size-1)].innerText===symbol);
            if(allButton[size-1+i*(size-1)].innerText!==symbol)
                diagonalLine=false;
        }

        if(diagonalLine===true)
            return true;

}else{
    let valide=false;   
    for(let i=1;i<=size*size;i++){
        //console.log(" i : "+ i);
        if(i%size!=0 && i%size!=1){
           // console.log("Check d'une ligne");
            if(allButton[i-1].innerText===symbol && allButton[i].innerText===symbol && allButton[i-2].innerText===symbol)
                valide=true;
        }
        if(i>size && i<=size*(size-1)){
           // console.log("Check d'une verti");
            if(allButton[i-1].innerText===symbol && allButton[i+size-1].innerText===symbol && allButton[i-size-1].innerText===symbol)
                valide=true;
        }
        if(i%size!=0 && i%size!=1 && i>size && i<=size*(size-1)){
           // console.log("Check des diago");
            if(allButton[i-1].innerText===symbol && allButton[i-2-size].innerText===symbol && allButton[i+size].innerText===symbol)
                valide=true;
            if(allButton[i-1].innerText===symbol && allButton[i-size].innerText===symbol && allButton[i+size-2].innerText===symbol)
                valide=true;
        }
    }
    if(valide===true)
        return true;
}
return false;
}
