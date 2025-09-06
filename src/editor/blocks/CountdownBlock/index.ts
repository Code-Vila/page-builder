import "./style.css";
import countdownHTML from "./element.html?raw";
import countdownCSS from "./style.css?raw";

export const CountdownBlock = {
  id: "countdown",
  label: "Countdown",
  category: "Interativo",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  `,
  content: countdownHTML,
  attributes: {
    class: "gjs-block-countdown",
    title: "Arraste para adicionar contador regressivo",
  },
};

export const CountdownComponent = (editor: any) => {
  editor.DomComponents.addType("countdown", {
    isComponent: (el: HTMLElement) =>
      el.classList?.contains("countdown-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["countdown-widget"],
        content: countdownHTML,

        script: function () {
          const widget = this as unknown as HTMLElement;

          // Elementos do countdown
          const countdownElements = {
            days: widget.querySelector("[data-days]") as HTMLElement,
            hours: widget.querySelector("[data-hours]") as HTMLElement,
            minutes: widget.querySelector("[data-minutes]") as HTMLElement,
            seconds: widget.querySelector("[data-seconds]") as HTMLElement,
          };

          // Elementos de progresso circular
          const progressElements = {
            days: widget.querySelector('[data-progress="days"]') as HTMLElement,
            hours: widget.querySelector(
              '[data-progress="hours"]'
            ) as HTMLElement,
            minutes: widget.querySelector(
              '[data-progress="minutes"]'
            ) as HTMLElement,
            seconds: widget.querySelector(
              '[data-progress="seconds"]'
            ) as HTMLElement,
          };

          // Data final do countdown (7 dias a partir de agora)
          const endDate = new Date();
          endDate.setDate(endDate.getDate() + 7);
          endDate.setHours(23, 59, 59, 999);

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

              // Atualizar valores
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

              // Atualizar progresso circular
              const dayProgress = (days / 7) * 360;
              const hourProgress = (hours / 24) * 360;
              const minuteProgress = (minutes / 60) * 360;
              const secondProgress = (seconds / 60) * 360;

              if (progressElements.days) {
                progressElements.days.style.background = `conic-gradient(from 0deg, #ef4444 0deg, #ef4444 ${dayProgress}deg, transparent ${dayProgress}deg)`;
              }
              if (progressElements.hours) {
                progressElements.hours.style.background = `conic-gradient(from 0deg, #f97316 0deg, #f97316 ${hourProgress}deg, transparent ${hourProgress}deg)`;
              }
              if (progressElements.minutes) {
                progressElements.minutes.style.background = `conic-gradient(from 0deg, #eab308 0deg, #eab308 ${minuteProgress}deg, transparent ${minuteProgress}deg)`;
              }
              if (progressElements.seconds) {
                progressElements.seconds.style.background = `conic-gradient(from 0deg, #22c55e 0deg, #22c55e ${secondProgress}deg, transparent ${secondProgress}deg)`;
              }
            } else {
              // Countdown expirado
              Object.values(countdownElements).forEach((el) => {
                if (el) el.textContent = "00";
              });

              // Mostrar mensagem de expirado
              const title = widget.querySelector(
                ".countdown-title"
              ) as HTMLElement;
              if (title) {
                title.textContent = "Oferta Expirada!";
                title.style.color = "#ef4444";
              }
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

          // Botão de ação
          const ctaBtn = widget.querySelector(".countdown-btn");
          if (ctaBtn) {
            ctaBtn.addEventListener("click", (e) => {
              e.preventDefault();

              // Efeito de clique
              (ctaBtn as HTMLElement).style.transform =
                "translateY(-4px) scale(0.98)";
              setTimeout(() => {
                (ctaBtn as HTMLElement).style.transform = "";
              }, 150);

              // Aqui você pode adicionar lógica de conversão
              console.log("Botão CTA do Countdown clicado");
            });
          }
        },
      },
    },
  });
};

export { countdownCSS };
export default CountdownBlock;
