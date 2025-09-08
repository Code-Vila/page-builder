import "./style.css";
import bootstrapListGroupHTML from "./element.html?raw";
import bootstrapListGroupCSS from "./style.css?raw";

export const BootstrapListGroupBlock = {
  id: "bootstrap-listgroup",
  label: "List Group",
  category: "Básico",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7952b3, #6f42c1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">BS</div>
  `,
  content: {
    type: "custom-bootstrap-listgroup",
    content: bootstrapListGroupHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "minha-listgroup",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título da list group",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-1-text",
        label: "Item 1 - Texto",
        placeholder: "Item Ativo",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-2-text",
        label: "Item 2 - Texto",
        placeholder: "Segundo item",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-3-text",
        label: "Item 3 - Texto",
        placeholder: "Terceiro item",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-4-text",
        label: "Item 4 - Texto",
        placeholder: "Item Desabilitado",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-5-text",
        label: "Item 5 - Texto",
        placeholder: "Quinto item",
        changeProp: 1,
      },
      {
        type: "select",
        name: "listgroup-style",
        label: "Estilo da List Group",
        options: [
          { value: "default", name: "Padrão" },
          { value: "primary", name: "Primário (Azul)" },
          { value: "secondary", name: "Secundário (Cinza)" },
          { value: "success", name: "Sucesso (Verde)" },
          { value: "danger", name: "Perigo (Vermelho)" },
          { value: "warning", name: "Aviso (Amarelo)" },
          { value: "info", name: "Info (Ciano)" },
          { value: "light", name: "Claro" },
          { value: "dark", name: "Escuro" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "listgroup-size",
        label: "Tamanho da List Group",
        options: [
          { value: "default", name: "Padrão" },
          { value: "sm", name: "Pequeno" },
          { value: "lg", name: "Grande" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "listgroup-layout",
        label: "Layout da List Group",
        options: [
          { value: "vertical", name: "Vertical" },
          { value: "horizontal", name: "Horizontal" },
        ],
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "item-1-active",
        label: "Item 1 Ativo",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "item-4-disabled",
        label: "Item 4 Desabilitado",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-badges",
        label: "Mostrar Badges",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-icons",
        label: "Mostrar Ícones",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "clickable-items",
        label: "Itens Clicáveis",
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
    class: "gjs-block-bootstrap-listgroup",
    title: "Arraste para adicionar list group Bootstrap",
  },
};

export { bootstrapListGroupCSS };
export default BootstrapListGroupBlock;
