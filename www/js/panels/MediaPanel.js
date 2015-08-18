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
						{name: "photoButton", kind: "TableButton", content: "PHOTO", key: "mediaDisplayPhoto"},
						{name: "videoButton", kind: "TableButton", content: "VIDEO", key: "mediaPlayVideo"},
						{name: "audioButton", kind: "TableButton", content: "AUDIO", key: "mediaPlayAudio"}
					]},
					{components: [
						{style: "height: 20px"} // Spacer
					]},
					{components: [
						{name: "playButton", kind: "TableButton", content: "PLAY", key: "buttonPlay"},
						{name: "pauseButton", kind: "TableButton", content: "PAUSE", key: "buttonPause"},
						{name: "stopButton", kind: "TableButton", content: "STOP", key: "buttonStop"}
					]},
					{components: [
						{name: "rewindButton", kind: "TableButton", content: "REWIND", key: "buttonRewind"},
						{name: "fastForwardButton", kind: "TableButton", content: "FAST FORWARD", key: "buttonFastForward"},
						{name: "closeButton", kind: "TableButton", content: "CLOSE", key: "mediaClose"}
					]},
					{components: [
						{style: "height: 20px"} // Spacer
					]},
					{components: [
						{name: "playlistButton", kind: "TableButton", attributes: {colspan: 2}, buttonWidth: "196px", content: "PLAYLIST", key: "mediaPlaylist"},
						{kind: "enyo.TableCell", style: "text-align: center", components: [
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

	rendered: function () {
		this.inherited(arguments);
		this.handleCapabilitiesChanged();
	},

	handleCapabilitiesChanged: function () {
		this.$.photoButton.setDisabled(!(this.app.deviceHasCapability("MediaPlayer.Display.Image")));
		this.$.videoButton.setDisabled(!(this.app.deviceHasCapability("MediaPlayer.Play.Video")));
		this.$.audioButton.setDisabled(!(this.app.deviceHasCapability("MediaPlayer.Play.Audio")));
		this.$.playButton.setDisabled(!(this.app.deviceHasCapability("MediaControl.Play")));
		this.$.pauseButton.setDisabled(!(this.app.deviceHasCapability("MediaControl.Pause")));
		this.$.stopButton.setDisabled(!(this.app.deviceHasCapability("MediaControl.Stop")));
		this.$.rewindButton.setDisabled(!(this.app.deviceHasCapability("MediaControl.Rewind")));
		this.$.fastForwardButton.setDisabled(!(this.app.deviceHasCapability("MediaControl.FastForward")));
		this.$.closeButton.setDisabled(!(this.app.deviceHasCapability("MediaPlayer.Close")));
		this.$.playlistButton.setDisabled(!(this.app.deviceHasCapability("MediaPlayer.Play.Playlist")));
		this.$.loopCheckbox.setDisabled(!(this.app.deviceHasCapability("MediaPlayer.Loop")));
		this.$.previousButton.setDisabled(!(this.app.deviceHasCapability("PlaylistControl.Previous")));
		this.$.nextButton.setDisabled(!(this.app.deviceHasCapability("PlaylistControl.Next")));
		this.$.jumpButton.setDisabled(!(this.app.deviceHasCapability("PlaylistControl.JumpToTrack")));
		this.$.jumpInput.setDisabled(!(this.app.deviceHasCapability("PlaylistControl.JumpToTrack")));
		this.$.infoButton.setDisabled(!(this.app.deviceHasCapability("MediaPlayer.MediaInfo.Get")));
		if (this.app.deviceHasCapability("MediaControl.Seek")) {
			this.$.seekSlider.removeClass("disabled");
		} else {
			this.$.seekSlider.addClass("disabled");
		}
		if (this.app.deviceHasCapability("VolumeControl.Set")) {
			this.$.volumeSlider.removeClass("disabled");
		} else {
			this.$.volumeSlider.addClass("disabled");
		}
	}
});
