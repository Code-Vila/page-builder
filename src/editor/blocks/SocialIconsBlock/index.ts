import "./style.css";
import socialIconsHTML from "./element.html?raw";
import socialIconsCSS from "./style.css?raw";

export const SocialIconsBlock = {
  id: "social-icons",
  label: "Social Icons",
  category: "Básico",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #3b82f6;">
      <circle cx="6" cy="6" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="18" cy="6" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="18" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M9 6h6M9 18h6M6 9v6M18 9v6" stroke="currentColor" stroke-width="1"/>
    </svg>
  `,
  content: socialIconsHTML,
  attributes: {
    class: "gjs-block-social-icons",
    title: "Arraste para adicionar ícones de redes sociais",
  },
};

export const SocialIconsComponent = (editor: any) => {
  editor.DomComponents.addType("social-icons", {
    isComponent: (el: HTMLElement) =>
      el.classList?.contains("social-icons-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["social-icons-widget"],
        content: socialIconsHTML,
        traits: [
          {
            type: 'text',
            name: 'facebook-url',
            label: 'URL do Facebook',
            placeholder: 'https://facebook.com/suapagina',
            changeProp: 1,
          },
          {
            type: 'text',
            name: 'twitter-url',
            label: 'URL do Twitter',
            placeholder: 'https://twitter.com/seuusuario',
            changeProp: 1,
          },
          {
            type: 'text',
            name: 'instagram-url',
            label: 'URL do Instagram',
            placeholder: 'https://instagram.com/seuusuario',
            changeProp: 1,
          },
          {
            type: 'text',
            name: 'linkedin-url',
            label: 'URL do LinkedIn',
            placeholder: 'https://linkedin.com/in/seuusuario',
            changeProp: 1,
          },
          {
            type: 'text',
            name: 'youtube-url',
            label: 'URL do YouTube',
            placeholder: 'https://youtube.com/c/seucanal',
            changeProp: 1,
          }
        ],

        script: function () {
          const widget = this as unknown as HTMLElement;
          const socialIcons = widget.querySelectorAll(".social-icon");

          socialIcons.forEach((icon) => {
            icon.addEventListener("click", (e) => {
              e.preventDefault();

              // Adicionar efeito de clique
              (icon as HTMLElement).style.transform = "scale(0.95)";
              setTimeout(() => {
                (icon as HTMLElement).style.transform = "";
              }, 150);

              // Você pode personalizar as ações aqui
              const href = icon.getAttribute("href");
              if (href && href !== "#") {
                window.open(href, "_blank");
              }
            });
          });
        },
      },
    },
  });
};

export { socialIconsCSS };
export default SocialIconsBlock;
