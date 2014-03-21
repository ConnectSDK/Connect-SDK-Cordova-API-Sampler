enyo.kind({
    name: "WebAppLauncherPanel",
    kind: "CapabilityPanel",
    
    controlClasses: "margin",
    
    published: {
        webAppId: undefined
    },

    components: [
        {kind: "onyx.Groupbox", components: [
            {kind: "HeaderWithCapability", content: "Launch WebApp", capability: "WebAppLauncher.Launch"},
            {kind: "onyx.InputDecorator", layoutKind: "enyo.FittableColumnsLayout", components: [
                {name: "webAppId", kind: "onyx.Input", fit: true, placeholder: "webAppId"},
                {name: "launchButton", kind: "onyx.Button", content: "Launch", ontap: "launchWebApp"}
            ]},
        ]},
        {kind: "WebAppSessionView"}
    ],
         
    bindings: [
        {from: ".webAppId", to: ".$.webAppId.value", oneWay: false}
    ],
         
    create: function () {
        this.inherited(arguments);
        
        if (!this.webAppId) {
            this.set("webAppId", localStorage.getItem("lastWebAppId"));
        }
    },
         
    webAppIdChanged: function () {
        this.$.launchButton.setDisabled(!this.webAppId);
    },

    launchWebApp: function () {
        if (this.webAppId) {
            this.device.getWebAppLauncher().launchWebApp(this.webAppId).success(function (session) {
                this.$.webAppSessionView.setWebAppId(this.webAppId);
                this.$.webAppSessionView.setSession(session);
                
                // Track history for sessions panel
                this.app.$.sessionController.addWebAppSession(this.webAppId, session);
            }, this);
            
            localStorage.setItem("lastWebAppId", this.webAppId);
        }
    }
});
        
enyo.kind({
    name: "WebAppSessionView",
        
    showing: false,
        
    published: {
        webAppId: "",
        session: null
    },
        
    components: [
        {kind: "onyx.Groupbox", components: [
            {name: "appName", kind: "onyx.GroupboxHeader"},
            {controlClasses: "margin", components: [
                {name: "connectButton", kind: "onyx.Button"},
                {name: "clearLogButton", kind: "onyx.Button", content: "Clear Log", ontap: "clearLog"},
                {kind: "onyx.Button", content: "Close", ontap: "close"}
            ]},
            {kind: "FittableInputDecorator", components: [
                {name: "input", kind: "onyx.Input", fit: true},
                {kind: "onyx.Button", content: "Send", ontap: "sendMessage"}
            ]}
        ]},
    ],
          
    bindings: [
        {from: ".webAppId", to: ".$.appName.content"}
    ],
        
    sessionChanged: function (oldSession) {
        if (oldSession) {
            oldSession.off("message", null, this); // remove listener
        }
        
        if (this.session) {
            this.session.on("message", this.bindSafely("handleMessage"), this);
            
            this.resetConnectButton();
            this.show();
            this.resized();
        } else {
            this.hide();
        }
    },
        
    resetConnectButton: function () {
        this.$.connectButton.setContent("Connect");
        this.$.connectButton.set("ontap", "connect");
    },
        
    connect: function () {
        this.$.connectButton.setContent("Connecting ...");
        this.$.connectButton.set("ontap", "disconnect");
        
        this.session.connect().success(function () {
            console.log("connected to app");
            this.$.connectButton.setContent("Disconnect");
            this.$.connectButton.set("ontap", "disconnect");
        }, this).error(function (err) {
            this.resetConnectButton();
        }, this);
    },
        
    disconnect: function () {
        this.session.disconnect();
    },
        
    close: function () {
        this.session.close().success(function () {
            this.hide();
        }, this).error(function (err) {
            this.app.showError(err);
        }, this);
    },
    
    sendMessage: function () {
        var text = this.$.input.getValue();
        
        this.session.sendText(text);
    },
    
    handleMessage: function (message) {
        console.log("got message");
    }
});