$(document).ready(function(){
    //Init
    API.addEventListener(API.CHAT, chat);
    API.addEventListener(API.DJ_ADVANCE, DJ_Advance);
    API.addEventListener(API.VOTE_UPDATE, Vote_Update);

    version = 1.00;

    updateChat = function(from, message){
      Models.chat.receive({
          type: "update",
          from: from,
          message: message,
          language: Models.user.data.language
      })
    };

    var joined = new Date().getTime();

    if(localStorage.getItem("hasRun") != "Yes"){
    var botsettings = {
        debug: false,
        autowoot: true,
        script: true,
        wootmode: "Auto",
        status: "Running",
        announce: true,
        oldusers: [],
        save: function(){
        localStorage.setItem("botsettings" , JSON.stringify(botsettings));
    },
        load: function(){
            var botsettings = JSON.parse(localStorage.getItem("botsettings"));
        }
    };
    }else{
        var botsettings = JSON.parse(localStorage.getItem("botsettings"));
    }
    setTimeout(function(){
    	API.sendChat("/me - Started and running 808_Mod version "+version);
    }, 1000);
    console.log("[808_Mod] Running 808_Mod Version "+version);
    Models.user.changeStatus(0);

    //Functions
function DJ_Advance(){
 if(botsettings.script && autowoot){
     setTimeout(function() { $("#button-vote-positive").click }, 5000);
     if(debug)console.log("[808_Mod] AutoWooting "+Playback.media.title);
 }
}

function Vote_Update(obj){
    if(obj.vote === -1) API.sendChat("@"+obj.user.username+" Please do not meh, you may be kicked for excessive mehing.");
}

    //Commands
    function chat(data){
        //manager+ commands
        if(Models.room.data.staff[data.fromID] > 2){

            if(data.message.indexOf("-stop") === 0){
                botsettings.script = false;
                botsettings.status = "At Idle";
                console.log("[808_Mod] 808 stopped..");
                if(botsettings.announce)API.sendChat("/me - Going into sleep mode..");
                Models.user.changeStatus(3);
                botsettings.save();
            }
           if(data.message.indexOf("-start") === 0){
               botsettings.script = true;
               botsettings.status = "Running";
               console.log("[808_Mod] Started and running");
               if(botsettings.announce)API.sendChat("/me Started and running 808_Mod Version "+version);
               Models.user.changeStatus(0);
               botsettings.save();
               setTimeout(function(){
    	API.sendChat("/me - Started and running 808_Mod version "+version);
    }, 100);
           }
            if(botsettings.script && data.message.indexOf("-debug") === 0){
                botsettings.debug = !botsettings.debug;
                API.sendChat("@"+data.from+" Debug: "+botsettings.debug);
                if(botsettings.debug)console.log("[808_Mod] Announce mode toggled; "+botsettings.debug);
                botsettings.save();
            }
            if(botsettings.script && data.message.indexOf("-clear") === 0){
                API.sendChat("/clear");
                if(botsettings.announce)API.sendChat("/me Chat cleared");
                if(botsettings.debug)console.log("[808_Mod] Chat cleared");
                botsettings.save();
            }
            if (botsettings.script && data.message.indexOf("-announce") === 0) {
                botsettings.announce = !botsettings.announce;
                if(botsettings.announce)API.sendChat("@"+data.from+" Announce: "+botsettings.announce);
                if(botsettings.debug)console.log("[Thom] Announce mode toggled");
                botsettings.save();
            }
            if (botsettings.script && data.message.indexOf("-clear") === 0) {
                API.sendChat("/clear");
                if(botsettings.announce)API.sendChat("@"+data.from+" Chat cleared!");
                if(botsettings.debug)console.log("[Thom] Chat cleared");
                botsettings.save();
            }
            if (botsettings.script && data.message.indexOf("-meh") === 0) {
                setTimeout(function(){$("#button-vote-negative").click();},1000);
                if(botsettings.debug)console.log("[Thom] Mehing Song");
                if(botsettings.announce)API.sendChat("@"+data.from+" I have mehed "+Playback.media.title);
                botsettings.save();
            }
            if (botsettings.script && data.message.indexOf("-woot") === 0) {
                setTimeout(function(){$("#button-vote-positive").click();},1000);
                if(botsettings.debug)console.log("[Thom] Wooting Song");
                if(botsettings.announce)API.sendChat("@"+data.from+" I have wooted this song.");
                botsettings.save();
            }
            if (botsettings.script && data.message.indexOf("-autowoot") === 0) {
                if(!botsettings.autowoot)botsettings.wootmode="Auto";else botsettings.wootmode="Manual";
                botsettings.autowoot = !botsettings.autowoot;
                if(botsettings.debug) updateChat("[Thom] ","Autowoot: "+botsettings.autowoot);
                if(botsettings.announce)API.sendChat("@"+data.from+" Autowoot: "+botsettings.autowoot);
                botsettings.save();
            }
            if (botsettings.script && data.message.indexOf("-curate") === 0) {
                var playlistID = Models.playlist.getSelected().id;
                new DJCurateService(playlistID);
                setTimeout(function(){Dialog.closeDialog();}, 1000);
                if(botsettings.debug)console.log("[Thom] Added "+Playback.media.title+" to current playlist");
                if(botsettings.announce)API.sendChat("@"+data.from+" I have added "+Playback.media.title+" to the current playlist");
                botsettings.save();
            }
            if (botsettings.script && /-nick (.*)$/.exec(data.message) ) {
                Models.user.changeDisplayName(RegExp.$1);
                if(botsettings.debug)console.log("[Thom] Username changed to "+RegExp.$1);
                botsettings.save();
            }
            //bouncer+ commands
        if (Models.room.data.staff[data.fromID] && Models.room.data.staff[data.fromID] > 1) {
            if (botsettings.script && data.message.indexOf("-skip") === 0) {
                new ModerationForceSkipService();
                botsettings.save();
            }
            if (botsettings.script && /-remove @(.*)$/.exec(data.message)) {
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
            if (botsettings.script && /-add @(.*)$/.exec(data.message)) {
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
                }
            }
            if (botsettings.script && /-kick @(.*)$/.exec(data.message)) {
                target = RegExp.$1;
                var usernames = [],id = [],users = API.getUsers();
                for (var i in users) {
                    usernames.push(users[i].username);
                    id.push(users[i].id);
                }
                if (usernames.indexOf(target) < 0) API.sendChat("@"+data.from+" I don't see a user named ' "+target+" '");
                else {
                    listlocation = usernames.indexOf(target);
                    new ModerationKickUserService(id[listlocation], "Kicked by the bot", 300);
                }
            }
            if (data.message.indexOf("-info") === 0) {
                var elapsed = new Date().getTime() - joined;
                API.sendChat("@"+data.from+" Bot coded by ,DerpTheBass'. I've been running for "+Math.round(elapsed/100000)+" minute(s)."+" Running on "+BrowserDetect.browser+" Version "+BrowserDetect.version+" on "+BrowserDetect.OS+". Woot mode is: "+botsettings.wootmode+ ". Debug is: "+botsettings.debug+". Status: "+botsettings.status+". Announce is: "+botsettings.announce);
                if(botsettings.debug)console.log("[Thom] Sending info");
            }
            if (data.message.indexOf("-status") === 0) {
                API.sendChat("@"+data.from+" Woot mode is: "+botsettings.wootmode+ ". Debug is: "+botsettings.debug+". Status: "+botsettings.status+". Announce is: "+botsettings.announce);
                if(botsettings.debug)console.log("[Thom] Sending status");
            }

        }
    }
    }
localStorage.setItem("hasRun", "Yes");

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
});
