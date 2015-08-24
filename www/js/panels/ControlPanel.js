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
					{name: "backButton", kind: "TableButton", content: "Back", key: "buttonBack"},
					{},
					{name: "homeButton", kind: "TableButton", content: "Home", key: "buttonHome"}
				]},

				{components: [
					{},
					{name: "upButton", kind: "TableButton", content: "Up", key: "buttonUp"},
					{}
				]},
				{components: [
					{name: "leftButton", kind: "TableButton", content: "Left", key: "buttonLeft"},
					{name: "enterButton", kind: "TableButton", content: "Click", key: "buttonOK"},
					{name: "rightButton", kind: "TableButton", content: "Right", key: "buttonRight"}
				]},
				{components: [
					{},
					{name: "downButton", kind: "TableButton", content: "Down", key: "buttonDown"},
					{}
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
		this.$.backButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.Back));
		this.$.homeButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.Home));
		this.$.upButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.Up));
		this.$.downButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.Down));
		this.$.leftButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.Left));
		this.$.rightButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.Right));
		this.$.enterButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.OK));
		this.$.pad.setDisabled(!this.app.deviceHasCapability(ConnectSDK.capabilities.MouseControl.Connect));
	}
});
