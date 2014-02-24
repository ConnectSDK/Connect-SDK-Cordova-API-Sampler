# Connect SDK Cordova API Sampler App

## About
Sampler app demonstrating Connect SDK APIs using Cordova.
Written using the [Enyo](http://www.enyojs.com) JS framework.

For information on Connect SDK, visit [connectsdk.com/about](http://www.connectsdk.com/about/).

## Setup

0. Download and unzip or clone this sample app repository.
1. cd to Connect-SDK-Cordova-API-Sampler
2. cordova plugin add https://github.com/ConnectSDK/Connect-SDK-Cordova-Plugin.git
3. cordova platform add ios
4. cordova platform add android
5. cordova build
6. cordova run --device

## Updating plugin

To update the plugin to the latest version, run

    cordova plugin rm com.connectsdk.cordova.plugin
    cordova plugin add https://github.com/ConnectSDK/Connect-SDK-Cordova-Plugin.git
