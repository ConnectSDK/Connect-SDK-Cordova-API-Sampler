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
	name: "ControlPanel",
	kind: "CapabilityPanel",

	handlers: {
		// Handle onButtonPressed event from any of the TableButton controls
		onButtonPressed: "handleButton"
	},

	handleButton: function (inSender, inEvent) {
		var eventName = "on" + inEvent.key.charAt(0).toUpperCase() + inEvent.key.slice(1);
		var eventData = (inEvent.originator && inEvent.originator.data) || {};
		enyo.Signals.send(eventName, eventData);
	},

	components: [
		//		{kind: "RemoteTextInputArea"},
		{kind: "enyo.FittableRows", classes: "enyo-fit", components: [
			{kind: "enyo.Table", style: "width: 100%", components: [
				{components: [
					{name: "backButton", kind: "TableButton", style: "width: 33%", content: "Back", key: "buttonBack"},
					{style: "width: 33%"},
					{name: "homeButton", kind: "TableButton", style: "width: 33%", content: "Home", key: "buttonHome"}
				]},

				{components: [
					{style: "width: 33%"},
					{name: "upButton", kind: "TableButton", style: "width: 33%", content: "Up", key: "buttonUp"},
					{style: "width: 33%"}
				]},
				{components: [
					{name: "leftButton", kind: "TableButton", style: "width: 33%", content: "Left", key: "buttonLeft"},
					{name: "enterButton", kind: "TableButton", style: "width: 33%", content: "Click", key: "buttonOK"},
					{name: "rightButton", kind: "TableButton", style: "width: 33%", content: "Right", key: "buttonRight"}
				]},
				{components: [
					{style: "width: 33%"},
					{name: "downButton", kind: "TableButton", style: "width: 33%", content: "Down", key: "buttonDown"},
					{style: "width: 33%"}
				]},
			]},
			{name: "pad", kind: "Trackpad", fit: true}
		]},
		{kind: "enyo.Signals", onDeviceCapabilitiesChanged: "handleCapabilitiesChanged"}
	],

	rendered: function () {
		this.inherited(arguments);
		this.handleCapabilitiesChanged();
	},

	handleCapabilitiesChanged: function () {
		this.$.backButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.Capabilities.KeyControl.Back));
		this.$.homeButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.Capabilities.KeyControl.Home));
		this.$.upButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.Capabilities.KeyControl.Up));
		this.$.downButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.Capabilities.KeyControl.Down));
		this.$.leftButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.Capabilities.KeyControl.Left));
		this.$.rightButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.Capabilities.KeyControl.Right));
		this.$.enterButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.Capabilities.KeyControl.OK));
		this.$.pad.setDisabled(!this.app.deviceHasCapability(ConnectSDK.Capabilities.MouseControl.Connect));
	}
});
