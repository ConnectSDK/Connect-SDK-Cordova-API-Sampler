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
                        {kind: "onyx.Item", components: [
                            {name: "channelName"}
                        ], bindings: [
                            {from: ".model.name", to: ".$.channelName.content"}
                        ]}
                    ]}
                ]},
                {tabLabel: "Current Channel", components: [
                    {content: "TODO"},
                ]}
            ]}
        ]}
    ],
    
    bindings: [
        {from: "", to: ".$.channelList.collection"}
    ],
    
    deviceChanged: function () {
        if (this.device) {
            var tvControl = this.device.getTVControl();
            
            tvControl.subscribeChannelInfo().success(this.bindSafely("updateChannelList"));
            tvControl.getChannelList().success(this.bindSafely("updateCurrentChannel"));
        }
    },
    
    updateCurrentChannel: function (channel) {
        this.currentChannel = channel;
        
        if (this.currentChannel) {
            this.$.currentChannelInfo.setContent(this.currentChannel.name);
        } else {
            this.$.currentChannelInfo.setContent("unknown");
        }
    },
    
    updateChannelList: function (channels) {
        this.channelList.reset(channels);
    },

    channelUp: function () {
        this.device && this.device.getTVControl().channelUp();
    },
    
    channelDown: function () {
        this.device && this.device.getTVControl().channelDown();
    }
});