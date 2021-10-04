import * as array from "./array_util.js";

let input=document.getElementById("chiffre");
let inputs=document.getElementById("inputNumber");
let btn=document.getElementById("btn");
let btn2=document.getElementById("produce");
let nbElement=1;

let sum = document.getElementById("sum");
let pair = document.getElementById("pair");
let biggest = document.getElementById("biggest");
let position = document.getElementById("position");

//let listeLambda=[1,6,7,9,10,6];

//console.log(array.getSum(listeLambda))

let addElement=()=>{
    if(input.value==='')
        alert("Veuillez entrer un chiffre !");
    else{
        let newInput=document.createElement("input");
        let phrase=document.createElement("p");
        nbElement++;
        phrase.innerText="Element "+nbElement+" : ";
        newInput.type="number";

        inputs.append(phrase);
        phrase.append(newInput);
        newInput.after(btn);

        //input.after(document.createElement("br"));
        input.disabled=true;
        //newInput.before(phrase);
        input=newInput;
   // }
}
}

let produceResult=()=>{

    let listeString=inputs.querySelectorAll("input");
    let liste=[];
    let search=document.getElementById("searchNumber");

    listeString.forEach(input => {
        //console.log(input.value);
        if(input.value!=='')
         liste.push(parseInt(input.value));
    });
   // if(isNumber(search)===false)
    //    alert("Veuillez entrer un chiffre a rechercher");
   // else
     if(liste.length===0)
        alert("Rentré des chiffres !");
    else{
        sum.innerText="Somme des élements : "+array.getSum(liste);
        pair.innerText="Nombre de paire : "+array.getNumberOfEven(liste);
        let biggestPair=array.max(...liste);
        if(biggestPair===0)
            biggest.innerText="Aucun élément pair";
        else
            biggest.innerText="Plus gros élément paire : "+array.max(...liste);

        liste=liste.sort();
        let resRech=array.dichotomique(liste,parseInt(search.value));
        //console.log("res dicho : " + resRech);
        if(resRech!==-1)
            position.innerText="Position de l'élément : "+(resRech+1);
        else
            position.innerText="Element non trouvé";
    }

}
btn.addEventListener("click", addElement);
btn2.addEventListener("click",produceResult);
