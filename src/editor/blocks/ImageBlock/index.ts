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
  content: imageHTML,
  attributes: {
    class: "gjs-block-image",
    title: "Arraste para adicionar uma imagem",
  },
};

// Exportar também o CSS para injeção no canvas
export { imageCSS };

export default ImageBlock;
