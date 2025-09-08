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
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-accordion",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do accordion",
            changeProp: 1,
          },
          {
            type: "text",
            name: "accordion-title-1",
            label: "Título da Seção 1",
            placeholder: "Primeira pergunta",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "accordion-content-1",
            label: "Conteúdo da Seção 1",
            placeholder: "Conteúdo da primeira seção...",
            changeProp: 1,
          },
          {
            type: "text",
            name: "accordion-title-2",
            label: "Título da Seção 2",
            placeholder: "Segunda pergunta",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "accordion-content-2",
            label: "Conteúdo da Seção 2",
            placeholder: "Conteúdo da segunda seção...",
            changeProp: 1,
          },
          {
            type: "text",
            name: "accordion-title-3",
            label: "Título da Seção 3",
            placeholder: "Terceira pergunta",
            changeProp: 1,
          },
          {
            type: "textarea",
            name: "accordion-content-3",
            label: "Conteúdo da Seção 3",
            placeholder: "Conteúdo da terceira seção...",
            changeProp: 1,
          },
          {
            type: "select",
            name: "accordion-style",
            label: "Estilo do Accordion",
            changeProp: 1,
            options: [
              { value: "default", name: "Padrão" },
              { value: "minimal", name: "Minimalista" },
              { value: "bordered", name: "Com Bordas" },
              { value: "card", name: "Estilo Card" },
            ],
          },
          {
            type: "select",
            name: "accordion-behavior",
            label: "Comportamento",
            changeProp: 1,
            options: [
              { value: "single", name: "Apenas uma seção aberta" },
              { value: "multiple", name: "Múltiplas seções abertas" },
            ],
          },
          {
            type: "textarea",
            name: "custom-css",
            label: "CSS Personalizado",
            placeholder: ".minha-classe { border-radius: 8px; }",
            changeProp: 1,
          },
        ],
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

                  // Encontrar o checkbox associado ao label
                  const label = header as HTMLLabelElement;
                  const toggleId = label.getAttribute("for");
                  let toggle: HTMLInputElement | null = null;

                  if (toggleId) {
                    toggle = widget.querySelector(
                      `#${toggleId}`
                    ) as HTMLInputElement;
                  } else {
                    // Fallback: procurar o checkbox anterior
                    toggle = header.previousElementSibling as HTMLInputElement;
                  }

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
      init() {
        // Aplicar CSS personalizado quando o trait for alterado
        (this as any).on("change:custom-css", (_model: any, value: string) => {
          if (value && value.trim()) {
            const componentId = (this as any).getId();
            const customStyleId = `custom-css-${componentId}`;
            const existingStyle = document.getElementById(customStyleId);
            if (existingStyle) {
              existingStyle.remove();
            }
            const style = document.createElement("style");
            style.id = customStyleId;
            style.textContent = `#${componentId} { ${value} }`;
            document.head.appendChild(style);
          }
        });

        // Aplicar mudanças de accordion
        (this as any).on(
          "change:accordion-title-1 change:accordion-content-1 change:accordion-title-2 change:accordion-content-2 change:accordion-title-3 change:accordion-content-3 change:accordion-style change:accordion-behavior",
          () => {
            const title1 = (this as any).get("accordion-title-1");
            const content1 = (this as any).get("accordion-content-1");
            const title2 = (this as any).get("accordion-title-2");
            const content2 = (this as any).get("accordion-content-2");
            const title3 = (this as any).get("accordion-title-3");
            const content3 = (this as any).get("accordion-content-3");
            const style = (this as any).get("accordion-style");
            const behavior = (this as any).get("accordion-behavior");

            const view = (this as any).getView();
            if (view) {
              const el = view.el;

              // Aplicar classes de estilo e comportamento
              el.classList.remove("default", "minimal", "bordered", "card");
              el.classList.remove("single", "multiple");
              if (style && style !== "default") el.classList.add(style);
              if (behavior && behavior !== "single") el.classList.add(behavior);

              // Atualizar títulos e conteúdos
              const headers = el.querySelectorAll(".accordion-header h3");
              const contents = el.querySelectorAll(".accordion-content p");

              if (headers[0] && title1) headers[0].textContent = title1;
              if (contents[0] && content1) contents[0].textContent = content1;
              if (headers[1] && title2) headers[1].textContent = title2;
              if (contents[1] && content2) contents[1].textContent = content2;
              if (headers[2] && title3) headers[2].textContent = title3;
              if (contents[2] && content3) contents[2].textContent = content3;
            }
          }
        );
      },
    },
  });
};

export { accordionCSS };
export default AccordionBlock;
