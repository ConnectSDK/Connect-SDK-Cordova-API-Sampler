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
	name: "DiscoveryManagerController",
	kind: "enyo.Controller",

	published: {
		requestPairing: true, // if true, ask for capabilities that require pairing
		autoConnect: true // if true, connect to last connected device on boot
	},

	create: function () {
		this.inherited(arguments);

		// FIXME: Cordova seems to have problems starting discovery in the same tick.
		// Need to investigate.
		this.startJob("startup", "startDiscovery", 0);

		this.justStartedApp = true;

		// Load settings
		this.set("autoConnect", !!window.localStorage.getItem("autoConnect"));
		this.set("requestPairing", !!window.localStorage.getItem("requestPairing"));
		this.savedDeviceId = window.localStorage.getItem("lastDeviceId") || null;
	},

	requestPairingChanged: function () {
		// restart discovery with new setting
		this.stopDiscovery();
		this.startDiscovery();

		window.localStorage.setItem("requestPairing", this.requestPairing);
	},

	autoConnectChanged: function () {
		window.localStorage.setItem("autoConnect", this.autoConnect);
	},

	startDiscovery: function () {
		if (window.ConnectSDK) {
			ConnectSDK.discoveryManager.startDiscovery({
				pairingLevel: this.requestPairing ? ConnectSDK.PairingLevel.ON : ConnectSDK.PairingLevel.OFF
			});

			ConnectSDK.discoveryManager.on("devicefound", this.deviceFound, this);
		} else {
			console.error("startDiscovery: navigator.ConnectSDK not available");
		}
	},

	stopDiscovery: function () {
		if (window.ConnectSDK) {
			ConnectSDK.discoveryManager.stopDiscovery();

			ConnectSDK.discoveryManager.off("devicefound", this.deviceFound, this);
		}
	},

	deviceFound: function (device) {
		console.log("device found: " + device.getId());

		if (this.justStartedApp && this.savedDeviceId && device.getId() === this.savedDeviceId) {
			this.justStartedApp = false;

			this.app.$.deviceController.setPendingDevice(device);
		}
	},

	showPicker: function () {
		this.justStartedApp = false;

		if (!window.ConnectSDK) {
			this.app.showMessage(
				"Unable to show picker",
				"Connect SDK plugin not available"
			);

			return;
		}

		this.picker = ConnectSDK.discoveryManager.pickDevice();

		this.picker.success(this.pickerSuccess, this);
		this.picker.error(function (err) {
			if (err) {
				console.log("picker error: " + JSON.stringify(err));
				this.app.showError(err);
			} else {
				// if err is undefined, then picker was cancelled
				console.log("picker cancelled");
			}
		}, this);
	},

	pickerSuccess: function (device) {
		var deviceController = this.app.$.deviceController;

		if (deviceController.pendingDevice) {
			deviceController.setPendingDevice(null);
		}

		console.log("selected device in picker");
		deviceController.setPendingDevice(device);

		window.localStorage.setItem("savedDeviceId", device.getId());
	}
});
