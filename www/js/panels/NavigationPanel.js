enyo.kind({
    name: "NavigationPanel",
    kind: "CapabilityPanel",
    
    handlers: {
        // Handle onButtonPressed event from any of the RemoteButton controls
        onButtonPressed: "handleButton"
    },

    components: [
        {kind: "enyo.FittableRows", classes: "enyo-fit", components: [
            {kind: "enyo.Table", style: "width: 100%", components: [
                {components: [
                    {kind: "RemoteButton", content: "Back", key: "back"},
                    {},
                    {kind: "RemoteButton", content: "Home", key: "home"}
                ]},
                
                {components: [
                    {},
                    {kind: "RemoteButton", content: "Up", key: "up"},
                    {}
                ]},
                {components: [
                    {kind: "RemoteButton", content: "Left", key: "left"},
                    {kind: "RemoteButton", content: "Enter", key: "enter"},
                    {kind: "RemoteButton", content: "Right", key: "right"}
                ]},
                {components: [
                    {},
                    {kind: "RemoteButton", content: "Down", key: "down"},
                    {}
                ]},
            ]},
            {name: "pad", classes: "trackpad", fit: true, ontap: "mouseTap",
                ondragstart: "dragStart",
                ondrag: "drag",
                ondragfinish: "dragFinish",
                onmouseup: "mouseup",
            }
        ]}
    ],
         
    deviceDisconnected: function (device) {
        this.mouseConnected = false;
    },
    
    checkMouse: function () {
        // connect mouse if necessary
        if (this.device && !this.mouseConnected) {
            this.device.getMouseControl().connectMouse();
            this.mouseConnected = true;
        }
    },
         
    mouseTap: function () {
        console.log("tapped");
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
        
        this.dragged = true;
        this.lastPos = pos;
        return true;
    },
    
    sendKey: function (methodName) {
        if (!this.device) {
            return;
        }
        
        var keyControl = this.device.getKeyControl();
        
        keyControl[methodName]();
    },
    
    handleButton: function (sender, event) {
        this.sendKey(event.key);
    }
});
        
enyo.kind({
    name: "RemoteButton",
    kind: "enyo.TableCell",
    
    events: {
        onButtonPressed: ""
    },
    
    published: {
        key: ""
    },
    
    style: "padding: 6px; text-align: center; vertical-align: middle;",
    
    components: [
        {kind: "onyx.Button", style: "padding: 15px; min-width: 100px", ontap: "buttonTap"}
    ],
    
    bindings: [
        {from: ".content", to: ".$.button.content"}
    ],
    
    buttonTap: function () {
        this.doButtonPressed({key: this.key});
        return true;
    }
});