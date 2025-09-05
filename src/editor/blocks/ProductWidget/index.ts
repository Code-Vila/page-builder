import "./style.css";
// Importar o HTML como string usando a sintaxe do Vite
import productHTML from "./element.html?raw";
// Importar o CSS como string para injeção no canvas
import productCSS from "./style.css?raw";

/**
 * Widget de produtos dinâmico
 * Integra um componente Vue completo dentro do GrapesJS
 */
const ProductWidget = (editor: any) => {
  console.log("ProductWidget sendo registrado...");

  const componentType = "product-widget";
  const blockId = "product-widget";

  // Registrar o tipo de componente no GrapesJS
  editor.DomComponents.addType(componentType, {
    model: {
      defaults: {
        tagName: "div",
        classes: ["product-widget-container"],
        content: productHTML,
        traits: [
          {
            type: "text",
            name: "title",
            label: "Título do Widget",
            value: "Produtos em Destaque",
          },
          {
            type: "number",
            name: "productCount",
            label: "Quantidade de Produtos",
            min: 1,
            max: 12,
            value: 3,
          },
        ],
      },
    },
  });

  // Registrar o bloco na barra lateral
  editor.BlockManager.add(blockId, {
    label: "🛍️ Widget de Produtos",
    category: "Widgets",
    content: {
      type: componentType,
    },
    attributes: { class: "gjs-block-product-widget" },
  });
};

// Exportar o CSS para injeção no canvas
export { productCSS };

export default ProductWidget;
