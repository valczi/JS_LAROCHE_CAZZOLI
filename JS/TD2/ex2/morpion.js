

let isEmpty=(string)=>{
    return string==='' || string===undefined;
}
let validate=()=>{
    let j1=document.getElementById("J1").value;
    let j2=document.getElementById("J2").value;

    if(isEmpty(j1) || isEmpty(j2))
        alert("Les champs ne sont pas remplis");
    else{
        let form=document.getElementById("Form");
        form.hidden=true;
        createMorpion();
    }

}

let createMorpion=()=>{
    let receptacle=document.getElementById("receptacle");
    let choixTaille=document.getElementById("3x3");
    let taille;
    if(choixTaille.checked)
        taille=3;
    else
        taille=8;

    
    for(let i = 0 ; i < taille;i++){
        let div=document.createElement("div");
        receptacle.appendChild(div);
        for(let y = 0 ; y < taille;y++){
            let button=document.createElement("button");
            button.innerText="\n";
            div.appendChild(button);
        }
    }

    let allButton=receptacle.querySelectorAll("button");
    allButton.forEach(btn=>{
        btn.addEventListener("click",()=>{
            btn.innerText="X";
        });
    })
}

let setSymbol=(btn,Symbole)=>{
    btn.innerHTML=Symbole;
}


