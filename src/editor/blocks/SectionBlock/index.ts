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
  content: {
    type: "custom-section",
    content: sectionHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "minha-secao",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título da seção",
        changeProp: 1,
      },
      {
        type: "text",
        name: "section-title",
        label: "Título da Seção",
        placeholder: "Título da Seção",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "section-description",
        label: "Descrição da Seção",
        placeholder: "Esta é uma descrição da seção...",
        changeProp: 1,
      },
      {
        type: "select",
        name: "section-style",
        label: "Estilo da Seção",
        options: [
          { value: "default", name: "Padrão" },
          { value: "hero", name: "Hero (Destaque)" },
          { value: "card", name: "Card" },
          { value: "minimal", name: "Minimalista" },
        ],
        changeProp: 1,
      },
      {
        type: "text",
        name: "background-color",
        label: "Cor de Fundo",
        placeholder: "#f8f9fa",
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
        type: "select",
        name: "text-align",
        label: "Alinhamento do Texto",
        options: [
          { value: "left", name: "Esquerda" },
          { value: "center", name: "Centro" },
          { value: "right", name: "Direita" },
        ],
        changeProp: 1,
      },
      {
        type: "text",
        name: "padding",
        label: "Espaçamento Interno",
        placeholder: "60px 20px",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "custom-css",
        label: "CSS Personalizado",
        placeholder: ".minha-classe { border-top: 1px solid #eee; }",
        changeProp: 1,
      },
    ],
  },
  attributes: {
    class: "gjs-block-section",
    title: "Arraste para adicionar uma seção",
  },
};

// Exportar também o CSS para injeção no canvas
export { sectionCSS };

export default SectionBlock;
