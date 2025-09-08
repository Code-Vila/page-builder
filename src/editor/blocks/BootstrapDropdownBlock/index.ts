import "./style.css";
import bootstrapDropdownHTML from "./element.html?raw";
import bootstrapDropdownCSS from "./style.css?raw";

export const BootstrapDropdownBlock = {
  id: "bootstrap-dropdown",
  label: "Dropdown",
  category: "Básico",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7952b3, #6f42c1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">BS</div>
  `,
  content: {
    type: "custom-bootstrap-dropdown",
    content: bootstrapDropdownHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-dropdown",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título do dropdown",
        changeProp: 1,
      },
      {
        type: "text",
        name: "button-text",
        label: "Texto do Botão",
        placeholder: "Menu Dropdown",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-1-text",
        label: "Item 1 - Texto",
        placeholder: "Ação 1",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-1-url",
        label: "Item 1 - URL",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-2-text",
        label: "Item 2 - Texto",
        placeholder: "Ação 2",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-2-url",
        label: "Item 2 - URL",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-3-text",
        label: "Item 3 - Texto",
        placeholder: "Ação 3",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-3-url",
        label: "Item 3 - URL",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-4-text",
        label: "Item 4 - Texto",
        placeholder: "Ação Separada",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-4-url",
        label: "Item 4 - URL",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "select",
        name: "button-style",
        label: "Estilo do Botão",
        options: [
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
        name: "dropdown-direction",
        label: "Direção do Dropdown",
        options: [
          { value: "down", name: "Para Baixo" },
          { value: "up", name: "Para Cima" },
          { value: "end", name: "Para Direita" },
          { value: "start", name: "Para Esquerda" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "dropdown-size",
        label: "Tamanho do Menu",
        options: [
          { value: "default", name: "Padrão" },
          { value: "sm", name: "Pequeno" },
          { value: "lg", name: "Grande" },
          { value: "xl", name: "Extra Grande" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "dropdown-style",
        label: "Estilo do Menu",
        options: [
          { value: "default", name: "Padrão" },
          { value: "primary", name: "Primário (Azul)" },
          { value: "dark", name: "Escuro" },
        ],
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-divider",
        label: "Mostrar Divisor",
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
        name: "auto-close",
        label: "Fechar Automaticamente",
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
    class: "gjs-block-bootstrap-dropdown",
    title: "Arraste para adicionar dropdown Bootstrap",
  },
};

export { bootstrapDropdownCSS };
export default BootstrapDropdownBlock;
