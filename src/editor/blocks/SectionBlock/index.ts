import "./style.css";
// Importar o HTML como string usando a sintaxe do Vite
import sectionHTML from "./element.html?raw";
// Importar o CSS como string para injeção no canvas
import sectionCSS from "./style.css?raw";

// Configuração do bloco
export const SectionBlock = {
  id: "section",
  label: "Seção",
  category: "Layout",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #10B981;">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
  `,
  content: sectionHTML,
  attributes: {
    class: "gjs-block-section",
    title: "Arraste para adicionar uma seção",
  },
};

// Exportar também o CSS para injeção no canvas
export { sectionCSS };

export default SectionBlock;
