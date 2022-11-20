import {
  Cell,
  Formula,
  Reactive,
  Resource,
  ResourceBlueprint,
} from "@starbeam/universal";

declare class Channel {
  static subscribe(name: string): Channel;

  onMessage(handler: (message: string) => void): void;
  unsubscribe(): void;
}
// #endregion

// #region define-resource
function ChannelResource(
  channelName: Reactive<string>
): ResourceBlueprint<string> {
  return Resource(({ on }) => {
    const lastMessage = Cell(null as string | null);

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
      } else {
        return `${prefix} ${lastMessage.current}`;
      }
    });
  });
}
// #endregion
