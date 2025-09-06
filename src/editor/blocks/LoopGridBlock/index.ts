import "./style.css";
import loopGridHTML from "./element.html?raw";
import loopGridCSS from "./style.css?raw";

export const LoopGridBlock = {
  id: "loop-grid",
  label: "Loop Grid",
  category: "Layout",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <rect x="3" y="3" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="14" y="3" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="3" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="14" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="6.5" cy="6.5" r="1"/>
      <circle cx="17.5" cy="6.5" r="1"/>
      <circle cx="6.5" cy="17.5" r="1"/>
      <circle cx="17.5" cy="17.5" r="1"/>
    </svg>
  `,
  content: loopGridHTML,
  attributes: {
    class: "gjs-block-loop-grid",
    title: "Arraste para adicionar grade dinâmica",
  },
};

export const LoopGridComponent = (editor: any) => {
  editor.DomComponents.addType("loop-grid", {
    isComponent: (el: HTMLElement) =>
      el.classList?.contains("loop-grid-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["loop-grid-widget"],
        content: loopGridHTML,

        script: function () {
          const widget = this as unknown as HTMLElement;
          const filterBtns = widget.querySelectorAll(".filter-btn");
          const gridItems = widget.querySelectorAll(".grid-item");

          // Filtros
          filterBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              const filter = btn.getAttribute("data-filter");

              // Atualizar botões ativos
              filterBtns.forEach((b) => b.classList.remove("active"));
              btn.classList.add("active");

              // Filtrar itens
              gridItems.forEach((item) => {
                const category = item.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                  item.classList.remove("hidden");
                  item.classList.add("show");
                } else {
                  item.classList.add("hidden");
                  item.classList.remove("show");
                }
              });
            });
          });

          // Botões de visualização
          const viewBtns = widget.querySelectorAll(".view-btn");
          viewBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();

              // Adicionar efeito de clique
              (btn as HTMLElement).style.transform = "scale(0.95)";
              setTimeout(() => {
                (btn as HTMLElement).style.transform = "";
              }, 150);

              // Aqui você pode adicionar lógica para abrir modal ou redirecionar
              console.log("Ver detalhes do item");
            });
          });

          // Paginação (básica)
          const prevBtn = widget.querySelector(
            ".pagination-btn.prev"
          ) as HTMLButtonElement;
          const nextBtn = widget.querySelector(
            ".pagination-btn.next"
          ) as HTMLButtonElement;
          const paginationInfo = widget.querySelector(
            ".pagination-info"
          ) as HTMLElement;

          let currentPage = 1;
          const totalPages = 3;

          if (prevBtn && nextBtn && paginationInfo) {
            prevBtn.addEventListener("click", () => {
              if (currentPage > 1) {
                currentPage--;
                updatePagination();
              }
            });

            nextBtn.addEventListener("click", () => {
              if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
              }
            });

            function updatePagination() {
              paginationInfo.textContent = `${currentPage} de ${totalPages}`;
              prevBtn.disabled = currentPage === 1;
              nextBtn.disabled = currentPage === totalPages;
            }
          }
        },
      },
    },
  });
};

export { loopGridCSS };
export default LoopGridBlock;
