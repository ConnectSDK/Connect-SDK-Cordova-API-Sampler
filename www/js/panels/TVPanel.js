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
	name: "TVPanel",
	kind: "CapabilityPanel",

	published: {
		currentChannel: null,
		channelList: new enyo.Collection()
	},

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
		{kind: "enyo.Scroller", touch: true, classes: "enyo-fit", horizontal: "hidden", components: [
			{kind: "enyo.FittableRows", components: [
				{kind: "enyo.Table", style: "width: 100%", components: [
					{components: [
						{name: "oneButton", kind: "TableButton", style: "width: 33%", content: "1", key: "buttonPress", data: {keyCode: 1}},
						{name: "twoButton", kind: "TableButton", style: "width: 33%", content: "2", key: "buttonPress", data: {keyCode: 2}},
						{name: "threeButton", kind: "TableButton", style: "width: 33%", content: "3", key: "buttonPress", data: {keyCode: 3}}
					]},
					{components: [
						{name: "fourButton", kind: "TableButton", style: "width: 33%", content: "4", key: "buttonPress", data: {keyCode: 4}},
						{name: "fiveButton", kind: "TableButton", style: "width: 33%", content: "5", key: "buttonPress", data: {keyCode: 5}},
						{name: "sixButton", kind: "TableButton", style: "width: 33%", content: "6", key: "buttonPress", data: {keyCode: 6}}
					]},
					{components: [
						{name: "sevenButton", kind: "TableButton", style: "width: 33%", content: "7", key: "buttonPress", data: {keyCode: 7}},
						{name: "eightButton", kind: "TableButton", style: "width: 33%", content: "8", key: "buttonPress", data: {keyCode: 8}},
						{name: "nineButton", kind: "TableButton", style: "width: 33%", content: "9", key: "buttonPress", data: {keyCode: 9}}
					]},
					{components: [
						{name: "dashButton", kind: "TableButton", style: "width: 33%", content: "-", key: "buttonPress", data: {keyCode: 10}},
						{name: "zeroButton", kind: "TableButton", style: "width: 33%", content: "0", key: "buttonPress", data: {keyCode: 0}},
						{name: "enterButton", kind: "TableButton", style: "width: 33%", content: "ENTER", key: "buttonPress", data: {keyCode: 11}}
					]}
				]},
				{kind: "enyo.Table", style: "width: 100%; margin-top: 10px;", components: [
					{components: [
						{name: "powerButton", kind: "TableButton", style: "width: 50%", content: "POWER OFF", key: "buttonPowerOff"},
						{name: "3DButton", kind: "TableButton", style: "width: 50%", content: "3D MODE", key: "button3D"}
					]}
				]},
				{content: "Channel", style: "width: 100%; text-align: center; margin-top: 10px;"},
				{kind: "enyo.Table", style: "width: 100%;", components: [
					{components: [
						{name: "channelDownButton", kind: "TableButton", style: "width: 50%", content: "-", key: "channelDown"},
						{name: "channelUpButton", kind: "TableButton", style: "width: 50%", content: "+", key: "channelUp"}
					]}
				]},
				{name: "channelList", kind: "enyo.DataRepeater", components: [
					{kind: "onyx.Item", classes: "channel-item", ontap: "openChannel", components: [
						{name: "channelNumber", classes: "channel-number"},
						{name: "channelName", classes: "channel-name"}
					], bindings: [
						{from: ".model.number", to: ".$.channelNumber.content"},
						{from: ".model.name", to: ".$.channelName.content"}
					]}
				]}
			]}
		]},
		{kind: "enyo.Signals", onDeviceCapabilitiesChanged: "handleCapabilitiesChanged"}
	],

	rendered: function () {
		this.inherited(arguments);
		this.handleCapabilitiesChanged();
	},

	handleCapabilitiesChanged: function () {
		this.$.oneButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.twoButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.threeButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.fourButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.fiveButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.sixButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.sevenButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.eightButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.nineButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.dashButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.zeroButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.enterButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.KeyControl.KeyCode)));
		this.$.powerButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.PowerControl.Off)));
		this.$['3DButton'].setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.TVControl["3D"].Set)));
		this.$.channelDownButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.TVControl.Channel.Down)));
		this.$.channelUpButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.TVControl.Channel.Up)));
		if (this.app.deviceHasCapability(ConnectSDK.capabilities.TVControl.Channel.List)) {
			this.getChannelList();
		}
	},

	bindings: [
		{from: ".channelList", to: ".$.channelList.collection"}
	],

	getChannelList: function () {
		enyo.Signals.send("onGetChannelList", {callbacks: {success: this.handleGotChannelList.bind(this), error: this.handleGetChannelListError.bind(this)}});
	},

	handleGotChannelList: function (channels) {
		channels.sort(function (a, b) {
			if (a.majorNumber !== b.majorNumber) {
				return a.majorNumber - b.majorNumber;
			} else if (a.minorNumber !== b.minorNumber) {
				return a.minorNumber - b.minorNumber;
			} else {
				return 0;
			}
		});

		// This will wrap the channel list into enyo.Model instances
		this.channelList.destroyAllLocal();
		this.channelList.reset(channels);
	},

	handleGetChannelListError: function (err) {
		this.app.showError(err);
	},

	openChannel: function (inSender, inEvent) {
		debugger;
	}
});
