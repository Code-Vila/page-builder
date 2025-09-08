import "./style.css";
// Importar o HTML como string usando a sintaxe do Vite
import interactiveLinkHTML from "./element.txt?raw";
// Importar o CSS como string para injeção no canvas
import interactiveLinkCSS from "./style.css?raw";

// Configuração do bloco
export const InteractiveLinkBlock = {
  id: "interactive-link",
  label: "Link Interativo",
  category: "Interativo",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">L</div>
  `,
  content: interactiveLinkHTML,
  attributes: {
    class: "gjs-block-interactive-link",
    title: "Arraste para adicionar um link interativo",
  },
};

// Exportar também o CSS para injeção no canvas
export { interactiveLinkCSS };

export default InteractiveLinkBlock;