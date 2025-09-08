import "./style.css";
import bootstrapModalHTML from "./element.html?raw";
import bootstrapModalCSS from "./style.css?raw";

export const BootstrapModalBlock = {
  id: "bootstrap-modal",
  label: "Modal",
  category: "Básico",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7952b3, #6f42c1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">BS</div>
  `,
  content: {
    type: "custom-bootstrap-modal",
    content: bootstrapModalHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-modal",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título do modal",
        changeProp: 1,
      },
      {
        type: "text",
        name: "modal-title",
        label: "Título do Modal",
        placeholder: "Título do Modal",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "modal-content",
        label: "Conteúdo do Modal",
        placeholder: "Este é o conteúdo do modal Bootstrap...",
        changeProp: 1,
      },
      {
        type: "text",
        name: "button-text",
        label: "Texto do Botão",
        placeholder: "Abrir Modal",
        changeProp: 1,
      },
      {
        type: "text",
        name: "close-button-text",
        label: "Texto do Botão Fechar",
        placeholder: "Fechar",
        changeProp: 1,
      },
      {
        type: "text",
        name: "save-button-text",
        label: "Texto do Botão Salvar",
        placeholder: "Salvar Alterações",
        changeProp: 1,
      },
      {
        type: "select",
        name: "modal-size",
        label: "Tamanho do Modal",
        options: [
          { value: "default", name: "Padrão" },
          { value: "sm", name: "Pequeno" },
          { value: "lg", name: "Grande" },
          { value: "xl", name: "Extra Grande" },
          { value: "fullscreen", name: "Tela Cheia" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "modal-style",
        label: "Estilo do Modal",
        options: [
          { value: "default", name: "Padrão" },
          { value: "centered", name: "Centralizado" },
          { value: "scrollable", name: "Com Scroll" },
        ],
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
        name: "show-close-button",
        label: "Mostrar Botão Fechar (X)",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-save-button",
        label: "Mostrar Botão Salvar",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "backdrop",
        label: "Backdrop (Fundo Escuro)",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "keyboard",
        label: "Fechar com ESC",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "focus",
        label: "Foco Automático",
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
    class: "gjs-block-bootstrap-modal",
    title: "Arraste para adicionar um modal Bootstrap",
  },
};

export { bootstrapModalCSS };
export default BootstrapModalBlock;
