import "./style.css";
import toggleHTML from "./element.html?raw";
import toggleCSS from "./style.css?raw";

export const ToggleBlock = {
  id: "toggle",
  label: "Toggle",
  category: "Interativo",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <rect x="3" y="6" width="18" height="3" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="19" cy="7.5" r="2" fill="currentColor"/>
      <rect x="3" y="12" width="18" height="3" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="7" cy="13.5" r="2" fill="currentColor"/>
      <rect x="3" y="18" width="18" height="3" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="15" cy="19.5" r="2" fill="currentColor"/>
    </svg>
  `,
  content: toggleHTML,
  attributes: {
    class: "gjs-block-toggle",
    title: "Arraste para adicionar toggles",
  },
};

export const ToggleComponent = (editor: any) => {
  editor.DomComponents.addType("toggle", {
    isComponent: (el: HTMLElement) => el.classList?.contains("toggle-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["toggle-widget"],
        content: toggleHTML,

        script: function () {
          const widget = this as unknown as HTMLElement;
          const headers = widget.querySelectorAll(".toggle-header");

          headers.forEach((header) => {
            header.addEventListener("click", () => {
              const target = header.getAttribute("data-toggle");
              const content = widget.querySelector(
                `[data-section="${target}"]`
              );
              const icon = header.querySelector(".toggle-icon");

              const isActive = header.classList.contains("active");

              if (isActive) {
                header.classList.remove("active");
                if (content) content.classList.remove("active");
                if (icon) icon.textContent = "+";
              } else {
                header.classList.add("active");
                if (content) content.classList.add("active");
                if (icon) icon.textContent = "−";
              }
            });
          });
        },
      },
    },
  });
};

export { toggleCSS };
export default ToggleBlock;
