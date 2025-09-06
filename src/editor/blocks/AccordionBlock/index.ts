import "./style.css";
import accordionHTML from "./element.html?raw";
import accordionCSS from "./style.css?raw";

export const AccordionBlock = {
  id: "accordion",
  label: "Accordion",
  category: "Interativo",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <path d="M3 4h18v4H3V4zm0 6h18v4H3v-4zm0 6h18v4H3v-4z"/>
      <path d="M19 6l-2 2 2 2m0 2l-2 2 2 2m0 2l-2 2 2 2" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>
  `,
  content: accordionHTML,
  attributes: {
    class: "gjs-block-accordion",
    title: "Arraste para adicionar um accordion",
  },
};

export const AccordionComponent = (editor: any) => {
  editor.DomComponents.addType("accordion", {
    isComponent: (el: HTMLElement) =>
      el.classList?.contains("accordion-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["accordion-widget"],
        content: accordionHTML,

        script: function () {
          const widget = this as unknown as HTMLElement;
          const headers = widget.querySelectorAll(".accordion-header");

          headers.forEach((header) => {
            header.addEventListener("click", () => {
              const target = header.getAttribute("data-target");
              const content = widget.querySelector(
                `[data-section="${target}"]`
              );
              const icon = header.querySelector(".accordion-icon");

              // Fechar todos os outros
              headers.forEach((h) => {
                if (h !== header) {
                  h.classList.remove("active");
                  const otherTarget = h.getAttribute("data-target");
                  const otherContent = widget.querySelector(
                    `[data-section="${otherTarget}"]`
                  );
                  const otherIcon = h.querySelector(".accordion-icon");

                  if (otherContent) otherContent.classList.remove("active");
                  if (otherIcon) otherIcon.textContent = "+";
                }
              });

              // Toggle atual
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

export { accordionCSS };
export default AccordionBlock;
