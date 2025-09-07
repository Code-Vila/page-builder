// templates/index.ts - Sistema de Templates como Blocos
import type {
  AutoDiscoveredBlock,
  BlockConfig,
} from "../../types/blocks-types";

/**
 * 🚀 SISTEMA DE TEMPLATES COMO BLOCOS
 *
 * Este sistema automaticamente:
 * - Descobre todos os templates na pasta
 * - Registra como blocos com categoria "Templates"
 * - Coleta e injeta CSS automaticamente
 * - Funciona exatamente como o sistema de blocos
 */

class TemplateBlockRegistry {
  private discoveredTemplates: AutoDiscoveredBlock[] = [];

  async discoverAndRegister(editor: any): Promise<void> {
    // Auto-descobrir usando Vite glob
    const templateModules = import.meta.glob("./*/index.ts");

    for (const [path, moduleLoader] of Object.entries(templateModules)) {
      try {
        const templateName =
          path.match(/\.\/([^/]+)\/index\.ts$/)?.[1] || "unknown";
        const module = (await moduleLoader()) as any;

        // Registrar template como bloco
        await this.registerTemplateAsBlock(editor, module, templateName);

        // Coletar CSS
        const css = this.extractCSS(module);

        this.discoveredTemplates.push({
          name: templateName,
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

  private async registerTemplateAsBlock(
    editor: any,
    module: any,
    templateName: string
  ): Promise<void> {
    // Template como bloco (seguindo padrão dos blocos)
    const templateDef =
      module.default ||
      module[templateName] ||
      Object.values(module).find((val: any) => val?.id);

    if (templateDef?.id) {
      // Configurar template como bloco GrapesJS
      templateDef.category = {
        id: "Templates",
        label: "Templates",
        open: true,
        attributes: {},
      };
      templateDef.visible = false;
      templateDef.draggable = true;

      editor.BlockManager.add(templateDef.id, templateDef);

      // Forçar remoção imediata da aba Blocos
      setTimeout(() => {
        const block = editor.BlockManager.get(templateDef.id);
        if (block) {
          block.set("visible", false);
          block.set("select", false);

          // Remover do DOM se existir
          const blockEl = block.view?.el;
          if (blockEl) {
            blockEl.style.display = "none";
            blockEl.remove();
          }
        }
      }, 0);
    } else {
      // Silent error handling
    }
  }

  private extractCSS(module: any): string {
    // Procurar CSS exportado (templateCSS, etc.)
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
    return this.discoveredTemplates
      .filter((template) => template.css)
      .map((template) => `/* ${template.name} */\n${template.css}`)
      .join("\n\n");
  }
}

// Instância única
const templateRegistry = new TemplateBlockRegistry();

/**
 * Função principal para registrar templates como blocos
 */
export const setupTemplates = async (editor: any): Promise<void> => {
  await templateRegistry.discoverAndRegister(editor);
};

/**
 * Função para obter CSS dos templates
 */
export const getAllTemplatesCSS = (): string => {
  return templateRegistry.getAllCSS();
};

// Export padrão
export default setupTemplates;
