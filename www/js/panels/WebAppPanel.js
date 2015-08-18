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
	name: "WebAppPanel",
	kind: "CapabilityPanel",

	layoutKind: "enyo.FittableRowsLayout",

	controlClasses: "margin",

	published: {
		webAppId: "WebAppTester"
	},

	handlers: {
		// Handle onButtonPressed event from any of the TableButton controls
		onButtonPressed: "handleButton"
	},

	handleButton: function (sender, event) {
		var eventName = "on" + event.key.charAt(0).toUpperCase() + event.key.slice(1);
		var eventData = event.data || {};
		enyo.Signals.send(eventName, eventData);
	},

	components: [
		{kind: "enyo.Scroller", touch: true, classes: "enyo-fit", horizontal: "hidden", components: [
			{kind: "enyo.FittableRows", components: [
				{kind: "enyo.Table", style: "width: 100%", components: [
					{components: [
						{name: "launchWebAppButton", kind: "TableButton", content: "LAUNCH", key: "launchWebApp"},
						{name: "joinWebAppButton", kind: "TableButton", content: "JOIN", key: "joinWebApp"}
					]},
					{components: [
						{name: "sendMessageButton", kind: "TableButton", content: "SEND MESSAGE", key: "sendMessage"},
						{name: "sendJSONButton", kind: "TableButton", content: "SEND JSON", key: "sendJSON"}
					]},
					{components: [
						{name: "leaveWebAppButton", kind: "TableButton", content: "LEAVE WEBAPP", key: "leaveWebApp"},
						{name: "closeWebAppButton", kind: "TableButton", content: "CLOSE WEBAPP", key: "closeWebApp"}
					]},
					{components: [
						{name: "pinWebAppButton", kind: "TableButton", content: "PIN WEB APP", key: "pinWebApp"},
						{name: "unpinWebAppButton", kind: "TableButton", content: "UNPIN WEB APP", key: "unpinWebApp"}
					]}
				]}
			]}
		]},
		{kind: "enyo.Signals", onDeviceCapabilitiesChanged: "handleCapabilitiesChanged"}
	],

	bindings: [
		{from: ".webAppId", to: ".$.webAppId.value", oneWay: false}
	],

	rendered: function () {
		this.inherited(arguments);
		this.handleCapabilitiesChanged();
	},

	handleCapabilitiesChanged: function () {
		this.$.launchWebAppButton.setDisabled(!(this.app.deviceHasCapability("WebAppLauncher.Launch")));
		this.$.joinWebAppButton.setDisabled(!(this.app.deviceHasCapability("WebAppLauncher.Join")));
		this.$.sendMessageButton.setDisabled(!(this.app.deviceHasCapability("WebAppLauncher.Message.Send")));
		this.$.sendJSONButton.setDisabled(!(this.app.deviceHasCapability("WebAppLauncher.Message.Send.JSON")));
		this.$.leaveWebAppButton.setDisabled(!(this.app.deviceHasCapability("WebAppLauncher.Disconnect")));
		this.$.closeWebAppButton.setDisabled(!(this.app.deviceHasCapability("WebAppLauncher.Close")));
		this.$.pinWebAppButton.setDisabled(!(this.app.deviceHasCapability("WebAppLauncher.Pin")));
		this.$.unpinWebAppButton.setDisabled(!(this.app.deviceHasCapability("WebAppLauncher.Pin")));
	}
});
