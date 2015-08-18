// ConnectSDK Samples
enyo.kind({
	name: "SamplerEventHandler",
	handleVolumeUp: function (inSender, inEvent) {
	},
	handleVolumeDown: function (inSender, inEvent) {
	},
	components: [
		// Hook handlers into UI
		{kind: "enyo.Signals",
		 // System
		 onShowInputPicker: "",
		 onOpenGoogle: "",
		 onOpenDIALApp: "",
		 onShowToast: "",
		 onOpenNetflix: "",
		 onOpenAppStore: "",
		 onOpenYoutube: "",
		 onLaunchApp: "",
		 onSetVolume: "",
		 onSetMute: "",
		 onOpenChannel: "",
		 // Buttons
		 onButtonVolumeUp: "handleVolumeUp",
		 onButtonVolumeDown: "handleVolumeDown",
		 onButtonPress: "",
		 onButtonPlay: "",
		 onButtonPause: "",
		 onButtonRewind: "",
		 onButtonFastForward: "",
		 onButtonStop: "",
		 onButtonPowerOff: "",
		 // Media
		 onMediaDisplayPhoto: "",
		 onMediaPlayVideo: "",
		 onMediaPlayAudio: "",
		 onMediaClose: "",
		 onMediaPlaylist: "",
		 onMediaPrevious: "",
		 onMediaNext: "",
		 onMediaJumpToTrack: "",
		 onMediaShowInfo: "",
		 onMediaSeekTo: "",
		 // Web App
		 onLaunchWebApp: "",
		 onJoinWebApp: "",
		 onSendMessage: "",
		 onSendJSON: "",
		 onLeaveWebApp: "",
		 onCloseWebApp: "",
		 onPinWebApp: "",
		 onUnpinWebApp: ""
		}
	]
});
