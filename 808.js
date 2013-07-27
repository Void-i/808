API.on(API.CHAT, callback);
function callback(data){
    if (data.message.indexOf("-stop") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        script = false,
        API.on(API.DJ_ADVANCE, newdj)
        status = "At idle";
            console.log("[#808] at idle");
        API.setStatus(API.STATUS.SLEEPING);
    }
        if (data.message.indexOf("808, go into sleep mode") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        script = false,
        API.on(API.DJ_ADVANCE, newdj)
        status = "At idle";
            console.log("[#808] at idle");
        API.setStatus(API.STATUS.SLEEPING);
    }
    if (data.message.indexOf("-start") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        script = true;
        API.on(API.DJ_ADVANCE, newdj)
        status = "Running";
        console.log("[#808] started");
        Models.user.changeStatus(0);
    }
       if (data.message.indexOf("808, start up") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        script = true;
        API.on(API.DJ_ADVANCE, newdj)
        status = "Running";
        console.log("[#808] started");
        API.setStatus(API.STATUS.AVAILABLE);
    }
}

debug = false;
autowoot = false;
mirror = true;
script = true;
wootmode = "Mirror";
Recent = false;
status = "Running";
announce = false;

var updateChat = function(message){
  API.chatLog(message);
};

var joined = new Date().getTime();

var day = new Date().getDay();
  
    //weird = "Weird/Play anything day doesn't exist anymore";

/*Run this code if this is the first time the script has been started
	oldDJs = [];
	localStorage.setItem("storedDJs", JSON.stringify(oldDJs));
*/


var oldDJs = JSON.parse(localStorage.getItem("storedDJs"));
/******************************/
API.on(API.CHAT, command);

API.on(API.VOTE_UPDATE, voteUpdate);

API.on(API.DJ_ADVANCE, DJAdvance);

//setTimeout(function(){API.sendChat("@,DerpTheBass' :3")}, 3000);

console.log("[#808] Running #808 Alt control script V. 14");

setTimeout(function(){API.setStatus(API.STATUS.AVAILABLE)},2000);
    
    function DJAdvance(){
        if(script && autowoot){
        setTimeout(function(){$("#button-vote-positive").click();},5000);
        if(debug){console.log("[#808] Autowooting song")}
    }
}

    function voteUpdate(){
        if(mirror && script && API.getUser("50aeb07e96fba52c3ca04ca8").vote === 0){
            if(debug){setTimeout(function(){console.log("[#808] No Vote registered")}, 5000)}
        }
        else if(mirror && script && API.getUser("50aeb07e96fba52c3ca04ca8").vote === 1){
            $("#button-vote-positive").click();
            if(debug){console.log("[#808] Mirroring 'woot' Vote")}
        }
        else if(mirror && script && API.getUser("50aeb07e96fba52c3ca04ca8").vote === -1){
            $("#button-vote-negative").click();
            if(debug){console.log("[#808] Mirroring 'meh' Vote")}
        }
    }
    
API.on(API.DJ_ADVANCE, newdj);
function newdj(){
	if(oldDJs.indexOf(API.getDJs()[4].id) === -1){
	oldDJs.push(API.getDJs()[4].id);
        localStorage.setItem("storedDJs", JSON.stringify(oldDJs));
	if(debug) console.log("[#808] New DJ");
	//API.sendChat("@"+API.getDJs()[4].username+" I've never seen you DJ here before, keep in mind only pony music is allowed. Music guidlines: 'thisisatest' ");
	}
}

