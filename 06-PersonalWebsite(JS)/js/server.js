
function fillSchedule(){


    var form = document.getElementById("myForm");
    console.log(form);
    var monday=form.getElementsByClassName("monform");
    console.log(monday);
    var sch1=document.getElementsByClassName("sch1");

    var tuesday=document.getElementsByClassName("tusform");
    var sch2=document.getElementsByClassName("sch2");

    var wednesday=document.getElementsByClassName("wedform");
    var sch3=document.getElementsByClassName("sch3");

    var thursday=document.getElementsByClassName("thurform");
    var sch4=document.getElementsByClassName("sch4");

    var friday=document.getElementsByClassName("friform");
    var sch5=document.getElementsByClassName("sch5");

    var saturday=document.getElementsByClassName("satform");
    var sch6=document.getElementsByClassName("sch6");

    var sunday=document.getElementsByClassName("sunform");
    var sch7=document.getElementsByClassName("sch7");


   
    for(i=0;i<6;i++){

        sch1[i].innerHTML=monday[i].getElementsByTagName("input").value;
        sch2[i].innerHTML=tuesday[i].innerHTML;
        sch3[i].innerHTML=wednesday[i].innerHTML;
        sch4[i].innerHTML=thursday[i].innerHTML;
        sch5[i].innerHTML=friday[i].innerHTML;
        sch6[i].innerHTML=saturday[i].innerHTML;
        sch7[i].innerHTML=sunday[i].innerHTML;
    }
    
    console.log(sch1[0]);
}


  