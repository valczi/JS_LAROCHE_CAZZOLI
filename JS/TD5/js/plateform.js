
  let displayRegion=document.getElementById("region");
  let displayDepartement=document.getElementById("departement");
  let displayCommune=document.getElementById("commune");
  let donnee=document.getElementById("donnee");
  let prommesseCommunes;
  let prommesseRegion;
  let prommesseDepartement;


let getRegion = async(Display)=>{
    return fetch('https://geo.api.gouv.fr/regions',{
        method:'GET',
    }).then(response=>{
        return response.json().then(response =>{
            let first=response[0];
            prommesseDepartement = getDepartement(displayDepartement,first.code);
            response.forEach(element => {
                let option=document.createElement('option');
                option.value=element.code;
                option.innerText=element.nom;
                Display.append(option);
            });
            return response;
        })
    }).catch(err=>console.log("Erreur : "+ err));
}


let getDepartement = async(Display,Region)=>{
    Display.innerHTML='';
    return fetch('https://geo.api.gouv.fr/regions/'+Region+'/departements',{
       method:'GET',
   }).then(response=>{

       return response.json().then(response =>{

        let first=response[0];
        prommesseCommunes = getCommune(displayCommune,first.code);
           response.forEach(element => {
                let option=document.createElement('option');
                option.value=element.code;
                option.innerText=element.nom;
                Display.append(option);
           });

           return response;
       })
   }).catch(err=>console.log("Erreur : "+ err));
}

let displaySameCode=(firstCommune,element)=>{
    let elementFiltered=[];
    let code=firstCommune.codesPostaux[0];
    let pop=document.getElementById("pop");
    let popTotal=document.getElementById("popTotal");
    let totalpop=0;
    donnee.innerHTML='';
    
    pop.innerText=firstCommune.population;

    elementFiltered=element.filter(Commune=>
        Commune.codesPostaux[0].includes(code)
    );

    elementFiltered.forEach(Element=>{
        if(Element!=[]){
            let row=document.createElement("tr");
            let nom=document.createElement("td");
            let code=document.createElement("td");
            let population=document.createElement("td");
            nom.innerText=Element.nom;
            code.innerText=Element.codesPostaux[0];
            population.innerText=Element.population;
            row.append(nom,code,population);    
            donnee.append(row);
            totalpop+=Element.population;
        }
    });
    popTotal.innerText=parseInt(totalpop);
}

let getCommune = async(Display,departement)=>{
    Display.innerHTML='';
    return fetch('https://geo.api.gouv.fr/departements/'+departement+'/communes',{
       method:'GET',
   }).then(response=>{
       return response.json().then(response =>{
        let first=response[0];

        displaySameCode(first,response);
           response.forEach(element => {
                let option=document.createElement('option');
                option.value=element.code;
                option.innerText=element.nom;
                Display.append(option);
           });
           return response;
       })
   }).catch(err=>console.log("Erreur : "+ err));
}

prommesseRegion = await getRegion(displayRegion);

displayDepartement.onclick=()=>{
    let departement=displayDepartement.value;
    prommesseCommunes = getCommune(displayCommune,departement);
}

displayRegion.onclick=()=>{
    let region=displayRegion.value;
    prommesseDepartement = getDepartement(displayDepartement,region);
  //  displayDepartement.onclick();
}

displayCommune.onclick=()=>{

    prommesseCommunes.then(response=>{
            console.log(response);
            let commune=response.filter(commune=>commune.code===displayCommune.value);
                displaySameCode(commune[0],response);

    });
}



