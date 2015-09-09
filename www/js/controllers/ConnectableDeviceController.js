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
	name: "ConnectableDeviceController",
	kind: "enyo.Controller",

	published: {
		pendingDevice: null,
		device: null,
		connected: false
	},

	pendingDeviceChanged: function (oldDevice) {
		var device = this.pendingDevice;

		if (oldDevice) {
			oldDevice.off("ready", this.deviceConnected, this);
			oldDevice.off("disconnect", this.deviceDisconnected, this);
			oldDevice.off("capabilitieschanged", this.deviceCapabilitiesChanged, this);
		}

		if (device) {
			device.on("ready", this.deviceConnected, this);
			device.on("disconnect", this.deviceDisconnected, this);
			device.on("capabilitieschanged", this.deviceCapabilitiesChanged, this);

			console.log("pending device changed");

			if (device.isReady()) {
				console.log("device is already connected");
				this.deviceConnected();
			} else {
				console.log("connecting to device: ", device.getFriendlyName());
				device.connect();
			}
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
		this.setPendingDevice(null);

		this.deviceCapabilitiesChanged();
	},

	deviceConnected: function () {
		console.log("device connected");
		var pendingDevice = this.pendingDevice;
		this.pendingDevice = null;

		if (pendingDevice) {
			try {
				// Make this the current connected device
				// This will also update any components that are observing
				// this controller's .device property.
				this.setDevice(pendingDevice);
			} catch (e) {
				console.error(e);
				this.app.showError(e);
			}
			this.setConnected(true);

			this.deviceCapabilitiesChanged();
		}
	},

	deviceDisconnected: function () {
		console.log("device disconnected");
		this.setDevice(null);
		this.setConnected(false);
	},

	deviceCapabilitiesChanged: function () {
		// TODO
		enyo.Signals.send("onDeviceCapabilitiesChanged");
	}
});
