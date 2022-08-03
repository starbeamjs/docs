"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@starbeam/core");
// #region define-resource
function ChannelResource(channelName) {
    return (0, core_1.Resource)((resource) => {
        const lastMessage = (0, core_1.Cell)(null);
        resource.on.setup(() => {
            const channel = Channel.subscribe(channelName.read());
            channel.onMessage((message) => {
                lastMessage.set(message);
            });
            return () => channel.unsubscribe();
        });
        return () => {
            const prefix = `[${channelName.read()}] `;
            if (lastMessage.current === null) {
                return `${prefix} No messages received yet`;
            }
            else {
                return `${prefix} ${lastMessage.current}`;
            }
        };
    });
}
// #endregion
