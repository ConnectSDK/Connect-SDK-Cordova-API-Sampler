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
	name: "CheckboxWithLabel",
	published: {
		checked: false,
		content: "",
		disabled: false
	},

	controlClasses: "inline-block",

	components: [
		{name: "checkbox", kind: "onyx.Checkbox"},
		{name: "label", style: "margin-left: 1em", ontap: "toggle"}
	],

	bindings: [
		{from: ".checked", to: ".$.checkbox.checked", oneWay: false},
		{from: ".disabled", to: ".$.checkbox.disabled", oneWay: false},
		{from: ".content", to: ".$.label.content"}
	],

	toggle: function () {
		if (!this.disabled) {
			this.$.checkbox.setChecked(!this.checked);
		}
		return true;
	}
});
