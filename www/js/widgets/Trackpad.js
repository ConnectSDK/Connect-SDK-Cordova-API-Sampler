enyo.kind({
	name: "Trackpad",
	classes: "trackpad",

	published: {
		disabled: false,
		mouseConnected: false
	},

	handlers: {
		ontap: "mouseTap",
		ondragstart: "dragStart",
		ondrag: "drag",
		ondragfinish: "dragFinish",
		onmouseup: "mouseup"
	},

	rendered: function() {
		this.inherited(arguments);
		this.disabledChanged();
	},

	disabledChanged: function () {
		this.removeClass("disabled");
		if (this.disabled) {
			this.addClass("disabled");
		}
	},

	checkMouse: function () {
		// connect mouse if necessary
		if (this.device && !this.mouseConnected) {
			this.device.getMouseControl().connectMouse();
			this.mouseConnected = true;
		}
	},

	mouseTap: function () {
		console.log("tapped device=" + this.device + " dragged=" + this.dragged);
		if (this.device && !this.dragged) {
			console.log("sending click");
			this.checkMouse();
			this.device.getMouseControl().click();
			return true;
		}
	},

	dragStart: function (sender, event) {
		this.initialPos = {x: event.clientX, y: event.clientY};
		this.lastPos = this.initialPos;
		this.dragged = false;

		return true;
	},

	dragFinish: function () {
		return true;
	},

	mouseup: function () {
		// this gets called before tap, unlike dragfinish
		this.dragged = false;
	},

	drag: function (sender, event) {
		var pos = {x: event.clientX, y: event.clientY};

		if (this.lastPos && this.device) {
			var dx = pos.x - this.lastPos.x;
			var dy = pos.y - this.lastPos.y;

			this.checkMouse();
			this.device.getMouseControl().move(dx, dy);
		}

		console.log("dragged");
		this.dragged = true;
		this.lastPos = pos;
		return true;
	}
});
