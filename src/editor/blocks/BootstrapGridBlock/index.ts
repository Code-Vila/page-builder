import "./style.css";
import bootstrapGridHTML from "./element.html?raw";
import bootstrapGridCSS from "./style.css?raw";

export const BootstrapGridBlock = {
  id: "bootstrap-grid",
  label: "Grid",
  category: "Básico",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7952b3, #6f42c1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">BS</div>
  `,
  content: {
    type: "custom-bootstrap-grid",
    content: bootstrapGridHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-grid",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título do grid",
        changeProp: 1,
      },
      {
        type: "select",
        name: "container-size",
        label: "Tamanho do Container",
        options: [
          { value: "fluid", name: "Fluido (100%)" },
          { value: "sm", name: "Pequeno (540px)" },
          { value: "md", name: "Médio (720px)" },
          { value: "lg", name: "Grande (960px)" },
          { value: "xl", name: "Extra Grande (1140px)" },
          { value: "xxl", name: "XXL (1320px)" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "grid-columns",
        label: "Número de Colunas",
        options: [
          { value: "3", name: "3 Colunas" },
          { value: "2", name: "2 Colunas" },
          { value: "4", name: "4 Colunas" },
          { value: "6", name: "6 Colunas" },
        ],
        changeProp: 1,
      },
      {
        type: "text",
        name: "col-1-title",
        label: "Título Coluna 1",
        placeholder: "Coluna 1",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "col-1-content",
        label: "Conteúdo Coluna 1",
        placeholder: "Conteúdo da primeira coluna...",
        changeProp: 1,
      },
      {
        type: "text",
        name: "col-2-title",
        label: "Título Coluna 2",
        placeholder: "Coluna 2",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "col-2-content",
        label: "Conteúdo Coluna 2",
        placeholder: "Conteúdo da segunda coluna...",
        changeProp: 1,
      },
      {
        type: "text",
        name: "col-3-title",
        label: "Título Coluna 3",
        placeholder: "Coluna 3",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "col-3-content",
        label: "Conteúdo Coluna 3",
        placeholder: "Conteúdo da terceira coluna...",
        changeProp: 1,
      },
      {
        type: "select",
        name: "grid-gap",
        label: "Espaçamento entre Colunas",
        options: [
          { value: "0", name: "Sem espaçamento" },
          { value: "1", name: "Pequeno (0.25rem)" },
          { value: "2", name: "Médio (0.5rem)" },
          { value: "3", name: "Grande (1rem)" },
          { value: "4", name: "Extra Grande (1.5rem)" },
          { value: "5", name: "XXL (3rem)" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "grid-alignment",
        label: "Alinhamento Vertical",
        options: [
          { value: "start", name: "Topo" },
          { value: "center", name: "Centro" },
          { value: "end", name: "Base" },
        ],
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "custom-css",
        label: "CSS Personalizado",
        placeholder: ".minha-classe { border-radius: 8px; }",
        changeProp: 1,
      },
    ],
  },
  attributes: {
    class: "gjs-block-bootstrap-grid",
    title: "Arraste para adicionar um grid Bootstrap responsivo",
  },
};

export { bootstrapGridCSS };
export default BootstrapGridBlock;
