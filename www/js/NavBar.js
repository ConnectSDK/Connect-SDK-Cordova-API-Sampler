enyo.kind({
    name: "NavBar",
    style: "width: 240px; background-color: lightgray; box-shadow: gray -2px 0px 1px inset",
    
    defaultKind: "NavItem",
    
    components: [
        {title: "Overview", panelName: "overviewPanel"},
        {title: "Launcher", panelName: "launcherPanel"},
        {title: "Media Player", panelName: "mediaPlayerPanel"},
        {title: "Navigation", panelName: "navigationPanel"},
        {title: "Channels", panelName: "tVControlPanel"},
        {title: "Web App", panelName: "webAppLauncherPanel"},
        {title: "API Tool", panelName: "aPIToolPanel"}
    ]
});

enyo.kind({
    name: "NavItem",
    kind: "onyx.Item",
    
    published: {
        title: "",
        panelKind: null
    },
    
    events: {
        onSelectNav: ""
    },
    
    components: [
        {name: "title", content: ""}
    ],
    
    bindings: [
        {from: ".title", to: ".$.title.content"}
    ],
    
    tap: function (sender, event) {
        this.doSelectNav({panelName: this.panelName});
        
        return true;
    }
});