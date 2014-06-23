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
    name: "OverviewPanel",
    kind: "CapabilityPanel",
    
    style: "padding: 2em",
    
    published: {
        device: null
    },
    
    components: [
        {name: "autoConnectCheckbox", kind: "CheckboxWithLabel", content: "Reconnect on start", checked: true, style: "margin-bottom: 1em"},
        {name: "requestPairingCheckbox", kind: "CheckboxWithLabel", content: "Pair if needed", checked: true, style: "margin-bottom: 1em"},
        {name: "airPlayMirror", kind: "CheckboxWithLabel", content: "Use AirPlay mirroring", checked: true, style: "margin-bottom: 1em"},
        
        {components: [
            {tag: "span", content: "State: "},
            {tag: "span", name: "state", content: "Not connected"}
        ]},
        {name: "deviceInfo", style: "margin-top: 1em", components: [
            {components: [
                {tag: "span", content: "Device Store ID: "},
                {tag: "span", name: "deviceId"}
            ]},
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
        // This is tied to DiscoveryController.requestPairingChanged in AppControllers.js
        {from: ".app.$.discoveryController.requestPairing",
         to: ".$.requestPairingCheckbox.checked", oneWay: false},
        {from: ".app.$.discoveryController.autoConnect", to: ".$.autoConnectCheckbox.checked", oneWay: false},
        {from: ".app.$.discoveryController.airPlayMirror", to: ".$.airPlayMirror.checked", oneWay: false}
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
            this.$.deviceId.setContent(this.device.getId());
        } else {
            this.$.state.setContent("Not connected");
        }
        
        this.$.deviceInfo.setShowing(!!this.device);
    }
});