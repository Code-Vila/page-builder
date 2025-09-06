import type { Editor } from "grapesjs";

export interface TemplateDefinition {
  id: string;
  label: string;
  category: string;
  thumbnail?: string;
  content: string;
  css?: string;
  description?: string;
}

class SimpleTemplateRegistry {
  private templates: Map<string, TemplateDefinition> = new Map();

  registerTemplate(template: TemplateDefinition) {
    this.templates.set(template.id, template);
  }

  getAllTemplates(): TemplateDefinition[] {
    return Array.from(this.templates.values());
  }

  getTemplatesByCategory(category: string): TemplateDefinition[] {
    return this.getAllTemplates().filter(
      (template) => template.category === category
    );
  }

  getTemplate(id: string): TemplateDefinition | undefined {
    return this.templates.get(id);
  }

  async discoverAndRegister() {
    // Importar todos os templates dinamicamente
    const templateModules = import.meta.glob("./*/index.ts", { eager: true });

    for (const [, module] of Object.entries(templateModules)) {
      const templateModule = module as any;
      if (templateModule.default) {
        this.registerTemplate(templateModule.default);
      }
    }

    return this.getAllTemplates();
  }

  getCategories(): string[] {
    const categories = new Set<string>();
    this.getAllTemplates().forEach((template) => {
      categories.add(template.category);
    });
    return Array.from(categories);
  }
  // Versão que evita completamente o problema de remoção
  applyTemplateMinimal(editor: Editor, templateId: string): void {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template com ID '${templateId}' não encontrado`);
    }

    console.log(`🚀 Aplicando template MINIMAL: ${templateId}`);

    try {
      // NÃO limpar nada - apenas sobrescrever
      // Isso evita completamente o erro "element is not removable"

      // Aplicar CSS primeiro
      if (template.css) {
        editor.setStyle(template.css);
      }

      // Aplicar HTML diretamente sem limpar
      editor.setComponents(template.content);

      console.log("✅ Template MINIMAL aplicado!");
    } catch (error) {
      console.error("❌ Erro na aplicação MINIMAL:", error);
      throw error;
    }
  }

  // Versão super simples para debug
  applyTemplateSync(editor: Editor, templateId: string): void {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template com ID '${templateId}' não encontrado`);
    }

    console.log(`🚀 Aplicando template SYNC: ${templateId}`);

    try {
      // Limpar de forma mais segura usando a API do GrapesJS
      const domComponents = (editor as any).DomComponents;
      if (domComponents) {
        const wrapper = domComponents.getWrapper();
        if (wrapper) {
          // Remove apenas os componentes removíveis
          const components = wrapper.get("components");
          if (components) {
            // Clone a lista para evitar problemas de modificação durante iteração
            const componentsArray = [...components.models];
            componentsArray.forEach((comp: any) => {
              if (comp && comp.get("removable") !== false) {
                try {
                  comp.remove();
                } catch (e) {
                  console.warn("Não foi possível remover componente:", e);
                }
              }
            });
          }
        }
      }

      // Limpar estilos
      editor.setStyle("");

      // Aplicar novo conteúdo
      if (template.css) {
        editor.setStyle(template.css);
      }

      editor.setComponents(template.content);

      console.log("✅ Template SYNC aplicado!");
    } catch (error) {
      console.error("❌ Erro na aplicação SYNC:", error);
      throw error;
    }
  }

  async applyTemplateOptimized(
    editor: Editor,
    templateId: string
  ): Promise<void> {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template com ID '${templateId}' não encontrado`);
    }

    return new Promise((resolve, reject) => {
      try {
        console.log(`🚀 Aplicando template: ${templateId}`);

        // Desabilitar triggers temporariamente para evitar loops
        const originalTrigger = (editor as any).trigger;
        (editor as any).trigger = () => {}; // Disable temporarily

        // NOVA ABORDAGEM: NÃO limpar nada para evitar "element is not removable"
        // Apenas sobrescrever o conteúdo

        // 2. Aplicar template com delay mínimo
        setTimeout(() => {
          try {
            // Aplicar CSS se existir
            if (template.css) {
              editor.setStyle(template.css);
            }

            // Aplicar HTML diretamente (GrapesJS vai substituir automaticamente)
            editor.setComponents(template.content);

            // Reabilitar triggers
            (editor as any).trigger = originalTrigger;

            // Finalização simples
            this.finalizeTemplateApplicationSafe(editor);

            console.log("✅ Template aplicado com sucesso!");
            resolve();
          } catch (error) {
            // Reabilitar triggers em caso de erro
            (editor as any).trigger = originalTrigger;
            console.error("❌ Erro durante aplicação:", error);
            reject(error);
          }
        }, 50); // Delay reduzido
      } catch (error) {
        console.error("❌ Erro inicial:", error);
        reject(error);
      }
    });
  }

  private finalizeTemplateApplicationSafe(editor: Editor): void {
    // Finalização mínima e segura
    setTimeout(() => {
      try {
        // Apenas trigger final de atualização
        (editor as any).trigger("component:update");
      } catch (error) {
        console.warn("Aviso na finalização:", error);
      }
    }, 100);
  }
}

// Instância global do registry
export const templateRegistry = new SimpleTemplateRegistry();

// Função wrapper para manter compatibilidade
export function applyTemplate(editor: Editor, templateId: string) {
  return templateRegistry.applyTemplateOptimized(editor, templateId);
}

// Função wrapper síncrona para debug
export function applyTemplateSync(editor: Editor, templateId: string) {
  return templateRegistry.applyTemplateSync(editor, templateId);
}

// Função wrapper minimal (sem limpeza)
export function applyTemplateMinimal(editor: Editor, templateId: string) {
  return templateRegistry.applyTemplateMinimal(editor, templateId);
}
