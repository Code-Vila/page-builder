import "./style.css";
import bootstrapFormHTML from "./element.html?raw";
import bootstrapFormCSS from "./style.css?raw";

export const BootstrapFormBlock = {
  id: "bootstrap-form",
  label: "Formulário",
  category: "Básico",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7952b3, #6f42c1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">BS</div>
  `,
  content: {
    type: "custom-bootstrap-form",
    content: bootstrapFormHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-formulario",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título do formulário",
        changeProp: 1,
      },
      {
        type: "text",
        name: "form-title",
        label: "Título do Formulário",
        placeholder: "Entre em Contato",
        changeProp: 1,
      },
      {
        type: "text",
        name: "name-label",
        label: "Label Nome",
        placeholder: "Nome Completo",
        changeProp: 1,
      },
      {
        type: "text",
        name: "name-placeholder",
        label: "Placeholder Nome",
        placeholder: "Digite seu nome completo",
        changeProp: 1,
      },
      {
        type: "text",
        name: "email-label",
        label: "Label Email",
        placeholder: "Email",
        changeProp: 1,
      },
      {
        type: "text",
        name: "email-placeholder",
        label: "Placeholder Email",
        placeholder: "seu@email.com",
        changeProp: 1,
      },
      {
        type: "text",
        name: "phone-label",
        label: "Label Telefone",
        placeholder: "Telefone",
        changeProp: 1,
      },
      {
        type: "text",
        name: "phone-placeholder",
        label: "Placeholder Telefone",
        placeholder: "(11) 99999-9999",
        changeProp: 1,
      },
      {
        type: "text",
        name: "subject-label",
        label: "Label Assunto",
        placeholder: "Assunto",
        changeProp: 1,
      },
      {
        type: "text",
        name: "message-label",
        label: "Label Mensagem",
        placeholder: "Mensagem",
        changeProp: 1,
      },
      {
        type: "text",
        name: "message-placeholder",
        label: "Placeholder Mensagem",
        placeholder: "Digite sua mensagem aqui...",
        changeProp: 1,
      },
      {
        type: "text",
        name: "agree-text",
        label: "Texto do Checkbox",
        placeholder: "Concordo com os termos e condições",
        changeProp: 1,
      },
      {
        type: "text",
        name: "submit-text",
        label: "Texto do Botão Enviar",
        placeholder: "Enviar Mensagem",
        changeProp: 1,
      },
      {
        type: "text",
        name: "cancel-text",
        label: "Texto do Botão Cancelar",
        placeholder: "Cancelar",
        changeProp: 1,
      },
      {
        type: "select",
        name: "form-style",
        label: "Estilo do Formulário",
        options: [
          { value: "default", name: "Padrão" },
          { value: "horizontal", name: "Horizontal" },
          { value: "inline", name: "Inline" },
          { value: "floating", name: "Floating Labels" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "form-size",
        label: "Tamanho do Formulário",
        options: [
          { value: "default", name: "Padrão" },
          { value: "sm", name: "Pequeno" },
          { value: "lg", name: "Grande" },
        ],
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-phone",
        label: "Mostrar Campo Telefone",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-subject",
        label: "Mostrar Campo Assunto",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-agree",
        label: "Mostrar Checkbox de Concordância",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-cancel",
        label: "Mostrar Botão Cancelar",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "enable-validation",
        label: "Habilitar Validação",
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
    class: "gjs-block-bootstrap-form",
    title: "Arraste para adicionar um formulário Bootstrap",
  },
};

export { bootstrapFormCSS };
export default BootstrapFormBlock;
