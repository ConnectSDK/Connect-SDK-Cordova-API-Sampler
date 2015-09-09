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
	name: "HeaderWithCapability",
	kind: "onyx.GroupboxHeader",

	published: {
		capability: "",
		content: ""
	},

	controlClasses: "inline-block",
	components: [
		{name: "label"},
		{content: "&ndash;", allowHtml: true, style: "padding: 0 0.5em 0 0.5em"},
		{name: "support", kind: "CapabilitySupport", style: "text-transform: none",}
	],

	bindings: [
		{from: ".capability", to: ".$.support.capability"},
		{from: ".content", to: ".$.label.content"}
	]
});
