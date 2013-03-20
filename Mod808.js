if(announce)API.sendChat("Started and running #808_Mod Version"+version);

API.addEventListener(API.CHAT, callback);
function callback(data){
if (Models.room.data.staff[API.getSelf().id] && Models.room.data.staff[API.getSelf().id] > 1){
    if (data.message.indexOf("-stop") === 0) {
        script = false,
        API.removeEventListener(API.DJ_ADVANCE, newdj)
        status = "At idle";
            console.log("[Thom] at idle");
            if(announce)API.sendChat("Going into standby...");
        Models.user.changeStatus(3);
    }
    if (data.message.indexOf("-start") === 0) {
        script = true;
        API.addEventListener(API.DJ_ADVANCE, newdj)
        status = "Running";
        console.log("[Thom] started");
        if(announce)API.sendChat("Started back up!");
        Models.user.changeStatus(0);
    }
  }
}

debug = false;
autowoot = true;
script = true;
wootmode = "Auto";
Recent = false;
status = "Running";
announce = true;

version = "1.00";

var updateChat = function(from, message){
    Models.chat.receive({
        type: "update",
        from: from,
        message: message,
        language: Models.user.data.language
    })
};

var joined = new Date().getTime();

/******************************/
API.addEventListener(API.CHAT, command);

API.addEventListener(API.VOTE_UPDATE, voteUpdate);

API.addEventListener(API.DJ_ADVANCE, DJAdvance);

console.log("[Thom] Running #808_Mod Version"+version);

setTimeout(function(){Models.user.changeStatus(0)},2000);
    
    function DJAdvance(){
        if(script && autowoot){
        setTimeout(function(){$("#button-vote-positive").click();},5000);
        if(debug){console.log("[Thom] Autowooting song")}
    }
}
/*   
API.addEventListener(API.DJ_ADVANCE, newdj);
function newdj(){
	if(oldDJs.indexOf(API.getDJs()[4].id) === -1){
	oldDJs.push(API.getDJs()[4].id);
        localStorage.setItem("storedDJs", JSON.stringify(oldDJs));
	if(debug) console.log("[#808] New DJ");
	//API.sendChat("@"+API.getDJs()[4].username+" I've never seen you DJ here before, keep in mind only pony music is allowed. Music guidlines: 'thisisatest' ");
	}
}
*/
/******************************/
function command(data) {
	if (Models.room.data.staff[API.getSelf().id] && Models.room.data.staff[API.getSelf().id] > 1){
    if (script && data.message.indexOf("-debug") === 0) {
        debug = !debug;
        if(announce)API.sendChat("@"+data.from+" Debug: "+debug);
        if(debug)console.log("[Thom] Debug mode toggled");
    }
       if (script && data.message.indexOf("-announce") === 0) {
        announce = !announce;
        if(announce)API.sendChat("@"+data.from+" I will now announce events!");
        if(debug)console.log("[Thom] Announce mode toggled");
    }
       if (script && data.message.indexOf("-clear") === 0) {
        API.sendChat("/clear");
        if(announce)API.sendChat("@"+data.from+" Chat cleared!");
        if(debug)console.log("[Thom] Chat cleared");
    }
      if (script && data.message.indexOf("-meh") === 0) {
        setTimeout(function(){$("#button-vote-negative").click();},1000);
        if(debug)console.log("[Thom] Mehing Song");
        if(announce)API.sendChat("@"+data.from+" I have mehed this song.");
    }
        if (script && data.message.indexOf("-woot") === 0) {
        setTimeout(function(){$("#button-vote-positive").click();},1000);
        if(debug)console.log("[Thom] Wooting Song");
        if(announce)API.sendChat("@"+data.from+" I have wooted this song.");
    }
    if (script && data.message.indexOf("-autowoot on") === 0) {
        wootmode = "Auto";
        autowoot = true;
        if(debug) updateChat("[Thom] ","Autowoot turned on");
        if(announce)API.sendChat("@"+data.from+" I have turned on autowoot!");
    }
     if (script && data.message.indexOf("-curate") === 0) {
            var playlistID = Models.playlist.getSelected().id
            new DJCurateService(playlistID);
            setTimeout(function(){Dialog.closeDialog();}, 1000);
            if(debug)console.log("[Thom] Added "+Playback.media.title+" to current playlist");
            if(announce)API.sendChat("@"+data.from+" I have added "+Playback.media.title+" to the current playlist");
        }
    if (script && data.message.indexOf("-autowoot off") === 0) {
        wootmode = "Off";
            autowoot = false;
            if(debug)console.log("[Thom] Autowoot turned off");
            if(announce)API.sendChat("@"+data.from+" I have turned off autowoot!");
        }
        if (script && data.type === "mention" && /-nick (.*)$/.exec(data.message) && data.fromID === "50aeb07e96fba52c3ca04ca8") {
            Models.user.changeDisplayName(RegExp.$1);
            if(debug)console.log("[Thom] Username changed");
        }
        if (data.type === "mention" && data.message.indexOf("-info") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
            var elapsed = new Date().getTime() - joined;
            API.sendChat("@,DerpTheBass' I've been running for "+Math.round(elapsed/100000)+" minutes."+" Running on "+BrowserDetect.browser+" Version "+BrowserDetect.version+" on "+BrowserDetect.OS+". Woot mode: "+wootmode+ ". Debug: "+debug+". Status: "+status+". Announce: "+announce);
            if(debug){console.log("[#808] Sending status/info")}
        }
    }
        if (script && !Recent && data.message.indexOf("-ping") \=== 0) {
        API.sendChat("@"+data.from+" Pong!");
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
        if (debug)console.log("[Thom] Pong");
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