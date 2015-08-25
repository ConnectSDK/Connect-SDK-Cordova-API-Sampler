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
		muteChecked: false,
		inputList: new enyo.Collection()
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
				]},
				{name: "inputList", kind: "enyo.DataRepeater", components: [
					{kind: "onyx.Item", classes: "input-item", ontap: "openInput", components: [
						{name: "inputId", classes: "input-id"},
						{name: "inputName", classes: "input-name"}
					], bindings: [
						{from: ".model.id", to: ".$.inputId.content"},
						{from: ".model.name", to: ".$.inputName.content"}
					]}
				]}
			]}
		]},
		{kind: "enyo.Signals", onDeviceCapabilitiesChanged: "handleCapabilitiesChanged"}
	],

	bindings: [
		{from: ".muteChecked", to: ".$.muteCheckbox.checked", oneWay: false},
		{from: ".inputList", to: ".$.inputList.collection"}
	],

	rendered: function () {
		this.inherited(arguments);
		this.handleCapabilitiesChanged();
	},

	handleCapabilitiesChanged: function () {
		if (this.app.deviceHasCapability(ConnectSDK.Capabilities.VolumeControl.Set)) {
			this.$.volumeSlider.removeClass("disabled");
			this.subscribeVolume();
		} else {
			this.$.volumeSlider.addClass("disabled");
		}

		this.$.muteCheckbox.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.VolumeControl.Mute.Set)));
		this.$.volumeDownButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.VolumeControl.UpDown)));
		this.$.volumeUpButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.VolumeControl.UpDown)));
		this.$.playButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.Play)));
		this.$.pauseButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.Pause)));
		this.$.stopButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.Stop)));
		this.$.rewindButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.Rewind)));
		this.$.fastForwardButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.FastForward)));
		this.$.inputPickerButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.ExternalInputControl.Picker.Launch)));

		if (this.app.deviceHasCapability(ConnectSDK.Capabilities.VolumeControl.Mute.Get)) {
			this.subscribeMute();
		}

		if (this.app.deviceHasCapability(ConnectSDK.Capabilities.ExternalInputControl.List)) {
			this.getInputList();
		} else {
			this.inputList.destroyAllLocal();
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
	},

	getInputList: function () {
		enyo.Signals.send("onGetExternalInputList", {callbacks: {success: this.handleGotInputList.bind(this), error: this.handleGetInputListError.bind(this)}});
	},

	handleGotInputList: function (inputs) {
		inputs.sort(function (a, b) {
			if (a.name < b.name) {
				return -1;
			} else if (a.name > b.name) {
				return 1;
			} else {
				return 0;
			}
		});

		// This will wrap the channel list into enyo.Model instances
		this.inputList.destroyAllLocal();
		this.inputList.reset(inputs);
	},

	handleGetInputListError: function (err) {
		this.app.showError(err);
	},

	openInput: function (inSender, inEvent) {
		enyo.Signals.send("onOpenExternalInput", {input: inSender.model.attributes});
	}
});
