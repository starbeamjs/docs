import { Cell, Formula, Reactive, Resource, ResourceBlueprint, } from "@starbeam/universal";
// #endregion
// #region define-resource
function ChannelResource(channelName) {
    return Resource(({ on }) => {
        const lastMessage = Cell(null);
        const channel = Channel.subscribe(channelName.read());
        channel.onMessage((message) => {
            lastMessage.set(message);
        });
        on.cleanup(() => {
            channel.unsubscribe();
        });
        return Formula(() => {
            const prefix = `[${channelName.read()}] `;
            if (lastMessage.current === null) {
                return `${prefix} No messages received yet`;
            }
            else {
                return `${prefix} ${lastMessage.current}`;
            }
        });
    });
}
// #endregion
