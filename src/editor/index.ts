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
  if (blocksCSS) {
    editor.addStyle(blocksCSS);
  }

  // Injetar CSS dos templates no canvas
  const templatesCSS = getAllTemplatesCSS();
  if (templatesCSS) {
    editor.addStyle(templatesCSS);
  }
};
