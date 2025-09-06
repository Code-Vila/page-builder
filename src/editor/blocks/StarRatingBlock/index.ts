import "./style.css";
import starRatingHTML from "./element.html?raw";
import starRatingCSS from "./style.css?raw";

export const StarRatingBlock = {
  id: "star-rating",
  label: "Star Rating",
  category: "Interativo",
  media: `
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; fill: #fbbf24;">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  `,
  content: starRatingHTML,
  attributes: {
    class: "gjs-block-star-rating",
    title: "Arraste para adicionar avaliação por estrelas",
  },
};

export const StarRatingComponent = (editor: any) => {
  editor.DomComponents.addType("star-rating", {
    isComponent: (el: HTMLElement) =>
      el.classList?.contains("star-rating-widget"),

    model: {
      defaults: {
        tagName: "div",
        classes: ["star-rating-widget"],
        attributes: { "data-rating": "4" },
        content: starRatingHTML,

        script: function () {
          const widget = this as unknown as HTMLElement;
          const stars = widget.querySelectorAll(".star");
          const ratingText = widget.querySelector(".rating-text");

          let currentRating = parseInt(
            widget.getAttribute("data-rating") || "4"
          );

          const updateRating = (rating: number) => {
            currentRating = rating;
            widget.setAttribute("data-rating", rating.toString());
            if (ratingText) {
              ratingText.textContent = `${rating} de 5 estrelas`;
            }
          };

          stars.forEach((star, index) => {
            star.addEventListener(
              "click",
              () => {
                updateRating(index + 1);
              },
              { passive: true }
            );

            star.addEventListener(
              "mouseenter",
              () => {
                stars.forEach((s, i) => {
                  s.classList.toggle("active", i <= index);
                });
              },
              { passive: true }
            );
          });

          widget.addEventListener(
            "mouseleave",
            () => {
              stars.forEach((s, i) => {
                s.classList.toggle("active", i < currentRating);
              });
            },
            { passive: true }
          );

          // Inicializar estado
          updateRating(currentRating);
        },
      },
    },
  });
};

export { starRatingCSS };
export default StarRatingBlock;
