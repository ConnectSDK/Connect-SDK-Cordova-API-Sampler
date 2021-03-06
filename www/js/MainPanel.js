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
	name: "MainPanel",
	kind: "enyo.Panels",

	classes: "enyo-fit",
	style: "background-color: white",

	draggable: false,

	components: [
		{name: "MediaPanel", kind: "MediaPanel"},
		{name: "WebAppPanel", kind: "WebAppPanel"},
		{name: "ControlPanel", kind: "ControlPanel"},
		{name: "AppsPanel", kind: "AppsPanel"},
		{name: "TVPanel", kind: "TVPanel"},
		{name: "SystemPanel", kind: "SystemPanel"}
	]
});
