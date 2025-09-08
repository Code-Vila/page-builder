// Sistema de Conversão de DOC para HTML/Template Avançado
export interface DocConversionResult {
  html: string;
  css: string;
  metadata: {
    title: string;
    author?: string;
    created?: Date;
    pages?: number;
  };
  structure: {
    headings: Array<{ level: number; text: string; id: string }>;
    paragraphs: number;
    images: number;
    tables: number;
    lists: number;
  };
}

export class AdvancedDocToHtmlConverter {
  private mammoth: any = null;

  async initialize() {
    try {
      // Importar mammoth dinamicamente
      const mammothModule = await import("mammoth");
      this.mammoth = mammothModule.default;
      console.log("Sistema de conversão avançado inicializado com mammoth.js");
    } catch (error) {
      console.error("Erro ao carregar mammoth:", error);
      throw new Error(
        "Mammoth.js é necessário para conversão de alta qualidade"
      );
    }
  }

  async convertDocToHtml(file: File): Promise<DocConversionResult> {
    await this.initialize();

    // Verificar se é um arquivo DOCX
    if (
      !file.name.endsWith(".docx") &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      throw new Error(
        "Apenas arquivos DOCX são suportados para conversão de alta qualidade"
      );
    }

    return await this.convertWithEnhancedMammoth(file);
  }

  private async convertWithEnhancedMammoth(
    file: File
  ): Promise<DocConversionResult> {
    const arrayBuffer = await file.arrayBuffer();

    const result = await this.mammoth.convertToHtml(
      { arrayBuffer },
      {
        convertImage: this.mammoth.images.imgElement((image: any) => {
          return image.read("base64").then((imageBuffer: any) => {
            return {
              src: `data:${image.contentType};base64,${imageBuffer}`,
              alt: image.altText || "",
              style: "max-width: 100%; height: auto;",
            };
          });
        }),

        styleMap: this.getEnhancedStyleMap(),

        includeEmbeddedStyleMap: true,
        includeDefaultStyleMap: true,

        preserveWhitespace: true,

        // Configurações avançadas para melhor fidelidade
        transformDocument: (element: any) => {
          // Preservar estilos de parágrafos
          if (element.type === "paragraph") {
            return this.transformParagraph(element);
          }

          // Preservar estilos de texto
          if (element.type === "run") {
            return this.transformRun(element);
          }

          // Melhor tratamento de tabelas
          if (element.type === "table") {
            return this.transformTable(element);
          }

          return element;
        },
      }
    );

    return this.processEnhancedConversionResult(
      result.value,
      result.messages,
      file
    );
  }

  private getEnhancedStyleMap(): string[] {
    return [
      // Títulos
      "p[style-name='Title'] => h1.title:fresh",
      "p[style-name='Subtitle'] => h2.subtitle:fresh",
      "p[style-name='Heading 1'] => h1:fresh",
      "p[style-name='Heading 2'] => h2:fresh",
      "p[style-name='Heading 3'] => h3:fresh",
      "p[style-name='Heading 4'] => h4:fresh",
      "p[style-name='Heading 5'] => h5:fresh",
      "p[style-name='Heading 6'] => h6:fresh",

      // Parágrafos com estilos específicos
      "p[style-name='Normal'] => p.normal:fresh",
      "p[style-name='Body Text'] => p.body-text:fresh",
      "p[style-name='Quote'] => blockquote.quote:fresh",
      "p[style-name='Intense Quote'] => blockquote.intense-quote:fresh",
      "p[style-name='Caption'] => p.caption:fresh",
      "p[style-name='Footnote Text'] => p.footnote:text",

      // Listas
      "p[style-name='List Paragraph'] => li.list-paragraph:fresh",
      "p[style-name='List Bullet'] => li.bullet-list:fresh",
      "p[style-name='List Number'] => li.numbered-list:fresh",
      "p[style-name='List Continue'] => li.list-continue:fresh",
      "p[style-name='List 2'] => li.list-level-2:fresh",
      "p[style-name='List 3'] => li.list-level-3:fresh",

      // Tabelas
      "table => table.document-table:fresh",
      "p[style-name='Table Heading'] => td.table-heading:fresh",
      "p[style-name='Table Contents'] => td.table-contents:fresh",

      // Cabeçalhos e rodapés
      "p[style-name='Header'] => p.header:fresh",
      "p[style-name='Footer'] => p.footer:fresh",

      // Texto com formatação especial
      "r[style-name='Strong'] => strong",
      "r[style-name='Emphasis'] => em",
      "r[style-name='Code'] => code",

      // Hiperlinks
      "r[style-name='Hyperlink'] => a.hyperlink",
    ];
  }

