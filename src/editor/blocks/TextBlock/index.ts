import "./style.css";
// Importar o HTML como string usando a sintaxe do Vite
import textHTML from "./element.html?raw";
// Importar o CSS como string para injeção no canvas
import textCSS from "./style.css?raw";

// Configuração do bloco
export const TextBlock = {
  id: "text",
  label: "Texto",
  category: "Básico",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
  `,
  content: {
    type: "custom-text",
    content: textHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-texto",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título do elemento",
        changeProp: 1,
      },
      {
        type: "text",
        name: "text-title",
        label: "Título do Texto",
        placeholder: "Título Personalizável",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "text-content",
        label: "Conteúdo do Texto",
        placeholder: "Este é um texto de exemplo que pode ser editado diretamente...",
        changeProp: 1,
      },
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
        changeProp: 1,
      },
      {
        type: "select",
        name: "title-level",
        label: "Nível do Título",
        options: [
          { value: "h1", name: "H1 (Principal)" },
          { value: "h2", name: "H2 (Secundário)" },
          { value: "h3", name: "H3 (Terciário)" },
          { value: "h4", name: "H4" },
          { value: "h5", name: "H5" },
          { value: "h6", name: "H6" },
        ],
        changeProp: 1,
      },
      {
        type: "text",
        name: "title-color",
        label: "Cor do Título",
        placeholder: "#333333",
        changeProp: 1,
      },
      {
        type: "text",
        name: "content-color",
        label: "Cor do Conteúdo",
        placeholder: "#666666",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "custom-css",
        label: "CSS Personalizado",
        placeholder: ".minha-classe { font-size: 1.2rem; }",
        changeProp: 1,
      },
    ],
  },
  attributes: {
    class: "gjs-block-text",
    title: "Arraste para adicionar um bloco de texto",
  },
};

// Exportar também o CSS para injeção no canvas
export { textCSS };

export default TextBlock;
