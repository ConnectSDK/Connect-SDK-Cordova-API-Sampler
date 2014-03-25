PLATFORMS ?= android
BRANCH ?= master
PLUGIN_URL ?= https://github.com/ConnectSDK/Connect-SDK-Cordova-Plugin.git\#$(BRANCH)

ifneq ($(shell which 'xcodebuild'),)
	PLATFORMS += ios
endif

all: $(PLATFORMS)

plugins: | plugins/com.connectsdk.cordovaplugin

build-ios: plugins | platforms/ios
ifeq ($(shell grep -q "GoogleCast.framework" "$(wildcard platforms/ios/*.xcodeproj/project.pbxproj)"; echo $$?),1)
	$(error Need to add GoogleCast.framework to Xcode project before building for iOS)
endif
	@echo "Building ios project"
	cordova build ios

build-android: plugins | platforms/android
	@echo "Building android project"
	cordova build android

ios: build-ios
android: build-android

plugins/com.connectsdk.cordovaplugin:
	cordova plugin add $(PLUGIN_URL)

platforms/ios:
	cordova platform add ios

platforms/android:
	cordova platform add android

clean-platforms:
	cordova platform rm ios
	cordova platform rm android

clean-plugins:
	if [ -d plugins/com.connectsdk.cordovaplugin ]; then cordova plugin rm com.connectsdk.cordovaplugin; fi

update: clean-plugins
	cordova plugin add $(PLUGIN_URL)
	cordova prepare

cleanall: clean-platforms clean-plugins

