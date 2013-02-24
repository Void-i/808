API.addEventListener(API.CHAT, callback);
function callback(data){
    if (data.type === "mention" && data.message.indexOf("-stop") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        script = false,
            console.log("[#808] at idle");
        Models.user.changeStatus(3);
    }
    if (data.type === "mention" && data.message.indexOf("-start") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        script = true;
        console.log("[#808] started");
        Models.user.changeStatus(0);
    }
}

debug = false;
autowoot = false;
mirror = true;
script = true;
wootmode = "Mirror";

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

//setTimeout(function(){API.sendChat("@,DerpTheBass' :3")}, 3000);

console.log("[#808] Running #808 Alt control script");

setTimeout(function(){Models.user.changeStatus(0)},2000);
    
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
    


/******************************/
function command(data) {
    if (script && data.type === "mention" && data.message.indexOf("-debug") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        debug = !debug;
        if(debug){updateChat("[#808] ","Debug mode on")}
    }
    if (script && data.type === "mention" && data.message.indexOf("-avail" || "-back" || "-here") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(0);
        if(debug){updateChat("[#808] ","Status changed by ,DerpTheBass'")}
    }
    if (script && data.type === "mention" && data.message.indexOf("-afk" || "-away" || "-brb") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(1);
        if(debug){updateChat("[#808] ","Status changed by ,DerpTheBass'")}
    }
    if (script && data.type === "mention" && data.message.indexOf("-sleeping" || "-sleep") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(3);
        if(debug){updateChat("[#808] ","Status changed by ,DerpTheBass'")}
    }
    if (script && data.type === "mention" && data.message.indexOf("-idle" || "-gaming") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(-1);
        if(debug){updateChat("[#808] ","Status changed by ,DerpTheBass'")}
    }
    if (script && data.type === "mention" && data.message.indexOf("-working" || "-work") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        Models.user.changeStatus(2);
        if(debug){updateChat("[#808] ","Status changed by ,DerpTheBass'")}
    }
      if (script && data.type === "mention" && data.message.indexOf("-meh") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        setTimeout(function(){$("#button-vote-negative").click();},1000);
        if(debug){updateChat("[#808] ","Mehing Song")}
    }
        if (script && data.type === "mention" && data.message.indexOf("-woot") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        setTimeout(function(){$("#button-vote-positive").click();},1000);
        if(debug){updateChat("[#808] ","Wooting Song")}
    }
    if (script && data.type === "mention" && data.message.indexOf("-woot on") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        wootmode = "Auto";
        if(mirror){
            mirror = false;
            if(debug){updateChat("[#808] ","Mirror turned off due to autowoot")}
        }
        autowoot = true;
        if(debug){updateChat("[#808] ","Autowoot turned on by ,DerpTheBass'")}
    }
    if (script && data.message.indexOf("-ping") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        API.sendChat("@,DerpTheBass' Pong!");
    }
    if (script && data.type === "mention" && data.message.indexOf("-woot off") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
        wootmode = "Off";
        if(mirror){
            mirror = false;
            updateChat("[#808} ","Mirror turned of due to autowoot")
        }
            autowoot = false;
            if(debug){updateChat("[#808] ","Autowoot turned off by ,DerpTheBass'")}
        }
        if (script && data.type === "mention" && data.message.indexOf("-mirror on") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
            wootmode = "Mirror";
            if(autowoot){
                updateChat("[#808} ","Autowoot turned off due to mirror");
                autowoot = false;
            }
            mirror = true;
            if(debug){updateChat("[#808] ","Mirror vote turned on by ,DerpTheBass'")}
        }
        if (script && data.type === "mention" && data.message.indexOf("-mirror off") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
            wootmode = "Off";
            if(autowoot){
                autowoot = false;
                updateChat("[#808]"," Autowoot turned off due to mirror");
            }
            mirror = false;
            updateChat("[#808] ","Mirror vote turned off by ,DerpTheBass'");
        }
        /*if (data.type === "mention" && data.message.indexOf("-leave") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
         setTimeout(function(){window.close},2000);
         }*/
        if (script && data.type === "mention" && /-nick (.*)$/.exec(data.message) && data.fromID === "50aeb07e96fba52c3ca04ca8") {
            Models.user.changeDisplayName(RegExp.$1);
            updateChat("[#808] ","Username changed by ,DerpTheBass'");
        }
        if (script && data.type === "mention" && data.message.indexOf("-info") > -1 && data.fromID === "50aeb07e96fba52c3ca04ca8" ) {
            var elapsed = new Date().getTime() - joined;
            API.sendChat("/em has been running for "+Math.round(elapsed/100000)+" minutes."+" Running on "+BrowserDetect.browser+" on "+BrowserDetect.OS+". Woot mode: "+wootmode+ ". Debug: "+debug);
            if(debug){console.log("Sending status/info")}
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

