enyo.kind({
    name: "SamplerApp",
    kind: "enyo.Application",
    
    autoStart: false,
    view: "AppView",
    
    components: [
        {name: "deviceController", kind: "ConnectableDeviceController"},
        {name: "discoveryController", kind: "DiscoveryManagerController"},
        {kind: "enyo.Signals", onbackbutton: "handleBack"}
    ],
    
    start: function () {
        this.inherited(arguments);
        
        // Prevent dispatcher events from falling through to text fields
        enyo.dispatcher.features.push(function (e) {
            if (("tap" === e.type || "click" === e.type) && e.preventDefault) {
                var target = e.target;
                var nodeTag = target && target.localName;
               
                if (nodeTag === "input" || nodeTag === "textarea" || (target && target.contentEditable !== "inherit")) {
                    return;
                }
               
                e.preventDefault();
            }
        });
    },
    
    showMessage: function (title, message) {
        this.view.showAlertPopup({title: title, message: message});
    },
    
    showToast: function (message) {
        this.view.showAlertPopup({message: message, timeout: 2});
    },
    
    showError: function (err) {
        if (err instanceof Error) {
            err = err.toString();
        } else if (Object.prototype.toString.call(err) === '[object Object]') {
            if (err.message) {
                err = err.message;
            } else {
                err = JSON.stringify(err);
            }
        }
        
        this.view.showAlertPopup({title: "Error", message: err});
    },
    
    handleBack: function () {
        navigator.app.exitApp();
    }
});

enyo.kind({
    name: "DiscoveryManagerController",
    kind: "enyo.Controller",
    
    create: function () {
        this.inherited(arguments);
        
        // FIXME: Cordova seems to have problems starting discovery in the same tick.
        // Need to investigate.
        this.startJob("startup", "startDiscovery", 0);
    },
    
    startDiscovery: function () {
        if (navigator.ConnectSDK) {
            navigator.ConnectSDK.discoveryManager.startDiscovery({
                pairingLevel: "on"
            });
        } else {
            console.error("startDiscovey: navigator.ConnectSDK not available");
        }
    },
    
    showPicker: function () {
        this.picker = navigator.ConnectSDK.discoveryManager.pickDevice();
        this.picker.success(this.bindSafely("pickerSuccess"));
        this.picker.error(function (err) {
            this.app.showError(err);
        }, this);
    },
    
    pickerSuccess: function (device) {
        this.app.$.deviceController.setPendingDevice(device);
    }
});

enyo.kind({
    name: "ConnectableDeviceController",
    kind: "enyo.Controller",
    
    published: {
        pendingDevice: null,
        device: null,
        connected: false
    },
    
    pendingDeviceChanged: function (oldDevice) {
        var device = this.pendingDevice;
        
        if (device) {
            device.on("ready", this.deviceConnected, this);
            device.on("disconnect", this.deviceDisconnected, this);
            device.connect();
        }
        
        if (oldDevice && oldDevice !== device) {
            oldDevice.off("ready", this.deviceConnected, this);
            oldDevice.off("disconnect", this.deviceDisconnected, this);
        }
    },
    
    disconnect: function () {
        if (this.device) {
            this.device.disconnect();
        }
        
        if (this.pendingDevice) {
            this.pendingDevice.disconnect();
        }
        
        this.setDevice(null);
    },
    
    deviceConnected: function () {
        console.log("device connected");
        var pendingDevice = this.pendingDevice;
        this.pendingDevice = null;
        
        if (pendingDevice) {
            try {
                this.setDevice(pendingDevice);
            } catch (e) {
                console.error(e);
                this.app.showError(e);
            }
            this.setConnected(true);
        }
    },
    
    deviceDisconnected: function () {
        console.log("device disconnected");
        this.setDevice(null);
        this.setConnected(false);
    }
});

enyo.kind({
    name: "AppView",
    kind: "enyo.FittableRows",
    
    published: {
        connected: false,
        connectStatus: ""
    },
    
    handlers: {
        onSelectNav: "selectNav"
    },

    components: [
        {name: "alertPopup", kind: "onyx.Popup", centered: true, floating: true, components: [
            {name: "alertTitle"},
            {name: "alertText", classes: "padded", ontap: "hideAlertPopup"}
        ]},
        {kind: "onyx.Toolbar", layoutKind: "FittableHeaderLayout", components: [
            {kind: "onyx.Button", content: "Menu", ontap: "togglePanel"},
            {fit: true},
            {name: "connectButton", kind: "onyx.Button"}
        ]},
        {kind: "enyo.Panels", arrangerKind: "CollapsingArranger", fit: true, draggable: false, onTransitionStart: "handlePanelTransition", components: [
            {name: "navBar", kind: "NavBar"},
            {name: "mainPanel", kind: "MainPanel"}
        ]}
    ],
    
    bindings: [
        {from: ".app.$.deviceController.connected", to: ".connected"}
    ],

    create: function () {
        this.inherited(arguments);
        this.connectedChanged();
        
        if (enyo.Panels.isScreenNarrow()) {
            // HACK: prevent resizing
            this.$.panels.createComponent({name: "dummy", owner: this});
        }
    },
    
    showAlertPopup: function (options) {
        this.$.alertTitle.setContent(options.title);
        this.$.alertText.setContent(options.message);
        this.$.alertPopup.show();
        
        if (options.timeout) {
            this.startJob("hideAlert", "hideAlertPopup", options.timeout * 1000);
        } else {
            this.stopJob("hideAlert");
        }
    },
    
    hideAlertPopup: function () {
        this.$.alertPopup.hide();
    },
    
    connect: function () {
        console.log("showing picker");
        this.app.$.discoveryController.showPicker();
    },
        
    disconnect: function () {
        console.log("disconnecting");
        this.app.$.deviceController.disconnect();
    },
        
    connectedChanged: function () {
        this.$.connectButton.setContent(this.connected ? "Disconnect" : "Connect");
        this.$.connectButton.set("ontap", this.connected ? "disconnect" : "connect");
        if (this.hasNode()) {
            this.resized();
        }
    },
    
    togglePanel: function () {
        if (this.$.panels.getIndex() === 0) {
            this.$.panels.setIndex(1);
        } else {
            this.$.panels.setIndex(0);
        }
    },
    
    selectNav: function (sender, event) {
        if (event.panelName) {
            this.$.mainPanel.selectPanelByName(event.panelName);
        }
        
        // On small screens, hide navbar
        if (this.$.panels.getIndex() === 0 && enyo.Panels.isScreenNarrow()) {
            this.$.panels.setIndex(1);
        }
    },
    
    handlePanelTransition: function () {
        // Defocus any active text element to hide keyboard
        document.activeElement && document.activeElement.blur();
        return true;
    }
});