  private transformParagraph(element: any): any {
    const paragraphStyle = element.styleName || "";
    const alignment = element.alignment || "left";
    const indent = element.indent || {};

    let styleAttributes = "";

    // Aplicar estilos baseados no nome do estilo
    if (paragraphStyle.includes("Heading")) {
      const level = paragraphStyle.match(/Heading (\d+)/)?.[1] || "1";
      return {
        ...element,
        tagName: `h${level}`,
        attributes: {
          class: `heading-${level}`,
        },
      };
    }

    // Alinhamento
    if (alignment !== "left") {
      styleAttributes += `text-align: ${alignment};`;
    }

    // Recuo
    if (indent.start) {
      styleAttributes += `margin-left: ${indent.start}pt;`;
    }

    if (indent.end) {
      styleAttributes += `margin-right: ${indent.end}pt;`;
    }

    if (indent.firstLine) {
      styleAttributes += `text-indent: ${indent.firstLine}pt;`;
    }

    if (styleAttributes) {
      return {
        ...element,
        style: styleAttributes,
      };
    }

    return element;
  }

  private transformRun(element: any): any {
    const styleAttributes = [];

    // Cor do texto
    if (element.color) {
      styleAttributes.push(`color: ${element.color};`);
    }

    // Tamanho da fonte
    if (element.fontSize) {
      styleAttributes.push(`font-size: ${element.fontSize}pt;`);
    }

    // Nome da fonte
    if (element.font) {
      styleAttributes.push(`font-family: ${element.font};`);
    }

    // Negrito
    if (element.bold) {
      styleAttributes.push("font-weight: bold;");
    }

    // Itálico
    if (element.italic) {
      styleAttributes.push("font-style: italic;");
    }

    // Sublinhado
    if (element.underline) {
      styleAttributes.push("text-decoration: underline;");
    }

    // Tachado
    if (element.strikethrough) {
      styleAttributes.push("text-decoration: line-through;");
    }

    // Cor de fundo
    if (element.highlight) {
      styleAttributes.push(`background-color: ${element.highlight};`);
    }

    if (styleAttributes.length > 0) {
      return {
        ...element,
        style: styleAttributes.join(" "),
      };
    }

    return element;
  }

  private transformTable(element: any): any {
    let styleAttributes = "";

    // Largura da tabela
    if (element.width) {
      styleAttributes += `width: ${element.width};`;
    }

    // Alinhamento da tabela
    if (element.alignment) {
      styleAttributes += `margin-${
        element.alignment === "center"
          ? "left: auto; margin-right: auto;"
          : element.alignment === "right"
          ? "left: auto;"
          : ""
      }`;
    }

    if (styleAttributes) {
      return {
        ...element,
        style: styleAttributes,
      };
    }

    return element;
  }

  private processEnhancedConversionResult(
    html: string,
    messages: any[],
    file: File
  ): DocConversionResult {
    // Processar mensagens de conversão
    const warnings = messages.filter((msg) => msg.type === "warning");
    if (warnings.length > 0) {
      console.warn("Avisos na conversão:", warnings);
    }

    // Processar HTML para melhorar a estrutura
    const processedHtml = this.enhanceHtmlStructure(html);

    return {
      html: processedHtml,
      css: this.generateEnhancedCSS(),
      metadata: this.extractEnhancedMetadata(html, file),
      structure: this.analyzeEnhancedStructure(processedHtml),
    };
  }

