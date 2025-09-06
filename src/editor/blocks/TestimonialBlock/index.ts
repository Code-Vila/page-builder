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
  content: testimonialHTML,
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
