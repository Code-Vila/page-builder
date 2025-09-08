import "./style.css";
import bootstrapCardHTML from "./element.html?raw";
import bootstrapCardCSS from "./style.css?raw";

export const BootstrapCardBlock = {
  id: "bootstrap-card",
  label: "Card",
  category: "Básico",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7952b3, #6f42c1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">BS</div>
  `,
  content: {
    type: "custom-bootstrap-card",
    content: bootstrapCardHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-card",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título do card",
        changeProp: 1,
      },
      {
        type: "text",
        name: "card-title",
        label: "Título do Card",
        placeholder: "Título do Card",
        changeProp: 1,
      },
      {
        type: "text",
        name: "card-subtitle",
        label: "Subtítulo do Card",
        placeholder: "Subtítulo do Card",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "card-text",
        label: "Texto do Card",
        placeholder: "Este é um exemplo de card Bootstrap...",
        changeProp: 1,
      },
      {
        type: "text",
        name: "card-footer",
        label: "Rodapé do Card",
        placeholder: "Rodapé do card - 2 dias atrás",
        changeProp: 1,
      },
      {
        type: "text",
        name: "primary-button-text",
        label: "Texto Botão Principal",
        placeholder: "Ação Principal",
        changeProp: 1,
      },
      {
        type: "text",
        name: "primary-button-url",
        label: "URL Botão Principal",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "text",
        name: "secondary-button-text",
        label: "Texto Botão Secundário",
        placeholder: "Ação Secundária",
        changeProp: 1,
      },
      {
        type: "text",
        name: "secondary-button-url",
        label: "URL Botão Secundário",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "select",
        name: "card-style",
        label: "Estilo do Card",
        options: [
          { value: "default", name: "Padrão" },
          { value: "outline", name: "Contorno" },
          { value: "elevated", name: "Elevado" },
          { value: "flat", name: "Plano" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "card-color",
        label: "Cor do Card",
        options: [
          { value: "default", name: "Padrão" },
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
        name: "card-size",
        label: "Tamanho do Card",
        options: [
          { value: "default", name: "Padrão" },
          { value: "sm", name: "Pequeno" },
          { value: "lg", name: "Grande" },
        ],
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-header",
        label: "Mostrar Cabeçalho",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-footer",
        label: "Mostrar Rodapé",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-buttons",
        label: "Mostrar Botões",
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
    class: "gjs-block-bootstrap-card",
    title: "Arraste para adicionar um card Bootstrap",
  },
};

export { bootstrapCardCSS };
export default BootstrapCardBlock;