/******************************/
function command(data) {
    if (script && data.message.indexOf("-debug") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        debug = !debug;
        if(announce)API.sendChat("@"+data.from+" Debug: "+debug);
        if(debug){updateChat("[#808] ","Debug mode toggled")}
    }
        if (script && data.message.indexOf("808, toggle debug mode") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        debug = !debug;
        if(announce)API.sendChat("@"+data.from+" Debug: "+debug);
        if(debug){updateChat("[#808] ","Debug mode toggled")}
    }
        if (script && /-say (.*)$/.exec(data.message) && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
           Models.chat.sendChat(RegExp.$1);
        }
            if (script && data.message.replace(/'/g, "&#39").indexOf("-- ") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
            	console.log("Message: "+data.message);
           escaped = data.message.replace(/&#39;/g, "'");
           console.log(escaped);
           toEval = escaped.substring(3);
           console.log(toEval);
           eval(toEval);
        }
       if (script && data.message.indexOf("-announce") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        announce = !announce;
        if(announce)API.sendChat("@"+data.from+" I will now announce events!");
        if(debug){updateChat("[#808] ","Announce mode toggled")}
    }
           if (script && data.message.indexOf("808, toggle announce mode") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        announce = !announce;
        if(announce)API.sendChat("@"+data.from+" I will now announce events!");
        if(debug){updateChat("[#808] ","Announce mode toggled")}
    }
       if (script && data.message.indexOf("-clear") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        API.sendChat("/clear");
        if(announce)API.sendChat("@"+data.from+" Chat cleared!");
    }
           if (script && data.message.indexOf("808, clear chat") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        API.sendChat("/clear");
        if(announce)API.sendChat("@"+data.from+" Chat cleared!");
    }
    if (script && data.message.indexOf("-avail" || "-back" || "-here") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        Models.user.changeStatus(0);
        if(debug){updateChat("[#808] ","Status changed by ,DerpTheBass'")}
    }
    if (script && data.message.indexOf("-afk" || "-away" || "-brb") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        Models.user.changeStatus(1);
        if(debug){updateChat("[#808] ","Status changed by ,DerpTheBass'")}
    }
    if (script && data.message.indexOf("-sleeping" || "-sleep") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        Models.user.changeStatus(3);
        if(debug){updateChat("[#808] ","Status changed by ,DerpTheBass'")}
    }
    if (script && data.message.indexOf("-idle" || "-gaming") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        Models.user.changeStatus(-1);
        if(debug){updateChat("[#808] ","Status changed by ,DerpTheBass'")}
    }
    if (script && data.message.indexOf("-working" || "-work") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        Models.user.changeStatus(2);
        if(debug){updateChat("[#808] ","Status changed by ,DerpTheBass'")}
    }
      if (script && data.message.indexOf("-meh") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        setTimeout(function(){$("#button-vote-negative").click();},1000);
        if(debug){updateChat("[#808] ","Mehing Song")}
        if(announce)API.sendChat("@"+data.from+" I will meh this song.");
    }
          if (script && data.message.indexOf("808, meh this song") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        setTimeout(function(){$("#button-vote-negative").click();},1000);
        if(debug){updateChat("[#808] ","Mehing Song")}
        if(announce)API.sendChat("@"+data.from+" I will meh this song.");
    }
        if (script && data.message.indexOf("-woot") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        setTimeout(function(){$("#button-vote-positive").click();},1000);
        if(debug){updateChat("[#808] ","Wooting Song")}
        if(announce)API.sendChat("@"+data.from+" I will woot this song.");
    }
            if (script && data.message.indexOf("808, woot this song") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        setTimeout(function(){$("#button-vote-positive").click();},1000);
        if(debug){updateChat("[#808] ","Wooting Song")}
        if(announce)API.sendChat("@"+data.from+" I will woot this song.");
    }
    if (script && data.message.indexOf("-autowoot on") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        wootmode = "Auto";
        if(mirror){
            mirror = false;
            if(debug){updateChat("[#808] ","Mirror turned off due to autowoot")}
          }
        autowoot = true;
        if(debug) updateChat("[#808] ","Autowoot turned on by ,DerpTheBass'");
        if(announce)API.sendChat("@"+data.from+" I have turned on autowoot!");
    }
        if (script && data.message.indexOf("808, turn autowoot on") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        wootmode = "Auto";
        if(mirror){
            mirror = false;
            if(debug){updateChat("[#808] ","Mirror turned off due to autowoot")}
          }
        autowoot = true;
        if(debug) updateChat("[#808] ","Autowoot turned on by ,DerpTheBass'");
        if(announce)API.sendChat("@"+data.from+" I have turned on autowoot!");
    }
     if (script && data.message.indexOf("-curate") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
            var playlistID = Models.playlist.getSelected().id
            new DJCurateService(playlistID);
            setTimeout(function(){Dialog.closeDialog();}, 1000);
            if(debug){updateChat("[#808] ","Added to current playlist")}
            if(announce)API.sendChat("@"+data.from+" I have added this song to my playlist.");
        }
             if (script && data.message.indexOf("808, add this song to your playlist") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
            var playlistID = Models.playlist.getSelected().id
            new DJCurateService(playlistID);
            setTimeout(function(){Dialog.closeDialog();}, 1000);
            if(debug){updateChat("[#808] ","Added to current playlist")}
            if(announce)API.sendChat("@"+data.from+" I have added this song to my playlist.");
        }
    if (script && !Recent && data.message.indexOf("-ping") > -1) {
        API.sendChat("@"+data.from+" Pong!");
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
        if (debug) updateChat("[#808] ","Pong");
    }
        if (script && !Recent && data.message.indexOf("808, return my ping") > -1) {
        API.sendChat("@"+data.from+" Pong!");
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
        if (debug) updateChat("[#808] ","Pong");
    }
       if (script && !Recent && data.message.indexOf("is it weird day") > -1) {
        API.sendChat("@"+data.from+" "+weird);
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
        if (debug) updateChat("[#808] ","@"+data.from+" "+weird);
    }
           if (script && !Recent && data.message.indexOf("is it play anything day") > -1) {
        API.sendChat("@"+data.from+" "+weird);
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
    }
              if (script && !Recent && data.message.indexOf("is it still play anything day") > -1) {
        API.sendChat("@"+data.from+" "+weird);
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
    }
                  if (script && !Recent && data.message.indexOf("is it still weird day") > -1) {
        API.sendChat("@"+data.from+" "+weird);
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
    }
               if (script && !Recent && data.message.indexOf("so its weird day now") > -1) {
        API.sendChat("@"+data.from+" "+weird);
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
    }
                   if (script && !Recent && data.message.indexOf("so its play anything day now") > -1) {
        API.sendChat("@"+data.from+" "+weird);
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
    }
           if (script && !Recent && data.message.indexOf("Is it weird day") > -1) {
        API.sendChat("@"+data.from+" "+weird);
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
        if (debug) updateChat("[#808] ","@"+data.from+" "+weird);
    }
           if (script && !Recent && data.message.indexOf("Is it play anything day") > -1) {
        API.sendChat("@"+data.from+" "+weird);
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
    }
               if (script && !Recent && data.message.indexOf("is today weird day") > -1) {
        API.sendChat("@"+data.from+" "+weird);
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
    }
                   if (script && !Recent && data.message.indexOf("is today play anything day") > -1) {
        API.sendChat("@"+data.from+" "+weird);
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
    }
        if (script && !Recent && data.message.indexOf("-pong") > -1) {
        API.sendChat("I heard that "+data.from+" likes little asian boys.");
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
        if (debug) updateChat("[#808] ","lelelelele");
    }
                if (script && !Recent && data.message.indexOf("-bassplug") > -1) {
        API.sendChat("@"+data.from+" http://code.derpthebass.com/bassplug");
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
        if (debug) updateChat("[#808] ","Sending bassplug");
    }
                    if (script && !Recent && data.message.indexOf("-bpl") > -1) {
        API.sendChat("@"+data.from+" http://goo.gl/TBxNg");
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
        if (debug) updateChat("[#808] ","Sending bassplug");
    }
    if (script && data.message.indexOf("-woot off") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        wootmode = "Off";
        if(mirror){
            mirror = false;
            if(debug) updateChat("[#808} ","Mirror turned of due to autowoot");
        }
            autowoot = false;
            if(debug){updateChat("[#808] ","Autowoot turned off by ,DerpTheBass'")}
            if(announce)API.sendChat("@"+data.from+" I have turned off autowoot!");
        }
            if (script && data.message.indexOf("808, turn autowoot off") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
        wootmode = "Off";
        if(mirror){
            mirror = false;
            if(debug) updateChat("[#808} ","Mirror turned of due to autowoot");
        }
            autowoot = false;
            if(debug){updateChat("[#808] ","Autowoot turned off by ,DerpTheBass'")}
            if(announce)API.sendChat("@"+data.from+" I have turned off autowoot!");
        }
        if (script && data.message.indexOf("-mirror on") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
            wootmode = "Mirror";
            if(autowoot){
                if(debug) updateChat("[#808} ","Autowoot turned off due to mirror");
                autowoot = false;
            }
            mirror = true;
            if(debug){updateChat("[#808] ","Mirror vote turned on by ,DerpTheBass'")}
            if(announce)API.sendChat("@"+data.from+" I am now mirroring your votes!");
        }
                if (script && data.message.indexOf("808, mirror my votes") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
            wootmode = "Mirror";
            if(autowoot){
                if(debug) updateChat("[#808} ","Autowoot turned off due to mirror");
                autowoot = false;
            }
            mirror = true;
            if(debug){updateChat("[#808] ","Mirror vote turned on by ,DerpTheBass'")}
            if(announce)API.sendChat("@"+data.from+" I am now mirroring your votes!");
        }
        if (script && data.message.indexOf("-mirror off") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
            wootmode = "Off";
            if(autowoot){
                autowoot = false;
                if(debug) updateChat("[#808]"," Autowoot turned off due to mirror");
            }
            mirror = false;
            if(debug) updateChat("[#808] ","Mirror vote turned off by ,DerpTheBass'");
            if(announce)API.sendChat("@"+data.from+" I will not mirror your votes anymore.");
        }
                if (script && data.message.indexOf("808, stop mirroring my votes") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
            wootmode = "Off";
            if(autowoot){
                autowoot = false;
                if(debug) updateChat("[#808]"," Autowoot turned off due to mirror");
            }
            mirror = false;
            if(debug) updateChat("[#808] ","Mirror vote turned off by ,DerpTheBass'");
            if(announce)API.sendChat("@"+data.from+" I will not mirror your votes anymore.");
        }
        /*if (data.message.indexOf("-leave") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getSelf().id)) {
         setTimeout(function(){window.close},2000);
         }*/
        if (script && /-nick (.*)$/.exec(data.message) && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
            Models.user.changeDisplayName(RegExp.$1);
            updateChat("[#808] ","Username changed by ,DerpTheBass'");
        }
                if (script && /-join (.*)$/.exec(data.message) && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
           location = "http://plug.dj/"+RegExp.$1;
            if(debug)updateChat("[#808] ","Sent to "+RegExp.$1);
            if(announce)Models.chat.sendChat("Going to "+RegExp.$1);
        }
         if (script && /808, change your name to (.*)$/.exec(data.message) && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getuser().id)) {
            Models.user.changeDisplayName(RegExp.$1);
            updateChat("[#808] ","Username changed by ,DerpTheBass'");
        }
        if (data.message.indexOf("-info") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
            var elapsed = new Date().getTime() - joined;
            API.sendChat("@,DerpTheBass' I've been running for "+Math.round(elapsed/100000)+" minutes."+" Running on "+BrowserDetect.browser+" Version "+BrowserDetect.version+" on "+BrowserDetect.OS+". Woot mode: "+wootmode+ ". Debug: "+debug+" Status: "+status+" Announce: "+announce);
            if(debug){console.log("[#808] Sending status/info")}
        }
               if (data.message.indexOf("808, give me your stats") > -1 && (data.fromID === "50aeb07e96fba52c3ca04ca8" || API.getUser().id)) {
            var elapsed = new Date().getTime() - joined;
            API.sendChat("@,DerpTheBass' I've been running for "+Math.round(elapsed/100000)+" minutes."+" Running on "+BrowserDetect.browser+" Version "+BrowserDetect.version+" on "+BrowserDetect.OS+". Woot mode: "+wootmode+ ". Debug: "+debug+" Status: "+status+" Announce: "+announce);
            if(debug){console.log("[#808] Sending status/info")}
        }
    }

    /**************Browser Detect****************/

   var BrowserDetect = {
    init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();
