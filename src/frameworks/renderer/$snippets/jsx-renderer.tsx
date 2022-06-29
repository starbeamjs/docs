// #region read-separately
import { Cell } from "@starbeam/core";
import { useResource } from "@starbeam/use-resource";

// #ignore:next
{
  function Component() {
    // useResource is a React hook that gets called when the component is mounted. Its
    // cleanup runs when the component is unmounted.
    //
    // `useResource` handles the fact that React 18+ may mount and unmount a component multiple
    // times by considering each mount/unmount as a complete resource lifecycle.
    const clock = useResource((resource) => {
      const cell = Cell(0);

      const interval = setInterval(() => {
        cell.update((count) => count + 1);
      });

      resource.on.cleanup(() => clearInterval(interval));

      return cell;
    }, undefined);

    return useReactive(() => <div>{clock.current}</div>);
  }
  // #endregion
}