  private enhanceHtmlStructure(html: string): string {
    // Preservar mais a formatação original do Word - estilo WordSection1
    let enhancedHtml = html
      // Preservar espaçamentos entre parágrafos - adicionar &nbsp; entre parágrafos
      .replace(
        /<\/p>\s*<p>/g,
        '</p><p class="MsoNormal" style="border:none"><span lang="PT-BR" style="color:black">&nbsp;</span></p><p>'
      )
      // Preservar estilos inline existentes nos parágrafos
      .replace(/<p([^>]*?)>/g, (_, attributes) => {
        // Se já tem estilos, preservar
        if (attributes.includes("style=")) {
          return `<p class="MsoNormal"${attributes}><span lang="PT-BR" style="color:black">`;
        }
        // Se não tem estilos, adicionar padrão
        return `<p class="MsoNormal" style="border:none"${attributes}><span lang="PT-BR" style="color:black">`;
      })
      .replace(/<\/p>/g, "</span></p>")

      // Converter listas para parágrafos com bullets reais
      .replace(/<ul[^>]*>(.*?)<\/ul>/gs, (_, content) => {
        // Converter cada <li> para parágrafo com bullet
        const listItems = content.replace(
          /<li[^>]*>(.*?)<\/li>/gs,
          '<p class="MsoNormal" style="margin-left:.5in;text-indent:-.25in;border:none"><span lang="PT-BR" style="color:black">●<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;</span></span>$1</p>'
        );
        return listItems;
      })
      .replace(/<ol[^>]*>(.*?)<\/ol>/gs, (_, content) => {
        // Converter cada <li> para parágrafo com bullet
        const listItems = content.replace(
          /<li[^>]*>(.*?)<\/li>/gs,
          '<p class="MsoNormal" style="margin-left:.5in;text-indent:-.25in;border:none"><span lang="PT-BR" style="color:black">●<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;</span></span>$1</p>'
        );
        return listItems;
      })
      // Converter <li> soltos para parágrafos com bullets
      .replace(
        /<li[^>]*>(.*?)<\/li>/g,
        '<p class="MsoNormal" style="margin-left:.5in;text-indent:-.25in;border:none"><span lang="PT-BR" style="color:black">●<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;</span></span>$1</p>'
      )

      // Tabelas com formatação preservada
      .replace(
        /<table>/g,
        '<table class="document-table" border="0" cellspacing="0" cellpadding="6">'
      )
      .replace(/<td>/g, '<td class="table-cell">')
      .replace(/<th>/g, '<th class="table-header">')

      // Imagens
      .replace(/<img/g, '<img class="document-image"')

      // Preservar quebras de linha e espaços
      .replace(
        /\n\s*\n/g,
        '<p class="MsoNormal" style="border:none"><span lang="PT-BR" style="color:black">&nbsp;</span></p>'
      )
      .replace(/\n/g, "<br>")
      .replace(/\s{2,}/g, (match) => "&nbsp;".repeat(match.length));

    // Corrigir estrutura de listas aninhadas
    enhancedHtml = this.fixNestedLists(enhancedHtml);

    return `<div class="WordSection1">${enhancedHtml}</div>`;
  }

  private fixNestedLists(html: string): string {
    // Esta é uma implementação simplificada para corrigir listas aninhadas
    // Em uma implementação real, seria necessário analisar a estrutura mais profundamente

    // Identificar e corrigir listas de vários níveis
    const listRegex = /(<ul[^>]*>|<ol[^>]*>)(.*?)(<\/ul>|<\/ol>)/gs;
    return html.replace(listRegex, (match, openTag, content, closeTag) => {
      // Verificar se há listas dentro do conteúdo
      if (content.includes("<ul") || content.includes("<ol")) {
        return `${openTag}${this.fixNestedLists(content)}${closeTag}`;
      }
      return match;
    });
  }

