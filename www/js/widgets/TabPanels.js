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
	name: "TabPanels",
	layoutKind: "FittableRowsLayout",
	controlParentName: "panels",

	components: [
		{name: "tabGroup", kind: "onyx.RadioGroup", layoutKind: "enyo.FlexLayout", flexBias: "column", onActivate: "tabActivated", controlClasses: "onyx-tabbutton"},
		{name: "panels", kind: "enyo.Panels", fit: true, controlClasses: "enyo-fit", draggable: false}
	],

	create: function () {
		this.inherited(arguments);

		var first = true;
		this.getClientControls().forEach(function (c) {
			this.$.tabGroup.createComponent({
				content: c.tabLabel,
				flex: true,
				active: first,
				panelName: c.name,
				owner: this,
				style: "padding: 8px"
			});
			first = false;
		}, this);

		this.reflow();
	},

	tabActivated: function (sender, event) {
		if (!event.originator || !event.originator.active) {
			return true;
		}

		var panelName = event.originator.panelName;
		var activePanel = this.$.panels.getActive();

		if (panelName && (!activePanel || activePanel.name !== panelName)) {
			this.$.panels.selectPanelByName(panelName);
		}

		return true;
	}
});
