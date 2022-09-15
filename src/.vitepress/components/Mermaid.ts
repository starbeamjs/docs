import type mermaidAPI from "mermaid/mermaidAPI.js";
import type { VNode } from "vue";
import {
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import "./mermaid.scss";
import { MARKDOWN_ENHANCE_DELAY } from "./shared/constants.js";
import { LoadingIcon } from "./shared/icons.js";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Mermaid",

  props: {
    id: { type: String, required: true },
    code: { type: String, required: true },
  },

  setup(props) {
    const svgCode = ref("");
    const mermaidElement = ref<HTMLElement>();
    const isDarkmode = ref(false);
    let observer: MutationObserver;

    onMounted(() => {
      const html = document.querySelector("html") as HTMLElement;
      const code = decodeURIComponent(props.code);

      const getDarkmodeStatus = (): boolean =>
        html.classList.contains("dark") ||
        html.getAttribute("data-theme") === "dark";

      // FIXME: Should correct handle dark selector
      isDarkmode.value = getDarkmodeStatus();

      void Promise.all([
        import(/* webpackChunkName: "mermaid" */ "mermaid") as unknown as {
          default: mermaid.Mermaid;
        },
        new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
      ]).then(([mermaid]) => {
        const { initialize, render } = mermaid.default;

        const renderMermaid = (): void => {
          // generate a unvisiable container
          const container = document.createElement("div");

          container.style.position = "relative";
          container.style.top = "-9999px";

          const renderCallback = (code: string): void => {
            svgCode.value = code;
            document.body.removeChild(container);
          };

          initialize({
            theme: "neutral" as mermaidAPI.default.Theme,
            flowchart: { useMaxWidth: false },
            sequence: { useMaxWidth: false },
            journey: { useMaxWidth: false },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            gantt: { useMaxWidth: false },
            er: { useMaxWidth: false },
            pie: { useMaxWidth: false },

            startOnLoad: false,
          });

          // clear SVG Code
          svgCode.value = "";

          document.body.appendChild(container);

          // make sure dom is refreshed
          void nextTick(() => {
            render(props.id, code, renderCallback, container);
          });
        };

        renderMermaid();

        // watch darkmode change
        observer = new MutationObserver(() => {
          isDarkmode.value = getDarkmodeStatus();
        });

        observer.observe(html, {
          attributeFilter: ["class", "data-theme"],
          attributes: true,
        });

        watch(isDarkmode, renderMermaid);
      });
    });

    onBeforeUnmount(() => {
      observer.disconnect();
    });

    return (): VNode =>
      h(
        "div",
        {
          ref: mermaidElement,
          class: ["md-enhance-mermaid", { loading: !svgCode.value }],
        },
        svgCode.value
          ? // mermaid
            h("div", { class: "content", innerHTML: svgCode.value })
          : // loading
            h(LoadingIcon)
      );
  },
});
