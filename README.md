# Connect SDK Cordova API Sampler App

## About
Sampler app demonstrating Connect SDK APIs using Cordova.
Written using the [Enyo](http://www.enyojs.com) JS framework.

For information on Connect SDK, visit [connectsdk.com/about](http://www.connectsdk.com/about/).

## Requirements

cordova 3.3.0+

## Setup

0. Download and unzip or clone this sample app repository.
1. cd Connect-SDK-Cordova-API-Sampler
2. cordova plugin add https://github.com/ConnectSDK/Connect-SDK-Cordova-Plugin.git
3. cordova platform add ios
4. cordova platform add android

## Extra steps for iOS

1. Download Google Cast sender library from https://developers.google.com/cast/docs/downloads
2. Unzip GoogleCastFramework-2.0-Release.zip
3. Open the Xcode project in platforms/ios/
4. From Finder, drag GoogleCast.framework from the unzipped directory onto the "Frameworks" group
   of the Xcode project window; alternatively, control-click on Frameworks and select "Add files to"
   and select GoogleCast.framework using the file dialog.
5. Select/check the options for "Copy items into destination group's folder",
   "Create groups for any added folders", and "Add to targets", and then hit "Finish"
   (or "Add" if using the "Add files to" dialog).
6. You should now be able to build the project from Xcode or from the command line. Make sure to
   run "cordova prepare ios" after making changes in www when using Xcode.

## Building and running

    cordova build
    cordova run --device

## Updating plugin

To update the plugin to the latest version, run

    cordova plugin rm com.connectsdk.cordova.plugin
    cordova plugin add https://github.com/ConnectSDK/Connect-SDK-Cordova-Plugin.git
