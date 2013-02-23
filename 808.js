autowoot = false;
mirror = true;

var updateChat = function(from, message){
    Models.chat.receive({
        type: "update",
        from: from,
        message: message,
        language: Models.user.data.language
    })
};

/******************************/
API.addEventListener(API.CHAT, command);

API.addEventListener(API.DJ_ADVANCE, DJAdvance);

//setTimeout(function(){API.sendChat("@,DerpTheBass' :3")}, 3000);

API.addEventListener(API.VOTE_UPDATE, voteUpdate);

setTimeout(function(){Models.user.changeStatus(0)},2000);

if(autowoot){
    function DJAdvance(){
        $("#button-vote-positive").click();
    }
}

if(mirror){
function voteUpdate(){
if(API.getUser("50aeb07e96fba52c3ca04ca8").vote = 1){
        $("#button-vote-positive").click();
        console.log("Mirroring 'woot' Vote");
}else if(API.getUser("50aeb07e96fba52c3ca04ca8").vote = -1){
        $("#button-vote-negative").click();
        console.log("Mirroring 'meh' Vote")
        }  
    }
}

/******************************/
function command(data) {
    if (data.type === "mention" && data.message.indexOf("-avail" || "-back" || "-here") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(0);
        updateChat("","Status changed by ,DerpTheBass'");
    }
    if (data.type === "mention" && data.message.indexOf("-afk" || "-away" || "-brb") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(1);
        updateChat("","Status changed by ,DerpTheBass'");
    }
    if (data.type === "mention" && data.message.indexOf("-sleeping" || "-sleep") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(3);
        updateChat("","Status changed by ,DerpTheBass'");
    }
    if (data.type === "mention" && data.message.indexOf("-idle" || "-gaming") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(-1);
        updateChat("","Status changed by ,DerpTheBass'");
    }
    if (data.type === "mention" && data.message.indexOf("-working" || "-work") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(2);
        updateChat("","Status changed by ,DerpTheBass'");
    }
    if (data.type === "mention" && data.message.indexOf("-woot on") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
            autowoot = true;
                updateChat("","Autowoot turned on by ,DerpTheBass'");
    }
        if (data.type === "mention" && data.message.indexOf("-woot off") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
                autowoot = false;  
                updateChat("","Autowoot turned off by ,DerpTheBass'");
    }
         if (data.type === "mention" && data.message.indexOf("-mirror on") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
                autowoot = false;
                mirror = true;  
                updateChat("","Mirror vote turned on by ,DerpTheBass'");
    }
         if (data.type === "mention" && data.message.indexOf("-mirror off") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
                mirror = false;  
                updateChat("","Mirror vote turned off by ,DerpTheBass'");
    }
      if (data.type === "mention" && data.message.indexOf("-reload") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
          Models.user.changeStatus(1);
           setTimeout(function(){document.location.reload(true)},3000);
    }
      if (data.type === "mention" && data.message.indexOf("-leave") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
           setTimeout(function(){window.close},2000);
    }
    if (data.type === "mention" && /-nick (.*)$/.exec(data.message) && data.fromID === "50aeb07e96fba52c3ca04ca8") {
        Models.user.changeDisplayName(RegExp.$1);
        updateChat("","Username changed by ,DerpTheBass'");
    }
}

/*****************************************************************************************/

