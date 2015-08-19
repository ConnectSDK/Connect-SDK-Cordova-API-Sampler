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
	name: "AppsPanel",
	kind: "CapabilityPanel",

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
			{kind: "enyo.FittableRows", style: "width: 100%", components: [
				{kind: "enyo.Table", style: "width: 100%", components: [
					{components: [
						{name: "googleButton", kind: "TableButton", content: "OPEN GOOGLE", key: "openGoogle"},
						{name: "dialButton", kind: "TableButton", content: "MY DIAL APP", key: "openDIALApp"},
					]},
					{components: [
						{name: "netflixButton", kind: "TableButton", content: "NETFLIX", key: "openNetflix"},
						{name: "youtubeButton", kind: "TableButton", content: "YOUTUBE", key: "openYoutube"}
					]},
					{components: [
						{name: "appStoreButton", kind: "TableButton", content: "APP STORE", key: "openAppStore"},
						{name: "toastButton", kind: "TableButton", content: "SHOW TOAST", key: "showToast"}
					]}
				]}
				/*
				{name: "appList", kind: "enyo.DataList", components: [
					{kind: "onyx.Item", ontap: "handleButton", key: "launchApp", components: [
						{name: "appName"}
					], bindings: [
						{from: ".model.name", to: ".$.appName.content"}
					]}
				]}
				*/
			]}
		]},
		{name: "apps", kind: "enyo.Collection"},
		{kind: "enyo.Signals", onDeviceCapabilitiesChanged: "handleCapabilitiesChanged"}
	],

	rendered: function () {
		this.inherited(arguments);
		this.handleCapabilitiesChanged();
	},

	handleCapabilitiesChanged: function () {
		this.$.googleButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.Launcher.Browser) || this.app.deviceHasCapability(ConnectSDK.capabilities.Launcher.Browser.Params)));
		this.$.dialButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.capabilities.Launcher.Levak));
		this.$.youtubeButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.Launcher.YouTube) || this.app.deviceHasCapability(ConnectSDK.capabilities.Launcher.YouTube.Params)));
		this.$.netflixButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.Launcher.Netflix) || this.app.deviceHasCapability(ConnectSDK.capabilities.Launcher.Netflix.Params)));
		this.$.appStoreButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.Launcher.AppStore) || this.app.deviceHasCapability(ConnectSDK.capabilities.Launcher.AppStore.Params)));
		this.$.toastButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.capabilities.ToastControl.Show.Toast));
	}
});
