import "./style.css";
import bootstrapAlertHTML from "./element.html?raw";
import bootstrapAlertCSS from "./style.css?raw";

export const BootstrapAlertBlock = {
  id: "bootstrap-alert",
  label: "Alert",
  category: "Básico",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7952b3, #6f42c1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">BS</div>
  `,
  content: {
    type: "custom-bootstrap-alert",
    content: bootstrapAlertHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-alert",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título do alert",
        changeProp: 1,
      },
      {
        type: "text",
        name: "alert-title",
        label: "Título do Alert",
        placeholder: "Informação!",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "alert-message",
        label: "Mensagem do Alert",
        placeholder: "Esta é uma mensagem de alerta Bootstrap...",
        changeProp: 1,
      },
      {
        type: "select",
        name: "alert-type",
        label: "Tipo do Alert",
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
        name: "alert-style",
        label: "Estilo do Alert",
        options: [
          { value: "default", name: "Padrão" },
          { value: "outline", name: "Contorno" },
          { value: "solid", name: "Sólido" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "alert-size",
        label: "Tamanho do Alert",
        options: [
          { value: "default", name: "Padrão" },
          { value: "sm", name: "Pequeno" },
          { value: "lg", name: "Grande" },
        ],
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "dismissible",
        label: "Permitir Fechar",
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
        name: "fade-animation",
        label: "Animação de Fade",
        changeProp: 1,
      },
      {
        type: "text",
        name: "alert-duration",
        label: "Duração (ms) - Auto Fechar",
        placeholder: "5000",
        changeProp: 1,
      },
      {
        type: "select",
        name: "alert-position",
        label: "Posição do Alert",
        options: [
          { value: "static", name: "Estático" },
          { value: "fixed-top", name: "Fixo no Topo" },
          { value: "fixed-bottom", name: "Fixo na Base" },
          { value: "sticky-top", name: "Sticky no Topo" },
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
    class: "gjs-block-bootstrap-alert",
    title: "Arraste para adicionar um alert Bootstrap",
  },
};

export { bootstrapAlertCSS };
export default BootstrapAlertBlock;
