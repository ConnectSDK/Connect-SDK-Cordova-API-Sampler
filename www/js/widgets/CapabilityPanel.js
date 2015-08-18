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
	name: "CapabilityPanel",

	classes: "enyo-fit",

	published: {
		device: null
	},

	bindings: [
		{from: ".app.$.deviceController.device", to: ".device"}
	],

	// This gets called when the controller successfully connects to a device
	// or when the device is disconnected
	deviceChanged: function (old) {
		if (old) {
			this.deviceDisconnected(old);
		}

		if (this.device) {
			this.deviceConnected(this.device);
		}
	},

	// Stub for subkinds to override
	deviceConnected: function () {
	},

	// Stub for subkinds to override
	deviceDisconnected: function () {
	}
});
