enyo.kind({
    name: "DiscoveryManagerController",
    kind: "enyo.Controller",
    
    published: {
        requestPairing: true,
    },
    
    create: function () {
        this.inherited(arguments);
        
        // FIXME: Cordova seems to have problems starting discovery in the same tick.
        // Need to investigate.
        this.startJob("startup", "startDiscovery", 0);
    },
    
    requestPairingChanged: function () {
        this.stopDiscovery();
        this.startDiscovery();
    },
    
    startDiscovery: function () {
        if (navigator.ConnectSDK) {
            var PairingLevel = navigator.ConnectSDK.PairingLevel;
            
            navigator.ConnectSDK.discoveryManager.startDiscovery({
                pairingLevel: this.requestPairing ? PairingLevel.ON : PairingLevel.OFF
            });
        } else {
            console.error("startDiscovery: navigator.ConnectSDK not available");
        }
    },
    
    stopDiscovery: function () {
        if (navigator.ConnectSDK) {
            navigator.ConnectSDK.discoveryManager.stopDiscovery();
        }
    },
    
    showPicker: function () {
        this.picker = navigator.ConnectSDK.discoveryManager.pickDevice();
        this.picker.success(this.bindSafely("pickerSuccess"));
        this.picker.error(function (err) {
            if (err) {
                this.app.showError(err);
            }
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
            
            console.log("connecting to device: ", device.getFriendlyName());
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
                // Make this the current connected device
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
