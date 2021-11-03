let titre = $("<h2 />");
titre.text("Article 0 - règle");

let body=document.body;

let content=$("<p />");
content.text("Il est interdit de vous doublez !");

$("body h2:nth-child(1)").before(titre);

//let allH2=document.querySelectorAll("h2");
let allH2=$('h2');
let nb=1;
$.each(allH2,function(){
    let h2=$(this)[0];
    // h2.className="capital";
    h2.innerText=h2.innerText.toUpperCase();
    let text = h2.innerHTML.toUpperCase();
    h2.innerHTML="Article "+nb+" - "

    text = text.split(" ");

    h2.innerHTML=h2.innerHTML+text[3];

    if(nb===4){
        let listUl=[];
        let h2NextUl=h2;
        console.log($(h2).next());
        
        while(h2NextUl.tagName!=="UL")
            h2NextUl=$(h2NextUl).next()[0];

        let previous =$(h2NextUl).prev();
        //console.log($(h2NextUl).prev());

        while(h2NextUl.tagName==="UL"){
            listUl.push(h2NextUl);
            h2NextUl=$(h2NextUl).next()[0];
        }

        let reverseListUl=listUl.reverse();
        reverseListUl.forEach(ul=>{
            previous.after(ul);
            previous=ul;

        })
    }


    if(nb%2===0){
        let h2next=h2.nextElementSibling;
        while(h2next.tagName !== "H2" && h2next.tagName!=="SCRIPT")
        {
            h2next.style.backgroundColor='lightblue';
            h2next=h2next.nextElementSibling;
        }
    }

    nb++;


})


