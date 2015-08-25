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

	published: {
		appList: new enyo.Collection()
	},

	handleButton: function (inSender, inEvent) {
		var eventName = "on" + inEvent.key.charAt(0).toUpperCase() + inEvent.key.slice(1);
		var eventData = (inEvent.originator && inEvent.originator.data) || {};
		enyo.Signals.send(eventName, eventData);
	},

	components: [
		{kind: "enyo.Scroller", touch: true, classes: "enyo-fit", horizontal: "hidden", components: [
			{kind: "enyo.FittableRows", style: "width: 100%", components: [
				{kind: "enyo.Table", style: "width: 100%", components: [
					{components: [
						{name: "googleButton", kind: "TableButton", content: "OPEN GOOGLE", key: "launchBrowser", data: {url: "http://google.com"}},
						{name: "dialButton", kind: "TableButton", content: "MY DIAL APP", key: "openDIALApp"},
					]},
					{components: [
						{name: "netflixButton", kind: "TableButton", content: "NETFLIX", key: "openNetflix", data: {contentId: "70217913"}},
						{name: "youtubeButton", kind: "TableButton", content: "YOUTUBE", key: "openYoutube"}
					]},
					{components: [
						{name: "appStoreButton", kind: "TableButton", content: "APP STORE", key: "openAppStore"},
						{name: "toastButton", kind: "TableButton", content: "SHOW TOAST", key: "showToast"}
					]}
				]},
				{name: "appList", kind: "enyo.DataRepeater", components: [
					{kind: "onyx.Item", classes: "app-item", ontap: "openApp", components: [
						{name: "appName", classes: "app-id"},
						{name: "appId", classes: "app-name"}
					], bindings: [
						{from: ".model.id", to: ".$.appId.content"},
						{from: ".model.name", to: ".$.appName.content"}
					]}
				]}
			]}
		]},
		{kind: "enyo.Signals", onDeviceCapabilitiesChanged: "handleCapabilitiesChanged"}
	],

	bindings: [
		{from: ".appList", to: ".$.appList.collection"}
	],

	rendered: function () {
		this.inherited(arguments);
		this.handleCapabilitiesChanged();
	},

	handleCapabilitiesChanged: function () {
		this.$.googleButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.Launcher.Browser) || this.app.deviceHasCapability(ConnectSDK.Capabilities.Launcher.Browser.Params)));
		this.$.dialButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.Capabilities.Launcher.Levak));
		this.$.youtubeButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.Launcher.YouTube) || this.app.deviceHasCapability(ConnectSDK.Capabilities.Launcher.YouTube.Params)));
		this.$.netflixButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.Launcher.Netflix) || this.app.deviceHasCapability(ConnectSDK.Capabilities.Launcher.Netflix.Params)));
		this.$.appStoreButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.Launcher.AppStore) || this.app.deviceHasCapability(ConnectSDK.Capabilities.Launcher.AppStore.Params)));
		this.$.toastButton.setDisabled(!this.app.deviceHasCapability(ConnectSDK.Capabilities.ToastControl.Show.Toast));

		if (this.app.deviceHasCapability(ConnectSDK.Capabilities.Launcher.App.List)) {
			this.getAppList();
		} else {
			this.appList.destroyAllLocal();
		}
	},

	getAppList: function () {
		enyo.Signals.send("onGetAppList", {callbacks: {success: this.handleGotAppList.bind(this), error: this.handleGetAppListError.bind(this)}});
	},

	handleGotAppList: function (apps) {
		apps.sort(function (a, b) {
			if (a.name < b.name) {
				return -1;
			} else if (a.name > b.name) {
				return 1;
			} else {
				return 0;
			}
		});

		// This will wrap the channel list into enyo.Model instances
		this.appList.destroyAllLocal();
		this.appList.reset(apps);
	},

	handleGetAppListError: function (err) {
		this.app.showError(err);
	},

	openApp: function (inSender, inEvent) {
		enyo.Signals.send("onOpenApp", {app: inSender.model.attributes});
	}
});
