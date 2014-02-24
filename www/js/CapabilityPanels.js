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
    ]
});