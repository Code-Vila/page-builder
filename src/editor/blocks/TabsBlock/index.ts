import "./style.css";
import tabsHTML from "./element.html?raw";
import tabsCSS from "./style.css?raw";

export const TabsBlock = {
  id: "tabs",
  label: "Tabs",
  category: "Interativo",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <rect x="2" y="6" width="6" height="2" rx="1"/>
      <rect x="9" y="6" width="6" height="2" rx="1"/>
      <rect x="16" y="6" width="6" height="2" rx="1"/>
      <rect x="2" y="9" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M2 11h20" stroke="currentColor" stroke-width="1"/>
    </svg>
  `,
  content: {
    type: "custom-tabs",
    content: tabsHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "minhas-abas",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título das abas",
        changeProp: 1,
      },
      {
        type: "text",
        name: "tab-title-1",
        label: "Título da Aba 1",
        placeholder: "Aba 1",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "tab-content-1",
        label: "Conteúdo da Aba 1",
        placeholder: "Conteúdo da primeira aba...",
        changeProp: 1,
      },
      {
        type: "text",
        name: "tab-title-2",
        label: "Título da Aba 2",
        placeholder: "Aba 2",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "tab-content-2",
        label: "Conteúdo da Aba 2",
        placeholder: "Conteúdo da segunda aba...",
        changeProp: 1,
      },
      {
        type: "text",
        name: "tab-title-3",
        label: "Título da Aba 3",
        placeholder: "Aba 3",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "tab-content-3",
        label: "Conteúdo da Aba 3",
        placeholder: "Conteúdo da terceira aba...",
        changeProp: 1,
      },
      {
        type: "select",
        name: "tabs-style",
        label: "Estilo das Abas",
        options: [
          { value: "default", name: "Padrão" },
          { value: "pills", name: "Pills" },
          { value: "underline", name: "Sublinhado" },
          { value: "card", name: "Estilo Card" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "tabs-position",
        label: "Posição das Abas",
        options: [
          { value: "top", name: "Acima" },
          { value: "left", name: "Esquerda" },
          { value: "right", name: "Direita" },
        ],
        changeProp: 1,
      },
      {
        type: "text",
        name: "active-tab",
        label: "Aba Ativa Inicial",
        placeholder: "tab1",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "custom-css",
        label: "CSS Personalizado",
        placeholder: ".minha-classe { border-radius: 8px; }",
        changeProp: 1,
      },
    ],
  },
  attributes: {
    class: "gjs-block-tabs",
    title: "Arraste para adicionar abas",
  },
};

const TabsComponent = (editor: any) => {
  editor.DomComponents.addType("tabs", {
    isComponent: (el: HTMLElement) => el.classList?.contains("tabs-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["tabs-widget"],
        content: tabsHTML,

        script: function () {
          const widget = this as unknown as HTMLElement;
          const tabButtons = widget.querySelectorAll(".tab-button");
          const tabPanes = widget.querySelectorAll(".tab-pane");

          tabButtons.forEach((button) => {
            button.addEventListener(
              "click",
              () => {
                const targetTab = button.getAttribute("data-tab");

                // Remover active de todos os botões
                tabButtons.forEach((btn) => btn.classList.remove("active"));

                // Remover active de todos os painéis
                tabPanes.forEach((pane) => pane.classList.remove("active"));

                // Adicionar active ao botão clicado
                button.classList.add("active");

                // Adicionar active ao painel correspondente
                const targetPane = widget.querySelector(
                  `[data-content="${targetTab}"]`
                );
                if (targetPane) {
                  targetPane.classList.add("active");
                }
              },
              { passive: true }
            );
          });
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

        // Aplicar mudanças de tabs
        (this as any).on(
          "change:tab-title-1 change:tab-content-1 change:tab-title-2 change:tab-content-2 change:tab-title-3 change:tab-content-3 change:tabs-style change:tabs-position change:active-tab",
          () => {
            const title1 = (this as any).get("tab-title-1");
            const content1 = (this as any).get("tab-content-1");
            const title2 = (this as any).get("tab-title-2");
            const content2 = (this as any).get("tab-content-2");
            const title3 = (this as any).get("tab-title-3");
            const content3 = (this as any).get("tab-content-3");
            const style = (this as any).get("tabs-style");
            const position = (this as any).get("tabs-position");
            const activeTab = (this as any).get("active-tab");

            const view = (this as any).getView();
            if (view) {
              const el = view.el;

              // Aplicar classes de estilo e posição
              el.classList.remove("default", "pills", "underline", "card");
              el.classList.remove("top", "left", "right");
              if (style && style !== "default") el.classList.add(style);
              if (position && position !== "top") el.classList.add(position);

              // Atualizar títulos e conteúdos
              const tabButtons = el.querySelectorAll(".tab-button");
              const tabPanes = el.querySelectorAll(".tab-pane");

              if (tabButtons[0] && title1) tabButtons[0].textContent = title1;
              if (tabPanes[0] && content1) tabPanes[0].textContent = content1;
              if (tabButtons[1] && title2) tabButtons[1].textContent = title2;
              if (tabPanes[1] && content2) tabPanes[1].textContent = content2;
              if (tabButtons[2] && title3) tabButtons[2].textContent = title3;
              if (tabPanes[2] && content3) tabPanes[2].textContent = content3;

              // Definir aba ativa inicial
              if (activeTab) {
                tabButtons.forEach((btn: HTMLElement) =>
                  btn.classList.remove("active")
                );
                tabPanes.forEach((pane: HTMLElement) =>
                  pane.classList.remove("active")
                );

                const activeButton = el.querySelector(
                  `[data-tab="${activeTab}"]`
                );
                const activePane = el.querySelector(
                  `[data-content="${activeTab}"]`
                );

                if (activeButton) activeButton.classList.add("active");
                if (activePane) activePane.classList.add("active");
              }
            }
          }
        );
      },
    },
  });
};

export { tabsCSS };
export { TabsComponent };
export default TabsBlock;
