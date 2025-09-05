import "./style.css";
// Importar o HTML como string usando a sintaxe do Vite
import buttonHTML from "./element.html?raw";
// Importar o CSS como string para injeção no canvas
import buttonCSS from "./style.css?raw";

// Configuração do bloco
export const ButtonBlock = {
  id: "button",
  label: "Botão",
  category: "Básico",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
  `,
  content: buttonHTML,
  attributes: {
    class: "gjs-block-button",
    title: "Arraste para adicionar um botão",
  },
};

// Exportar também o CSS para injeção no canvas
export { buttonCSS };

export default ButtonBlock;
