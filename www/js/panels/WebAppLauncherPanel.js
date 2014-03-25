enyo.kind({
    name: "WebAppLauncherPanel",
    kind: "CapabilityPanel",
    
    layoutKind: "enyo.FittableRowsLayout",
    
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
        {kind: "WebAppSessionView", fit: true}
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
                this.resized();
            }, this);
            
            localStorage.setItem("lastWebAppId", this.webAppId);
        }
    }
});
        
enyo.kind({
    name: "WebAppSessionView",
    kind: "onyx.Groupbox",
    layoutKind: "enyo.FittableRowsLayout",
        
    showing: false,
        
    published: {
        webAppId: "",
        session: null
    },
        
    components: [
        {name: "appName", kind: "onyx.GroupboxHeader"},
        {controlClasses: "margin", components: [
            {name: "connectButton", kind: "onyx.Button"},
            {name: "clearLogButton", kind: "onyx.Button", content: "Clear Log", ontap: "clearLog"},
            {kind: "onyx.Button", content: "Close", ontap: "close"}
        ]},
        {name: "sendBox", kind: "FittableInputDecorator", showing: false, components: [
            {name: "input", kind: "onyx.Input", fit: true},
            {kind: "onyx.Button", content: "Send", ontap: "sendMessage"}
        ]},
        {name: "messageList", fit: true, kind: "enyo.DataList", components: [
            {kind: "onyx.Item", components: [
                {name: "direction", classes: "message-direction-label inline-block"},
                {name: "messageText", classes: "inline-block"}
            ], bindings: [
                {from: ".model.messageText", to: ".$.messageText.content"},
                {from: ".model.direction", to: ".$.direction.content"}
            ]}
        ]},
        {name: "messages", kind: "enyo.Collection"}
    ],
          
    bindings: [
        {from: ".webAppId", to: ".$.appName.content"},
        {from: ".$.messages", to: ".$.messageList.collection"}
    ],
        
    sessionChanged: function (oldSession) {
        if (oldSession) {
            oldSession.off("message", null, this); // remove listener
            oldSession.release(); // free memory
        }
        
        if (this.session) {
            this.session.acquire();
            this.session.on("message", this.bindSafely("handleMessage"), this);
            
            this.resetConnectButton();
            this.show();
        } else {
            this.hide();
        }
    },
        
    resetConnectButton: function () {
        this.$.connectButton.setContent("Connect");
        this.$.connectButton.set("ontap", "connect");
        this.$.sendBox.hide();
    },
        
    connect: function () {
        this.$.connectButton.setContent("Connecting ...");
        this.$.connectButton.set("ontap", "disconnect");
        
        this.session.connect()
            .success(this.bindSafely("connected"), this)
            .error(function (err) {
                this.resetConnectButton();
            }, this);
    },
        
    connected: function () {
        console.log("connected to app");
        this.$.connectButton.setContent("Disconnect");
        this.$.connectButton.set("ontap", "disconnect");
        this.$.sendBox.show();
        this.resized();
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
        
        console.log("sending message: " + text);
        this.session.sendText(text);
        
        this.logMessage(text, {direction: "out"});
    },
        
    logMessage: function (message, props) {
        var model = new enyo.Model();
        
        model.set(props);
        model.set("message", message);
        
        if (typeof message === 'string') {
            model.set("type", "string");
            model.set("messageText", message);
        } else {
            model.set("type", "object");
            model.set("messageText", JSON.stringify(message, null, "  "));
        }
        
        this.$.messages.add(model, 0); // insert at beginning
    },
        
    clearLog: function () {
        this.$.messages.destroyAll();
    },
    
    handleMessage: function (message) {
        console.log("got message: " + message);
        
        this.logMessage(message, {direction: "in"});
    }
});