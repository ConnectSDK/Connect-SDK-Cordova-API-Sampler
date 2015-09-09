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
	name: "NavBar",
	style: "width: 240px; background-color: lightgray; box-shadow: gray -2px 0px 1px inset",

	defaultKind: "NavItem",

	components: [
		{title: "Media", panelName: "MediaPanel"},
		{title: "Web App", panelName: "WebAppPanel"},
		{title: "Control", panelName: "ControlPanel"},
		{title: "Apps", panelName: "AppsPanel"},
		{title: "TV", panelName: "TVPanel"},
		{title: "System", panelName: "SystemPanel"}
	]
});
