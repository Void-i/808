API.addEventListener(API.CHAT, callback);
function callback(data){
	//Manager+ commands (too lazy to order the permissions properly)
if (Models.room.data.staff[data.fromID] && Models.room.data.staff[data.fromID] > 2) {
    if (data.message.indexOf("-stop") === 0) {
        script = false,
        status = "At idle";
            console.log("[Thom] at idle");
            if(announce)API.sendChat("Going into standby...");
        Models.user.changeStatus(3);
    }
    if (data.message.indexOf("-start") === 0) {
        script = true;
        status = "Running";
        console.log("[Thom] started");
        if(announce)API.sendChat("Started back up!");
        Models.user.changeStatus(0);
    }
     if (script && data.message.indexOf("-debug") === 0) {
        debug = !debug;
        if(announce)API.sendChat("@"+data.from+" Debug: "+debug);
        if(debug)console.log("[Thom] Debug mode toggled");
    }
       if (script && data.message.indexOf("-announce") === 0) {
        announce = !announce;
        if(announce)API.sendChat("@"+data.from+" I will now announce events!");
        if(!announce)API.sendChat("@"+data.from+" I will no longer announce events!");
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
    if (script && data.message.indexOf("-autowoot") === 0) {
        if(!autowoot)wootmode="Auto";else wootmode="Manual";
        autowoot = !autowoot;
        if(debug) updateChat("[Thom] ","Autowoot: "+autowoot);
        if(announce)API.sendChat("@"+data.from+" Autowoot: "+autowoot);
    }
     if (script && data.message.indexOf("-curate") === 0) {
            var playlistID = Models.playlist.getSelected().id
            new DJCurateService(playlistID);
            setTimeout(function(){Dialog.closeDialog();}, 1000);
            if(debug)console.log("[Thom] Added "+Playback.media.title+" to current playlist");
            if(announce)API.sendChat("@"+data.from+" I have added "+Playback.media.title+" to the current playlist");
        }
                if (script && /-nick (.*)$/.exec(data.message) ) {
            Models.user.changeDisplayName(RegExp.$1);
            if(debug)console.log("[Thom] Username changed");
        }
        //bouncer+ commands
}if (Models.room.data.staff[data.fromID] && Models.room.data.staff[data.fromID] > 1) {
            if (script && data.message.indexOf("-skip") === 0) {
            new ModerationForceSkipService();
        }
               if (script && /-remove @(.*)$/.exec(data.message)) {
               	target = RegExp.$1;
                    var usernames = [],id = [],users = API.getUsers();
        for (var i in users) {
            usernames.push(users[i].username);
            id.push(users[i].id);
        }
        if (usernames.indexOf(target) < 0) API.sendChat("@"+data.from+" I don't see a user named ' "+target+" '");
        else {
            listlocation = usernames.indexOf(target);
            new ModerationRemoveDJService(id[listlocation]);
        }
               }
                              if (script && /-add @(.*)$/.exec(data.message)) {
               	target = RegExp.$1;
                    var usernames = [],id = [],users = API.getUsers();
        for (var i in users) {
            usernames.push(users[i].username);
            id.push(users[i].id);
        }
        if (usernames.indexOf(target) < 0) API.sendChat("@"+data.from+" I don't see a user named ' "+target+" '");
        else {
            listlocation = usernames.indexOf(target);
            new ModerationAddDJService(id[listlocation]);
            API.sendChat(id[listlocation]);
        }
               }
                              if (script && /-kick @(.*)$/.exec(data.message)) {
               	target = RegExp.$1;
                    var usernames = [],id = [],users = API.getUsers();
        for (var i in users) {
            usernames.push(users[i].username);
            id.push(users[i].id);
        }
        if (usernames.indexOf(target) < 0) API.sendChat("@"+data.from+" I don't see a user named ' "+target+" '");
        else {
            listlocation = usernames.indexOf(target);
            new ModerationKickUserService(id[listlocation]);
        }
               }
        if (data.message.indexOf("-info") === 0) {
            var elapsed = new Date().getTime() - joined;
            API.sendChat("@"+data.from+" I've been running for "+Math.round(elapsed/100000)+" minute(s)."+" Running on "+BrowserDetect.browser+" Version "+BrowserDetect.version+" on "+BrowserDetect.OS+". Woot mode is: "+wootmode+ ". Debug is: "+debug+". Status: "+status+". Announce is: "+announce);
            if(debug)console.log("[Thom] Sending info");
        }
           if (data.message.indexOf("-status") === 0) {
            API.sendChat("@"+data.from+" Woot mode is: "+wootmode+ ". Debug is: "+debug+". Status: "+status+". Announce is: "+announce);
            if(debug)console.log("[Thom] Sending status");
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

version = "1.02";

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

API.addEventListener(API.DJ_ADVANCE, DJAdvance);

console.log("[Thom] Running #808_Mod Version "+version);

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
//Free for all commands
function command(data) { 
        if (script && !Recent && data.message.indexOf("-ping") === 0) {
        API.sendChat("@"+data.from+" Pong!");
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
        if (debug)console.log("[Thom] Pong");
    }
            if (script && !Recent && data.message.indexOf("-commands") === 0) {
        API.sendChat("@"+data.from+" http://goo.gl/7xOS4");
         Recent = true;
        setTimeout(function(){Recent = false;}, 30000);
        if (debug)console.log("[Thom] Sending the commands list");
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
