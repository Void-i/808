//setTimeout(function(){API.sendChat("@,DerpTheBass' :3")}, 3000);
setTimeout(function(){Models.user.changeStatus(0)},2000);
autowoot = true;
API.addEventListener(API.CHAT, command);
function command(data) {
    API.addEventListener(API.DJ_ADVANCE, advance);
    if (data.type === "mention" && data.message.indexOf("-avail" || "-back" || "-here") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(0);
    }
    if (data.type === "mention" && data.message.indexOf("-afk" || "-away" || "-brb") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(1);
    }
    if (data.type === "mention" && data.message.indexOf("-sleeping" || "-sleep") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(3);
    }
    if (data.type === "mention" && data.message.indexOf("-idle" || "-gaming") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(-1);
    }
    if (data.type === "mention" && data.message.indexOf("-working" || "-work") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(2);
    }
    if (data.type === "mention" && data.message.indexOf("-woot" || "-autowoot") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
            autowoot = !autowoot;
            function advance(){
            setTimeout(function(){if (autowoot) $("#button-vote-positive").click()}, 10000);
            }
    }
      if (data.type === "mention" && data.message.indexOf("-reload") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
           Models.user.changeStatus(1);
           setTimeout(function(){document.location.reload(true)},2000);
    }
    if (data.type === "mention" && data.message.indexOf("-meh" || "eww") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        $("#button-vote-negative").click();
    }
    if (data.type === "mention" && /-nick (.*)$/.exec(data.message) && data.fromID === "50aeb07e96fba52c3ca04ca8") {
        Models.user.changeDisplayName(RegExp.$1);
    }
}
