import "./style.css";
import headingHTML from "./element.html?raw";
import headingCSS from "./style.css?raw";

export const HeadingBlock = {
  id: "heading",
  label: "Heading",
  category: "Básico",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #1f2937;">
      <path d="M3 4h2v6h6V4h2v16h-2v-8H5v8H3V4zm14 0h5v2h-5V4zm0 4h4v2h-4V8zm0 4h5v2h-5v-2zm0 4h4v2h-4v-2z"/>
    </svg>
  `,
  content: {
    type: "custom-heading",
    content: headingHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-titulo",
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
        name: "heading-text",
        label: "Texto do Título",
        placeholder: "Seu Título Aqui",
        changeProp: 1,
      },
      {
        type: "select",
        name: "heading-level",
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
        name: "heading-style",
        label: "Estilo do Título",
        options: [
          { value: "default", name: "Padrão" },
          { value: "bold", name: "Negrito" },
          { value: "italic", name: "Itálico" },
          { value: "underline", name: "Sublinhado" },
        ],
        changeProp: 1,
      },
      {
        type: "text",
        name: "text-color",
        label: "Cor do Texto",
        placeholder: "#333333",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "custom-css",
        label: "CSS Personalizado",
        placeholder: ".minha-classe { font-size: 2rem; }",
        changeProp: 1,
      },
    ],
  },
  attributes: {
    class: "gjs-block-heading",
    title: "Arraste para adicionar um título",
  },
};

export { headingCSS };
export default HeadingBlock;
