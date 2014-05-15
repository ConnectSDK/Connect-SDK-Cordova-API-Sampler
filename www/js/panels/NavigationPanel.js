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
    name: "NavigationPanel",
    kind: "CapabilityPanel",
    
    handlers: {
        // Handle onButtonPressed event from any of the RemoteButton controls
        onButtonPressed: "handleButton"
    },

    components: [
        {kind: "RemoteTextInputArea"},
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
         
    bindings: [
        {from: ".app.device", to: ".$.remoteTextInputArea.device"}
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
    name: "RemoteTextInputArea",
    classes: "remote-text-input-area",
    
    showing: false,
    
    published: {
        device: null
    },
        
    components: [
        {content: "Remote Text Entry"},
        {kind: "onyx.InputDecorator", style: "width: 80%", components: [
            {name: "input", kind: "enyo.Input", onkeydown: "handleKeyDown", onkeyup: "handleKeyUp", oninput: "handleInput"}
        ]}
    ],
          
    create: function () {
        this.inherited(arguments);
        this.currentText = "";
    },
        
    handleKeyDown: function (sender, event) {
        if (!this.currentText && (event.keyCode === 8 || event.keyCode == 46)) {
            // Handle backspace when the field is empty
            this.device.getTextInputControl().sendDelete();
        } else if (event.keyCode === 13) {
            this.device.getTextInputControl().sendEnter();
        }
    },
    
    handleKeyUp: function (sender, event) {
        this.applyTextChanges();
    },
        
    handleInput: function () {
        this.applyTextChanges();
    },
        
    applyTextChanges: function () {
        var textInputControl = this.device.getTextInputControl();
        var value = this.$.input.getValue();
        
        if (value === this.currentText) {
            return;
        }
        
        // Figure out what changed
        // Fast path: characters added
        if (value.length > this.currentText.length) {
            if (value.substr(0, this.currentText.length) === this.currentText) {
                // Some characters added
                var added = value.substr(this.currentText.length);
                
                console.log("Adding text: " + added);
                textInputControl.sendText(added);
                
                this.currentText = value;
                return;
            }
        } else if (value.length === this.currentText.length - 1) {
            if (value === this.currentText.substr(0, this.currentText.length - 1)) { // One char deleted
                console.log("Deleting a character");
                textInputControl.sendDelete();
                
                this.currentText = value;
                return;
            }
        }
        
        console.log("Replacing '" + this.currentText + "' with '" + value + "'");
        
        // Larger change -- delete everything
        for (var i = 0; i < this.currentText.length; i += 1) {
            textInputControl.sendDelete();
        }
        
        textInputControl.sendText(value);
        this.currentText = value;
    },
        
    close: function () {
        this.$.input.setValue("");
        this.blur();
        this.hide();
    },
        
    deviceChanged: function (oldDevice) {
        if (this.device && this.device.supports("TextInputControl.Subscribe")) {
            this.device.getTextInputControl().subscribeTextInputStatus().success(this.handleStatus, this);
        } else {
            this.close();
        }
    },
        
    handleStatus: function (status) {
        if (status.isVisible) {
            this.show();
            
            if (this.device.hasService(ConnectSDK.Services.WebOSTV) && status.rawData) {
                // webOS-specific handling
                var needReset = status.rawData.focusChanged;
                var currentWidget = status.rawData.currentWidget;
                
                if (currentWidget && !currentWidget.focus) {
                    needReset = true;
                }
                
                if (needReset) {
                    this.$.input.setValue("");
                }
            }
        } else {
            this.close();
        }
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