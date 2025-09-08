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

        console.log(`Descoberto bloco: ${blockName}`, { path, module });

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
        console.error(`Erro ao processar bloco ${path}:`, error);
      }
    }
  }

  private async registerBlock(
    editor: any,
    module: any,
    blockName: string
  ): Promise<void> {
    console.log(`Registrando bloco: ${blockName}`, { module });

    // Bloco simples (SectionBlock, TextBlock, etc.)
    let blockDef = null;

    // Tentar diferentes formas de encontrar o bloco
    if (module.default && module.default.id) {
      blockDef = module.default;
    } else if (module[blockName] && module[blockName].id) {
      blockDef = module[blockName];
    } else {
      // Procurar por qualquer objeto que tenha um id (incluindo export const)
      const possibleBlocks = Object.values(module).filter(
        (val: any) => val && typeof val === "object" && val.id
      );
      if (possibleBlocks.length > 0) {
        blockDef = possibleBlocks[0];
      }
    }

    // Se ainda não encontrou, procurar por padrões específicos
    if (!blockDef) {
      // Procurar por export const BlockName
      const blockNamePattern = new RegExp(`^${blockName}$`, "i");
      const matchingKey = Object.keys(module).find(
        (key) => blockNamePattern.test(key) && module[key] && module[key].id
      );
      if (matchingKey) {
        blockDef = module[matchingKey];
      }
    }

    console.log(`BlockDef encontrado para ${blockName}:`, blockDef);

    if (blockDef?.id) {
      // Filtrar blocos da categoria "Templates" - eles serão registrados pelo sistema de templates
      const isTemplate =
        (typeof blockDef.category === "string" &&
          blockDef.category === "Templates") ||
        (typeof blockDef.category === "object" &&
          blockDef.category?.id === "Templates");

      if (!isTemplate) {
        console.log(
          `Adicionando bloco ${blockName} ao BlockManager:`,
          blockDef
        );
        try {
          editor.BlockManager.add(blockDef.id, blockDef);
          console.log(`✅ Bloco ${blockName} registrado com sucesso!`);
        } catch (error) {
          console.error(`❌ Erro ao registrar bloco ${blockName}:`, error);
        }
      } else {
        console.log(`Bloco ${blockName} é template, pulando...`);
      }
    } else {
      console.log(`❌ Nenhum blockDef encontrado para ${blockName}`);
      console.log(`Módulo completo:`, module);
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

    const css = cssKeys.length > 0 ? module[cssKeys[0]] : "";
    console.log(`CSS extraído:`, {
      cssKeys,
      css: css.substring(0, 100) + "...",
    });
    return css;
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
    const blocksWithCSS = this.discoveredBlocks.filter((block) => block.css);
    console.log(
      `Blocos com CSS encontrados: ${blocksWithCSS.length}`,
      blocksWithCSS.map((b) => b.name)
    );

    const css = blocksWithCSS
      .map((block) => `/* ${block.name} */\n${block.css}`)
      .join("\n\n");

    console.log(`CSS total gerado: ${css.length} caracteres`);
    return css;
  }

  // Função para obter apenas blocos que não são templates
  getNonTemplateBlocks(editor: any): any[] {
    const blockManager = editor.BlockManager;
    const allBlocks = blockManager.getAll();
    return allBlocks.filter((block: any) => {
      const category = block.get("category");
      // Verificar se é um objeto com id "Templates" ou string "Templates"
      return !(
        (typeof category === "object" && category?.id === "Templates") ||
        (typeof category === "string" && category === "Templates")
      );
    });
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

/**
 * Função para obter apenas blocos que não são templates
 */
export const getNonTemplateBlocks = (editor: any): any[] => {
  return registry.getNonTemplateBlocks(editor);
};

// Export padrão
export default setupBlocks;
