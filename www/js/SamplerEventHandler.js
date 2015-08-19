// ConnectSDK Samples
enyo.kind({
	name: "SamplerEventHandler",

	statics: {
		webAppId: "SampleWebApp",
		webAppSession: null
	},

	handleVolumeUp: function (inSender, inEvent) {
	},
	handleVolumeDown: function (inSender, inEvent) {
	},

	/*
		Play media (Video, Audio, Playlist)
	*/
	handleDisplayImage: function (inSender, inEvent) {
		var url = inEvent.url;
		var mimeType = inEvent.mimeType;

		var options = {
			title: inEvent.title,
			icon: inEvent.icon,
			description: inEvent.description
		};

		var request = this.app.device.getMediaPlayer().displayImage(url, mimeType, options);
	},

	/*
		Play media (Video, Audio, Playlist)
	*/
	handlePlayMedia: function (inSender, inEvent) {
		var url = inEvent.url;
		var mimeType = inEvent.mimeType;

		var options = {
			title: inEvent.title,
			icon: inEvent.icon,
			description: inEvent.description,
			shouldLoop: inEvent.shouldLoop
		};

		var request = this.app.device.getMediaPlayer().playMedia(url, mimeType, options);
	},

	/*
		Launch a web app.
	*/
	handleLaunchWebApp: function (inSender, inEvent) {
		this.app.device.getWebAppLauncher().launchWebApp(SamplerEventHandler.webAppId).success(function (session) {
			SamplerEventHandler.webAppSession = session.acquire();
		}, this);
	},

	/*
		Connect to web app app-to-app session
	*/
	handleJoinWebApp: function (inSender, inEvent) {
		SamplerEventHandler.webAppSession.connect().success(function () {
			// TODO
		}, this).error(function (err) {
			this.app.showError(err);
		}, this);
	},

	/*
		Send a string message to a connected web app
	*/
	handleSendMessage: function (inSender, inEvent) {
		if (SamplerEventHandler.webAppSession) {
			var text = inEvent.message;

			console.log("Sending message: " + text);

			SamplerEventHandler.webAppSession.sendText(text);
		}
	},

	/*
		Send JSON formatted data to a connected web app
	*/
	handleSendJSON: function (inSender, inEvent) {
		if (SamplerEventHandler.webAppSession) {
			var json = inEvent.message;

			console.log("Sending JSON: ", json);

			SamplerEventHandler.webAppSession.sendJSON(json);
		}
	},

	/*
		Close a web app
	*/
	handleCloseWebApp: function (inSender, inEvent) {
		if (SamplerEventHandler.webAppSession) {
			SamplerEventHandler.webAppSession.close().success(function () {
				SamplerEventHandler.webAppSession = null;
			}, this).error(function (err) {
				this.app.showError(err);
			}, this);
		}
	},

	/*
		Leave a web app
	*/
	handleLeaveWebApp: function (inSender, inEvent) {
		if (SamplerEventHandler.webAppSession) {
			SamplerEventHandler.webAppSession.disconnect();
		}
	},

	/*
		Pin a web app
	*/
	handlePinWebApp: function (inSender, inEvent) {
		this.app.device.getWebAppLauncher().pinWebApp("WebAppTester").error(function (err) {
			this.app.showError(err);
		});
	},

	/*
		Unpin a web app
	*/
	handleUnpinWebApp: function (inSender, inEvent) {
		this.app.device.getWebAppLauncher().unPinWebApp("WebAppTester").error(function (err) {
			this.app.showError(err);
		});
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
		 onDisplayImage: "handleDisplayImage",
		 onPlayMedia: "handlePlayMedia",
		 onMediaClose: "",
		 onMediaPrevious: "",
		 onMediaNext: "",
		 onMediaJumpToTrack: "",
		 onMediaShowInfo: "",
		 onMediaSeekTo: "",
		 // Web App
		 onLaunchWebApp: "handleLaunchWebApp",
		 onJoinWebApp: "handleJoinWebApp",
		 onSendMessage: "handleSendMessage",
		 onSendJSON: "handleSendJSON",
		 onLeaveWebApp: "handleLeaveWebApp",
		 onCloseWebApp: "handleCloseWebApp",
		 onPinWebApp: "handlePinWebApp",
		 onUnpinWebApp: "handleUnpinWebApp"
		}
	]
});
