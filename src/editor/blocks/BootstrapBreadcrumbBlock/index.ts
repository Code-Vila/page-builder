import "./style.css";
import bootstrapBreadcrumbHTML from "./element.html?raw";
import bootstrapBreadcrumbCSS from "./style.css?raw";

export const BootstrapBreadcrumbBlock = {
  id: "bootstrap-breadcrumb",
  label: "Breadcrumb",
  category: "Básico",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7952b3, #6f42c1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">BS</div>
  `,
  content: {
    type: "custom-bootstrap-breadcrumb",
    content: bootstrapBreadcrumbHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-breadcrumb",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título do breadcrumb",
        changeProp: 1,
      },
      {
        type: "text",
        name: "item-1-text",
        label: "Item 1 - Texto",
        placeholder: "Início",
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
        placeholder: "Categoria",
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
        label: "Item 3 - Texto (Ativo)",
        placeholder: "Página Atual",
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
        type: "select",
        name: "breadcrumb-style",
        label: "Estilo do Breadcrumb",
        options: [
          { value: "default", name: "Padrão" },
          { value: "light", name: "Claro" },
          { value: "dark", name: "Escuro" },
          { value: "primary", name: "Primário (Azul)" },
          { value: "success", name: "Sucesso (Verde)" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "breadcrumb-size",
        label: "Tamanho do Breadcrumb",
        options: [
          { value: "default", name: "Padrão" },
          { value: "sm", name: "Pequeno" },
          { value: "lg", name: "Grande" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "breadcrumb-separator",
        label: "Separador",
        options: [
          { value: "default", name: "Barra (/) " },
          { value: "arrow", name: "Seta (→)" },
          { value: "dot", name: "Ponto (•)" },
          { value: "pipe", name: "Pipe (|)" },
          { value: "chevron", name: "Chevron (›)" },
        ],
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
        name: "responsive",
        label: "Responsivo (Mobile)",
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
    class: "gjs-block-bootstrap-breadcrumb",
    title: "Arraste para adicionar breadcrumb Bootstrap",
  },
};

export { bootstrapBreadcrumbCSS };
export default BootstrapBreadcrumbBlock;
