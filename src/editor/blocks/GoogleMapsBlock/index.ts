import "./style.css";
import googleMapsHTML from "./element.html?raw";
import googleMapsCSS from "./style.css?raw";

export const GoogleMapsBlock = {
  id: "google-maps",
  label: "Google Maps",
  category: "Mídia",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `,
  content: googleMapsHTML,
  attributes: {
    class: "gjs-block-google-maps",
    title: "Arraste para adicionar Google Maps",
  },
};

export const GoogleMapsComponent = (editor: any) => {
  editor.DomComponents.addType("google-maps", {
    isComponent: (el: HTMLElement) =>
      el.classList?.contains("google-maps-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["google-maps-widget"],
        content: googleMapsHTML,

        script: function () {
          const widget = this as unknown as HTMLElement;
          const overlay = widget.querySelector(".maps-overlay") as HTMLElement;

          if (overlay) {
            overlay.addEventListener("click", () => {
              // Remover overlay para permitir interação com o mapa
              overlay.style.display = "none";
            });
          }

          // Reativar overlay quando o mouse sair do container
          const container = widget.querySelector(".maps-embed-container");
          if (container && overlay) {
            container.addEventListener("mouseleave", () => {
              setTimeout(() => {
                if (overlay) overlay.style.display = "flex";
              }, 1000); // Reativar após 1 segundo
            });
          }
        },
      },
    },
  });
};

export { googleMapsCSS };
export default GoogleMapsBlock;
