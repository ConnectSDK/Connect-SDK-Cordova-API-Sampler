enyo.kind({
	name: "TableButton",
	kind: "enyo.TableCell",

	events: {
		onButtonPressed: ""
	},

	published: {
		key: "",
		buttonWidth: "98%",
		disabled: false,
		enabled: true
	},

	style: "padding: 6px; text-align: center; vertical-align: middle;",

	components: [
		{name: "Button", kind: "onyx.Button", style: "padding: 15px; margin: auto;", ontap: "buttonTap"}
	],

	bindings: [
		{from: ".content", to: ".$.Button.content"},
		{from: ".disabled", to: ".$.Button.disabled"}
	],

	rendered: function () {
		this.inherited(arguments);
		this.$.Button.applyStyle("width", this.buttonWidth);
	},

	buttonTap: function () {
		this.doButtonPressed({key: this.key});
		return true;
	}
});
