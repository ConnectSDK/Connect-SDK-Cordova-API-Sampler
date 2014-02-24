enyo.kind({
    name: "LauncherPanel",
    kind: "CapabilityPanel",
    
    components: [
        {kind: "TabPanels", classes: "enyo-fit", components: [
            {tabLabel: "Common Apps", controlClasses: "margin", components: [
                {kind: "LaunchContentButton", appName: "Browser", paramLabel: "URL"},
                {kind: "LaunchContentButton", appName: "Hulu", paramLabel: "Content Id"},
                {kind: "LaunchContentButton", appName: "Netflix", paramLabel: "Content Id"},
                {kind: "LaunchContentButton", appName: "YouTube", paramLabel: "Content Id"},
            ]},
            {tabLabel: "App List", name: "appList", kind: "enyo.DataList", classes: "enyo-fit", components: [
                {kind: "onyx.Item", ontap: "launchApp", components: [
                    {name: "appName"}
                ], bindings: [
                    {from: ".model.name", to: ".$.appName.content"}
                ]}
            ]}
        ]},
        {name: "apps", kind: "enyo.Collection"}
    ],
          
    bindings: [
        {from: ".$.apps", to: ".$.appList.collection"}
    ],
    
    tabActivated: function (sender, event) {
        if (!event.originator || !event.originator.active) {
            return true;
        }
        
        var panelName = event.originator.panelName;
        
        if (panelName && this.$.panels.getActive().name !== panelName) {
            this.$.panels.selectPanelByName(panelName);
        }
        
        return true;
    },
    
    deviceChanged: function () {
        if (this.device) {
            this.device.getLauncher().getAppList().complete(
                this.bindSafely("handleAppListResponse")
            );
        }
    },
    
    handleAppListResponse: function (error, data) {
        this.$.apps.reset(data);
    },
        
    launchApp: function (sender, event) {
        var app = this.$.apps.at(event.index);
        
        var appId = app && app.get("id");
        
        if (appId) {
            this.device.getLauncher().launchApplication(appId).success(function () {
                this.app.showMessage("Success", "Launched " + appId);
            }, this).error(function (err) {
                this.app.showError(err);
            }, this);
        }
    }
});

enyo.kind({
    name: "LaunchContentButton",
    kind: "enyo.FittableColumns",
    
    controlClasses: "inline-block",
    
    published: {
        device: null,
        appName: "",
        title: "",
        paramLabel: "Content ID:",
        param: "",
        command: "",
        capability: ""
    },
    
    components: [
        {kind: "onyx.Button", ontap: "launch", components: [
            {name: "title"},
            {name: "support", kind: "CapabilitySupport", short: true, style: "margin-left: 0.5em"}
        ]},
        {kind: "onyx.InputDecorator", layoutKind: "enyo.FittableColumnsLayout", classes: "indent hmargin", fit: true, components: [
            {name: "param", kind: "onyx.Input", fit: true},
            {name: "paramSupport", kind: "CapabilitySupport", short: true}
        ]}
    ],
         
    bindings: [
        {from: ".owner.device", to: ".device"},
        {from: ".title", to: ".$.title.content"},
        {from: ".paramLabel", to: ".$.param.placeholder"},
        {from: ".param", to: ".$.param.value", oneWay: false},
        {from: ".capability", to: ".$.support.capability"},
        {from: ".paramCapability", to: ".$.paramSupport.capability"}
    ],
    
    create: function () {
        this.inherited(arguments);
        
        if (this.appName) {
            !this.title && this.set("title", "Launch " + this.appName);
            !this.command && this.set("command", "launch" + this.appName);
            !this.capability && this.set("capability", "Launcher." + this.appName);
        }
        
        if (this.capability) {
            !this.paramCapability && this.set("paramCapability", this.capability + ".Params");
        }
    },
    
    launch: function () {
        var request = this.device.getLauncher()[this.command](this.param)
        
        request.success(function () {
            this.app.showMessage("success", "Launched");
        }).error(function (err) {
            this.app.showError(err);
        }, this);
        
        return true;
    }
});