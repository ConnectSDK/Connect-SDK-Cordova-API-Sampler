enyo.kind({
    name: "MediaPlayerPanel",
    kind: "CapabilityPanel",
    
    components: [
        {kind: "enyo.Scroller", classes: "enyo-fit", controlClasses: "margin", components: [
            {kind: "MediaPlayerLauncher", heading: "Show Image", command: "displayImage", capability: "MediaPlayer.Display.Image", url: "http://www.spacex.com/sites/spacex/files/styles/media_gallery_large/public/ghopper_325_1.png"
            },
            {kind: "MediaPlayerLauncher", heading: "Show Video", command: "displayVideo", capability: "MediaPlayer.Display.Video"}
        ]}
    ]
});

enyo.kind({
    name: "MediaPlayerLauncher",
    
    style: "margin-bottom: 1em",
    
    published: {
        heading: "Show Media",
        command: "",
        capability: "",
        url: ""
    },
    
    components: [
        {kind: "onyx.Groupbox", components: [
            {name: "heading", kind: "HeaderWithCapability"},
            {kind: "FittableInputDecorator", components: [
                {name: "url", kind: "onyx.Input", fit: true, placeholder: "URL"}
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
        {from: ".notReady", to: ".$.showButton.disabled"},
        {from: ".capability", to: ".$.heading.capability"}
    ],
         
    computed: {
        notReady: ["url"]
    },
          
    create: function () {
        this.inherited(arguments);
        if (this.command === "displayImage") {
            this.$.shouldLoop.hide();
        }
    },
         
    showMedia: function () {
        var device = this.app.$.deviceController.getDevice();
        
        var mimeType = "";
        
        var options = {
            title: this.$.title.getValue(),
            description: this.$.description.getValue(),
            shouldLoop: this.$.shouldLoop.getChecked()
        };
        
        var req = device.getMediaPlayer()[this.command](this.url, mimeType, options);
        req.success(function () {
            this.app.showToast("Showing media ...");
        }, this).error(function (err) {
            this.app.showError(err);
        }, this);
    },
         
    notReady: function () {
        return !this.url;
    }
});
