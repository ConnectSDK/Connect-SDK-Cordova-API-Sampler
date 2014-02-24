enyo.kind({
    name: "WebAppLauncherPanel",
    kind: "CapabilityPanel",
    
    controlClasses: "margin",
    
    published: {
        webAppId: ""
    },

    components: [
        {kind: "onyx.Groupbox", components: [
            {kind: "HeaderWithCapability", content: "Launch WebApp", capability: "WebAppLauncher.Launch"},
            {kind: "onyx.InputDecorator", layoutKind: "enyo.FittableColumnsLayout", components: [
                {name: "webAppId", kind: "onyx.Input", fit: true, placeholder: "webAppId"},
                {name: "launchButton", kind: "onyx.Button", content: "Launch", ontap: "launchWebApp"}
            ]},
        ]}
    ],
         
    bindings: [
        {from: ".$.webAppId.value", to: ".webAppId", oneWay: false}
    ],
         
    webAppIdChanged: function () {
        this.$.launchButton.setDisabled(!this.webAppId);
    },

    launchWebApp: function () {
        if (this.webAppId) {
            this.device.getWebAppLauncher().launchWebApp(this.webAppId);
        }
    }
});