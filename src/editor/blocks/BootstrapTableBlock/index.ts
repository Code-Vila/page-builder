import "./style.css";
import bootstrapTableHTML from "./element.html?raw";
import bootstrapTableCSS from "./style.css?raw";

export const BootstrapTableBlock = {
  id: "bootstrap-table",
  label: "Table",
  category: "Básico",
  media: `
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #7952b3, #6f42c1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">BS</div>
  `,
  content: {
    type: "custom-bootstrap-table",
    content: bootstrapTableHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "minha-tabela",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título da tabela",
        changeProp: 1,
      },
      {
        type: "text",
        name: "col-1-header",
        label: "Cabeçalho Coluna 1",
        placeholder: "#",
        changeProp: 1,
      },
      {
        type: "text",
        name: "col-2-header",
        label: "Cabeçalho Coluna 2",
        placeholder: "Nome",
        changeProp: 1,
      },
      {
        type: "text",
        name: "col-3-header",
        label: "Cabeçalho Coluna 3",
        placeholder: "Email",
        changeProp: 1,
      },
      {
        type: "text",
        name: "col-4-header",
        label: "Cabeçalho Coluna 4",
        placeholder: "Cargo",
        changeProp: 1,
      },
      {
        type: "text",
        name: "col-5-header",
        label: "Cabeçalho Coluna 5",
        placeholder: "Ações",
        changeProp: 1,
      },
      {
        type: "text",
        name: "row-1-col-2",
        label: "Linha 1 - Coluna 2",
        placeholder: "João Silva",
        changeProp: 1,
      },
      {
        type: "text",
        name: "row-1-col-3",
        label: "Linha 1 - Coluna 3",
        placeholder: "joao@email.com",
        changeProp: 1,
      },
      {
        type: "text",
        name: "row-1-col-4",
        label: "Linha 1 - Coluna 4",
        placeholder: "Desenvolvedor",
        changeProp: 1,
      },
      {
        type: "text",
        name: "row-2-col-2",
        label: "Linha 2 - Coluna 2",
        placeholder: "Maria Santos",
        changeProp: 1,
      },
      {
        type: "text",
        name: "row-2-col-3",
        label: "Linha 2 - Coluna 3",
        placeholder: "maria@email.com",
        changeProp: 1,
      },
      {
        type: "text",
        name: "row-2-col-4",
        label: "Linha 2 - Coluna 4",
        placeholder: "Designer",
        changeProp: 1,
      },
      {
        type: "select",
        name: "table-style",
        label: "Estilo da Tabela",
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
        name: "table-size",
        label: "Tamanho da Tabela",
        options: [
          { value: "default", name: "Padrão" },
          { value: "sm", name: "Pequeno" },
          { value: "lg", name: "Grande" },
        ],
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "striped",
        label: "Listras Alternadas",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "hover",
        label: "Efeito Hover",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "bordered",
        label: "Bordas",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "borderless",
        label: "Sem Bordas",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "responsive",
        label: "Responsiva",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-actions",
        label: "Mostrar Coluna de Ações",
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
    class: "gjs-block-bootstrap-table",
    title: "Arraste para adicionar tabela Bootstrap",
  },
};

export { bootstrapTableCSS };
export default BootstrapTableBlock;
