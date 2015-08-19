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
	name: "MediaPanel",
	kind: "CapabilityPanel",

	published: {
		loopChecked: false
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
						{name: "photoButton", kind: "TableButton", style: "width: 33%", content: "PHOTO", key: "displayImage"},
						{name: "videoButton", kind: "TableButton", style: "width: 33%", content: "VIDEO", onButtonPressed: "handleVideoButtonPressed"},
						{name: "audioButton", kind: "TableButton", style: "width: 33%", content: "AUDIO", key: "playAudio"}
					]},
					{components: [
						{style: "height: 20px"} // Spacer
					]},
					{components: [
						{name: "playButton", kind: "TableButton", style: "width: 33%", content: "PLAY", key: "buttonPlay"},
						{name: "pauseButton", kind: "TableButton", style: "width: 33%", content: "PAUSE", key: "buttonPause"},
						{name: "stopButton", kind: "TableButton", style: "width: 33%", content: "STOP", key: "buttonStop"}
					]},
					{components: [
						{name: "rewindButton", kind: "TableButton", style: "width: 33%", content: "REWIND", key: "buttonRewind"},
						{name: "fastForwardButton", kind: "TableButton", style: "width: 33%", content: "FAST FORWARD", key: "buttonFastForward"},
						{name: "closeButton", kind: "TableButton", style: "width: 33%", content: "CLOSE", key: "mediaClose"}
					]},
					{components: [
						{style: "height: 20px"} // Spacer
					]},
					{components: [
						{name: "playlistButton", kind: "TableButton", style: "width: 33%", content: "PLAYLIST", key: "playPlaylist"},
						{kind: "enyo.TableCell", style: "text-align: center; width: 33%;", components: [
							{name: "subtitlesCheckbox", kind: "CheckboxWithLabel", "content": "Subtitles"}
						]},
						{kind: "enyo.TableCell", style: "text-align: center; width: 33%;", components: [
							{name: "loopCheckbox", kind: "CheckboxWithLabel", "content": "Loop"}
						]}
					]}
				]},
				{kind: "enyo.Table", style: "width: 100%", components: [
					{components: [
						{name: "previousButton", kind: "TableButton", content: "PREV.", key: "mediaPrevious"},
						{name: "nextButton", kind: "TableButton", content: "NEXT", key: "mediaNext"},
						{name: "jumpButton", kind: "TableButton", content: "JUMP", key: "mediaJumpToTrack"},
						{kind: "enyo.TableCell", components: [
							{name: "jumpInput", kind: "Input", attributes: {type: "number", value: 0}, value: 0, style: "width: 60px"}
						]}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "width: 90%; margin: 20px auto;", components: [
					{content: "--:--"},
					{content: "Seek", style: "text-align: center;", fit: true},
					{content: "--:--"}
				]},
				{name: "seekSlider", kind: "onyx.Slider", value: 0, style: "width: 90%; margin: 25px auto"},
				{content: "Volume", style: "width: 100%; text-align: center; margin: 20px auto;"},
				{name: "volumeSlider", kind: "onyx.Slider", value: 0, style: "width: 90%; margin: 25px auto"},
				{kind: "enyo.Table", style: "width: 100%", components: [
					{components: [
						{name: "infoButton", kind: "TableButton", content: "SHOW INFO", buttonWidth: "40%", key: "mediaShowInfo"}
					]}
				]}
			]}
		]},
		{kind: "enyo.Signals", onDeviceCapabilitiesChanged: "handleCapabilitiesChanged"}
	],

	bindings: [
		{from: ".loopChecked", to: ".$.loopCheckbox.checked", oneWay: false}
	],

	rendered: function () {
		this.inherited(arguments);
		this.handleCapabilitiesChanged();
	},

	handleCapabilitiesChanged: function () {
		this.$.photoButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Display.Image)));
		this.$.videoButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Play.Video)));
		this.$.audioButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Play.Audio)));
		this.$.playButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Play)));
		this.$.pauseButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Pause)));
		this.$.stopButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Stop)));
		this.$.rewindButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Rewind)));
		this.$.fastForwardButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.FastForward)));
		this.$.closeButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Close)));
		this.$.playlistButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Subtitle.SRT) || this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Subtitle.WebVTT)));
		this.$.subtitlesCheckbox.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Loop)));
		this.$.loopCheckbox.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Loop)));
		this.$.previousButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.PlaylistControl.Previous)));
		this.$.nextButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.PlaylistControl.Next)));
		this.$.jumpButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.PlaylistControl.JumpToTrack)));
		this.$.jumpInput.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.PlaylistControl.JumpToTrack)));
		this.$.infoButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.MediaInfo.Get)));
		if (this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Seek)) {
			this.$.seekSlider.removeClass("disabled");
		} else {
			this.$.seekSlider.addClass("disabled");
		}
		if (this.app.deviceHasCapability(ConnectSDK.capabilities.VolumeControl.Set)) {
			this.$.volumeSlider.removeClass("disabled");
		} else {
			this.$.volumeSlider.addClass("disabled");
		}
	},

	handleVideoButtonPressed: function (inSender, inEvent) {
		if (this.$.subtitlesCheckbox.checked) {
			enyo.Signals.send("onPlayVideoWithSubtitles");
		} else {
			enyo.Signals.send("onPlayVideo");
		}
		return true;
	},

	loopCheckedChanged: function () {
		SamplerEventHandler.audio.shouldLoop = this.loopChecked;
		SamplerEventHandler.video.shouldLoop = this.loopChecked;
		SamplerEventHandler.playlist.shouldLoop = this.loopChecked;
	}
});
