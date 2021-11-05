let titre = $("<h2 />");
titre.text("Article 0 - règle");

let body=document.body;

let content=$("<p />");

$("body h2:nth-child(1)").before(titre);

content.text("Il est interdit de vous doublez !");
titre.after(content);

let allH2=$('h2');
let nb=1;

$.each(allH2,function(){

    let h2=$(this);
    let text = h2.text();

    h2.text("Article "+nb+" - ");

    text = text.split(" ");

    h2.text(h2.text()+text[3]);

    if(nb===4){
        let listUl=[];
        let h2NextUl=h2;
        
        while(h2NextUl.tagName!=="UL")
            h2NextUl=$(h2NextUl).next()[0];

        let previous =$(h2NextUl).prev();


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
        let h2next=$(h2).next()[0];
        while(h2next.tagName !== "H2" && h2next.tagName!=="SCRIPT")
        {
            $(h2next).css("background-color", "lightblue");
            h2next=$(h2next).next()[0];
        }
    }

    nb++;


})


