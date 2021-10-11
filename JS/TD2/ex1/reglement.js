let titre = document.createElement("h2");
titre.textContent="Article 0 - règle";

let body=document.body;

let content=document.createElement("p");
content.textContent="Il est interdit de vous doublez !";

let firstArticle=body.firstChild;

body.insertBefore(titre,firstArticle);

titre.after(content);

let allH2=document.querySelectorAll("h2");

let nb=1;

allH2.forEach(h2=>{
    // h2.className="capital";
    h2.style.textTransform="uppercase";
    let text = h2.innerHTML.toUpperCase();
    h2.innerHTML="Article "+nb+" - "

    text= text.split("-");
    if(text[1]!==undefined)
        h2.innerHTML=h2.innerHTML+text[1];

    if(nb===4){
        let listUl=[];
        let h2NextUl=h2;
        while(h2NextUl.tagName!=="UL")
            h2NextUl=h2NextUl.nextElementSibling;

        let previous =h2NextUl.previousElementSibling;

        while(h2NextUl.tagName==="UL"){
            listUl.push(h2NextUl);
            h2NextUl=h2NextUl.nextElementSibling;
        }

        let reverseListUl=listUl.reverse();
        reverseListUl.forEach(ul=>{
            previous.after(ul);
            previous=ul;

        })
    }


    if(nb%2===0){
        let h2next=h2.nextElementSibling;
        console.log(h2next.tagName);
        while(h2next.tagName !== "H2" && h2next.tagName!=="SCRIPT")
        {
            h2next.style.backgroundColor='lightblue';
            h2next=h2next.nextElementSibling;
        }
    }

    nb++;


})


