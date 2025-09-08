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
  editor.DomComponents.addType("counter", {
    isComponent: (el: HTMLElement) => el.classList?.contains("counter-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["counter-widget"],
        content: counterHTML,
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID",
            placeholder: "meu-contador",
            changeProp: 1,
          },
          {
            type: "text",
            name: "title",
            label: "Título",
            placeholder: "Título do contador",
            changeProp: 1,
          },
          {
            type: "text",
            name: "counter-title",
            label: "Título do Contador",
            placeholder: "Contador Interativo",
            changeProp: 1,
          },
          {
            type: "number",
            name: "initial-value",
            label: "Valor Inicial",
            placeholder: "0",
            changeProp: 1,
          },
          {
            type: "number",
            name: "min-value",
            label: "Valor Mínimo",
            placeholder: "0",
            changeProp: 1,
          },
          {
            type: "number",
            name: "max-value",
            label: "Valor Máximo",
            placeholder: "100",
            changeProp: 1,
          },
          {
            type: "number",
            name: "step-value",
            label: "Incremento/Decremento",
            placeholder: "1",
            changeProp: 1,
          },
          {
            type: "select",
            name: "counter-style",
            label: "Estilo do Contador",
            options: [
              { value: "default", name: "Padrão" },
              { value: "minimal", name: "Minimalista" },
              { value: "card", name: "Estilo Card" },
              { value: "circular", name: "Circular" },
            ],
            changeProp: 1,
          },
          {
            type: "select",
            name: "counter-size",
            label: "Tamanho do Contador",
            options: [
              { value: "small", name: "Pequeno" },
              { value: "medium", name: "Médio" },
              { value: "large", name: "Grande" },
            ],
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "show-reset",
            label: "Mostrar Botão Reset",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "show-decrease",
            label: "Mostrar Botão Diminuir",
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "show-increase",
            label: "Mostrar Botão Aumentar",
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
        script: function () {
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

        // Aplicar mudanças de counter
        (this as any).on(
          "change:counter-title change:initial-value change:min-value change:max-value change:step-value change:counter-style change:counter-size change:show-reset change:show-decrease change:show-increase",
          () => {
            const title = (this as any).get("counter-title");
            const initialValue = (this as any).get("initial-value");
            const style = (this as any).get("counter-style");
            const size = (this as any).get("counter-size");
            const showReset = (this as any).get("show-reset");
            const showDecrease = (this as any).get("show-decrease");
            const showIncrease = (this as any).get("show-increase");

            const view = (this as any).getView();
            if (view) {
              const el = view.el;

              // Aplicar classes de estilo e tamanho
              el.classList.remove("default", "minimal", "card", "circular");
              el.classList.remove("small", "medium", "large");
              if (style && style !== "default") el.classList.add(style);
              if (size && size !== "medium") el.classList.add(size);

              // Atualizar título
              const titleElement = el.querySelector(".counter-title");
              if (titleElement && title) titleElement.textContent = title;

              // Atualizar valor inicial
              if (initialValue !== undefined) {
                const valueElement = el.querySelector(".counter-value");
                if (valueElement)
                  valueElement.textContent = initialValue.toString();
                el.setAttribute("data-counter", initialValue.toString());
              }

              // Mostrar/ocultar botões
              const resetBtn = el.querySelector('[data-action="reset"]');
              const decreaseBtn = el.querySelector('[data-action="decrease"]');
              const increaseBtn = el.querySelector('[data-action="increase"]');

              if (resetBtn)
                resetBtn.style.display = showReset ? "block" : "none";
              if (decreaseBtn)
                decreaseBtn.style.display = showDecrease ? "block" : "none";
              if (increaseBtn)
                increaseBtn.style.display = showIncrease ? "block" : "none";
            }
          }
        );
      },
    },
  });
};

// Exportar o CSS
export { counterCSS };
export default CounterBlock;
