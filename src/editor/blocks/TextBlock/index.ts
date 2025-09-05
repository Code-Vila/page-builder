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
  content: textHTML,
  attributes: {
    class: "gjs-block-text",
    title: "Arraste para adicionar um bloco de texto",
  },
};

// Exportar também o CSS para injeção no canvas
export { textCSS };

export default TextBlock;
