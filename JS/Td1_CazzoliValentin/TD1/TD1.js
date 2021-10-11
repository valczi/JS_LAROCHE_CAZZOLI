let x;
let b=false;
let n=0;
let s='0';
let tab = [];
let o = {};

function afficher(x){
    console.log(x);
}
x="aucune";
//afficher(x);

x='blabla';
//afficher(x);

x="blalala";
//afficher(x);

x='blablabla{$x}';
//afficher(x);

x=9;
//afficher(x);

x=2.5;
//afficher(x);

x=true;
//afficher(x);

x=undefined;
//afficher(x);

x=null;
//afficher(x);

x=[1,2,3];
//afficher(x);

x={"promo":"lpweb",nb:25};
//afficher(x);

x=new Date();
//afficher(x);

x=function(){alert('toto')};
//afficher(x);

x=42n;
//afficher(x);

// console.log(b == n);
// console.log(b == o);
// console.log(b==tab);
// console.log(n == s);
// console.log(o == s);
// console.log(tab == s);
//
// console.log(b === n);
// console.log(b === o);
// console.log(b === tab);
// console.log(n === s);
// console.log(o === s);
// console.log(tab === s);

function chaine1(){
    let mot="initialisation";
    while(mot !== mot.toUpperCase())
        mot = prompt("Saisissez un mot");
}

//chaine1();

function chaine2(){
    let characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let mot='';
    for(let i=0;i<6;i++)
        mot+=characters.charAt(Math.floor(Math.random() * 26));
    afficher(mot);
}

//chaine2()

function chaine3(){
    let voyelles  = ['a','e','i','o','u','y'];
    let mot='';
    for(let i=0;i<6;i++)
        mot+=voyelles[Math.floor(Math.random() * 6)];
    afficher(mot);
}

//chaine3();

function chaine4(){
    let prenom=prompt("Prenom");
    let nom=prompt("Nom");

    prenom.charAt(0).toUpperCase()
    prenom = prenom.charAt(0).toUpperCase()+prenom.slice(1);
    let prenomnom=prenom+nom.toUpperCase();
    afficher(prenomnom);
}

//chaine4();

function chaine5(){
    let message=prompt("Message a codé");
    let  Obj = {
        A:"4",
        E:"3",
        G:"6",
        I:"1",
        O:"0",
        S:"5",
        Z:"2"
    };
    let RE = new RegExp(Object.keys(Obj).join("|"), "gi");
     message=message.replaceAll(RE,matched => {
         return Obj[matched];
    });
}

//chaine5();

function chaine6(){
    let entier=prompt("Nombre d'entier ");
    entier=parseInt(entier);
    for(let i=0;i<entier;i++) {
        let message='';
        if (i%3===0)
            message+='JAZZ';
        if (i%5===0)
            message+='BAZZ';
        console.log(i.toString() +" : " + message);
    }

}

//chaine6();

let tableau1 = (array) => {
    let total=0;
    array.forEach(number => total+=number);
    return total;
}

function tableau1bis(array){
    return array.reduce((acc,number)=> acc+number,0);
}

//afficher(tableau1([1,5,6,3,100]));

let tableau2 = (array) => {
    const numbers = [2, 4, 6];

    const sum = numbers.reduce((sum, number)=> {
        if(number%2===0)
            sum++;
        return sum;
    },0);

    console.log("Somme :"+sum);
}

let tableau2bisbis = (array) => {

    const sum = array.filter(number=> {
        return number%2===0;
    });
    return sum.length;
   // console.log("Somme :"+sum);
}
//console.log("nombre pair : " + tableau2bisbis([10,20,17,28]));

//tableau2();
function tableau2bis(array){
    let nbPair=0;
    for(let i=0;i<array.length-1;i++)
        if(array[i]%2===0)
            nbPair++;
    return nbPair;
}

//afficher(tableau2([6,2,5,7,4,1,9,3,20]));

let isEmpty=(array)=>{
    return array.length===0;
}

let tableau3=(array1,array2)=>{
    let array=[];
    while(!isEmpty(array1) && !isEmpty(array2)){
        if(array1[0]>array2[0]) {
            array.push(array2[0]);
            array2.shift();
        }
        else {
            array.push(array1[0]);
            array1.shift();
        }
    }
    if(!isEmpty(array1))
        array1.forEach(number=> array.push(number));

    if(!isEmpty(array2))
        array2.forEach(number=> array.push(number));

    return array;
}

//console.log(tableau3([,1,6,48,97,170,180],[6,45,82,150]));


let tableau4= (array,numberToFind) =>{
    let bas=array[0];
    let haut=array[array.length-1];
    let notFound=true;
    let position=null;
    while(notFound){
        let milieu=Math.floor((bas+haut)/2);
        if(array[milieu]===numberToFind) {
            notFound = false;
            position=milieu;
        }else if (array[milieu]<numberToFind)
            bas=milieu+1;
        else
            haut=milieu-1;
    if(haut<bas)
        notFound=false;
    }
    if(position!==null){
        return position+1;
    }

}

//console.log(tableau4([1,5,15,30,50,90,95,152],152));

let tableau5=(...values)=>{
    let max=0;
    values.forEach(number => {
        if(number%2===0 && number > max)
            max=number;
    });
    return max;
}

let tableau5bis=(...values)=>{
    let max=0;
    for(let i=0;i<values.length-1;i++)
        if(values[i]%2===0 && values[i] > max)
            max=values[i];
    return max;
}

//console.log(tableau5(1,5,6,4,8,7,20,24,192));

let tableau6=(text)=>{
    let tableauAsso={};
    let splitText=text.split(' ');
    splitText.forEach(word => {
        if(word in tableauAsso) {
            tableauAsso[word]++;
        }else
            tableauAsso[word]=1;
    })
    return tableauAsso;
}

let tableau6bis=(text)=>{
    let tableauAsso={};
    let splitText=text.split(' ');
    for(let i=0;i<splitText.length-1;i++) {
        if (splitText[i] in tableauAsso) {
            tableauAsso[splitText[i]]++;
        } else
            tableauAsso[splitText[i]] = 1;
    }
    return tableauAsso;
}

console.log(tableau6bis("Il était une fois un foie qui mangeais du foins et bref fois foin du truc truc truc bidule foie"));