// Gerenciador de Templates Dinâmicos
import { docConverter, type DocConversionResult } from './docConverter';

export interface TemplateConfig {
  id: string;
  label: string;
  category: string;
  description?: string;
  content: string;
  css: string;
  metadata?: any;
}

export class TemplateManager {
  private editor: any;
  private templates: Map<string, TemplateConfig> = new Map();

  constructor(editor: any) {
    this.editor = editor;
  }

  // Adicionar template criado a partir de documento
  async addDocumentTemplate(file: File, config: {
    name: string;
    description?: string;
    category?: string;
  }): Promise<TemplateConfig> {
    try {
      // Converter documento
      const conversionResult = await docConverter.convertDocToHtml(file);
      
      // Criar template
      const template = this.createTemplateFromConversion(conversionResult, config);
      
      // Registrar no GrapesJS
      this.registerTemplate(template);
      
      // Salvar no gerenciador
      this.templates.set(template.id, template);
      
      return template;
    } catch (error) {
      console.error('Erro ao criar template do documento:', error);
      throw error;
    }
  }

  // Criar template a partir do resultado da conversão
  private createTemplateFromConversion(
    conversionResult: DocConversionResult, 
    config: { name: string; description?: string; category?: string }
  ): TemplateConfig {
    const templateId = config.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    return {
      id: templateId,
      label: config.name,
      category: config.category || 'Templates',
      description: config.description,
      content: this.optimizeContentForGrapesJS(conversionResult.html),
      css: this.optimizeCSSForGrapesJS(conversionResult.css),
      metadata: {
        ...conversionResult.metadata,
        structure: conversionResult.structure,
        created: new Date(),
        source: 'document-conversion'
      }
    };
  }

  // Otimizar conteúdo HTML para GrapesJS
  private optimizeContentForGrapesJS(html: string): string {
    return html
      // Remover classes e IDs desnecessários
      .replace(/class="[^"]*"/g, '')
      .replace(/id="[^"]*"/g, '')
      // Adicionar classes editáveis do GrapesJS
      .replace(/<h1([^>]*)>/g, '<h1$1 class="gjs-heading">')
      .replace(/<h2([^>]*)>/g, '<h2$1 class="gjs-heading">')
      .replace(/<h3([^>]*)>/g, '<h3$1 class="gjs-heading">')
      .replace(/<p([^>]*)>/g, '<p$1 class="gjs-text">')
      .replace(/<img([^>]*)>/g, '<img$1 class="gjs-image">')
      .replace(/<table([^>]*)>/g, '<table$1 class="gjs-table">')
      // Limpar espaços extras
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Otimizar CSS para GrapesJS
  private optimizeCSSForGrapesJS(css: string): string {
    return css
      // Adicionar prefixo para evitar conflitos
      .replace(/\.document-content/g, '.gjs-document-template')
      .replace(/\.document-template/g, '.gjs-document-template')
      // Adicionar estilos para elementos editáveis
      + `
        .gjs-document-template .gjs-heading {
          cursor: text;
        }
        
        .gjs-document-template .gjs-text {
          cursor: text;
        }
        
        .gjs-document-template .gjs-image {
          cursor: pointer;
        }
        
        .gjs-document-template .gjs-table {
          cursor: pointer;
        }
      `;
  }

  // Registrar template no GrapesJS
  private registerTemplate(template: TemplateConfig): void {
    const blockDef = {
      id: template.id,
      label: template.label,
      category: { 
        id: template.category, 
        label: template.category, 
        open: true, 
        attributes: {} 
      },
      media: this.generateTemplateIcon(template.category),
      content: template.content,
      attributes: {
        class: `gjs-block-${template.id}`,
        title: `Arraste para adicionar ${template.label}`,
      },
    };

    // Adicionar ao BlockManager
    this.editor.BlockManager.add(blockDef.id, blockDef);
    
    // Adicionar CSS
    this.editor.addStyle(template.css);
    
    console.log(`✅ Template "${template.label}" registrado com sucesso`);
  }

  // Gerar ícone baseado na categoria
  private generateTemplateIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Templates': '📄',
      'Documentos': '📋',
      'Relatórios': '📊',
      'Certificados': '🏆',
      'Contratos': '📝',
      'Propostas': '💼'
    };

