// ConnectSDK Samples
enyo.kind({
	name: "SamplerEventHandler",

	statics: {
		webAppId: "SampleWebApp",
		dialAppId: "Levak",
		youtubeContentId: "eRsGyueVLvQ",
		webAppSession: null,
		image: {
			url: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/photo.jpg",
			mimeType: "image/jpeg",
			title: "Sintel Character Design",
			description: "Blender Open Movie Project",
			iconUrl: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/photoIcon.jpg"
		},
		audio: {
			url: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/audio.mp3",
			mimeType: "audio/mp3",
			title: "The Song that Doesn't End",
			description: "Lamb Chop's Play Along",
			iconUrl: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/audioIcon.jpg",
			shouldLoop: false
		},
		video: {
			url: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/video.mp4",
			mimeType: "video/mp4",
			title: "Sintel Trailer",
			description: "Blender Open Movie Project",
			iconUrl: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/videoIcon.jpg",
			shouldLoop: false,
			subtitles: {
				label: "English",
				language: "en",
				SRT: {
					url: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/sintel_en.srt",
					mimeType: "text/srt"
				},
				WebVTT: {
					url: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/sintel_en.vtt",
					mimeType: "text/vtt"
				}
			}
		},
		playlist: {
			url: "http://ec2-54-201-108-205.us-west-2.compute.amazonaws.com/samples/media/example-m3u-playlist.m3u",
			mimeType: "application/x-mpegurl",
			title: "Playlist",
			description: "An M3U Playlist",
			shouldLoop: false
		},
		mediaPlayer: {
			launchSession: null,
			mediaControl: null,
			playlistControl: null
		}
	},

	published: {
		airPlayMirror: true
	},

	/*
		Launch the browser
		Capabilities: Launcher.Browser, Launcher.Browser.Params
	*/
	handleLaunchBrowser: function (inSender, inEvent) {
		var url = inEvent.url;
		app.device.getLauncher().launchBrowser(url);
	},

	/*
		Launch a DIAL app
		Capabilities: Launcher.App, Launcher.App.Params
	*/
	handleLaunchDIALApp: function (inSender, inEvent) {
		var appId = SamplerEventHandler.dialAppId;
		app.device.getLauncher().launchApp(appId);
	},

	/*
		Show a notification on the device (toast)
		Capabilities: ToastControl.Show, ToastControl.Show.Toast
	*/
	handleShowToast: function (inSender, inEvent) {
		app.device.getExternalInputControl().showInputPicker();
	},

	/*
		Open Netflix
		Capabilities: Launcher.Netflix, Launcher.Netflix.Params
	*/
	handleLaunchNetflix: function (inSender, inEvent) {
		var contentId = inEvent.contentId; // A string, should be the content to load
		app.device.getLauncher().launchNetflix(contentId);
	},

	/*
		Launch the device app store with optional deep linking
		Capabilities: Launcher.AppStore, Launcher.AppStore.Params
	*/
	handleLaunchAppStore: function (inSender, inEvent) {
		var appId;
		// To deep link to an app we need the app id
		/*
		if (getTv().getServiceByName("Netcast TV") != null)
			appId = "125071";
		else if (getTv().getServiceByName("webOS TV") != null)
			appId = "redbox";
		else if (getTv().getServiceByName("Roku") != null)
			appId = "13535";
		*/
		app.device.getLauncher().launchAppStore(appId);
	},

	/*
		Launch Youtube with optional deep linking to a video
		Capabilities: Launcher.YouTube, Launcher.YouTube.Params
	*/
	handleLaunchYoutube: function (inSender, inEvent) {
		var contentId = SamplerEventHandler.youtubeContentId;
		app.device.getLauncher().launchYouTube(contentId);
	},

	/*
		List the device's installed apps
		Capabilities: Launcher.App.List
	*/
	handleGetAppList: function (inSender, inEvent) {
		app.device.getLauncher().getAppList().success(function (apps) {
			// Inputs contains an array of apps

			if (inEvent.callbacks.success) {
				inEvent.callbacks.success(apps);
			}
		}).error(function (err) {
			if (inEvent.callbacks.error) {
				inEvent.callbacks.error(err);
			}
		});
	},

	/*
		Open an app on the device
		Capabilities: Launcher.App
	*/
	handleOpenApp: function (inSender, inEvent) {
		var appId = inEvent.app.id; // String, the appId can be obtained from the app listing in Launcher.getAppList - see handleGetAppList
		app.device.getLauncher().launchApp(appId);
	},

	/*
		Tune the TV to a specific channel
		Capabilities: TVControl.Channel.Set
	*/
	handleSetChannel: function (inSender, inEvent) {
		var channelInfo = inEvent.channel; // Should be a ChannelInfo object (returned from TVControl.getChannelList; see handleGetChannelList sample
		app.device.getTVControl().setChannel(channelInfo);
	},

	/*
		Get the list of channels from the TV
		Capabilities: TVControl.Channel.List
	*/
	handleGetChannelList: function (inSender, inEvent) {
		app.device.getTVControl().getChannelList().success(function (channels) {
			// Channels is an array containing the channels list
			if (inEvent.callbacks.success) {
				inEvent.callbacks.success(channels);
			}
		})
	},

	/*
		TV Channel Up
		Capabilities: TVControl.Channel.Up
	*/
	handleChannelUp: function (inSender, inEvent) {
		app.device.getTVControl().channelUp();
	},

	/*
		TV Channel Down
		Capabilities: TVControl.Channel.Down
	*/
	handleChannelDown: function (inSender, inEvent) {
		app.device.getTVControl().channelDown();
	},

	/*
		Set the mute status
		Capabilities: VolumeControl.Mute.Set
	*/
	handleSetMute: function (inSender, inEvent) {
		var mute = inEvent.mute; // Boolean
		app.device.getVolumeControl().setMute(mute);
	},

	/*
		Get the mute status
		Capabilities: VolumeControl.Mute.Get
	*/
	handleGetMute: function (inSender, inEvent) {
		app.device.getVolumeControl().getMute().success(function (mute) {
			// 'mute' is a boolean
			inEvent.callbacks.success(mute);
		}).error(inEvent.callbacks.error);
	},

	/*
		Subscribe to receive updates to the mute status
		Capabilities: VolumeControl.Mute.Subscribe
	*/
	handleSubscribeMute: function (inSender, inEvent) {
		var subscription = app.device.getVolumeControl().subscribeMute().success(function (mute) {
			// 'mute' is a boolean
			inEvent.callbacks.success(mute);
		}).error(inEvent.callbacks.error);

		// You can cancel the subscription with subscription.unsubscribe();
	},

	/*
		Set the volume
		Capabilities: VolumeControl.Set
	*/
	handleSetVolume: function (inSender, inEvent) {
		var volume = inEvent.volume; // Should be a decimal percentage (e.g. 0.10)
		app.device.getVolumeControl().setVolume(volume);
	},

	/*
		Get the current volume
		Capabilities: VolumeControl.Get
	*/
	handleGetVolume: function (inSender, inEvent) {
		app.device.getVolumeControl().getVolume().success(function (volume) {
			// 'volume' contains the volume as a decimal percentage (e.g. 0.10)
			inEvent.callbacks.success(volume);
		}).error(inEvent.callbacks.error);
	},

	/*
		Subscribe to receive updates when the volume changes
		Capabilities: VolumeControl.Subscribe
	*/
	handleSubscribeVolume: function (inSender, inEvent) {
		var subscription = app.device.getVolumeControl().subscribeVolume().success(function (volume) {
			// 'volume' contains the volume as a decimal percentage (e.g. 0.10)
			inEvent.callbacks.success(volume);
		}).error(inEvent.callbacks.error);

		// You can cancel the subscription with subscription.unsubscribe();
	},

	/*
		Increase the volume by 1
		Capabilities: VolumeControl.UpDown
	*/
	handleVolumeUp: function (inSender, inEvent) {
		app.device.getVolumeControl().volumeUp();
	},

	/*
		Decrease the volume by 1
		Capabilities: VolumeControl.UpDown
	*/
	handleVolumeDown: function (inSender, inEvent) {
		app.device.getVolumeControl().volumeDown();
	},

	/*
		Simulate remote button press
		Capabilities: KeyControl.KeyCode
	*/
	handleButtonPress: function (inSender, inEvent) {
		var keyCode = inEvent.keyCode; // Integer, key codes can be referenced through the ConnectSDK.KeyCodes constant
		app.device.getKeyControl().sendKeyCode(keyCode);
	},

	/*
		Simulate up press
		Capabilities: KeyControl.Up
	*/
	handleButtonUp: function (inSender, inEvent) {
		app.device.getKeyControl().up();
	},

	/*
		Simulate down press
		Capabilities: KeyControl.Down
	*/
	handleButtonDown: function (inSender, inEvent) {
		app.device.getKeyControl().down();
	},

	/*
		Simulate left press
		Capabilities: KeyControl.Left
	*/
	handleButtonLeft: function (inSender, inEvent) {
		app.device.getKeyControl().left();
	},

	/*
		Simulate right press
		Capabilities: KeyControl.Right
	*/
	handleButtonRight: function (inSender, inEvent) {
		app.device.getKeyControl().right();
	},

	/*
		Simulate OK press
		Capabilities: KeyControl.OK
	*/
	handleButtonOK: function (inSender, inEvent) {
		app.device.getKeyControl().ok();
	},

	/*
		Simulate home press
		Capabilities: KeyControl.Home
	*/
	handleButtonHome: function (inSender, inEvent) {
		app.device.getKeyControl().home();
	},

	/*
		Simulate back press
		Capabilities: KeyControl.Back
	*/
	handleButtonBack: function (inSender, inEvent) {
		app.device.getKeyControl().back();
	},

	/*
		Resume media playback
		Capabilities: MediaControl.Play
	*/
	handleButtonPlay: function (inSender, inEvent) {
		app.device.getMediaControl().play();
	},

	/*
		Pause media playback
		Capabilities: MediaControl.Pause
	*/
	handleButtonPause: function (inSender, inEvent) {
		app.device.getMediaControl().pause();
	},

	/*
		Stop media playback
		Capabilities: MediaControl.Stop
	*/
	handleButtonStop: function (inSender, inEvent) {
		app.device.getMediaControl().stop();
	},

	/*
		Rewind media
		Capabilities: MediaControl.Rewind
	*/
	handleButtonRewind: function (inSender, inEvent) {
		app.device.getMediaControl().rewind();
	},

	/*
		Fast forward media
		Capabilities: MediaControl.FastForward
	*/
	handleButtonFastForward: function (inSender, inEvent) {
		app.device.getMediaControl().fastForward();
	},

	/*
		Power off the device
		Capabilities: PowerControl.Off
	*/
	handlePowerOff: function (inSender, inEvent) {
		app.device.getPowerControl().powerOff();
	},

	/*
		List the device's external inputs
		Capabilities: ExternalInputControl.List
	*/
	handleGetExternalInputList: function (inSender, inEvent) {
		app.device.getExternalInputControl().getExternalInputList().success(function (inputs) {
			// Inputs contains an array of external inputs

			if (inEvent.callbacks.success) {
				inEvent.callbacks.success(inputs);
			}
		}).error(function (err) {
			if (inEvent.callbacks.error) {
				inEvent.callbacks.error(err);
			}
		});
	},

	/*
		Switch the device to an external input
		Capabilities: ExternalInputControl.Set
	*/
	handleOpenExternalInput: function (inSender, inEvent) {
		var input = inEvent.input; // Should be a ExternalInputInfo object (returned from ExternalInputControl.getExternalInputList; see handleGetExternalInputList sample
		app.device.getExternalInputControl().setExternalInput(input);
	},

	/*
		Show the device's input picker
		Capabilities: ExternalInputControl.Picker.Launch
	*/
	handleShowInputPicker: function (inSender, inEvent) {
		app.device.getExternalInputControl().showExternalInputPicker();
	},

	/*
		Connect the mouse
		Capabilities: MouseControl.Connect
	*/
	handleMouseConnect: function (inSender, inEvent) {
		app.device.getMouseControl().connectMouse();
	},

	/*
		Move the mouse
		Capabilities: MouseControl.Move
	*/
	handleMouseMove: function (inSender, inEvent) {
		var dx = inEvent.dx; // Integer, the change in x position of the mouse
		var dy = inEvent.dy; // Integer, the change in y position of the mouse
		app.device.getMouseControl().move(dx, dy);
	},

	/*
		Click the mouse
		Capabilities: MouseControl.Click
	*/
	handleMouseClick: function (inSender, inEvent) {
		app.device.getMouseControl().click();
	},

	/*
		Display an image
		Capabilities: MediaPlayer.Display.Image
	*/
	handleDisplayImage: function (inSender, inEvent) {
		var url = SamplerEventHandler.image.url;
		var mimeType = SamplerEventHandler.image.mimeType;

		var options = {
			title: SamplerEventHandler.image.title,
			iconUrl: SamplerEventHandler.image.iconUrl,
			description: SamplerEventHandler.image.description
		};

		var request = this.app.device.getMediaPlayer().displayImage(url, mimeType, options).success(function (launchSession) {
			// Release any old launchSession you have, and store the launchSession for future use
			if (SamplerEventHandler.mediaPlayer.launchSession !== null) {
				SamplerEventHandler.mediaPlayer.launchSession.release();
			}
			SamplerEventHandler.mediaPlayer.launchSession = launchSession && launchSession.acquire();
		});
	},

	/*
		Play audio
		Capabilities: MediaPlayer.Play.Audio
	*/
	handlePlayAudio: function (inSender, inEvent) {
		var url = SamplerEventHandler.audio.url;
		var mimeType = SamplerEventHandler.audio.mimeType;

		var options = {
			title: SamplerEventHandler.audio.title,
			iconUrl: SamplerEventHandler.audio.iconUrl,
			description: SamplerEventHandler.audio.description,
			shouldLoop: SamplerEventHandler.audio.shouldLoop
		};

		var request = this.app.device.getMediaPlayer().playMedia(url, mimeType, options).success(function (launchSession, mediaControl) {
			// Release any old launchSession you have, and store the launchSession for future use
			if (SamplerEventHandler.mediaPlayer.launchSession !== null) {
				SamplerEventHandler.mediaPlayer.launchSession.release();
			}
			SamplerEventHandler.mediaPlayer.launchSession = launchSession && launchSession.acquire();

			// Release any old mediaControl you have, and store the launchSession for future use
			if (SamplerEventHandler.mediaPlayer.mediaControl !== null) {
				SamplerEventHandler.mediaPlayer.mediaControl.release();
			}
			SamplerEventHandler.mediaPlayer.mediaControl = mediaControl && mediaControl.acquire();

			inEvent.callbacks.success(arguments);
		}).error(inEvent.callbacks.error);
	},

	/*
		Play video
		Capabilities: MediaPlayer.Play.Video
	*/
	handlePlayVideo: function (inSender, inEvent) {
		var url = SamplerEventHandler.video.url;
		var mimeType = SamplerEventHandler.video.mimeType;

		var options = {
			title: SamplerEventHandler.video.title,
			iconUrl: SamplerEventHandler.video.iconUrl,
			description: SamplerEventHandler.video.description,
			shouldLoop: SamplerEventHandler.video.shouldLoop
		};

		var request = this.app.device.getMediaPlayer().playMedia(url, mimeType, options).success(function (launchSession, mediaControl) {
			// Release any old launchSession you have, and store the launchSession for future use
			if (SamplerEventHandler.mediaPlayer.launchSession !== null) {
				SamplerEventHandler.mediaPlayer.launchSession.release();
			}
			SamplerEventHandler.mediaPlayer.launchSession = launchSession && launchSession.acquire();

			// Release any old mediaControl you have, and store the launchSession for future use
			if (SamplerEventHandler.mediaPlayer.mediaControl !== null) {
				SamplerEventHandler.mediaPlayer.mediaControl.release();
			}
			SamplerEventHandler.mediaPlayer.mediaControl = mediaControl && mediaControl.acquire();

			inEvent.callbacks.success(arguments);
		}).error(inEvent.callbacks.error);
	},

	/*
		Play video with subtitles (depending on device capabilities)
		Capabilities: MediaPlayer.Play.Video, MediaPlayer.Subtitle.SRT, MediaPlayer.Subtitle.WebVTT
	*/
	handlePlayVideoWithSubtitles: function (inSender, inEvent) {
		var url = SamplerEventHandler.video.url;
		var mimeType = SamplerEventHandler.video.mimeType;

		var options = {
			title: SamplerEventHandler.video.title,
			iconUrl: SamplerEventHandler.video.iconUrl,
			description: SamplerEventHandler.video.description,
			shouldLoop: SamplerEventHandler.video.shouldLoop
		};

		// Subtitles
		if (app.device.hasCapability(ConnectSDK.Capabilities.MediaPlayer.Subtitle.WebVTT) || app.device.hasCapability(ConnectSDK.Capabilities.MediaPlayer.Subtitle.SRT)) {
			options.subtitles = {
				url: app.device.hasCapability(ConnectSDK.Capabilities.MediaPlayer.Subtitle.WebVTT) ? SamplerEventHandler.video.subtitles.WebVTT.url : SamplerEventHandler.video.subtitles.SRT.url,
				label: SamplerEventHandler.video.subtitles.label,
				language: SamplerEventHandler.video.subtitles.language,
				mimeType: app.device.hasCapability(ConnectSDK.Capabilities.MediaPlayer.Subtitle.WebVTT) ? SamplerEventHandler.video.subtitles.WebVTT.mimeType : SamplerEventHandler.video.subtitles.SRT.mimeType
			};
		}

		var request = this.app.device.getMediaPlayer().playMedia(url, mimeType, options).success(function (launchSession, mediaControl) {
			// Release any old launchSession you have, and store the launchSession for future use
			if (SamplerEventHandler.mediaPlayer.launchSession !== null) {
				SamplerEventHandler.mediaPlayer.launchSession.release();
			}
			SamplerEventHandler.mediaPlayer.launchSession = launchSession && launchSession.acquire();

			// Release any old mediaControl you have, and store the launchSession for future use
			if (SamplerEventHandler.mediaPlayer.mediaControl !== null) {
				SamplerEventHandler.mediaPlayer.mediaControl.release();
			}
			SamplerEventHandler.mediaPlayer.mediaControl = mediaControl && mediaControl.acquire();

			inEvent.callbacks.success(arguments);
		}).error(inEvent.callbacks.error);
	},

	/*
		Play a playlist
		Capabilities: MediaPlayer.Play.Playlist
	*/
	handlePlayPlaylist: function (inSender, inEvent) {
		var url = SamplerEventHandler.playlist.url;
		var mimeType = SamplerEventHandler.playlist.mimeType;

		var options = {
			title: SamplerEventHandler.playlist.title,
			description: SamplerEventHandler.playlist.description,
			shouldLoop: SamplerEventHandler.playlist.shouldLoop
		};

		var request = this.app.device.getMediaPlayer().playMedia(url, mimeType, options).success(function (launchSession, mediaControl, playlistControl) {
			// Release any old launchSession you have, and store the launchSession for future use
			if (SamplerEventHandler.mediaPlayer.launchSession !== null) {
				SamplerEventHandler.mediaPlayer.launchSession.release();
			}
			SamplerEventHandler.mediaPlayer.launchSession = launchSession && launchSession.acquire();

			// Release any old mediaControl you have, and store the launchSession for future use
			if (SamplerEventHandler.mediaPlayer.mediaControl !== null) {
				SamplerEventHandler.mediaPlayer.mediaControl.release();
			}
			SamplerEventHandler.mediaPlayer.mediaControl = mediaControl && mediaControl.acquire();

			// Release any old playlistControl you have, and store the launchSession for future use
			if (SamplerEventHandler.mediaPlayer.playlistControl !== null) {
				SamplerEventHandler.mediaPlayer.playlistControl.release();
			}
			SamplerEventHandler.mediaPlayer.playlistControl = playlistControl && playlistControl.acquire();

			inEvent.callbacks.success(arguments);
		}).error(inEvent.callbacks.error);
	},

	/*
		Close the media player
		Capabilities: MediaPlayer.Close
	*/
	handleMediaClose: function (inSender, inEvent) {
		if (SamplerEventHandler.mediaPlayer.launchSession) {
			SamplerEventHandler.mediaPlayer.launchSession.close();

			// Release any old launchSession, playbackControl or playlistControl that you might still have
			if (SamplerEventHandler.mediaPlayer.launchSession !== null) {
				SamplerEventHandler.mediaPlayer.launchSession.release();
				SamplerEventHandler.mediaPlayer.launchSession = null;
			}

			if (SamplerEventHandler.mediaPlayer.mediaControl !== null) {
				SamplerEventHandler.mediaPlayer.mediaControl.release();
				SamplerEventHandler.mediaPlayer.mediaControl = null;
			}

			if (SamplerEventHandler.mediaPlayer.playlistControl !== null) {
				SamplerEventHandler.mediaPlayer.playlistControl.release();
				SamplerEventHandler.mediaPlayer.playlistControl = null;
			}
		}
	},

	/*
		Resume playback of a paused video/audio/playlist
		Capabilities: MediaControl.Play
	*/
	handleMediaPlay: function (inSender, inEvent) {
		// SamplerEventHandler.mediaPlayer.mediaControl is cached from the response to device.getMediaPlayer().playMedia
		// See handlePlayAudio, handlePlayVideo, handlePlayVideoWithSubtitles and handlePlayPlaylist for samples
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.play();
		}
	},

	/*
		Pause playback of a playing video/audio/playlist
		Capabilities: MediaControl.Pause
	*/
	handleMediaPause: function (inSender, inEvent) {
		// SamplerEventHandler.mediaPlayer.mediaControl is cached from the response to device.getMediaPlayer().playMedia
		// See handlePlayAudio, handlePlayVideo, handlePlayVideoWithSubtitles and handlePlayPlaylist for samples
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.pause();
		}
	},

	/*
		Stop playback of a playing video/audio/playlist
		Capabilities: MediaControl.Stop
	*/
	handleMediaStop: function (inSender, inEvent) {
		// SamplerEventHandler.mediaPlayer.mediaControl is cached from the response to device.getMediaPlayer().playMedia
		// See handlePlayAudio, handlePlayVideo, handlePlayVideoWithSubtitles and handlePlayPlaylist for samples
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.stop();
		}
	},

	/*
		Rewind a playing video/audio/playlist
		Capabilities: MediaControl.Rewind
	*/
	handleMediaRewind: function (inSender, inEvent) {
		// SamplerEventHandler.mediaPlayer.mediaControl is cached from the response to device.getMediaPlayer().playMedia
		// See handlePlayAudio, handlePlayVideo, handlePlayVideoWithSubtitles and handlePlayPlaylist for samples
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.rewind();
		}
	},

	/*
		Fast-forward a playing video/audio/playlist
		Capabilities: MediaControl.FastForward
	*/
	handleMediaFastForward: function (inSender, inEvent) {
		// SamplerEventHandler.mediaPlayer.mediaControl is cached from the response to device.getMediaPlayer().playMedia
		// See handlePlayAudio, handlePlayVideo, handlePlayVideoWithSubtitles and handlePlayPlaylist for samples
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.fastForward();
		}
	},

	/*
		Navigate playlist to the previous item
		Capabilities: PlaylistControl.Previous
	*/
	handleMediaPrevious: function (inSender, inEvent) {
		if (SamplerEventHandler.mediaPlayer.playlistControl) {
			SamplerEventHandler.mediaPlayer.playlistControl.previous();
		}
	},

	/*
		Navigate playlist to the next item
		Capabilities: PlaylistControl.Next
	*/
	handleMediaNext: function (inSender, inEvent) {
		if (SamplerEventHandler.mediaPlayer.playlistControl) {
			SamplerEventHandler.mediaPlayer.playlistControl.next();
		}
	},

	/*
		Navigate playlist to a specific index
		Capabilities: PlaylistControl.JumpToTrack
	*/
	handleMediaJumpToTrack: function (inSender, inEvent) {
		if (SamplerEventHandler.mediaPlayer.playlistControl) {
			var itemIndex = inEvent.item;
			SamplerEventHandler.mediaPlayer.playlistControl.jumpToTrack(itemIndex);
		}
	},

	/*
		Seek the media to a particular time (in seconds)
		Capabilities: MediaControl.Seek
	*/
	handleMediaSeekTo: function (inSender, inEvent) {
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.seek(inEvent.position).success(function () {}).error(function () {});
		}
	},

	/*
		Get the duration (in seconds) of the playing media
		Capabilities: MediaControl.Duration
	*/
	handleMediaGetDuration: function (inSender, inEvent) {
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.getDuration().success(function (duration) {
				// 'duration' contains the media duration in seconds;
				inEvent.callbacks.success(duration);
			}).error(inEvent.callbacks.error);
		}
	},

	/*
		Get the position (in seconds) of the playing media
		Capabilities: MediaControl.Position
	*/
	handleMediaGetPosition: function (inSender, inEvent) {
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.getPosition().success(function (position) {
				// 'position' contains the media position in seconds
				inEvent.callbacks.success(position);
			}).error(inEvent.callbacks.error);
		}
	},

	/*
		Launch a web app.
		Capabilities: WebAppLauncher.Launch
	*/
	handleLaunchWebApp: function (inSender, inEvent) {
		this.app.device.getWebAppLauncher().launchWebApp(SamplerEventHandler.webAppId).success(function (session) {
			SamplerEventHandler.webAppSession = session.acquire();
		}, this);
	},

	/*
		Connect to web app app-to-app session
		Capabilities: WebAppLauncher.Connect
	*/
	handleConnectWebApp: function (inSender, inEvent) {
		SamplerEventHandler.webAppSession.connect().success(function () {}, this).error(function (err) {
			this.app.showError(err);
		}, this);
	},

	/*
		Send a string message to a connected web app
		Capabilities: WebAppLauncher.Message.Send
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
		Capabilities: WebAppLauncher.Message.Send.JSON
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
		Capabilities: WebAppLauncher.Close
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
		Capabilities: WebAppLauncher.Disconnect
	*/
	handleLeaveWebApp: function (inSender, inEvent) {
		if (SamplerEventHandler.webAppSession) {
			SamplerEventHandler.webAppSession.disconnect();
		}
	},

	/*
		Pin a web app
		Capabilities: WebAppLauncher.Pin
	*/
	handlePinWebApp: function (inSender, inEvent) {
		this.app.device.getWebAppLauncher().pinWebApp("WebAppTester").error(function (err) {
			this.app.showError(err);
		});
	},

	/*
		Unpin a web app
		Capabilities: WebAppLauncher.Pin
	*/
	handleUnpinWebApp: function (inSender, inEvent) {
		this.app.device.getWebAppLauncher().unPinWebApp("WebAppTester").error(function (err) {
			this.app.showError(err);
		});
	},

	components: [
		// Hook handlers into UI
		{kind: "enyo.Signals",
		 // Apps
		 onLaunchBrowser: "handleLaunchBrowser",
		 onLaunchDIALApp: "handleLaunchDIALApp",
		 onShowToast: "handleShowToast",
		 onLaunchNetflix: "handleLaunchNetflix",
		 onLaunchAppStore: "handleLaunchAppStore",
		 onLaunchYoutube: "handleLaunchYoutube",
		 onLaunchApp: "handleLaunchApp",
		 onGetAppList: "handleGetAppList",
		 onOpenApp: "handleOpenApp",
		 // TV
		 onSetChannel: "handleSetChannel",
		 onGetChannelList: "handleGetChannelList",
		 onChannelUp: "handleChannelUp",
		 onChannelDown: "handleChannelDown",
		 // System
		 onSetVolume: "handleSetVolume",
		 onGetVolume: "handleGetVolume",
		 onSubscribeVolume: "handleSubscribeVolume",
		 onSetMute: "handleSetMute",
		 onGetMute: "handleGetMute",
		 onSubscribeMute: "handleSubscribeMute",
		 onButtonVolumeUp: "handleVolumeUp",
		 onButtonVolumeDown: "handleVolumeDown",
		 onButtonPress: "handleButtonPress",
		 onButtonUp: "handleButtonUp",
		 onButtonDown: "handleButtonDown",
		 onButtonLeft: "handleButtonLeft",
		 onButtonRight: "handleButtonRight",
		 onButtonOK: "handleButtonOK",
		 onButtonHome: "handleButtonHome",
		 onButtonBack: "handleButtonBack",
		 onButtonPlay: "handleButtonPlay",
		 onButtonPause: "handleButtonPause",
		 onButtonStop: "handleButtonStop",
		 onButtonRewind: "handleButtonRewind",
		 onButtonFastForward: "handleButtonFastForward",
		 onButtonPowerOff: "handlePowerOff",
		 onGetExternalInputList: "handleGetExternalInputList",
		 onOpenExternalInput: "handleOpenExternalInput",
		 onShowInputPicker: "handleShowInputPicker",
		 onMouseConnect: "handleMouseConnect",
		 onMouseMove: "handleMouseMove",
		 onMouseClick: "handleMouseClick",
		 // Media
		 onDisplayImage: "handleDisplayImage",
		 onPlayAudio: "handlePlayAudio",
		 onPlayVideo: "handlePlayVideo",
		 onPlayVideoWithSubtitles: "handlePlayVideoWithSubtitles",
		 onPlayPlaylist: "handlePlayPlaylist",
		 onMediaClose: "handleMediaClose",
		 onMediaPlay: "handleMediaPlay",
		 onMediaPause: "handleMediaPause",
		 onMediaStop: "handleMediaStop",
		 onMediaRewind: "handleMediaRewind",
		 onMediaFastForward: "handleMediaFastForward",
		 onMediaPrevious: "handleMediaPrevious",
		 onMediaNext: "handleMediaNext",
		 onMediaJumpToTrack: "handleMediaJumpToTrack",
		 onMediaSeekTo: "handleMediaSeekTo",
		 onMediaGetDuration: "handleMediaGetDuration",
		 onMediaGetPosition: "handleMediaGetPosition",
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
