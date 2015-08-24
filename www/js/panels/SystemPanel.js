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
	name: "SystemPanel",
	kind: "CapabilityPanel",

	handlers: {
		// Handle onButtonPressed event from any of the TableButton controls
		onButtonPressed: "handleButton"
	},

	published: {
		muteChecked: false
	},

	handleButton: function (inSender, inEvent) {
		var eventName = "on" + inEvent.key.charAt(0).toUpperCase() + inEvent.key.slice(1);
		var eventData = (inEvent.originator && inEvent.originator.data) || {};
		enyo.Signals.send(eventName, eventData);
	},

	components: [
		{kind: "enyo.Scroller", touch: true, classes: "enyo-fit", horizontal: "hidden", components: [
			{kind: "enyo.FittableRows", components: [
				{content: "Volume", style: "width: 100%; text-align: center; margin: 20px auto;"},
				{name: "volumeSlider", kind: "onyx.Slider", value: 0, min: 0, max: 1, style: "width: 90%; margin: 25px auto", onChange: "handleVolumeChange"},
				{kind: "enyo.Table", style: "width: 100%", components: [
					{components: [
						{kind: "enyo.TableCell", style: "text-align: center;", components: [
							{name: "muteCheckbox", kind: "CheckboxWithLabel", "content": "Mute"}
						]},
						{name: "volumeDownButton", kind: "TableButton", content: "-", key: "buttonVolumeDown"},
						{name: "volumeUpButton", kind: "TableButton", content: "+", key: "buttonVolumeUp"}
					]},
					{components: [
						{style: "height: 20px"} // Spacer
					]},
					{components: [
						{name: "playButton", kind: "TableButton", content: "PLAY", key: "buttonPlay"},
						{name: "pauseButton", kind: "TableButton", content: "PAUSE", key: "buttonPause"},
						{name: "stopButton", kind: "TableButton", content: "STOP", key: "buttonStop"}
					]}
				]},
				{kind: "enyo.Table", style: "width: 100%", components: [
					{components: [
						{name: "rewindButton", kind: "TableButton", content: "REWIND", buttonWidth: "145px", key: "buttonRewind"},
						{name: "fastForwardButton", kind: "TableButton", content: "FAST FORWARD", buttonWidth: "145px", key: "buttonFastForward"},
					]}
				]},
				{kind: "enyo.Table", style: "width: 100%", components: [
					{components: [
						{name: "inputPickerButton", kind: "TableButton", content: "INPUT PICKER", key: "showInputPicker"},
					]}
				]}
			]}
		]},
		{kind: "enyo.Signals", onDeviceCapabilitiesChanged: "handleCapabilitiesChanged"}
	],

	bindings: [
		{from: ".muteChecked", to: ".$.muteCheckbox.checked", oneWay: false}
	],

	rendered: function () {
		this.inherited(arguments);
		this.handleCapabilitiesChanged();
	},

	handleCapabilitiesChanged: function () {
		if (this.app.deviceHasCapability(ConnectSDK.capabilities.VolumeControl.Set)) {
			this.$.volumeSlider.removeClass("disabled");
			this.subscribeVolume();
		} else {
			this.$.volumeSlider.addClass("disabled");
		}
		this.$.muteCheckbox.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.VolumeControl.Mute.Set)));
		this.$.volumeDownButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.VolumeControl.UpDown)));
		this.$.volumeUpButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.VolumeControl.UpDown)));
		this.$.playButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Play)));
		this.$.pauseButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Pause)));
		this.$.stopButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Stop)));
		this.$.rewindButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Rewind)));
		this.$.fastForwardButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.FastForward)));
		this.$.inputPickerButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.ExternalInputControl.Picker.Launch)));

		if (this.app.deviceHasCapability(ConnectSDK.capabilities.VolumeControl.Mute.Get)) {
			this.subscribeMute();
		}
	},

	subscribeVolume: function () {
		enyo.Signals.send("onSubscribeVolume", {callbacks: {success: this.handleGotVolume.bind(this), error: this.handleGetVolumeError.bind(this)}})
	},

	handleGotVolume: function (volume) {
		this.$.volumeSlider.animateTo(volume);
	},

	handleGetVolumeError: function () {
	},

	handleVolumeChange: function () {
		var volume = parseInt(this.$.volumeSlider.value * 100) / 100; // Crop any decimals positions after 2
		enyo.Signals.send("onSetVolume", {volume: volume});
	},

	subscribeMute: function () {
		enyo.Signals.send("onSubscribeMute", {callbacks: {success: this.handleGotMute.bind(this), error: this.handleGetMuteError.bind(this)}});
	},

	handleGotMute: function (mute) {
		this.$.muteCheckbox.setChecked(mute);
	},

	handleGetMuteError: function () {
	},

	muteCheckedChanged: function () {
		enyo.Signals.send("onSetMute", {mute: this.$.muteCheckbox.checked});
	}
});
