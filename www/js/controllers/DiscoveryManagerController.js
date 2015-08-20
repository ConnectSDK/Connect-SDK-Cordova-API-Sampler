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
		requestPairing: true // if true, ask for capabilities that require pairing
	},

	create: function () {
		this.inherited(arguments);

		// Cordova seems to have problems starting discovery in the same tick.
		this.startJob("startup", "startDiscovery", 0);

		this.justStartedApp = true;
	},

	requestPairingChanged: function () {
		// restart discovery with new setting
		this.stopDiscovery();
		this.startDiscovery();
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
	}
});
