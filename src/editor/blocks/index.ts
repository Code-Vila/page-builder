// blocks/index.ts - Sistema único e automatizado
import type {
  AutoDiscoveredBlock,
  BlockConfig,
} from "../../types/blocks-types";

/**
 * 🚀 SISTEMA DE BLOCOS AUTOMATIZADO
 *
 * Este sistema automaticamente:
 * - Descobre todos os blocos na pasta
 * - Registra baseado no tipo (simples/interativo/complexo)
 * - Coleta e injeta CSS automaticamente
 */

class SimpleBlockRegistry {
  private discoveredBlocks: AutoDiscoveredBlock[] = [];

  async discoverAndRegister(editor: any): Promise<void> {
    // Auto-descobrir usando Vite glob
    const blockModules = import.meta.glob("./*/index.ts");

    for (const [path, moduleLoader] of Object.entries(blockModules)) {
      try {
        const blockName =
          path.match(/\.\/([^/]+)\/index\.ts$/)?.[1] || "unknown";
        const module = (await moduleLoader()) as any;

        // Registrar bloco baseado no tipo
        await this.registerBlock(editor, module, blockName);

        // Coletar CSS
        const css = this.extractCSS(module);

        this.discoveredBlocks.push({
          name: blockName,
          path,
          config: this.analyzeType(module),
          module,
          css,
        });
      } catch (error) {
        // Silent error handling
      }
    }
  }

  private async registerBlock(
    editor: any,
    module: any,
    blockName: string
  ): Promise<void> {
    // Bloco simples (SectionBlock, TextBlock, etc.)
    const blockDef =
      module.default ||
      module[blockName] ||
      Object.values(module).find((val: any) => val?.id);
    if (blockDef?.id) {
      editor.BlockManager.add(blockDef.id, blockDef);
    }

    // Componente interativo (CounterComponent, etc.)
    const componentKey = Object.keys(module).find(
      (key) => key.includes("Component") && typeof module[key] === "function"
    );
    if (componentKey) {
      module[componentKey](editor);
    }

    // Bloco complexo (função de auto-registro)
    const registerFunc = Object.values(module).find(
      (val: any) => typeof val === "function" && val.name?.includes("Block")
    );
    if (registerFunc && typeof registerFunc === "function") {
      (registerFunc as Function)(editor);
    }
  }

  private extractCSS(module: any): string {
    // Procurar CSS exportado (buttonCSS, sectionCSS, etc.)
    const cssKeys = Object.keys(module).filter(
      (key) =>
        key.toLowerCase().endsWith("css") && typeof module[key] === "string"
    );

    return cssKeys.length > 0 ? module[cssKeys[0]] : "";
  }

  private analyzeType(module: any): BlockConfig {
    const exports = Object.keys(module);

    if (exports.some((key) => key.includes("Component"))) {
      return { type: "interactive", hasCSS: true, hasComponent: true };
    }

    if (typeof module.default === "function") {
      return { type: "complex", hasCSS: true };
    }

    return { type: "simple", hasCSS: true };
  }

  getAllCSS(): string {
    return this.discoveredBlocks
      .filter((block) => block.css)
      .map((block) => `/* ${block.name} */\n${block.css}`)
      .join("\n\n");
  }
}

// Instância única
const registry = new SimpleBlockRegistry();

/**
 * Função principal para registrar blocos
 */
export const setupBlocks = async (editor: any): Promise<void> => {
  await registry.discoverAndRegister(editor);
};

/**
 * Função para obter CSS dos blocos
 */
export const getAllBlocksCSS = (): string => {
  return registry.getAllCSS();
};

// Export padrão
export default setupBlocks;
