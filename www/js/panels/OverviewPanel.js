enyo.kind({
    name: "OverviewPanel",
    kind: "CapabilityPanel",
    
    style: "padding: 2em",
    
    published: {
        device: null
    },
    
    components: [
        {components: [
            {tag: "span", content: "State: "},
            {tag: "span", name: "state", content: "Not connected"}
        ]},
        {name: "deviceInfo", components: [
            {components: [
                {tag: "span", content: "Model name: "},
                {tag: "span", name: "modelName"}
            ]},
            {components: [
                {tag: "span", content: "Model number: "},
                {tag: "span", name: "modelNumber"}
            ]}
        ]}
    ],
    
    bindings: [
        {from: ".app.$.deviceController.device", to: ".device"}
    ],
    
    deviceChanged: function () {
        this.updateState();
    },
    
    updateState: function () {
        if (this.device) {
            this.$.state.setContent("Connected to " +
                this.device.getFriendlyName() + " at " + this.device.getIPAddress());
            this.$.modelName.setContent(this.device.getModelName());
            this.$.modelNumber.setContent(this.device.getModelNumber());
        } else {
            this.$.state.setContent("Not connected");
        }
        
        this.$.deviceInfo.setShowing(!!this.device);
    }
});