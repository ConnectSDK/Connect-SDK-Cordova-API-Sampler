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

// Misc widgets
enyo.kind({
    name: "CheckboxWithLabel",
    published: {
        checked: false,
        content: ""
    },
    
    controlClasses: "inline-block",
    
    components: [
        {name: "checkbox", kind: "onyx.Checkbox"},
        {name: "label", style: "margin-left: 1em", ontap: "toggle"}
    ],
    
    bindings: [
        {from: ".checked", to: ".$.checkbox.checked", oneWay: false},
        {from: ".content", to: ".$.label.content"}
    ],
    
    toggle: function () {
        this.$.checkbox.setChecked(!this.checked);
        return true;
    }
});

enyo.kind({
    name: "HeaderWithCapability",
    kind: "onyx.GroupboxHeader",
    
    published: {
        capability: "",
        content: ""
    },
    
    controlClasses: "inline-block",
    components: [
        {name: "label"},
        {content: "&ndash;", allowHtml: true, style: "padding: 0 0.5em 0 0.5em"},
        {name: "support", kind: "CapabilitySupport", style: "text-transform: none",}
    ],
    
    bindings: [
        {from: ".capability", to: ".$.support.capability"},
        {from: ".content", to: ".$.label.content"}
    ]
});

enyo.kind({
    name: "CapabilitySupport",
    classes: "capability-support",
    
    published: {
        label: "",
        capability: "",
        short: false, /* don't show title */
        supported: undefined
    },
    
    controlClasses: "inline-block",
    
    components: [
        {name: "label", style: "margin-right: 1em"},
        {name: "status", showing: false},
        
        {kind: "enyo.Signals", onDeviceCapabilitiesChanged: "deviceCapabilitiesChanged"}
    ],
    
    bindings: [
        {from: ".app.$.deviceController.device", to: ".device"},
        {from: ".autolabel", to: ".$.label.content"},
        {from: ".short", to: ".$.label.showing", kind: "enyo.InvertBooleanBinding"}
    ],
    
    computed: {
        autolabel: ["label", "capability"]
    },
    
    autolabel: function () {
        return this.label || this.capability;
    },
    
    update: function () {
        this.supported = this.device && this.device.supports(this.capability);
        this.$.status.setShowing(this.supported !== undefined);
        
        this.$.status.addRemoveClass("capability-supported", this.supported === true);
        this.$.status.addRemoveClass("capability-unsupported", this.supported === false);
        this.$.status.setContent(this.supported ? "\u2713" : "\u2717");
    },
    
    deviceChanged: function () {
        this.update();
    },
    
    capabilityChanged: function () {
        this.update();
    },
    
    deviceCapabilitiesChanged: function () {
        this.update();
    }
});

enyo.kind({
    name: "CapabilitySupportList",
    
    published: {
        capabilities: null
    },
    
    components: [
        {kind: "onyx.Groupbox", components: [
            {kind: "onyx.GroupboxHeader", content: "Capabilities"},
            {name: "repeater", kind: "enyo.DataRepeater", components: [
                {style: "padding: 1em; font-size: large", components: [
                    {name: "support", kind: "CapabilitySupport"}
                ], bindings: [
                    {from: ".model.value", to: ".$.support.capability"}
                ]}
            ]}
        ]}
    ],
    
    create: function () {
        this.inherited(arguments);
        this.capabilitiesChanged();
    },
    
    capabilitiesChanged: function () {
        var data = (this.capabilities || []).map(function (s) {
            return {value: s};
        });
        
        var c = new enyo.Collection(data);
        this.$.repeater.set("collection", c);
        this.resized();
    }
});

enyo.kind({
    name: "TabPanels",
    layoutKind: "FittableRowsLayout",
    controlParentName: "panels",
    
    components: [
        {name: "tabGroup", kind: "onyx.RadioGroup", layoutKind: "enyo.FlexLayout", flexBias: "column", onActivate: "tabActivated", controlClasses: "onyx-tabbutton"},
        {name: "panels", kind: "enyo.Panels", fit: true, controlClasses: "enyo-fit", draggable: false}
    ],
    
    create: function () {
        this.inherited(arguments);
        
        var first = true;
        this.getClientControls().forEach(function (c) {
            this.$.tabGroup.createComponent({
                content: c.tabLabel,
                flex: true,
                active: first,
                panelName: c.name,
                owner: this,
                style: "padding: 8px"
            });
            first = false;
        }, this);
        
        this.reflow();
    },
    
    tabActivated: function (sender, event) {
        if (!event.originator || !event.originator.active) {
            return true;
        }
        
        var panelName = event.originator.panelName;
        var activePanel = this.$.panels.getActive();
        
        if (panelName && (!activePanel || activePanel.name !== panelName)) {
            this.$.panels.selectPanelByName(panelName);
        }
        
        return true;
    }
});

enyo.kind({
    name: "FittableInputDecorator",
    kind: "onyx.InputDecorator",
    
    layoutKind: "enyo.FittableColumnsLayout"
});