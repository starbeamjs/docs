import { useSandpack } from "sandpack-vue3";
import { Ref, onMounted, onUnmounted, ref, watch } from "vue";

function useIframeHeight(container: Ref<HTMLElement>): Ref<number> {
  const height = ref(300);

  onMounted(() => {
    let setHeight: null | number = null;

    const observer = new ResizeObserver(() => {
      const iframe = container.value.querySelector(":root iframe") as
        | HTMLIFrameElement
        | undefined;

      if (iframe === undefined) {
        console.warn("iframe not found in sandpack preview");
      }

      const currentHeight = iframe?.getBoundingClientRect().height;

      if (!currentHeight || currentHeight === setHeight) {
        return;
      }

      setHeight = currentHeight + 1;
      iframe.style.height = `${setHeight}px`;

      height.value = setHeight;
    });

    observer.observe(container.value);

    onUnmounted(() => {
      observer.disconnect();
    });
  });

  return height;
}

export function usePreviewHeight(): Ref<HTMLDivElement> {
  const container = ref();
  const height = useIframeHeight(container);

  watch(height, (h: number) => {
    const demo = container.value as HTMLElement | undefined;

    if (!demo) {
      console.warn("demo not found in sandpack preview");
      return;
    }

    const previewContainer = demo.querySelector(":root .sp-preview") as
      | HTMLElement
      | undefined;

    if (!previewContainer) {
      console.warn("No preview container found");
      return;
    }

    const previewActions = demo.querySelector(":root .sp-preview-actions") as
      | HTMLElement
      | undefined;

    if (!previewActions) {
      console.warn("No preview actions found");
      return;
    }

    // previewContainer.style.setProperty("--sp-layout-height", `${h + 1}px`);
    console.log("height", { height: h });
  });
  return container;
}
