import "./style.css";
import ctaHTML from "./element.html?raw";
import ctaCSS from "./style.css?raw";

export const CallToActionBlock = {
  id: "call-to-action",
  label: "Call to Action",
  category: "Interativo",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <path d="M13 17h-2v-2h2v2zm0-4h-2V7h2v6zm-1-9C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4z" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M15 12l-3-3v6l3-3z" fill="currentColor"/>
    </svg>
  `,
  content: ctaHTML,
  attributes: {
    class: "gjs-block-call-to-action",
    title: "Arraste para adicionar Call to Action",
  },
};

export const CallToActionComponent = (editor: any) => {
  editor.DomComponents.addType("call-to-action", {
    isComponent: (el: HTMLElement) => el.classList?.contains("cta-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["cta-widget"],
        content: ctaHTML,

        script: function () {
          const widget = this as unknown as HTMLElement;

          // Countdown Timer
          const countdownElements = {
            days: widget.querySelector("[data-days]") as HTMLElement,
            hours: widget.querySelector("[data-hours]") as HTMLElement,
            minutes: widget.querySelector("[data-minutes]") as HTMLElement,
            seconds: widget.querySelector("[data-seconds]") as HTMLElement,
          };

          // Data final do countdown (2 dias a partir de agora)
          const endDate = new Date();
          endDate.setDate(endDate.getDate() + 2);

          function updateCountdown() {
            const now = new Date().getTime();
            const distance = endDate.getTime() - now;

            if (distance > 0) {
              const days = Math.floor(distance / (1000 * 60 * 60 * 24));
              const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
              );
              const seconds = Math.floor((distance % (1000 * 60)) / 1000);

              if (countdownElements.days)
                countdownElements.days.textContent = days
                  .toString()
                  .padStart(2, "0");
              if (countdownElements.hours)
                countdownElements.hours.textContent = hours
                  .toString()
                  .padStart(2, "0");
              if (countdownElements.minutes)
                countdownElements.minutes.textContent = minutes
                  .toString()
                  .padStart(2, "0");
              if (countdownElements.seconds)
                countdownElements.seconds.textContent = seconds
                  .toString()
                  .padStart(2, "0");
            }
          }

          // Atualizar countdown a cada segundo
          updateCountdown();
          const countdownInterval = setInterval(updateCountdown, 1000);

          // Cleanup do interval quando o componente for removido
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              mutation.removedNodes.forEach((node) => {
                if (node === widget) {
                  clearInterval(countdownInterval);
                }
              });
            });
          });

          if (widget.parentNode) {
            observer.observe(widget.parentNode, { childList: true });
          }

          // Botões de ação
          const primaryBtn = widget.querySelector(".cta-primary-btn");
          const secondaryBtn = widget.querySelector(".cta-secondary-btn");

          if (primaryBtn) {
            primaryBtn.addEventListener("click", (e) => {
              e.preventDefault();

              // Efeito de clique
              (primaryBtn as HTMLElement).style.transform =
                "translateY(-3px) scale(0.98)";
              setTimeout(() => {
                (primaryBtn as HTMLElement).style.transform = "";
              }, 150);

              // Aqui você pode adicionar lógica de conversão
              console.log("CTA Principal clicado");
            });
          }

          if (secondaryBtn) {
            secondaryBtn.addEventListener("click", (e) => {
              e.preventDefault();

              // Efeito de clique
              (secondaryBtn as HTMLElement).style.transform =
                "translateY(-2px) scale(0.98)";
              setTimeout(() => {
                (secondaryBtn as HTMLElement).style.transform = "";
              }, 150);

              // Aqui você pode adicionar lógica para abrir demo
              console.log("Ver Demo clicado");
            });
          }
        },
      },
    },
  });
};

export { ctaCSS };
export default CallToActionBlock;
