enyo.kind({
    name: "TVControlPanel",
    kind: "CapabilityPanel",
    
    published: {
        currentChannel: null,
        channelList: new enyo.Collection()
    },

    components: [
        {kind: "enyo.FittableRows", classes: "enyo-fit", components: [
            {kind: "enyo.FittableColumns", style: "padding: 1em", components: [
                {tag: "span", content: "Current channel:", style: "margin-right: 1em"},
                {name: "currentChannelInfo", tag: "span", content: "unknown"},
                {fit: true},
                {controlClasses: "inline-block", components: [
                    {kind: "onyx.Button", content: "\u25BC ", ontap: "channelDown"},
                    {kind: "onyx.Button", content: "\u25B2", ontap: "channelUp"}
                ]}
            ]},
            {kind: "TabPanels", fit: true, components: [
                {tabLabel: "Channels", components: [
                    {name: "channelList", kind: "enyo.DataList", components: [
                        {kind: "onyx.Item", classes: "channel-item", ontap: "openChannel", components: [
                            {name: "channelNumber", classes: "channel-number"},
                            {name: "channelName", classes: "channel-name"}
                        ], bindings: [
                            {from: ".model.number", to: ".$.channelNumber.content"},
                            {from: ".model.name", to: ".$.channelName.content"}
                        ]}
                    ]}
                ]},
                {tabLabel: "Current Channel", classes: "padding", components: [
                    {content: "Not implemented yet"},
                ]}
            ]}
        ]}
    ],
    
    bindings: [
        {from: ".channelList", to: ".$.channelList.collection"}
    ],
    
    deviceConnected: function (device) {
        var tvControl = device.getTVControl();

        // Subscribe to channel list
        // Complete will be called on either success or failure
        tvControl.getChannelList().complete(this.updateChannelList, this);

        // Subscribe to current channel
        tvControl.subscribeCurrentChannel().complete(this.updateCurrentChannel, this);
    },
    
    updateCurrentChannel: function (err, channel) {
        this.currentChannel = channel;
        
        if (!err && this.currentChannel) {
            this.$.currentChannelInfo.setContent(this.currentChannel.number + " (" + this.currentChannel.name + ")");
        } else {
            this.$.currentChannelInfo.setContent("unknown");
        }
    },
    
    updateChannelList: function (err, channels) {
        if (err) {
            this.app.showError(err);
            return;
        }
        
        channels.sort(function (a, b) {
            if (a.majorNumber !== b.majorNumber) {
                return a.majorNumber - b.majorNumber;
            } else if (a.minorNumber !== b.minorNumber) {
                return a.minorNumber - b.minorNumber;
            } else {
                return 0;
            }
        });
        
        // This will wrap the channel list into enyo.Model instances
        this.channelList.destroyAllLocal();
        this.channelList.reset(channels);
    },

    channelUp: function () {
        this.device && this.device.getTVControl().channelUp();
    },
    
    channelDown: function () {
        this.device && this.device.getTVControl().channelDown();
    },
    
    openChannel: function (sender, event) {
        var channelModel = this.channelList.at(event.index); // enyo.Model instance
        var channel = channelModel.raw(); // raw JS object containing {id: ..., name: ...}
        
        this.device.getTVControl().setChannel(channel).success(function () {
            this.app.showToast("Changing to channel " + channel.number);
        }, this);
    }
});