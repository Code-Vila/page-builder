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
  //   applyTemplateMinimal(editor: Editor, templateId: string): void {
  //     const template = this.getTemplate(templateId);
  //     if (!template) {
  //       throw new Error(`Template com ID '${templateId}' não encontrado`);
  //     }

  //     console.log(`🚀 Aplicando template MINIMAL: ${templateId}`);

  //     try {
  //       // NÃO limpar nada - apenas sobrescrever
  //       // Isso evita completamente o erro "element is not removable"

  //       // Aplicar CSS primeiro
  //       if (template.css) {
  //         editor.setStyle(template.css);
  //       }

  //       // Aplicar HTML diretamente sem limpar
  //       editor.setComponents(template.content);

  //       console.log("✅ Template MINIMAL aplicado!");
  //     } catch (error) {
  //       console.error("❌ Erro na aplicação MINIMAL:", error);
  //       throw error;
  //     }
  //   }

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

  // VERSÃO SIMPLES E CONTROLADA - baseada na análise do problema
  applyTemplateSimple(editor: Editor, templateId: string): void {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template com ID '${templateId}' não encontrado`);
    }

    console.log("🚀 Aplicando template de forma controlada (versão simples)");

    try {
      // PASSO 1: Aplicar apenas HTML primeiro (sem CSS)
      console.log("Passo 1: Aplicando HTML...");
      editor.setComponents(template.content);

      // PASSO 2: Aplicar CSS com delay (se existir)
      if (template.css) {
        setTimeout(() => {
          console.log("Passo 2: Aplicando CSS...");
          try {
            // Tentar usar addStyle primeiro
            if ((editor as any).addStyle) {
              (editor as any).addStyle(template.css);
            } else {
              editor.setStyle(template.css!);
            }
          } catch (cssError) {
            console.warn("Erro no CSS, ignorando:", cssError);
          }
        }, 50);
      }

      // PASSO 3: Configurar propriedades básicas com delay
      setTimeout(() => {
        console.log("Passo 3: Configurando propriedades...");
        this.configureBasicProperties(editor);
        console.log("✅ Template aplicado com sucesso");
      }, 100);
    } catch (error) {
      console.error("❌ Erro ao aplicar template:", error);
      throw error;
    }
  }

  // Configuração mínima e segura dos componentes
  private configureBasicProperties(editor: Editor): void {
    try {
      const wrapper = (editor as any).DomComponents?.getWrapper();
      if (!wrapper) return;

      const components = wrapper.get("components");
      if (components && components.length) {
        components.forEach((component: any) => {
          try {
            // Configuração mínima - apenas o essencial
            component.set({
              removable: true,
              selectable: true,
              editable: true,
            });
          } catch (e) {
            // Ignorar erros silenciosamente
          }
        });
      }
    } catch (error) {
      // Ignorar erros de configuração
    }
  }

  // APLICAÇÃO DE TEMPLATE ANTI-TRAVAMENTO - Versão Segura (BACKUP)
  applyTemplateAsBlock(editor: Editor, templateId: string): void {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template com ID '${templateId}' não encontrado`);
    }

    console.log("🚀 Aplicando template de forma segura (anti-travamento)");

    try {
      // DESABILITAR RENDERS TEMPORARIAMENTE para evitar travamentos
      const originalTrigger = (editor as any).trigger;
      (editor as any).trigger = () => {}; // Disable all triggers

      // Passo 1: Obter wrapper sem usar APIs problemáticas
      const wrapper = (editor as any).DomComponents.getWrapper();

      // Passo 2: Remover componentes de forma segura (sem forçar)
      if (wrapper) {
        const components = wrapper.get("components");
        if (components && components.length > 0) {
          // Remover apenas se for seguro
          try {
            wrapper.set("components", []);
          } catch (e) {
            console.warn("Mantendo componentes existentes");
          }
        }
      }

      // Passo 3: Aplicar CSS de forma isolada (sem appendar ao existente)
      if (template.css) {
        editor.setStyle(template.css);
      }

      // Passo 4: Adicionar componentes de forma gradual
      setTimeout(() => {
        try {
          // Usar setComponents
          editor.setComponents(template.content);

          // Passo 5: Reabilitar triggers após aplicação
          setTimeout(() => {
            // Restaurar trigger original
            (editor as any).trigger = originalTrigger;

            // Garantir propriedades corretas nos componentes
            this.makeComponentsSafeAndRemovable(wrapper);

            console.log("✅ Template aplicado com segurança");
          }, 100);
        } catch (error) {
          console.error("❌ Erro na aplicação segura:", error);
          // Restaurar triggers mesmo em caso de erro
          (editor as any).trigger = originalTrigger;
          throw error;
        }
      }, 50);
    } catch (error) {
      // Garantir que triggers sejam restaurados mesmo em caso de erro
      const originalTrigger = (editor as any).trigger;
      (editor as any).trigger = originalTrigger;
      console.error("❌ Erro ao aplicar template:", error);
      throw error;
    }
  }

  // Função auxiliar SEGURA para tornar componentes removíveis
  private makeComponentsSafeAndRemovable(wrapper: any): void {
    if (!wrapper) return;

    try {
      // Configurar wrapper
      wrapper.set({
        removable: false, // Wrapper não deve ser removível
        draggable: false,
        selectable: true,
        hoverable: true,
      });

      // Configurar componentes filhos de forma segura
      const components = wrapper.get("components");
      if (components && components.length) {
        components.forEach((child: any, index: number) => {
          try {
            child.set({
              removable: true,
              draggable: true,
              selectable: true,
              editable: true,
              hoverable: true,
              copyable: true,
              resizable: false, // Evitar conflitos de resize
            });

            // Recursivo para filhos
            this.makeChildrenSafe(child);
          } catch (e) {
            console.warn(`Erro ao configurar componente ${index}:`, e);
          }
        });
      }
    } catch (error) {
      console.warn("Erro na configuração de segurança:", error);
    }
  }

  // Função recursiva para filhos
  private makeChildrenSafe(component: any): void {
    if (!component) return;

    try {
      const children = component.get("components");
      if (children && children.length) {
        children.forEach((child: any) => {
          try {
            child.set({
              removable: true,
              draggable: true,
              selectable: true,
              editable: true,
              hoverable: true,
            });
            this.makeChildrenSafe(child); // Recursivo
          } catch (e) {
            // Silencioso para evitar logs excessivos
          }
        });
      }
    } catch (error) {
      // Silencioso
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
export function applyTemplateUltraSimple(editor: Editor, templateId: string) {
  return templateRegistry.applyTemplateAsBlock(editor, templateId);
}

export function applyTemplateSync(editor: Editor, templateId: string) {
  return templateRegistry.applyTemplateSync(editor, templateId);
}
