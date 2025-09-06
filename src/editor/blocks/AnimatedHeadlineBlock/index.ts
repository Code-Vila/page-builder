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

        script: function () {
          const widget = this as unknown as HTMLElement;

          // Animação de palavras rotativas
          const animatedWords = widget.querySelectorAll(".animated-word");
          let currentIndex = 0;

          function rotateWords() {
            if (animatedWords.length === 0) return;

            // Remover classe active da palavra atual
            animatedWords[currentIndex].classList.remove("active");
            animatedWords[currentIndex].classList.add("exit");

            // Mover para a próxima palavra
            currentIndex = (currentIndex + 1) % animatedWords.length;

            setTimeout(() => {
              // Remover classe exit de todas as palavras
              animatedWords.forEach((word) => word.classList.remove("exit"));

              // Adicionar classe active na nova palavra
              animatedWords[currentIndex].classList.add("active");
            }, 300);
          }

          // Iniciar rotação de palavras
          const rotateInterval = setInterval(rotateWords, 3000);

          // Animação de typewriter
          const typewriterElement = widget.querySelector(
            ".typewriter-text"
          ) as HTMLElement;
          const typewriterText =
            typewriterElement?.getAttribute("data-typewriter") || "";
          const cursor = widget.querySelector(
            ".typewriter-cursor"
          ) as HTMLElement;

          if (typewriterElement && typewriterText) {
            let charIndex = 0;
            typewriterElement.textContent = "";

            function typeWriter() {
              if (charIndex < typewriterText.length) {
                typewriterElement.textContent +=
                  typewriterText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
              } else {
                // Adicionar cursor no final
                if (cursor) {
                  typewriterElement.appendChild(cursor);
                }
              }
            }

            // Iniciar typewriter após um delay
            setTimeout(typeWriter, 1000);
          }

          // Animação de destaque dos itens
          const highlightItems = widget.querySelectorAll(".highlight-item");

          function animateHighlights() {
            highlightItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("animate");
              }, index * 200);
            });
          }

          // Iniciar animação dos highlights
          setTimeout(animateHighlights, 2000);

          // Intersection Observer para reativar animações quando visível
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  // Reiniciar animações quando o elemento fica visível
                  const highlights =
                    entry.target.querySelectorAll(".highlight-item");
                  highlights.forEach((item, index) => {
                    setTimeout(() => {
                      item.classList.add("animate");
                    }, index * 100);
                  });
                }
              });
            },
            { threshold: 0.3 }
          );

          observer.observe(widget);

          // Cleanup quando o componente é removido
          const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              mutation.removedNodes.forEach((node) => {
                if (node === widget) {
                  clearInterval(rotateInterval);
                  observer.disconnect();
                }
              });
            });
          });

          if (widget.parentNode) {
            mutationObserver.observe(widget.parentNode, { childList: true });
          }
        },
      },
    },
  });
};

export { animatedHeadlineCSS };
export default AnimatedHeadlineBlock;
