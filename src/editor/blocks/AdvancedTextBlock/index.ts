// src/editor/blocks/AdvancedTextBlock/index.ts
import advancedTextHTML from "./element.html?raw";
import advancedTextCSS from "./style.css?raw";

const componentType = "advanced-text-block";
const blockId = "advanced-text-block";

/**
 * Bloco de texto avançado usando o RTE nativo do GrapesJS
 * Com configurações robustas e ferramentas avançadas
 */
export const AdvancedTextBlock = (editor: any) => {
  // Configurar o RTE com ferramentas avançadas
  editor.RichTextEditor.add("bold", {
    icon: "<b>B</b>",
    attributes: { title: "Negrito" },
    result: (rte: any) => rte.exec("bold"),
  });

  editor.RichTextEditor.add("italic", {
    icon: "<i>I</i>",
    attributes: { title: "Itálico" },
    result: (rte: any) => rte.exec("italic"),
  });

  editor.RichTextEditor.add("underline", {
    icon: "<u>U</u>",
    attributes: { title: "Sublinhado" },
    result: (rte: any) => rte.exec("underline"),
  });

  editor.RichTextEditor.add("strikethrough", {
    icon: "<s>S</s>",
    attributes: { title: "Tachado" },
    result: (rte: any) => rte.exec("strikeThrough"),
  });

  editor.RichTextEditor.add("fontSize", {
    icon: "A+",
    attributes: { title: "Tamanho da fonte" },
    result: (rte: any) => {
      const size = prompt("Tamanho da fonte (px):", "16");
      if (size) {
        rte.exec("fontSize", false, size + "px");
      }
    },
  });

  editor.RichTextEditor.add("fontColor", {
    icon: "🎨",
    attributes: { title: "Cor do texto" },
    result: (rte: any) => {
      const color = prompt("Cor do texto (hex):", "#000000");
      if (color) {
        rte.exec("foreColor", false, color);
      }
    },
  });

  editor.RichTextEditor.add("backgroundColor", {
    icon: "🖍️",
    attributes: { title: "Cor de fundo" },
    result: (rte: any) => {
      const color = prompt("Cor de fundo (hex):", "#ffff00");
      if (color) {
        rte.exec("backColor", false, color);
      }
    },
  });

  editor.RichTextEditor.add("alignLeft", {
    icon: "⬅️",
    attributes: { title: "Alinhar à esquerda" },
    result: (rte: any) => rte.exec("justifyLeft"),
  });

  editor.RichTextEditor.add("alignCenter", {
    icon: "↔️",
    attributes: { title: "Centralizar" },
    result: (rte: any) => rte.exec("justifyCenter"),
  });

  editor.RichTextEditor.add("alignRight", {
    icon: "➡️",
    attributes: { title: "Alinhar à direita" },
    result: (rte: any) => rte.exec("justifyRight"),
  });

  editor.RichTextEditor.add("alignJustify", {
    icon: "📏",
    attributes: { title: "Justificar" },
    result: (rte: any) => rte.exec("justifyFull"),
  });

  editor.RichTextEditor.add("orderedList", {
    icon: "1.",
    attributes: { title: "Lista numerada" },
    result: (rte: any) => rte.exec("insertOrderedList"),
  });

  editor.RichTextEditor.add("unorderedList", {
    icon: "•",
    attributes: { title: "Lista com marcadores" },
    result: (rte: any) => rte.exec("insertUnorderedList"),
  });

  editor.RichTextEditor.add("outdent", {
    icon: "⬅",
    attributes: { title: "Diminuir recuo" },
    result: (rte: any) => rte.exec("outdent"),
  });

  editor.RichTextEditor.add("indent", {
    icon: "➡",
    attributes: { title: "Aumentar recuo" },
    result: (rte: any) => rte.exec("indent"),
  });

  editor.RichTextEditor.add("link", {
    icon: "🔗",
    attributes: { title: "Inserir link" },
    result: (rte: any) => {
      const url = prompt("URL do link:", "https://");
      if (url) {
        rte.exec("createLink", false, url);
      }
    },
  });

  editor.RichTextEditor.add("unlink", {
    icon: "🔗💔",
    attributes: { title: "Remover link" },
    result: (rte: any) => rte.exec("unlink"),
  });

  editor.RichTextEditor.add("subscript", {
    icon: "X₂",
    attributes: { title: "Subscrito" },
    result: (rte: any) => rte.exec("subscript"),
  });

  editor.RichTextEditor.add("superscript", {
    icon: "X²",
    attributes: { title: "Sobrescrito" },
    result: (rte: any) => rte.exec("superscript"),
  });

  editor.RichTextEditor.add("quote", {
    icon: '"',
    attributes: { title: "Citação" },
    result: (rte: any) => rte.exec("formatBlock", false, "blockquote"),
  });

  editor.RichTextEditor.add("code", {
    icon: "</>",
    attributes: { title: "Código" },
    result: (rte: any) => rte.exec("formatBlock", false, "pre"),
  });

  editor.RichTextEditor.add("removeFormat", {
    icon: "🧹",
    attributes: { title: "Remover formatação" },
    result: (rte: any) => rte.exec("removeFormat"),
  });

  editor.RichTextEditor.add("undo", {
    icon: "↶",
    attributes: { title: "Desfazer" },
    result: (rte: any) => rte.exec("undo"),
  });

  editor.RichTextEditor.add("redo", {
    icon: "↷",
    attributes: { title: "Refazer" },
    result: (rte: any) => rte.exec("redo"),
  });

  // Registrar o tipo de componente
  editor.DomComponents.addType(componentType, {
    isComponent: (el: HTMLElement) =>
      el.classList?.contains("advanced-text-block"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["advanced-text-block"],
        content: advancedTextHTML,
        traits: [
          {
            type: "select",
            name: "text-align",
            label: "Alinhamento",
            options: [
              { value: "left", name: "Esquerda" },
              { value: "center", name: "Centro" },
              { value: "right", name: "Direita" },
              { value: "justify", name: "Justificado" },
            ],
          },
          {
            type: "select",
            name: "font-family",
            label: "Fonte",
            options: [
              { value: "Arial, sans-serif", name: "Arial" },
              { value: "Georgia, serif", name: "Georgia" },
              { value: "Times New Roman, serif", name: "Times New Roman" },
              { value: "Helvetica, sans-serif", name: "Helvetica" },
              { value: "'Courier New', monospace", name: "Courier New" },
              { value: "Verdana, sans-serif", name: "Verdana" },
              { value: "Tahoma, sans-serif", name: "Tahoma" },
              { value: "'Trebuchet MS', sans-serif", name: "Trebuchet MS" },
            ],
          },
          {
            type: "slider",
            name: "font-size",
            label: "Tamanho da fonte",
            min: 10,
            max: 72,
            step: 1,
            value: 16,
            units: ["px"],
          },
          {
            type: "slider",
            name: "line-height",
            label: "Altura da linha",
            min: 1,
            max: 3,
            step: 0.1,
            value: 1.5,
          },
          {
            type: "color",
            name: "color",
            label: "Cor do texto",
          },
          {
            type: "color",
            name: "background-color",
            label: "Cor de fundo",
          },
          {
            type: "slider",
            name: "padding",
            label: "Espaçamento interno",
            min: 0,
            max: 50,
            step: 1,
            value: 20,
            units: ["px"],
          },
          {
            type: "slider",
            name: "margin",
            label: "Espaçamento externo",
            min: 0,
            max: 50,
            step: 1,
            value: 10,
            units: ["px"],
          },
        ],
        style: {
          "min-height": "100px",
          padding: "20px",
          margin: "10px 0",
          border: "1px solid #e5e7eb",
          "border-radius": "8px",
          "font-family": "Arial, sans-serif",
          "font-size": "16px",
          "line-height": "1.5",
          color: "#374151",
          "background-color": "#ffffff",
        },
        editable: true,
        stylable: true,
        highlightable: true,
      },
    },

    view: {
      events: {
        dblclick: "onEdit",
      },

      onEdit(this: any, e: Event) {
        e.stopPropagation();
        e.preventDefault();

        const rte = editor.RichTextEditor;
        const textElement = this.el.querySelector(".editable-content");

        if (textElement) {
          rte.run(textElement, {
            actions: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "fontSize",
              "fontColor",
              "backgroundColor",
              "alignLeft",
              "alignCenter",
              "alignRight",
              "alignJustify",
              "orderedList",
              "unorderedList",
              "outdent",
              "indent",
              "link",
              "unlink",
              "subscript",
              "superscript",
              "quote",
              "code",
              "removeFormat",
              "undo",
              "redo",
            ],
          });
        }
      },

      onRender(this: any) {
        // Adicionar evento para auto-ajuste de altura
        const textElement = this.el.querySelector(".editable-content");
        if (textElement) {
          textElement.addEventListener("input", () => {
            this.autoResize();
          });
        }
      },

      autoResize(this: any) {
        const textElement = this.el.querySelector(".editable-content");
        if (textElement) {
          textElement.style.height = "auto";
          textElement.style.height =
            Math.max(100, textElement.scrollHeight) + "px";
        }
      },
    },
  });

  // Registrar o bloco na categoria
  editor.Blocks.add(blockId, {
    label: "Texto Avançado",
    content: { type: componentType },
    category: "Texto",
    media: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20V6H4V4Z" fill="currentColor"/>
        <path d="M4 8H14V10H4V8Z" fill="currentColor"/>
        <path d="M4 12H20V14H4V12Z" fill="currentColor"/>
        <path d="M4 16H16V18H4V16Z" fill="currentColor"/>
        <path d="M4 20H12V22H4V20Z" fill="currentColor"/>
        <circle cx="18" cy="18" r="3" fill="#3B82F6"/>
      </svg>
    `,
    attributes: { class: "gjs-block-section" },
  });

  // Adicionar CSS customizado
  editor.Css.addRules(advancedTextCSS);
};

export default AdvancedTextBlock;
