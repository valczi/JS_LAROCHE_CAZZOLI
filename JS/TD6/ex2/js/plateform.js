
  let displayRegion=$('#region');
//  document.getElementById("region");
  let displayDepartement=$('#departement');
//  document.getElementById("departement");
  let displayCommune=$('#commune');
//  document.getElementById("commune");
  let donnee=$('#donnee');
//  document.getElementById("donnee");
  let prommesseCommunes;
  let prommesseDepartement;

/*
let getRegion = async(Display)=>{
     fetch('https://geo.api.gouv.fr/regions',{
        method:'GET',
    }).then(response=>{
         response.json().then(response =>{
            localStorage.setItem("Region",JSON.stringify(response));
            let first=response[0];
            prommesseDepartement = getDepartement(displayDepartement,first.code);
            response.forEach(element => {
                let option=document.createElement('option');
                option.value=element.code;
                option.innerText=element.nom;
                Display.append(option);
            });
             response;
        })
    }).catch(err=>console.log("Erreur : "+ err));
}
*/
let getRegion = (Display)=>{ $.get( 'https://geo.api.gouv.fr/regions', function( response ) {
        localStorage.setItem("Region",JSON.stringify(response));
        let first=response[0];
        prommesseDepartement = getDepartement(displayDepartement,first.code);
        response.forEach(element => {
            let option=$('<option />');
            option.val(element.code);
            option.text(element.nom);
            Display.append(option);
        });
         response;
  });
}

let getDepartement = (Display,Region)=>{
    Display.empty();
    $.get( 'https://geo.api.gouv.fr/regions/'+Region+'/departements', function( response ) {
            localStorage.setItem("Departement",JSON.stringify(response));
            let first=response[0];
            prommesseCommunes = getCommune(displayCommune,first.code);
               response.forEach(element => {
                    let option=$('<option />');
                    option.val(element.code);
                    option.text(element.nom);
                    Display.append(option);
               });
    
                response;
           
      });
}




let displaySameCode=(firstCommune,element)=>{
    let elementFiltered=[];
    let code=firstCommune.codesPostaux[0];
    let pop=$('#pop');
    let popTotal=$('#popTotal');
    let totalpop=0;
    donnee.empty();
    
    pop.text("Population de "+ firstCommune.nom + " : " +firstCommune.population);

    elementFiltered=element.filter(Commune=>
        Commune.codesPostaux[0].includes(code)
    );

    elementFiltered.forEach(Element=>{
        if(Element!=[]){
            let row= $("<tr />");
            let nom=$("<td />");
            let code=$("<td />");
            let population=$("<td />");
            nom.text(Element.nom);
            code.text(Element.codesPostaux[0]);
            population.text(Element.population);
            row.append(nom,code,population);    
            donnee.append(row);
            totalpop+=Element.population;
        }
    });
    popTotal.text("Population total : " + parseInt(totalpop));
}

let getCommune = async(Display,departement)=>{
    Display.empty();
    $.get( 'https://geo.api.gouv.fr/departements/'+departement+'/communes', function( response ) {
        let first=response[0];
        localStorage.setItem("Communes",JSON.stringify(response));
        localStorage.setItem("CommuneChoisis",JSON.stringify(first));
        displaySameCode(first,response);
           response.forEach(element => {
                let option=$('<option />');
                option.val(element.code);
                option.text(element.nom);
                Display.append(option);
           });
      });
}


getRegion(displayRegion);


$(displayDepartement).on("change",()=>{
    let departement=displayDepartement.val();
    getCommune(displayCommune,departement);
});

$(displayRegion).on("change",()=>{
    let region=displayRegion.val();
    getDepartement(displayDepartement,region);
});

$(displayCommune).on("change",()=>{
    
    let communes=JSON.parse(localStorage.getItem("Communes"));
    let commune=communes.filter(commune=>commune.code===displayCommune.val());
    localStorage.setItem("CommuneChoisis",JSON.stringify(commune[0]));
    displaySameCode(commune[0],communes);
});

let a=localStorage.getItem("Region");






