import "./style.css";
import testimonialHTML from "./element.html?raw";
import testimonialCSS from "./style.css?raw";

export const TestimonialBlock = {
  id: "testimonial",
  label: "Testimonial",
  category: "Básico",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
    </svg>
  `,
  content: {
    type: "custom-testimonial",
    content: testimonialHTML,
    traits: [
      {
        type: "text",
        name: "id",
        label: "ID",
        placeholder: "meus-depoimentos",
        changeProp: 1,
      },
      {
        type: "text",
        name: "title",
        label: "Título",
        placeholder: "Título dos depoimentos",
        changeProp: 1,
      },
      {
        type: "text",
        name: "testimonial-title",
        label: "Título da Seção",
        placeholder: "O que nossos clientes dizem",
        changeProp: 1,
      },
      {
        type: "text",
        name: "testimonial-subtitle",
        label: "Subtítulo da Seção",
        placeholder: "Depoimentos reais de pessoas que confiam em nossos serviços",
        changeProp: 1,
      },
      {
        type: "select",
        name: "testimonial-layout",
        label: "Layout dos Depoimentos",
        options: [
          { value: "grid", name: "Grid (3 colunas)" },
          { value: "carousel", name: "Carrossel" },
          { value: "list", name: "Lista Vertical" },
          { value: "single", name: "Depoimento Único" },
        ],
        changeProp: 1,
      },
      {
        type: "select",
        name: "testimonial-style",
        label: "Estilo dos Depoimentos",
        options: [
          { value: "default", name: "Padrão" },
          { value: "card", name: "Estilo Card" },
          { value: "minimal", name: "Minimalista" },
          { value: "quote", name: "Estilo Citação" },
        ],
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-ratings",
        label: "Mostrar Avaliações (Estrelas)",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-avatars",
        label: "Mostrar Avatares",
        changeProp: 1,
      },
      {
        type: "checkbox",
        name: "show-quotes",
        label: "Mostrar Ícones de Citação",
        changeProp: 1,
      },
      {
        type: "text",
        name: "author-1-name",
        label: "Nome do Autor 1",
        placeholder: "Maria Silva",
        changeProp: 1,
      },
      {
        type: "text",
        name: "author-1-role",
        label: "Cargo do Autor 1",
        placeholder: "CEO, TechCorp",
        changeProp: 1,
      },
      {
        type: "text",
        name: "author-1-avatar",
        label: "Avatar do Autor 1",
        placeholder: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
        changeProp: 1,
      },
      {
        type: "textarea",
        name: "testimonial-1-text",
        label: "Texto do Depoimento 1",
        placeholder: "Excelente serviço! A equipe foi muito profissional...",
        changeProp: 1,
      },
      {
        type: "number",
        name: "testimonial-1-rating",
        label: "Avaliação do Depoimento 1 (1-5)",
        placeholder: "5",
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
    class: "gjs-block-testimonial",
    title: "Arraste para adicionar depoimentos",
  },
};

export const TestimonialComponent = (editor: any) => {
  editor.DomComponents.addType("testimonial", {
    isComponent: (el: HTMLElement) =>
      el.classList?.contains("testimonial-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["testimonial-widget"],
        content: testimonialHTML,
      },
    },
  });
};

export { testimonialCSS };
export default TestimonialBlock;
