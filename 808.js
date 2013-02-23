debug = false;
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
        setTimeout(function(){$("#button-vote-positive").click();},5000);
        if(debug){console.log("[#808] Autowooting song")}
    }
}

if(mirror){
function voteUpdate(){
if(API.getUser("50aeb07e96fba52c3ca04ca8").vote === 0){
    if(debug){console.log("[#808] No Vote registered")}
}
else if(API.getUser("50aeb07e96fba52c3ca04ca8").vote === 1){
        $("#button-vote-positive").click();
        if(debug){console.log("[#808] Mirroring 'woot' Vote")}
}
else if(API.getUser("50aeb07e96fba52c3ca04ca8").vote === -1){
        $("#button-vote-negative").click();
        if(debug){console.log("[#808] Mirroring 'meh' Vote")}
        }  
    }
}

/******************************/
function command(data) {
    if (data.type === "mention" && data.message.indexOf("-avail" || "-back" || "-here") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(0);
        if(debug){updateChat("[#808]","Status changed by ,DerpTheBass'")}
    }
    if (data.type === "mention" && data.message.indexOf("-afk" || "-away" || "-brb") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(1);
        if(debug){updateChat("[#808]","Status changed by ,DerpTheBass'")}
    }
    if (data.type === "mention" && data.message.indexOf("-sleeping" || "-sleep") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(3);
        if(debug){updateChat("[#808]","Status changed by ,DerpTheBass'")}
    }
    if (data.type === "mention" && data.message.indexOf("-idle" || "-gaming") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(-1);
        if(debug){updateChat("[#808]","Status changed by ,DerpTheBass'")}
    }
    if (data.type === "mention" && data.message.indexOf("-working" || "-work") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(2);
        if(debug){updateChat("[#808]","Status changed by ,DerpTheBass'")}
    }
    if (data.type === "mention" && data.message.indexOf("-woot on") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
            autowoot = true;
                if(debug){updateChat("[#808]","Autowoot turned on by ,DerpTheBass'")}
    }
        if (data.type === "mention" && data.message.indexOf("-woot off") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
                autowoot = false;  
                if(debug){updateChat("[#808]","Autowoot turned off by ,DerpTheBass'")}
    }
         if (data.type === "mention" && data.message.indexOf("-mirror on") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
                autowoot = false;
                mirror = true;  
                if(debug){updateChat("[#808]","Mirror vote turned on by ,DerpTheBass'")}
    }
         if (data.type === "mention" && data.message.indexOf("-mirror off") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
                mirror = false;  
                updateChat("[#808]","Mirror vote turned off by ,DerpTheBass'");
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
        updateChat("[#808]","Username changed by ,DerpTheBass'");
    }
}

/*****************************************************************************************/

