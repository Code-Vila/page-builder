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
  content: tabsHTML,
  attributes: {
    class: "gjs-block-tabs",
    title: "Arraste para adicionar abas",
  },
};

export const TabsComponent = (editor: any) => {
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
            button.addEventListener("click", () => {
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
            });
          });
        },
      },
    },
  });
};

export { tabsCSS };
export default TabsBlock;
