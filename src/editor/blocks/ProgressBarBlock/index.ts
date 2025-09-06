import "./style.css";
import progressBarHTML from "./element.html?raw";
import progressBarCSS from "./style.css?raw";

export const ProgressBarBlock = {
  id: "progress-bar",
  label: "Progress Bar",
  category: "Interativo",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <path d="M2 6h20v4H2V6zm0 8h20v4H2v-4z"/>
      <path d="M2 6h15v4H2V6z" fill="#1d4ed8"/>
    </svg>
  `,
  content: progressBarHTML,
  attributes: {
    class: "gjs-block-progress-bar",
    title: "Arraste para adicionar uma barra de progresso",
  },
};

export const ProgressBarComponent = (editor: any) => {
  editor.DomComponents.addType("progress-bar", {
    isComponent: (el: HTMLElement) =>
      el.classList?.contains("progress-bar-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["progress-bar-widget"],
        attributes: { "data-progress": "75" },
        content: progressBarHTML,

        script: function () {
          const widget = this as unknown as HTMLElement;
          const progressFill = widget.querySelector(
            ".progress-fill"
          ) as HTMLElement;
          const progressPercentage = widget.querySelector(
            ".progress-percentage"
          );

          let currentProgress = parseInt(
            widget.getAttribute("data-progress") || "75"
          );

          const updateProgress = (progress: number) => {
            currentProgress = Math.max(0, Math.min(100, progress));
            widget.setAttribute("data-progress", currentProgress.toString());

            if (progressFill) {
              progressFill.style.width = currentProgress + "%";
            }

            if (progressPercentage) {
              progressPercentage.textContent = currentProgress + "%";
            }
          };

          // Animação inicial
          setTimeout(() => {
            updateProgress(currentProgress);
          }, 100);

          // Permitir atualização via clique (para demo)
          widget.addEventListener("click", () => {
            const newProgress = Math.floor(Math.random() * 100);
            updateProgress(newProgress);
          });
        },
      },
    },
  });
};

export { progressBarCSS };
export default ProgressBarBlock;
