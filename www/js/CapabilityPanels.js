enyo.kind({
    name: "MainPanel",
    kind: "enyo.Panels",
    
    classes: "enyo-fit",
    style: "background-color: white",
    
    draggable: false,
    
    components: [
        {kind: "OverviewPanel"},
        {kind: "LauncherPanel"},
        {kind: "MediaPlayerPanel"},
        {kind: "NavigationPanel"},
        {kind: "TVControlPanel"},
        {kind: "WebAppLauncherPanel"},
        {kind: "APIToolPanel"}
    ]
});

enyo.kind({
    name: "CapabilityPanel",
    
    classes: "enyo-fit",
    
    published: {
        device: null
    },
    
    bindings: [
        {from: ".app.$.deviceController.device", to: ".device"}
    ],
    
    // This gets called when the controller successfully connects to a device
    // or when the device is disconnected
    deviceChanged: function (old) {
        if (old) {
            this.deviceDisconnected(old);
        }
        
        if (this.device) {
            this.deviceConnected(this.device);
        }
    },
    
    // Stub for subkinds to override
    deviceConnected: function () {
    },
    
    // Stub for subkinds to override
    deviceDisconnected: function () {
    }
});