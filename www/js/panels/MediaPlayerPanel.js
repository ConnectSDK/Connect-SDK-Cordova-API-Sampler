enyo.kind({
    name: "MediaPlayerPanel",
    kind: "CapabilityPanel",
    
    components: [
        {kind: "enyo.Scroller", classes: "enyo-fit", controlClasses: "margin", components: [
            // Image launcher form
            {kind: "MediaPlayerLauncher",
             heading: "Show Image", command: "displayImage", capability: "MediaPlayer.Display.Image",
             onLaunch: "handleImageLaunch",
             url: "http://www.spacex.com/sites/spacex/files/styles/media_gallery_large/public/ghopper_325_1.png"
            },
            
            // Controls for last image launched
            {name: "imageLaunchSessionView", kind: "LaunchSessionView", title: "Image LaunchSession"},
            
            // Video launcher form
            {kind: "MediaPlayerLauncher",
             heading: "Show Video", command: "playMedia",
             capability: "MediaPlayer.Display.Video",
             onLaunch: "handleVideoLaunch",
             url: "http://archive.org/download/dmbb33715/dmbb33715.mp4"},
            
            // Controls for last video launched
            {name: "videoLaunchSessionView", kind: "LaunchSessionView", title: "Video LaunchSession"},
        ]}
    ],
    
    handleImageLaunch: function (sender, event) {
        var launchSession = event.launchSession.acquire();
        
        this.$.imageLaunchSessionView.setLaunchSession(launchSession);
    },
    
    handleVideoLaunch: function (sender, event) {
        var launchSession = event.launchSession.acquire();
        
        this.$.videoLaunchSessionView.setLaunchSession(launchSession);
    }
});

enyo.kind({
    name: "MediaPlayerLauncher",
    
    style: "margin-bottom: 1em",
    
    published: {
        heading: "Show Media",
        command: "",
        capability: "",
        url: "",
        mimeType: ""
    },
    
    events: {
        onLaunch: ""
    },
    
    components: [
        {kind: "onyx.Groupbox", components: [
            {name: "heading", kind: "HeaderWithCapability"},
            {kind: "FittableInputDecorator", components: [
                {name: "url", kind: "onyx.Input", fit: true, placeholder: "URL"}
            ]},
            {kind: "FittableInputDecorator", components: [
                {name: "mimeType", kind: "onyx.Input", fit: true, placeholder: "MIME Type"}
            ]},
            {kind: "onyx.GroupboxHeader", content: "Optional Parameters"},
            {kind: "FittableInputDecorator", components: [
                {name: "title", kind: "onyx.Input", fit: true, placeholder: "Title"}
            ]},
            {kind: "FittableInputDecorator", components: [
                {name: "description", kind: "onyx.TextArea", fit: true, placeholder: "Description"}
            ]},
            {kind: "enyo.FittableColumns", style: "padding: 0.5em", components: [
                {name: "shouldLoop", kind: "CheckboxWithLabel", content: "Loop"},
                {fit: true},
                {name: "showButton", kind: "onyx.Button", content: "Show", ontap: "showMedia"},
            ]}
        ]}
    ],
    
    bindings: [
        {from: ".heading", to: ".$.heading.content"},
        {from: ".heading", to: ".$.showButton.content"},
        {from: ".url", to: ".$.url.value", oneWay: false},
        {from: ".mimeType", to: ".$.mimeType.value", oneWay: false},
        {from: ".notReady", to: ".$.showButton.disabled"},
        {from: ".capability", to: ".$.heading.capability"}
    ],
         
    computed: {
        notReady: ["url", "mimeType"]
    },
          
    create: function () {
        this.inherited(arguments);
        if (this.command === "displayImage") {
            this.$.shouldLoop.hide();
        }
    
        this.urlChanged();
    },
        
    extensionMap: {
        "jpg": "image/jpeg",
        "png": "image/png",
        "gif": "image/gif",
        "mp4": "video/mp4",
        "mpeg": "video/mpeg",
        "avi": "video/avi",
        "webm": "video/webm",
        "ogv": "video/ogg"
    },
        
    urlChanged: function () {
        if (this.url) {
            var mimeType = "";
            
            if (this.url) {
                var m = this.url.match(/.(\w+)$/);
                
                if (m && m[1]) {
                    var extension = m[1].toLowerCase();
                    
                    mimeType = this.extensionMap[extension] || "";
                }
            }
            
            this.set("mimeType", mimeType);
        }
    },
         
    showMedia: function () {
        var device = this.app.$.deviceController.getDevice();
        
        var mimeType = this.mimeType;
        
        var options = {
            title: this.$.title.getValue(),
            description: this.$.description.getValue(),
            shouldLoop: this.$.shouldLoop.getChecked()
        };
        
        var req = device.getMediaPlayer()[this.command](this.url, mimeType, options);
        req.success(function (launchSession) {
            this.app.showToast("Showing media ...");
            
            this.doLaunch({launchSession: launchSession});
        }, this).error(function (err) {
            this.app.showError(err);
        }, this);
    },
         
    notReady: function () {
        return !this.url || !this.mimeType;
    }
});

enyo.kind({
    name: "LaunchSessionView",
    kind: "onyx.Groupbox",
        
    showing: false,
    
    published: {
        title: "",
        launchSession: null
    },
    
    components: [
        {name: "title", kind: "onyx.GroupboxHeader"},
        {kind: "enyo.FittableColumns", components: [
            {fit: true},
            {kind: "onyx.Button", content: "Close", ontap: "close"}
        ]}
    ],
         
    bindings: [
        {from: ".title", to: ".$.title.content"}
    ],
    
    launchSessionChanged: function (old) {
        if (old) {
            old.release();
        }
          
        if (this.launchSession) {
            this.launchSession.acquire();
            this.show();
        } else {
            this.hide();
        }
        
        this.resized();
    },
    
    close: function () {
        this.launchSession.close();
        this.setLaunchSession(null);
    }
});