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
        panelKind: null,
        capabilities: null
    },
    
    events: {
        onSelectNav: ""
    },
    
    components: [
        {name: "title", content: ""}
    ],
    
    bindings: [
        {from: ".title", to: ".$.title.content"},
        {from: ".app.$.deviceController.device", to: ".device"}
    ],
    
    tap: function (sender, event) {
        this.doSelectNav({panelName: this.panelName});
        
        return true;
    }
});