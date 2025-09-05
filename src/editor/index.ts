// src/editor/index.ts
import { setupBlocks, getAllBlocksCSS } from "./blocks";

/**
 * Configuração principal do editor GrapesJS
 * Este arquivo registra todos os blocos, componentes e plugins customizados
 */
export const setupGrapesEditor = (editor: any) => {
  console.log("🚀 Inicializando editor personalizado...");

  // Registrar todos os blocos (básicos e complexos)
  setupBlocks(editor);

  // Injetar CSS dos blocos no canvas
  const blocksCSS = getAllBlocksCSS();
  if (blocksCSS) {
    editor.addStyle(blocksCSS);
    console.log("✅ CSS dos blocos injetado no canvas");
  }

  console.log("✅ Editor configurado com sucesso!");
};
