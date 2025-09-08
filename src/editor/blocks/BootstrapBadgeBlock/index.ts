import "./style.css";
import bootstrapBadgeHTML from "./element.html?raw";
import bootstrapBadgeCSS from "./style.css?raw";

export const BootstrapBadgeBlock = {
  id: "bootstrap-badge",
  label: "Badge",
  category: "Básico",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7952b3, #6f42c1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">BS</div>
  `,
  content: {
    type: "custom-bootstrap-badge",
    content: bootstrapBadgeHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-badge",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título do badge",
        changeProp: 1,
      },
      {
        type: "text",
        name: "badge-text",
        label: "Texto do Badge",
        placeholder: "Novo",
        changeProp: 1,
      },
      {
        type: "select",
        name: "badge-color",
        label: "Cor do Badge",
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
        name: "badge-size",
        label: "Tamanho do Badge",
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
        name: "badge-style",
        label: "Estilo do Badge",
        options: [
          { value: "default", name: "Padrão" },
          { value: "pill", name: "Pill (Arredondado)" },
          { value: "outline", name: "Contorno" },
        ],
        changeProp: 1,
      },
      {
        type: "text",
        name: "badge-icon",
        label: "Ícone do Badge",
        placeholder: "✓",
        changeProp: 1,
      },
      {
        type: "text",
        name: "badge-url",
        label: "URL do Badge (opcional)",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-icon",
        label: "Mostrar Ícone",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "is-link",
        label: "Badge como Link",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "badge-pulse",
        label: "Animação Pulse",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "badge-bounce",
        label: "Animação Bounce",
        changeProp: 1,
      },
      {
        type: "select",
        name: "badge-position",
        label: "Posição do Badge",
        options: [
          { value: "default", name: "Padrão" },
          { value: "top-right", name: "Topo Direita" },
          { value: "top-left", name: "Topo Esquerda" },
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
    class: "gjs-block-bootstrap-badge",
    title: "Arraste para adicionar badges Bootstrap",
  },
};

export { bootstrapBadgeCSS };
export default BootstrapBadgeBlock;
