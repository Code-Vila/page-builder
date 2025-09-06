// src/editor/index.ts
import { setupBlocks, getAllBlocksCSS } from "./blocks";
import { templateRegistry } from "./templates";

/**
 * Configuração principal do editor GrapesJS
 * Este arquivo registra todos os blocos, componentes e plugins customizados
 */
export const setupGrapesEditor = async (editor: any) => {
  // Registrar todos os blocos (básicos e complexos)
  await setupBlocks(editor);

  // Registrar todos os templates
  await templateRegistry.discoverAndRegister();

  // Injetar CSS dos blocos no canvas
  const blocksCSS = getAllBlocksCSS();
  if (blocksCSS) {
    editor.addStyle(blocksCSS);
  }
};
