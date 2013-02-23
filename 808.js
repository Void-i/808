var updateChat = function(from, message){
    Models.chat.receive({
        type: "update",
        from: from,
        message: message,
        language: Models.user.data.language
    })
};
//setTimeout(function(){API.sendChat("@,DerpTheBass' :3")}, 3000);
var vote = API.getUser("50aeb07e96fba52c3ca04ca8").vote;
API.addEventListener(API.VOTE_UPDATE, voteUpdate);
setTimeout(function(){Models.user.changeStatus(0)},2000);
autowoot = true;
API.addEventListener(API.CHAT, command);
function command(data) {
    API.addEventListener(API.DJ_ADVANCE, advance);
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
    if (data.type === "mention" && data.message.indexOf("-woot" || "-autowoot") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
            autowoot = !autowoot;
            function advance(){
            setTimeout(function(){if (autowoot) $("#button-vote-positive").click()}, 10000);
            }
            if(autwoot){
            updateChat("","Autwoot turned off by ,DerpTheBass'");
            }else{
                updateChat("","Autowoot turned on by ,DerpTheBass'");
            }
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
        updateChat(""."Username changed by ,DerpTheBass'");
    }
}

/*****************************************************************************************/
function voteUpdate(){
switch(vote){
    case 1:
        $("#button-vote-positive").click();
        break;
    case -1:
        $("#button-vote-negative").click();
        break;
    default:
        break;
  }
}
