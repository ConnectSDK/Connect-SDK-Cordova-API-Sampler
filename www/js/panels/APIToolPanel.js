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
    name: "APIToolPanel",
    kind: "CapabilityPanel",
    
    capabilities: [
        "launcher", "mediaControl", "TVControl", "fivewayControl", "mouseControl",
        "mediaPlayer", "webAppLauncher", "toastControl", "volumeControl"
    ],

    components: [
        {kind: "enyo.Scroller", classes: "enyo-fit", controlClasses: "padding margin", components: [
            {kind: "onyx.PickerDecorator", classes: "inline-block margin", components: [
                {content: "Select a capability ..."},
                {name: "capPicker", kind: "onyx.FlyweightPicker", onSetupItem: "setupCapPickerItem", onSelect: "capSelect", components: [
                    {name: "capability"}
                ]}
            ]},
            {name: "methodPickerBox", kind: "onyx.PickerDecorator", classes: "inline-block margin", showing: false, components: [
                {name: "methodPickerButton", content: "Select a method ..."},
                {name: "methodPicker", kind: "onyx.FlyweightPicker", onSetupItem: "setupMethodPickerItem", onSelect: "methodSelect", components: [
                    {name: "method"}
                ]}
            ]},
            {name: "executeBox", kind: "onyx.Groupbox", showing: false, components: [
                {name: "runLabel", kind: "onyx.GroupboxHeader", style: "text-transform: none"},
                {kind: "onyx.InputDecorator", components: [
                    {name: "js", kind: "onyx.TextArea", classes: "enyo-fill", value: "[]"},
                ]},
                {kind: "onyx.Button", content: "Run", classes: "vmargin", ontap: "executeMethod"},
                {name: "resultsBox", kind: "onyx.Groupbox", showing: false, components: [
                    {kind: "onyx.GroupboxHeader", content: "Results"},
                    {name: "resultsList", kind: "enyo.DataRepeater", components: [
                        {kind: "onyx.Item", components: [
                            {name: "result", style: "word-wrap: break-word; word-break: break-all"}
                        ], bindings: [
                            {from: ".model.result", to: ".$.result.content"},
                            {from: ".model.classes", to: ".$.result.classes"}
                        ]}
                    ]}
                ]}
            ]},
        ]},
        {name: "results", kind: "enyo.Collection"}
    ],
    
    bindings: [
        {from: ".$.results", to: ".$.resultsList.collection"}
    ],
    
    create: function () {
        this.inherited(arguments);

        this.capabilities = this.capabilities.sort();
        
        this.$.capPicker.setCount(this.capabilities.length);
    },
    
    setupCapPickerItem: function (sender, event) {
        var name = this.capabilities[event.index];
        
        this.$.capability.value = name;
        this.$.capability.setContent(name);
    },
    
    capSelect: function (sender, event) {
        var capName = event.selected && event.selected.value;
        
        if (capName) {
            this.cap = capName;
            
            var getterName = "get" + this.cap[0].toUpperCase() + this.cap.substr(1);
            
            this.device = this.device || new navigator.ConnectSDK.ConnectableDevice({});
            
            this.capImpl = this.device && this.device[getterName] && this.device[getterName]();
            
            this.methodNames = [];
            
            var proto = Object.getPrototypeOf(this.capImpl);
            for (var key in proto) {
                if (key[0] !== '_' && proto[key] instanceof Function) {
                    this.methodNames.push(key);
                }
            }
            
            this.$.methodPicker.setCount(this.methodNames.length);
            this.$.methodPicker.render();
            this.$.methodPickerButton.setContent("Select a method ...");
            this.$.methodPickerBox.show();
            this.$.executeBox.hide();
        }
    },
    
    setupMethodPickerItem: function (sender, event) {
        var name = this.methodNames[event.index];
        
        this.$.method.value = name;
        this.$.method.setContent(name);
    },
    
    methodSelect: function (sender, event) {
        this.methodName = event.selected && event.selected.value;
        
        if (this.methodName) {
            this.$.runLabel.setContent("Run " + this.cap + "." + this.methodName);
            this.setFunctionJS(this.cap, this.methodName);
            this.clearResults();
            this.$.executeBox.show();
        }
    },
         
    setFunctionJS: function (capName, methodName) {
        var getterName = "get" + capName[0].toUpperCase() + capName.substr(1);
        
        this.$.js.setValue("device." + getterName + "()." + methodName + "()");
    },
    
    clearResults: function () {
        this.$.results.destroyAll();
        this.$.resultsBox.hide();
        
        if (this.lastCommmand) {
            this.lastCommand.unsubscribe && this.lastCommand.unsubscribe();
            this.lastCommand = null;
        }
    },
    
    executeMethod: function () {
        var args = [];
        var f;
        
        try {
            var jsText = this.$.js.getValue();
            f = new Function("device", "return " + jsText);
        } catch (e) {
            // TODO
        }
        
        this.clearResults();
        
        var command = f(this.device);
        
        if (command) {
            this.lastCommand = false;
            
            command.success(function (data) {
                this.$.resultsBox.show();
                this.$.results.add({result: JSON.stringify(data)});
            }, this);
            
            command.error(function (err) {
                this.$.resultsBox.show();
                this.$.results.add({result: JSON.stringify(err), classes: "result-error"});
                this.app.showError(err);
            }, this);
        }
    }
});