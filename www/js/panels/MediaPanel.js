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
						{name: "photoButton", kind: "TableButton", content: "PHOTO", key: "displayImage", data: {
							url: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/photo.jpg",
							mimeType: "image/jpeg",
							title: "Sintel Character Design",
							description: "Blender Open Movie Project",
							icon: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/photoIcon.jpg"
						}},
						{name: "videoButton", kind: "TableButton", content: "VIDEO", key: "playMedia", data: {
							url: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/video.mp4",
							mimeType: "video/mp4",
							title: "Sintel Trailer",
							description: "Blender Open Movie Project",
							icon: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/videoIcon.jpg"
						}},
						{name: "audioButton", kind: "TableButton", content: "AUDIO", key: "playMedia", data: {
							url: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/audio.mp3",
							mimeType: "audio/mp3",
							title: "The Song that Doesn't End",
							description: "Lamb Chop's Play Along",
							icon: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/audioIcon.jpg"
						}}
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
						{name: "playlistButton", kind: "TableButton", attributes: {colspan: 2}, buttonWidth: "196px", content: "PLAYLIST", key: "playMedia", data: {
							url: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/example-m3u-playlist.m3u",
							mimeType: "application/x-mpegurl",
							title: "Playlist",
							description: "Playlist description",
							icon: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/audioIcon.jpg"
						}},
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
		this.$.photoButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Display.Image)));
		this.$.videoButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Play.Video)));
		this.$.audioButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Play.Audio)));
		this.$.playButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Play)));
		this.$.pauseButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Pause)));
		this.$.stopButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Stop)));
		this.$.rewindButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.Rewind)));
		this.$.fastForwardButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaControl.FastForward)));
		this.$.closeButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Close)));
		this.$.playlistButton.setDisabled(!(this.app.deviceHasCapability(ConnectSDK.capabilities.MediaPlayer.Play.Playlist)));
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
	}
});
