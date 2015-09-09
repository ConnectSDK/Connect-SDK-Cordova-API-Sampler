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
		onmouseup: "mouseup",
		ontouchend: "mouseup"
	},

	rendered: function() {
		this.inherited(arguments);
		this.disabledChanged();
	},

	disabledChanged: function () {
		if (this.disabled) {
			this.addClass("disabled");
			this.mouseConnect = false;
		} else {
			this.removeClass("disabled");
			this.checkMouse();
		}
	},

	checkMouse: function () {
		// connect mouse if necessary
		if (this.app.device && !this.mouseConnected && !this.disabled) {
			enyo.Signals.send("onMouseConnect");
			this.mouseConnected = true;
		}
	},

	mouseTap: function () {
		if (this.app.device && !this.dragged) {
			this.checkMouse();
			enyo.Signals.send("onMouseClick");
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

		if (this.lastPos && this.app.device) {
			var dx = pos.x - this.lastPos.x;
			var dy = pos.y - this.lastPos.y;

			this.checkMouse();
			enyo.Signals.send("onMouseMove", {dx: dx, dy: dy});
		}

		this.dragged = true;
		this.lastPos = pos;
		return true;
	}
});
