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

	getPositionInterval: null,
	getDurationInterval: null,

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
						{name: "playButton", kind: "TableButton", style: "width: 33%", content: "PLAY", key: "mediaPlay"},
						{name: "pauseButton", kind: "TableButton", style: "width: 33%", content: "PAUSE", key: "mediaPause"},
						{name: "stopButton", kind: "TableButton", style: "width: 33%", content: "STOP", key: "mediaStop"}
					]},
					{components: [
						{name: "rewindButton", kind: "TableButton", style: "width: 33%", content: "REWIND", key: "mediaRewind"},
						{name: "fastForwardButton", kind: "TableButton", style: "width: 33%", content: "FAST FORWARD", key: "mediaFastForward"},
						{name: "closeButton", kind: "TableButton", style: "width: 33%", content: "CLOSE", key: "mediaClose"}
					]},
					{components: [
						{style: "height: 20px"} // Spacer
					]},
					{components: [
						{name: "playlistButton", kind: "TableButton", style: "width: 33%", content: "PLAYLIST", onButtonPressed: "handlePlaylistButtonPressed"},
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
						{name: "jumpButton", kind: "TableButton", content: "JUMP", onButtonPressed: "handleJumpToTrackPressed"},
						{kind: "enyo.TableCell", components: [
							{name: "jumpInput", kind: "Input", attributes: {type: "number", value: 0}, value: 0, style: "width: 60px"}
						]}
					]}
				]},
				{name: "progressColumns", kind: "enyo.FittableColumns", style: "width: 90%; margin: 20px auto;", components: [
					{name: "positionLabel", content: "--:--"},
					{content: "Seek", style: "text-align: center;", fit: true},
					{name: "durationLabel", content: "--:--"}
				]},
				{name: "seekSlider", kind: "onyx.Slider", classes: "disabled", value: 1, min: 1, style: "width: 90%; margin: 25px auto", onChange: "handleSeekChange"},
				{content: "Volume", style: "width: 100%; text-align: center; margin: 20px auto;"},
				{name: "volumeSlider", kind: "onyx.Slider", value: 0, min: 0, max: 1, style: "width: 90%; margin: 25px auto", onChange: "handleVolumeChange"}
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
		this.$.photoButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaPlayer.Display.Image)));
		this.$.videoButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaPlayer.Play.Video)));
		this.$.audioButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaPlayer.Play.Audio)));
		this.$.playButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.Play)));
		this.$.pauseButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.Pause)));
		this.$.stopButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.Stop)));
		this.$.rewindButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.Rewind)));
		this.$.fastForwardButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.FastForward)));
		this.$.closeButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaPlayer.Close)));
		this.$.playlistButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaPlayer.Play.Playlist)));
		this.$.subtitlesCheckbox.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaPlayer.Subtitle.SRT) || this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaPlayer.Subtitle.WebVTT)));
		this.$.loopCheckbox.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaPlayer.Loop)));
		this.$.previousButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.PlaylistControl.Previous)));
		this.$.nextButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.PlaylistControl.Next)));
		this.$.jumpButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.PlaylistControl.JumpToTrack)));
		this.$.jumpInput.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.Capabilities.PlaylistControl.JumpToTrack)));
		if (this.app.deviceHasCapability(ConnectSDK.Capabilities.VolumeControl.Set)) {
			this.$.volumeSlider.removeClass("disabled");
			this.subscribeVolume();
		} else {
			this.$.volumeSlider.addClass("disabled");
			this.$.volumeSlider.setMin(0);
			this.$.volumeSlider.setMax(1);
			this.$.volumeSlider.setValue(0);
		}
		if (!this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.Seek)) {
			if (this.getDurationInterval !== null) {
				clearInterval(this.getDurationInterval);
			}
			this.getDurationInterval = null;
			if (this.getPositionInterval !== null) {
				clearInterval(this.getPositionInterval);
			}
			this.getPositionInterval = null;

			this.$.seekSlider.addClass("disabled");
			this.$.seekSlider.setMin(0);
			this.$.seekSlider.setMax(1);
			this.$.seekSlider.setValue(0);
			this.$.positionLabel.setContent("--:--");
			this.$.durationLabel.setContent("--:--");
			this.$.progressColumns.resized();
		}
	},

	subscribeVolume: function () {
		enyo.Signals.send("onSubscribeVolume", {callbacks: {success: this.handleGotVolume.bind(this), error: this.handleGetVolumeError.bind(this)}})
	},

	handleGotVolume: function (volume) {
		// Only update the slider if it is not being interacted with
		if (!this.$.volumeSlider.$.knob.hasClass("pressed")) {
			this.$.volumeSlider.animateTo(volume);
		}
	},

	handleGetVolumeError: function (err) {
		this.app.showError(err);
	},

	handleVolumeChange: function () {
		var volume = parseInt(this.$.volumeSlider.value * 100) / 100; // Crop any decimals positions after 2
		enyo.Signals.send("onSetVolume", {volume: volume});
	},

	handleVideoButtonPressed: function (inSender, inEvent) {
		if (this.$.subtitlesCheckbox.checked) {
			enyo.Signals.send("onPlayVideoWithSubtitles", {callbacks: {success: this.handleMediaSuccess.bind(this), error: this.handleMediaError.bind(this)}});
		} else {
			enyo.Signals.send("onPlayVideo", {callbacks: {success: this.handleMediaSuccess.bind(this), error: this.handleMediaError.bind(this)}});
		}
		return true;
	},

	handlePlaylistButtonPressed: function (inSender, inEvent) {
		enyo.Signals.send("onPlayPlaylist", {callbacks: {success: this.handleMediaSuccess.bind(this), error: this.handleMediaError.bind(this)}});
		return true;
	},

	loopCheckedChanged: function () {
		SamplerEventHandler.audio.shouldLoop = this.loopChecked;
		SamplerEventHandler.video.shouldLoop = this.loopChecked;
		SamplerEventHandler.playlist.shouldLoop = this.loopChecked;
	},

	handleMediaSuccess: function () {
		if (this.app.deviceHasCapability(ConnectSDK.Capabilities.MediaControl.Seek)) {
			this.$.seekSlider.removeClass("disabled");
			if (this.getPositionInterval !== null) {
				clearInterval(this.getPositionInterval);
			}
			this.getPositionInterval = setInterval(this.handleGetPosition.bind(this), 200);
			if (this.getDurationInterval !== null) {
				clearInterval(this.getDurationInterval);
			}
			this.getDurationInterval = setInterval(this.handleGetDuration.bind(this), 500);
		} else {
			this.$.seekSlider.addClass("disabled");
		}
	},

	handleMediaError: function () {
		if (this.getPositionInterval !== null) {
			clearInterval(this.getPositionInterval);
		}
		if (this.getDurationInterval !== null) {
			clearInterval(this.getDurationInterval);
		}
	},

	handleGetDuration: function () {
		enyo.Signals.send("onMediaGetDuration", {callbacks: {success: this.handleGotDuration.bind(this), error: this.handleGetDurationError.bind(this)}});
	},

	handleGotDuration: function (duration) {
		this.$.seekSlider.setMax(duration);

		var minutes = Math.floor(duration / 60);
		var seconds = duration - (minutes * 60);

		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		var time = minutes + ':' + seconds;

		this.$.durationLabel.setContent(time);

		this.$.progressColumns.resized();
	},

	handleGetDurationError: function (err) {
		this.app.showError(err);
	},

	handleSeekChange: function () {
		enyo.Signals.send("onMediaSeekTo", {position: this.$.seekSlider.value});
	},

	handleGetPosition: function () {
		enyo.Signals.send("onMediaGetPosition", {callbacks: {success: this.handleGotPosition.bind(this), error: this.handleGetPositionError.bind(this)}});
	},

	handleGotPosition: function (position) {
		// Only update the position if the user is not interacting with the seek slider
		if (!this.$.seekSlider.$.knob.hasClass("pressed")) {
			this.$.seekSlider.animateTo(position);

			var minutes = Math.floor(position / 60);
			var seconds = position - (minutes * 60);

			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			var time = minutes + ':' + seconds;

			this.$.positionLabel.setContent(time);

			this.$.progressColumns.resized();
		}
	},

	handleGetPositionError: function (err) {
		this.app.showError(err);
	},

	handleJumpToTrackPressed: function () {
		enyo.Signals.send("onMediaJumpToTrack", {item: this.$.jumpInput.value});
	}
});
