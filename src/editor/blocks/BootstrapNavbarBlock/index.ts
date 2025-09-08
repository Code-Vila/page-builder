import "./style.css";
import bootstrapNavbarHTML from "./element.html?raw";
import bootstrapNavbarCSS from "./style.css?raw";

export const BootstrapNavbarBlock = {
  id: "bootstrap-navbar",
  label: "Navbar",
  category: "Básico",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7952b3, #6f42c1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">BS</div>
  `,
  content: {
    type: "custom-bootstrap-navbar",
    content: bootstrapNavbarHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "minha-navbar",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título da navbar",
        changeProp: 1,
      },
      {
        type: "text",
        name: "brand-text",
        label: "Texto da Marca",
        placeholder: "Meu Site",
        changeProp: 1,
      },
      {
        type: "text",
        name: "brand-url",
        label: "URL da Marca",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "text",
        name: "nav-item-1",
        label: "Item de Navegação 1",
        placeholder: "Início",
        changeProp: 1,
      },
      {
        type: "text",
        name: "nav-url-1",
        label: "URL Item 1",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "text",
        name: "nav-item-2",
        label: "Item de Navegação 2",
        placeholder: "Sobre",
        changeProp: 1,
      },
      {
        type: "text",
        name: "nav-url-2",
        label: "URL Item 2",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "text",
        name: "nav-item-3",
        label: "Item de Navegação 3",
        placeholder: "Serviços",
        changeProp: 1,
      },
      {
        type: "text",
        name: "nav-url-3",
        label: "URL Item 3",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "text",
        name: "nav-item-4",
        label: "Item de Navegação 4",
        placeholder: "Contato",
        changeProp: 1,
      },
      {
        type: "text",
        name: "nav-url-4",
        label: "URL Item 4",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "text",
        name: "search-placeholder",
        label: "Placeholder da Busca",
        placeholder: "Pesquisar...",
        changeProp: 1,
      },
      {
        type: "text",
        name: "search-button-text",
        label: "Texto do Botão de Busca",
        placeholder: "Pesquisar",
        changeProp: 1,
      },
      {
        type: "select",
        name: "navbar-style",
        label: "Estilo da Navbar",
        options: [
          { value: "light", name: "Claro" },
          { value: "dark", name: "Escuro" },
          { value: "primary", name: "Primário (Azul)" },
          { value: "success", name: "Sucesso (Verde)" },
          { value: "danger", name: "Perigo (Vermelho)" },
          { value: "warning", name: "Aviso (Amarelo)" },
          { value: "info", name: "Info (Ciano)" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "navbar-position",
        label: "Posição da Navbar",
        options: [
          { value: "static", name: "Estática" },
          { value: "fixed", name: "Fixa" },
          { value: "sticky", name: "Sticky" },
          { value: "transparent", name: "Transparente" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "navbar-size",
        label: "Tamanho da Navbar",
        options: [
          { value: "default", name: "Padrão" },
          { value: "sm", name: "Pequeno" },
          { value: "lg", name: "Grande" },
        ],
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-search",
        label: "Mostrar Campo de Busca",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-toggler",
        label: "Mostrar Botão Toggler (Mobile)",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "expand-lg",
        label: "Expandir em Telas Grandes",
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
    class: "gjs-block-bootstrap-navbar",
    title: "Arraste para adicionar uma navbar Bootstrap",
  },
};

export { bootstrapNavbarCSS };
export default BootstrapNavbarBlock;
