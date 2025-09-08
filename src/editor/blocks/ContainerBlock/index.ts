import "./style.css";
import containerHTML from "./element.html?raw";
import containerCSS from "./style.css?raw";

const ContainerBlock = {
  id: "container",
  label: "Container",
  category: "Layout",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #6366f1;">
      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/>
    </svg>
  `,
  content: {
    type: "custom-container",
    content: containerHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-container",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título do container",
        changeProp: 1,
      },
      {
        type: "select",
        name: "container-width",
        label: "Largura do Container",
        options: [
          { value: "full", name: "Largura Completa" },
          { value: "large", name: "Grande (1200px)" },
          { value: "medium", name: "Médio (960px)" },
          { value: "small", name: "Pequeno (768px)" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "container-align",
        label: "Alinhamento",
        options: [
          { value: "left", name: "Esquerda" },
          { value: "center", name: "Centro" },
          { value: "right", name: "Direita" },
        ],
        changeProp: 1,
      },
      {
        type: "text",
        name: "background-color",
        label: "Cor de Fundo",
        placeholder: "#ffffff",
        changeProp: 1,
      },
      {
        type: "text",
        name: "padding",
        label: "Espaçamento Interno",
        placeholder: "20px",
        changeProp: 1,
      },
      {
        type: "text",
        name: "margin",
        label: "Margem Externa",
        placeholder: "0 auto",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "custom-css",
        label: "CSS Personalizado",
        placeholder: ".minha-classe { border: 1px solid #ccc; }",
        changeProp: 1,
      },
    ],
  },
  attributes: {
    class: "gjs-block-container",
    title: "Arraste para adicionar um container",
  },
};

export { containerCSS };
export default ContainerBlock;
