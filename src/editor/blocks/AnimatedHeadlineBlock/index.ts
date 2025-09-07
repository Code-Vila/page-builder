import "./style.css";
import animatedHeadlineHTML from "./element.html?raw";
import animatedHeadlineCSS from "./style.css?raw";

export const AnimatedHeadlineBlock = {
  id: "animated-headline",
  label: "Animated Headline",
  category: "Interativo",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M2 4l20 8-20 8V4z" fill="currentColor" opacity="0.6"/>
    </svg>
  `,
  content: animatedHeadlineHTML,
  attributes: {
    class: "gjs-block-animated-headline",
    title: "Arraste para adicionar título animado",
  },
};

export const AnimatedHeadlineComponent = (editor: any) => {
  editor.DomComponents.addType("animated-headline", {
    isComponent: (el: HTMLElement) =>
      el.classList?.contains("animated-headline-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["animated-headline-widget"],
        content: animatedHeadlineHTML,
        traits: [
          {
            type: 'text',
            name: 'headline-static',
            label: 'Texto Principal',
            changeProp: 1,
          },
          {
            type: 'text',
            name: 'headline-subtitle',
            label: 'Subtítulo',
            changeProp: 1,
          }
        ],

        script: function () {
          const widget = this as unknown as HTMLElement;
          if (!widget) return;

          // Animação simples de palavras rotativas
          const animatedWords = widget.querySelectorAll(".animated-word");
          let currentIndex = 0;

          function rotateWords() {
            if (animatedWords.length === 0) return;

            // Remover classe active da palavra atual
            animatedWords[currentIndex]?.classList.remove("active");
            animatedWords[currentIndex]?.classList.add("exit");

            // Mover para a próxima palavra
            currentIndex = (currentIndex + 1) % animatedWords.length;

            setTimeout(() => {
              // Remover classe exit de todas as palavras
              animatedWords.forEach((word) => word.classList.remove("exit"));
              // Adicionar classe active na nova palavra
              animatedWords[currentIndex]?.classList.add("active");
            }, 300);
          }

          // Iniciar rotação apenas se não estiver em modo de edição
          let rotateInterval: NodeJS.Timeout | null = null;
          
          const startAnimation = () => {
            if (rotateInterval) clearInterval(rotateInterval);
            rotateInterval = setInterval(rotateWords, 3000);
          };

          // Verificar se está em modo de edição
          const isEditing = widget.closest('.gjs-frame') !== null;
          
          if (!isEditing) {
            startAnimation();
          }

          // Cleanup
          return () => {
            if (rotateInterval) {
              clearInterval(rotateInterval);
            }
          };
        },
      },
    },
  });
};

export { animatedHeadlineCSS };
export default AnimatedHeadlineBlock;