  private generateEnhancedCSS(): string {
    return `
      .WordSection1 {
        font-family: "Times New Roman", serif;
        font-size: 12pt;
        line-height: 1.15;
        color: #000;
        max-width: 8.5in;
        margin: 0 auto;
        padding: 1in;
        background: white;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
      }
      
      /* Títulos */
      .document-template h1 {
        font-size: 18pt;
        font-weight: bold;
        margin: 24pt 0 12pt 0;
        color: #000;
      }
      
      .document-template h2 {
        font-size: 16pt;
        font-weight: bold;
        margin: 18pt 0 9pt 0;
        color: #444;
      }
      
      .document-template h3 {
        font-size: 14pt;
        font-weight: bold;
        margin: 14pt 0 7pt 0;
        color: #666;
      }
      
      .document-template h4 {
        font-size: 12pt;
        font-weight: bold;
        margin: 12pt 0 6pt 0;
        color: #888;
      }
      
      .document-template h5 {
        font-size: 11pt;
        font-weight: bold;
        margin: 10pt 0 5pt 0;
        color: #999;
      }
      
      .document-template h6 {
        font-size: 10pt;
        font-weight: bold;
        margin: 8pt 0 4pt 0;
        color: #aaa;
      }
      
      /* Parágrafos estilo Word MsoNormal */
      .WordSection1 p.MsoNormal {
        margin: 0;
        line-height: 1.15;
        text-indent: 0;
        font-size: 12pt;
        font-family: "Times New Roman", serif;
      }
      
      /* Preservar estilos inline */
      .WordSection1 p[style] {
        /* Estilos inline têm prioridade */
      }
      
      /* Títulos com estilos específicos */
      .WordSection1 h1, .WordSection1 h2, .WordSection1 h3 {
        margin: 0;
        font-weight: bold;
      }
      
      /* Preservar cores e tamanhos de fonte */
      .WordSection1 span[style*="color"] {
        /* Cores inline preservadas */
      }
      
      .WordSection1 span[style*="font-size"] {
        /* Tamanhos de fonte preservados */
      }
      
      /* Parágrafos com margens específicas para listas */
      .WordSection1 p.MsoNormal[style*="margin-left:.5in"] {
        margin-left: 0.5in;
        text-indent: -0.25in;
      }
      
      /* Preservar espaçamentos entre parágrafos */
      .WordSection1 p + p {
        margin-top: 0;
      }
      
      /* Preservar quebras de linha */
      .WordSection1 br {
        line-height: 1.15;
      }
      
      /* Preservar espaços */
      .WordSection1 span {
        white-space: normal;
      }
      
      /* Listas estilo Word com bullets reais */
      .WordSection1 ul, 
      .WordSection1 ol {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      
      .WordSection1 li {
        margin: 0;
        padding: 0;
        text-indent: 0;
      }
      
      /* Bullets personalizados */
      .WordSection1 p.MsoNormal[style*="margin-left:.5in"] span:first-child {
        font-family: "Times New Roman", serif;
        font-size: 12pt;
      }
      
      .document-template ul.document-list {
        list-style-type: disc;
      }
      
      .document-template ol.document-list {
        list-style-type: decimal;
      }
      
      /* Tabelas */
      .document-template table.document-table {
        width: 100%;
        border-collapse: collapse;
        margin: 12pt 0;
      }
      
      .document-template .table-header {
        background-color: #f2f2f2;
        font-weight: bold;
        border: 1pt solid #ddd;
        padding: 6pt;
      }
      
      .document-template .table-cell {
        border: 1pt solid #ddd;
        padding: 6pt;
      }
      
      /* Imagens */
      .document-template .document-image {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 12pt auto;
      }
      
      /* Citações */
      .document-template blockquote {
        margin: 12pt 0;
        padding: 6pt 12pt;
        border-left: 3pt solid #ddd;
        background-color: #f9f9f9;
      }
      
      /* Formatação de texto */
      .document-template strong, 
      .document-template b {
        font-weight: bold;
      }
      
      .document-template em, 
      .document-template i {
        font-style: italic;
      }
      
      .document-template u {
        text-decoration: underline;
      }
      
      .document-template s, 
      .document-template strike {
        text-decoration: line-through;
      }
      
      /* Links */
      .document-template a {
        color: #0563c1;
        text-decoration: underline;
      }
      
      .document-template a:hover {
        color: #034c8c;
      }
      
      /* Classes específicas para diferentes estilos de parágrafo */
      .document-template .normal {
        /* Estilo para parágrafos normais */
      }
      
      .document-template .body-text {
        /* Estilo para texto do corpo */
      }
      
      .document-template .quote {
        font-style: italic;
        color: #666;
      }
      
      .document-template .intense-quote {
        font-style: italic;
        font-weight: bold;
        color: #444;
      }
      
      .document-template .caption {
        font-size: 10pt;
        color: #666;
        text-align: center;
      }
      
      .document-template .footnote {
        font-size: 9pt;
        color: #666;
      }
    `;
  }

  private extractEnhancedMetadata(
    html: string,
    file: File
  ): DocConversionResult["metadata"] {
    // Tentar extrair título do documento
    const titleMatch =
      html.match(/<h1[^>]*>(.*?)<\/h1>/i) ||
      html.match(/<title[^>]*>(.*?)<\/title>/i);

    const title = titleMatch
      ? titleMatch[1].replace(/<[^>]*>/g, "").trim()
      : file.name.replace(/\.[^/.]+$/, "");

    return {
      title,
      created: new Date(),
    };
  }

  private analyzeEnhancedStructure(
    html: string
  ): DocConversionResult["structure"] {
    const headings = Array.from(
      html.matchAll(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi)
    ).map((match) => ({
      level: parseInt(match[1]),
      text: match[2].replace(/<[^>]*>/g, "").trim(),
      id: `heading-${Math.random().toString(36).substr(2, 9)}`,
    }));

    const paragraphs = (html.match(/<p[^>]*>/gi) || []).length;
    const images = (html.match(/<img[^>]*>/gi) || []).length;
    const tables = (html.match(/<table[^>]*>/gi) || []).length;
    const lists = (html.match(/<ul[^>]*>|<ol[^>]*>/gi) || []).length;

    return {
      headings,
      paragraphs,
      images,
      tables,
      lists,
    };
  }

  // Método para criar template GrapesJS
  createGrapesJSTemplate(
    conversionResult: DocConversionResult,
    templateName: string
  ) {
    const templateId = templateName.toLowerCase().replace(/[^a-z0-9]/g, "-");

    return {
      id: templateId,
      label: templateName,
      category: {
        id: "converted-templates",
        label: "Templates Convertidos",
        open: true,
        attributes: {},
      },
      media: `
        <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3498db;">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>
      `,
      content: conversionResult.html,
      attributes: {
        class: `gjs-block-${templateId}`,
        title: `Template convertido: ${templateName}`,
      },
      css: conversionResult.css,
    };
  }
}

export const advancedDocConverter = new AdvancedDocToHtmlConverter();
