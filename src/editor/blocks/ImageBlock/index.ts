import "./style.css";
// Importar o HTML como string usando a sintaxe do Vite
import imageHTML from "./element.html?raw";
// Importar o CSS como string para injeção no canvas
import imageCSS from "./style.css?raw";

// Configuração do bloco
export const ImageBlock = {
  id: "image",
  label: "Imagem",
  category: "Básico",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #10B981;">
      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>
  `,
  content: {
    type: "custom-image",
    content: imageHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "minha-imagem",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título da imagem",
        changeProp: 1,
      },
      {
        type: "text",
        name: "src",
        label: "URL da Imagem",
        placeholder: "https://exemplo.com/imagem.jpg",
        changeProp: 1,
      },
      {
        type: "text",
        name: "alt",
        label: "Texto Alternativo",
        placeholder: "Descrição da imagem",
        changeProp: 1,
      },
      {
        type: "text",
        name: "href",
        label: "Link (opcional)",
        placeholder: "https://exemplo.com",
        changeProp: 1,
      },
      {
        type: "select",
        name: "target",
        label: "Abrir Link em",
        options: [
          { value: "_self", name: "Mesma Aba" },
          { value: "_blank", name: "Nova Aba" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "image-size",
        label: "Tamanho da Imagem",
        options: [
          { value: "small", name: "Pequena (200px)" },
          { value: "medium", name: "Média (400px)" },
          { value: "large", name: "Grande (600px)" },
          { value: "full", name: "Largura Completa" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "image-style",
        label: "Estilo da Imagem",
        options: [
          { value: "default", name: "Padrão" },
          { value: "rounded", name: "Arredondada" },
          { value: "circle", name: "Circular" },
          { value: "shadow", name: "Com Sombra" },
        ],
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "custom-css",
        label: "CSS Personalizado",
        placeholder: ".minha-classe { border: 2px solid red; }",
        changeProp: 1,
      },
    ],
  },
  attributes: {
    class: "gjs-block-image",
    title: "Arraste para adicionar uma imagem",
  },
};

// Exportar também o CSS para injeção no canvas
export { imageCSS };

export default ImageBlock;
