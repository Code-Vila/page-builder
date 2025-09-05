// src/editor/blocks/RichTextBlock/index.ts
import richTextHTML from "./element.html?raw";
import richTextCSS from "./style.css?raw";

export const RichTextBlock = (editor: any) => {
  const componentType = "rich-text-block";
  const blockId = "rich-text-block";

  // Registrar o tipo de componente no GrapesJS
  editor.DomComponents.addType(componentType, {
    isComponent: (el: HTMLElement) => el.classList?.contains("rich-text-block"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["rich-text-block"],
        content: richTextHTML,
        // Configurações importantes para edição de texto
        components: [
          {
            type: "text",
            content:
              "Clique aqui para editar este texto. Você pode usar <strong>negrito</strong>, <em>itálico</em>, criar listas e muito mais!",
            editable: true,
            stylable: true,
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
                type: "color",
                name: "color",
                label: "Cor do Texto",
              },
              {
                type: "number",
                name: "font-size",
                label: "Tamanho da Fonte (px)",
                min: 8,
                max: 72,
                value: 16,
              },
            ],
          },
        ],
        // Traits para o container
        traits: [
          {
            type: "select",
            name: "class",
            label: "Estilo",
            options: [
              { value: "rich-text-block", name: "Padrão" },
              { value: "rich-text-block primary", name: "Primário" },
              { value: "rich-text-block secondary", name: "Secundário" },
            ],
          },
        ],
      },
    },

    view: {
      // Eventos para melhorar a experiência de edição
      events: {
        dblclick: "onDoubleClick",
      },

      onDoubleClick() {
        // Focar no texto ao dar duplo clique
        const textComponent = this.model.components().models[0];
        if (textComponent) {
          editor.select(textComponent);
        }
      },
    },
  });

  // Registrar o bloco na barra lateral
  editor.BlockManager.add(blockId, {
    label: "✏️ Editor Rico",
    category: "Texto",
    content: {
      type: componentType,
    },
    attributes: {
      class: "gjs-block-rich-text",
      title: "Bloco de texto editável com formatação rica",
    },
  });

  // Adicionar o CSS ao editor
  editor.CssComposer.addRules(richTextCSS);
};

export { richTextCSS };
