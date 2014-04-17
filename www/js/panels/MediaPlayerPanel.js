//
//  Connect SDK Cordova API Sampler by LG Electronics
//
//  To the extent possible under law, the person who associated CC0 with
//  this sample app has waived all copyright and related or neighboring rights
//  to the sample app.
//
//  You should have received a copy of the CC0 legalcode along with this
//  work. If not, see http://creativecommons.org/publicdomain/zero/1.0/.
//

enyo.kind({
    name: "MediaPlayerPanel",
    kind: "CapabilityPanel",
    
    components: [
        {kind: "enyo.Scroller", classes: "enyo-fit", controlClasses: "margin", components: [
            // Image launcher form
            {kind: "MediaPlayerLauncher",
             heading: "Show Image", type: "image", capability: "MediaPlayer.Display.Image",
             onMediaLaunch: "handleImageLaunch",
             url: "http://www.spacex.com/sites/spacex/files/styles/media_gallery_large/public/ghopper_325_1.png"
            },
            
            // Controls for last image launched
            {name: "imageLaunchSessionView", kind: "MediaSessionView", title: "Image LaunchSession"},
            
            // Video launcher form
            {kind: "MediaPlayerLauncher",
             heading: "Show Video", type: "media",
             capability: "MediaPlayer.Display.Video",
             onMediaLaunch: "handleVideoLaunch",
             url: "http://archive.org/download/dmbb33715/dmbb33715.mp4"},
            
            // Controls for last video launched
            {name: "videoLaunchSessionView", kind: "MediaSessionView", title: "Video MediaControl"},
        ]}
    ],
    
    handleImageLaunch: function (sender, event) {
        var launchSession = event.launchSession.acquire();
        
        this.$.imageLaunchSessionView.setLaunchSession(launchSession);
    },
    
    handleVideoLaunch: function (sender, event) {
        var mediaControl = event.mediaControl.acquire();
        var launchSession = event.launchSession.acquire();
        
        this.$.videoLaunchSessionView.setMediaControl(mediaControl);
        this.$.videoLaunchSessionView.setLaunchSession(launchSession);
    }
});

enyo.kind({
    name: "MediaPlayerLauncher",
    
    style: "margin-bottom: 1em",
    
    published: {
        type: "",
        heading: "Show Media",
        capability: "",
        url: "",
        mimeType: ""
    },
    
    events: {
        onMediaLaunch: ""
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
        {from: ".capability", to: ".$.heading.capability"},
        {from: ".app.$.deviceController.device", to: ".device"}
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
            
            // Guess mimeType based on the url (note that not all urls have extensions)
            // Fills in mimeType input field with guess
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
        var mimeType = this.mimeType;
        
        var options = {
            title: this.$.title.getValue(),
            description: this.$.description.getValue(),
            shouldLoop: this.$.shouldLoop.getChecked()
        };
        
        var req;
        
        if (this.type === "image") {
            req = this.device.getMediaPlayer().displayImage(this.url, mimeType, options);
        } else {
            req = this.device.getMediaPlayer().playMedia(this.url, mimeType, options);
        }
        
        req.success(function (launchSession, mediaControl) {
            this.app.showToast("Showing media ...");
            
            // Broadcast event with launchSession so the main panel can show the media controls
            this.doMediaLaunch({launchSession: launchSession, mediaControl: mediaControl});
        }, this).error(function (err) {
            this.app.showError(err);
        }, this);
    },
         
    notReady: function () {
        // Disable show button if url or mimeType is missing
        return !this.url || !this.mimeType;
    }
});

enyo.kind({
    name: "MediaSessionView",
    kind: "onyx.Groupbox",
        
    showing: false,
    
    published: {
        title: "",
        mediaControl: null,
        launchSession: null
    },
    
    components: [
        {name: "title", kind: "onyx.GroupboxHeader"},
        {kind: "enyo.FittableColumns", components: [
            {fit: true},
            {kind: "onyx.Button", content: "Close", ontap: "close"}
        ]},
        {name: "mediaButtons", showing: false, components: [
            {kind: "onyx.Button", content: "Play", ontap: "play"},
            {kind: "onyx.Button", content: "Pause", ontap: "pause"},
            {kind: "onyx.Button", content: "RW", ontap: "rewind"},
            {kind: "onyx.Button", content: "FF", ontap: "fastForward"}
        ]},
    ],
         
    bindings: [
        {from: ".title", to: ".$.title.content"}
    ],
    
    mediaControlChanged: function (old) {
        if (old) {
            // clean up old launchSession
            old.release();
        }
          
        if (this.mediaControl) {
            this.mediaControl.acquire();
            this.$.mediaButtons.show();
        } else {
            this.$.mediaButtons.hide();
        }
    },
    
    launchSessionChanged: function (old) {
        if (old) {
            // clean up old launchSession
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
    
    play: function () {
        this.mediaControl.play();
    },
    
    pause: function () {
        this.mediaControl.pause();
    },
    
    rewind: function () {
        this.mediaControl.rewind();
    },
    
    fastForward: function () {
        this.mediaControl.fastForward();
    },
    
    close: function () {
        this.launchSession.close();
        this.setLaunchSession(null);
    }
});