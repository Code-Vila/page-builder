import "./style.css";
// Importar o HTML como string usando a sintaxe do Vite
import interactiveButtonHTML from "./element.html?raw";
// Importar o CSS como string para injeção no canvas
import interactiveButtonCSS from "./style.css?raw";

// Configuração do bloco
export const InteractiveButtonBlock = {
  id: "interactive-button",
  label: "Botão Interativo",
  category: "Interativo",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">B</div>
  `,
  content: {
    type: "interactive-button",
    content: interactiveButtonHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meu-botao",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título do botão",
        changeProp: 1,
      },
      {
        type: "text",
        name: "button-text",
        label: "Texto do Botão",
        placeholder: "Clique Aqui",
        changeProp: 1,
      },
      {
        type: "select",
        name: "button-style",
        label: "Estilo do Botão",
        options: [
          { value: "default", name: "Padrão (Azul)" },
          { value: "success", name: "Sucesso (Verde)" },
          { value: "danger", name: "Perigo (Vermelho)" },
          { value: "outline", name: "Contorno" },
          { value: "warning", name: "Aviso (Amarelo)" },
          { value: "info", name: "Info (Ciano)" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "button-size",
        label: "Tamanho do Botão",
        options: [
          { value: "small", name: "Pequeno" },
          { value: "medium", name: "Médio" },
          { value: "large", name: "Grande" },
          { value: "xlarge", name: "Extra Grande" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "button-type",
        label: "Tipo de Ação",
        options: [
          { value: "link", name: "Link" },
          { value: "submit", name: "Enviar Formulário" },
          { value: "custom", name: "JavaScript Personalizado" },
          { value: "scroll", name: "Rolar para Seção" },
          { value: "modal", name: "Abrir Modal" },
          { value: "copy", name: "Copiar Texto" },
        ],
        changeProp: 1,
      },
      {
        type: "text",
        name: "href",
        label: "URL (se tipo Link)",
        placeholder: "https://exemplo.com",
        changeProp: 1,
      },
      {
        type: "text",
        name: "scroll-target",
        label: "ID da Seção (se tipo Scroll)",
        placeholder: "#minha-secao",
        changeProp: 1,
      },
      {
        type: "text",
        name: "modal-target",
        label: "ID do Modal (se tipo Modal)",
        placeholder: "#meu-modal",
        changeProp: 1,
      },
      {
        type: "text",
        name: "copy-text",
        label: "Texto para Copiar (se tipo Copy)",
        placeholder: "Texto a ser copiado",
        changeProp: 1,
      },
      {
        type: "text",
        name: "onclick",
        label: "JavaScript Personalizado",
        placeholder: 'alert("Olá!")',
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "disabled",
        label: "Desabilitado",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "loading",
        label: "Estado de Carregamento",
        changeProp: 1,
      },
      {
        type: "text",
        name: "icon",
        label: "Ícone (Font Awesome)",
        placeholder: "fas fa-home",
        changeProp: 1,
      },
      {
        type: "select",
        name: "icon-position",
        label: "Posição do Ícone",
        options: [
          { value: "left", name: "Esquerda" },
          { value: "right", name: "Direita" },
          { value: "top", name: "Acima" },
          { value: "bottom", name: "Abaixo" },
        ],
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "custom-css",
        label: "CSS Personalizado",
        placeholder: ".minha-classe { color: red; }",
        changeProp: 1,
      },
      {
        type: "text",
        name: "data-custom",
        label: "Atributo Data",
        placeholder: "valor-personalizado",
        changeProp: 1,
      },
    ],
  },
  attributes: {
    class: "gjs-block-interactive-button",
    title: "Arraste para adicionar um botão interativo",
  },
};

// Exportar também o CSS para injeção no canvas
export { interactiveButtonCSS };

export default InteractiveButtonBlock;
