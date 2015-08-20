// ConnectSDK Samples
enyo.kind({
	name: "SamplerEventHandler",

	statics: {
		webAppId: "SampleWebApp",
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

	/*
		Set the mute status
	*/
	handleSetMute: function (inSender, inEvent) {
		var mute = inEvent.mute; // Boolean
		app.device.getVolumeControl().setMute(mute);
	},

	/*
		Get the mute status
	*/
	handleGetMute: function (inSender, inEvent) {
		app.device.getVolumeControl().getMute().success(function (mute) {
			// 'mute' is a boolean
			inEvent.callbacks.success(mute);
		}).error(inEvent.callbacks.error);
	},

	/*
		Subscribe to receive updates to the mute status
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
	*/
	handleSetVolume: function (inSender, inEvent) {
		var volume = inEvent.volume; // Should be a decimal percentage (e.g. 0.10)
		app.device.getVolumeControl().setVolume(volume);
	},

	/*
		Get the current volume
	*/
	handleGetVolume: function (inSender, inEvent) {
		app.device.getVolumeControl().getVolume().success(function (volume) {
			// 'volume' contains the volume as a decimal percentage (e.g. 0.10)
			inEvent.callbacks.success(volume);
		}).error(inEvent.callbacks.error);
	},

	/*
		Subscribe to receive updates when the volume changes
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
	*/
	handleVolumeUp: function (inSender, inEvent) {
		app.device.getVolumeControl().volumeUp();
	},

	/*
		Decrease the volume by 1
	*/
	handleVolumeDown: function (inSender, inEvent) {
		app.device.getVolumeControl().volumeDown();
	},

	/*
		Resume playback of a paused video/audio/playlist
	*/
	handlePlay: function (inSender, inEvent) {
		// SamplerEventHandler.mediaPlayer.mediaControl is cached from the response to device.getMediaPlayer().playMedia
		// See handlePlayAudio, handlePlayVideo, handlePlayVideoWithSubtitles and handlePlayPlaylist for samples
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.play();
		}
	},

	/*
		Pause playback of a playing video/audio/playlist
	*/
	handlePause: function (inSender, inEvent) {
		// SamplerEventHandler.mediaPlayer.mediaControl is cached from the response to device.getMediaPlayer().playMedia
		// See handlePlayAudio, handlePlayVideo, handlePlayVideoWithSubtitles and handlePlayPlaylist for samples
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.pause();
		}
	},

	/*
		Stop playback of a playing video/audio/playlist
	*/
	handleStop: function (inSender, inEvent) {
		// SamplerEventHandler.mediaPlayer.mediaControl is cached from the response to device.getMediaPlayer().playMedia
		// See handlePlayAudio, handlePlayVideo, handlePlayVideoWithSubtitles and handlePlayPlaylist for samples
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.stop();
		}
	},

	/*
		Rewind a playing video/audio/playlist
	*/
	handleRewind: function (inSender, inEvent) {
		// SamplerEventHandler.mediaPlayer.mediaControl is cached from the response to device.getMediaPlayer().playMedia
		// See handlePlayAudio, handlePlayVideo, handlePlayVideoWithSubtitles and handlePlayPlaylist for samples
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.rewind();
		}
	},

	/*
		Fast-forward a playing video/audio/playlist
	*/
	handleFastForward: function (inSender, inEvent) {
		// SamplerEventHandler.mediaPlayer.mediaControl is cached from the response to device.getMediaPlayer().playMedia
		// See handlePlayAudio, handlePlayVideo, handlePlayVideoWithSubtitles and handlePlayPlaylist for samples
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.fastForward();
		}
	},

	/*
		Stop a playing video/audio/playlist
	*/
	handleStop: function (inSender, inEvent) {
		// SamplerEventHandler.mediaPlayer.mediaControl is cached from the response to device.getMediaPlayer().playMedia
		// See handlePlayAudio, handlePlayVideo, handlePlayVideoWithSubtitles and handlePlayPlaylist for samples
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.stop();
		}
	},

	/*
		Display an image
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
	*/
	handlePlayAudio: function (inSender, inEvent) {
		var url = SamplerEventHandler.audio.url;
		var mimeType = SamplerEventHandler.audio.mimeType;

		var options = {
			title: SamplerEventHandler.audio.title,
			iconUrl: SamplerEventHandler.audio.icon,
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
	*/
	handlePlayVideo: function (inSender, inEvent) {
		var url = SamplerEventHandler.video.url;
		var mimeType = SamplerEventHandler.video.mimeType;

		var options = {
			title: SamplerEventHandler.video.title,
			iconUrl: SamplerEventHandler.video.icon,
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
	*/
	handlePlayVideoWithSubtitles: function (inSender, inEvent) {
		var url = SamplerEventHandler.video.url;
		var mimeType = SamplerEventHandler.video.mimeType;

		var options = {
			title: SamplerEventHandler.video.title,
			iconUrl: SamplerEventHandler.video.icon,
			description: SamplerEventHandler.video.description,
			shouldLoop: SamplerEventHandler.video.shouldLoop
		};

		// Subtitles
		if (app.device.hasCapability(ConnectSDK.capabilities.MediaPlayer.Subtitle.WebVTT) || app.device.hasCapability(ConnectSDK.capabilities.MediaPlayer.Subtitle.SRT)) {
			options.subtitles = {
				url: app.device.hasCapability(ConnectSDK.capabilities.MediaPlayer.Subtitle.WebVTT) ? SamplerEventHandler.video.subtitles.WebVTT.url : SamplerEventHandler.video.subtitles.SRT.url,
				label: SamplerEventHandler.video.subtitles.label,
				language: SamplerEventHandler.video.subtitles.language,
				mimeType: app.device.hasCapability(ConnectSDK.capabilities.MediaPlayer.Subtitle.WebVTT) ? SamplerEventHandler.video.subtitles.WebVTT.mimeType : SamplerEventHandler.video.subtitles.SRT.mimeType
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
			SamplerEventHandler.mediaPlayer.mediaControl = playlistControl && playlistControl.acquire();

			inEvent.callbacks.success(arguments);
		}).error(inEvent.callbacks.error);
	},

	/*
		Close the media player
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
		Seek the media to a particular time (in seconds)
	*/
	handleMediaSeekTo: function (inSender, inEvent) {
		if (SamplerEventHandler.mediaPlayer.mediaControl) {
			SamplerEventHandler.mediaPlayer.mediaControl.seek(inEvent.position).success(function () {}).error(function () {});
		}
	},

	/*
		Get the duration (in seconds) of the playing media
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
		 onSetVolume: "handleSetVolume",
		 onGetVolume: "handleGetVolume",
		 onSubscribeVolume: "handleSubscribeVolume",
		 onSetMute: "handleSetMute",
		 onGetMute: "handleGetMute",
		 onSubscribeMute: "handleSubscribeMute",
		 onOpenChannel: "",
		 // Buttons
		 onButtonVolumeUp: "handleVolumeUp",
		 onButtonVolumeDown: "handleVolumeDown",
		 onButtonPress: "",
		 onButtonPlay: "handlePlay",
		 onButtonPause: "handlePause",
		 onButtonStop: "handleStop",
		 onButtonRewind: "handleRewind",
		 onButtonFastForward: "handleFastForward",
		 onButtonPowerOff: "",
		 // Media
		 onDisplayImage: "handleDisplayImage",
		 onPlayAudio: "handlePlayAudio",
		 onPlayVideo: "handlePlayVideo",
		 onPlayVideoWithSubtitles: "handlePlayVideoWithSubtitles",
		 onPlayPlaylist: "handlePlayPlaylist",
		 onMediaClose: "handleMediaClose",
		 onMediaPrevious: "",
		 onMediaNext: "",
		 onMediaJumpToTrack: "",
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
