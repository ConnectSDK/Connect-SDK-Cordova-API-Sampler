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
