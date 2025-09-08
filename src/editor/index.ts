// src/editor/index.ts
import { setupBlocks, getAllBlocksCSS } from "./blocks";
import { setupTemplates, getAllTemplatesCSS } from "./templates";

/**
 * Configuração principal do editor GrapesJS
 * Este arquivo registra todos os blocos, componentes e plugins customizados
 */
export const setupGrapesEditor = async (editor: any) => {
  // Registrar todos os blocos (básicos e complexos)
  await setupBlocks(editor);

  // Registrar todos os templates como blocos
  await setupTemplates(editor);

  // Injetar CSS dos blocos no canvas
  const blocksCSS = getAllBlocksCSS();
  console.log("CSS dos blocos coletado:", blocksCSS.substring(0, 200) + "...");
  if (blocksCSS) {
    editor.addStyle(blocksCSS);
    console.log("✅ CSS dos blocos injetado no editor");
  } else {
    console.log("❌ Nenhum CSS de blocos encontrado");
  }

  // Injetar CSS dos templates no canvas
  const templatesCSS = getAllTemplatesCSS();
  if (templatesCSS) {
    editor.addStyle(templatesCSS);
  }

  // JavaScript global para modais Bootstrap (funciona no editor e preview)
  const initBootstrapModals = () => {
    // Função para abrir modal
    const openModal = (modalId: string) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
        modal.classList.add("show");
        document.body.classList.add("modal-open");

        // Adicionar backdrop
        const existingBackdrop = document.getElementById("modal-backdrop");
        if (existingBackdrop) {
          existingBackdrop.remove();
        }

        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop fade show";
        backdrop.id = "modal-backdrop";
        backdrop.onclick = () => closeModal(modalId);
        document.body.appendChild(backdrop);

        // Foco no modal
        setTimeout(() => {
          const focusableElement = modal.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElement) {
            (focusableElement as HTMLElement).focus();
          }
        }, 100);
      }
    };

    // Função para fechar modal
    const closeModal = (modalId: string) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "none";
        modal.classList.remove("show");
        document.body.classList.remove("modal-open");

        // Remover backdrop
        const backdrop = document.getElementById("modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }
      }
    };

    // Event delegation para botões de abrir modal
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const triggerBtn = target.closest('[data-bs-toggle="modal"]');

      if (triggerBtn) {
        const modalId = triggerBtn
          .getAttribute("data-bs-target")
          ?.replace("#", "");
        if (modalId) {
          e.preventDefault();
          e.stopPropagation();
          openModal(modalId);
        }
      }

      // Botões de fechar modal
      const closeBtn = target.closest('[data-bs-dismiss="modal"]');
      if (closeBtn) {
        const modal = closeBtn.closest(".modal");
        if (modal) {
          e.preventDefault();
          e.stopPropagation();
          closeModal(modal.id);
        }
      }

      // Fechar ao clicar no backdrop
      if (target.classList.contains("modal")) {
        closeModal(target.id);
      }
    });

    // Fechar com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const openModal = document.querySelector(".modal.show");
        if (openModal) {
          closeModal(openModal.id);
        }
      }
    });
  };

  // Inicializar modais Bootstrap
  initBootstrapModals();
};