    const icon = icons[category] || '📄';
    
    return `
      <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3498db;">
        <text x="12" y="16" text-anchor="middle" font-size="20">${icon}</text>
      </svg>
    `;
  }

  // Listar todos os templates
  getTemplates(): TemplateConfig[] {
    return Array.from(this.templates.values());
  }

  // Obter template por ID
  getTemplate(id: string): TemplateConfig | undefined {
    return this.templates.get(id);
  }

  // Remover template
  removeTemplate(id: string): boolean {
    const template = this.templates.get(id);
    if (template) {
      // Remover do BlockManager
      this.editor.BlockManager.remove(id);
      
      // Remover do gerenciador
      this.templates.delete(id);
      
      console.log(`🗑️ Template "${template.label}" removido`);
      return true;
    }
    return false;
  }

  // Exportar template
  exportTemplate(id: string): string {
    const template = this.templates.get(id);
    if (!template) {
      throw new Error(`Template ${id} não encontrado`);
    }

    return JSON.stringify({
      ...template,
      exported: new Date().toISOString()
    }, null, 2);
  }

  // Importar template
  importTemplate(templateData: string): TemplateConfig {
    try {
      const template = JSON.parse(templateData) as TemplateConfig;
      
      // Validar estrutura
      if (!template.id || !template.label || !template.content) {
        throw new Error('Dados do template inválidos');
      }

      // Registrar template
      this.registerTemplate(template);
      this.templates.set(template.id, template);
      
      return template;
    } catch (error) {
      console.error('Erro ao importar template:', error);
      throw error;
    }
  }

  // Criar template a partir de HTML existente
  createTemplateFromHTML(html: string, config: {
    name: string;
    description?: string;
    category?: string;
  }): TemplateConfig {
    const templateId = config.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const template: TemplateConfig = {
      id: templateId,
      label: config.name,
      category: config.category || 'Templates',
      description: config.description,
      content: this.optimizeContentForGrapesJS(html),
      css: this.generateBasicTemplateCSS(),
      metadata: {
        created: new Date(),
        source: 'html-import'
      }
    };

    this.registerTemplate(template);
    this.templates.set(template.id, template);
    
    return template;
  }

  // Gerar CSS básico para templates
  private generateBasicTemplateCSS(): string {
    return `
      .gjs-document-template {
        font-family: 'Times New Roman', serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 40px;
        background: white;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
        border-radius: 8px;
      }
      
      .gjs-document-template .gjs-heading {
        color: #2c3e50;
        margin: 20px 0 15px 0;
      }
      
      .gjs-document-template .gjs-text {
        color: #2c3e50;
        margin: 10px 0;
        text-align: justify;
      }
      
      .gjs-document-template .gjs-image {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 20px auto;
      }
      
      .gjs-document-template .gjs-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      
      .gjs-document-template .gjs-table th,
      .gjs-document-template .gjs-table td {
        border: 1px solid #bdc3c7;
        padding: 8px;
        text-align: left;
      }
      
      .gjs-document-template .gjs-table th {
        background-color: #ecf0f1;
        font-weight: bold;
      }
    `;
  }
}

// Instância global do gerenciador
let templateManagerInstance: TemplateManager | null = null;

export const getTemplateManager = (editor?: any): TemplateManager => {
  if (!templateManagerInstance && editor) {
    templateManagerInstance = new TemplateManager(editor);
  }
  
  if (!templateManagerInstance) {
    throw new Error('TemplateManager não foi inicializado. Forneça uma instância do editor.');
  }
  
  return templateManagerInstance;
};
