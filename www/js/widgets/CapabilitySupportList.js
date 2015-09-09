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
	name: "CapabilitySupportList",

	published: {
		capabilities: null
	},

	components: [
		{kind: "onyx.Groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Capabilities"},
			{name: "repeater", kind: "enyo.DataRepeater", components: [
				{style: "padding: 1em; font-size: large", components: [
					{name: "support", kind: "CapabilitySupport"}
				], bindings: [
					{from: ".model.value", to: ".$.support.capability"}
				]}
			]}
		]}
	],

	create: function () {
		this.inherited(arguments);
		this.capabilitiesChanged();
	},

	capabilitiesChanged: function () {
		var data = (this.capabilities || []).map(function (s) {
			return {value: s};
		});

		var c = new enyo.Collection(data);
		this.$.repeater.set("collection", c);
		this.resized();
	}
});
