import "./style.css";
import counterHTML from "./element.html?raw";
import counterCSS from "./style.css?raw";

export const CounterBlock = {
  id: "counter",
  label: "Contador",
  category: "Interativo",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #667eea;">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    </svg>
  `,
  content: counterHTML,
  attributes: {
    class: "gjs-block-counter",
    title: "Arraste para adicionar um contador interativo",
  },
};

export const CounterComponent = (editor: any) => {
  const componentType = "counter-component";

  // Registrar o tipo de componente
  editor.DomComponents.addType(componentType, {
    isComponent: (el: HTMLElement) => el.classList?.contains("counter-widget"),

    model: {
      defaults: {
        name: "Contador",
        draggable: true,
        droppable: false,
        traits: [],
        attributes: {
          "data-counter": "0",
          class: "counter-widget",
        },
        content: counterHTML,
        script: function () {
          // Script que será executado quando o componente for renderizado
          const initCounter = () => {
            const widget = this as unknown as HTMLElement;
            const buttons = widget.querySelectorAll(".counter-btn");
            const valueElement = widget.querySelector(
              ".counter-value"
            ) as HTMLElement;

            let currentValue = parseInt(
              widget.getAttribute("data-counter") || "0"
            );
            valueElement.textContent = currentValue.toString();

            buttons.forEach((button) => {
              button.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                const action = (button as HTMLElement).getAttribute(
                  "data-action"
                );
                if (!action) return;

                switch (action) {
                  case "increase":
                    currentValue++;
                    break;
                  case "decrease":
                    currentValue--;
                    break;
                  case "reset":
                    currentValue = 0;
                    break;
                }

                // Atualizar valor
                valueElement.textContent = currentValue.toString();
                widget.setAttribute("data-counter", currentValue.toString());

                // Animação
                animateCounterChange(valueElement, widget);
              });
            });
          };

          const animateCounterChange = (
            element: HTMLElement,
            widget: HTMLElement
          ) => {
            element.style.transform = "scale(1.2)";
            element.style.transition = "transform 0.3s ease";

            widget.style.transform = "scale(1.02)";
            widget.style.transition = "transform 0.3s ease";

            setTimeout(() => {
              element.style.transform = "scale(1)";
              widget.style.transform = "scale(1)";
            }, 300);
          };

          // Inicializar quando o DOM estiver pronto
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initCounter);
          } else {
            initCounter();
          }
        },
      },
    },

    view: {
      events: {
        click: "onClick",
      },

      onClick(e: Event) {
        const target = e.target as HTMLElement;
        const button = target.closest(".counter-btn");

        if (button) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      },

      onRender() {
        // Garantir que o CSS seja aplicado
        (this as any).el.classList.add("counter-widget");
      },
    },
  });

  // Registrar o bloco
  editor.BlockManager.add("counter", CounterBlock);

  // Adicionar CSS ao editor
  editor.CssComposer.addRules(counterCSS);
};

// Exportar o CSS
export { counterCSS };
export default CounterBlock;
