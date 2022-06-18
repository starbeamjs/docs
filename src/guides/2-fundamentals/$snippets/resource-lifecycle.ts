import {
  Cell,
  Reactive,
  Resource,
  type ResourceConstructor,
} from "@starbeam/core";

// #region define-resource
function ChannelResource(
  channelName: Reactive<string>
): ResourceConstructor<string> {
  return Resource((resource) => {
    const channel = Channel.subscribe(channelName.current);
    resource.on.cleanup(() => channel.unsubscribe());

    const lastMessage = Cell(null as string | null);

    channel.onMessage((message) => {
      lastMessage.set(message);
    });

    return () => {
      const prefix = `[${channelName.current}] `;
      if (lastMessage.current === null) {
        return `${prefix} No messages received yet`;
      } else {
        return `${prefix} ${lastMessage.current}`;
      }
    };
  });
}

declare class Channel {
  static subscribe(name: string): Channel;

  onMessage(handler: (message: string) => void): void;
  unsubscribe(): void;
}
// #endregion
