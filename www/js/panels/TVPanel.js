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
						{name: "oneButton", kind: "TableButton", style: "width: 33%", content: "1", key: "buttonPress"},
						{name: "twoButton", kind: "TableButton", style: "width: 33%", content: "2", key: "buttonPress"},
						{name: "threeButton", kind: "TableButton", style: "width: 33%", content: "3", key: "buttonPress"}
					]},
					{components: [
						{name: "fourButton", kind: "TableButton", style: "width: 33%", content: "4", key: "buttonPress"},
						{name: "fiveButton", kind: "TableButton", style: "width: 33%", content: "5", key: "buttonPress"},
						{name: "sixButton", kind: "TableButton", style: "width: 33%", content: "6", key: "buttonPress"}
					]},
					{components: [
						{name: "sevenButton", kind: "TableButton", style: "width: 33%", content: "7", key: "buttonPress"},
						{name: "eightButton", kind: "TableButton", style: "width: 33%", content: "8", key: "buttonPress"},
						{name: "nineButton", kind: "TableButton", style: "width: 33%", content: "9", key: "buttonPress"}
					]},
					{components: [
						{name: "dashButton", kind: "TableButton", style: "width: 33%", content: "-", key: "buttonPress"},
						{name: "zeroButton", kind: "TableButton", style: "width: 33%", content: "0", key: "buttonPress"},
						{name: "enterButton", kind: "TableButton", style: "width: 33%", content: "ENTER", key: "buttonPress"}
					]}
				]},
				{kind: "enyo.Table", style: "width: 100%; margin-top: 10px;", components: [
					{components: [
						{name: "powerButton", kind: "TableButton", style: "width: 50%", content: "POWER OFF", key: "buttonPowerOff"},
						{name: "3DButton", kind: "TableButton", style: "width: 50%", content: "3D MODE", key: "buttonPress"}
					]}
				]},
				{content: "Channel", style: "width: 100%; text-align: center; margin-top: 10px;"},
				{kind: "enyo.Table", style: "width: 100%;", components: [
					{components: [
						{name: "channelDownButton", kind: "TableButton", style: "width: 50%", content: "-", key: "buttonPress"},
						{name: "channelUpButton", kind: "TableButton", style: "width: 50%", content: "+", key: "buttonPress"}
					]}
				]},
				{name: "channelList", kind: "enyo.DataList", components: [
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
	},

	bindings: [
		{from: ".channelList", to: ".$.channelList.collection"}
	],

	deviceConnected: function (device) {
		var tvControl = device.getTVControl();

		// Subscribe to channel list
		// Complete will be called on either success or failure
		if (this.device.supports("TVControl.Channel.List")) {
			tvControl.getChannelList().complete(this.updateChannelList, this);
		}

		// Subscribe to current channel
		if (this.device.supports("TVControl.Channel.Subscribe")) {
			tvControl.subscribeCurrentChannel().complete(this.updateCurrentChannel, this);
		}
	},

	updateCurrentChannel: function (err, channel) {
//		this.currentChannel = channel;
//
//		if (!err && this.currentChannel) {
//			this.$.currentChannelInfo.setContent(this.currentChannel.number + " (" + this.currentChannel.name + ")");
//		} else {
//			this.$.currentChannelInfo.setContent("unknown");
//		}
	},

	updateChannelList: function (err, channels) {
		if (err) {
			this.app.showError(err);
			return;
		}

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

	channelUp: function () {
		this.device && this.device.getTVControl().channelUp();
	},

	channelDown: function () {
		this.device && this.device.getTVControl().channelDown();
	},

	openChannel: function (sender, event) {
		var channelModel = this.channelList.at(event.index); // enyo.Model instance
		var channel = channelModel.raw(); // raw JS object containing {id: ..., name: ...}

		this.device.getTVControl().setChannel(channel).success(function () {
			this.app.showToast("Changing to channel " + channel.number);
		}, this);
	}
});
