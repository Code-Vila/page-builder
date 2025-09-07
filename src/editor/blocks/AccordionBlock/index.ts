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
        traits: [],
        script: function () {
          // Função que funciona tanto na edição quanto no preview
          const initAccordion = () => {
            const widget = this as unknown as HTMLElement;
            if (!widget) return;

            const headers = widget.querySelectorAll(".accordion-header");

            // Remover listeners anteriores para evitar duplicação
            headers.forEach((header) => {
              const newHeader = header.cloneNode(true);
              header.parentNode?.replaceChild(newHeader, header);
            });

            // Adicionar listeners aos novos elementos
            const newHeaders = widget.querySelectorAll(".accordion-header");
            newHeaders.forEach((header) => {
              header.addEventListener(
                "click",
                (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const toggle =
                    header.previousElementSibling as HTMLInputElement;
                  if (toggle && toggle.type === "checkbox") {
                    // Toggle do checkbox
                    toggle.checked = !toggle.checked;

                    // Disparar evento change para ativar CSS
                    const changeEvent = new Event("change", { bubbles: true });
                    toggle.dispatchEvent(changeEvent);
                  }
                },
                { passive: false }
              );
            });
          };

          // Inicializar imediatamente
          initAccordion();

          // Re-inicializar quando o componente for renderizado
          setTimeout(initAccordion, 100);
        },
      },
    },
  });
};

export { accordionCSS };
export default AccordionBlock;
