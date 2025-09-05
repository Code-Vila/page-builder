// Importar todos os blocos
import SectionBlock, { sectionCSS } from "./SectionBlock";
import TextBlock, { textCSS } from "./TextBlock";
import ImageBlock, { imageCSS } from "./ImageBlock";
import ButtonBlock, { buttonCSS } from "./ButtonBlock";
import CounterBlock, { counterCSS, CounterComponent } from "./CounterBlock";
// Importar blocos complexos
import ProductWidget, { productCSS } from "./ProductWidget";
import { RichTextBlock, richTextCSS } from "./RichTextBlock";
import AdvancedTextBlock from "./AdvancedTextBlock";
import advancedTextCSS from "./AdvancedTextBlock/style.css?raw";

/**
 * Configuração e registro de todos os blocos no editor GrapesJS
 * @param editor - Instância do editor GrapesJS
 */
export const setupBlocks = (editor: any) => {
  console.log("🧱 Registrando blocos personalizados...");

  // Registrar SectionBlock
  try {
    editor.BlockManager.add(SectionBlock.id, SectionBlock);
    console.log("✅ SectionBlock registrado");
  } catch (error) {
    console.error("❌ Erro ao registrar SectionBlock:", error);
  }

  // Registrar TextBlock
  try {
    editor.BlockManager.add(TextBlock.id, TextBlock);
    console.log("✅ TextBlock registrado");
  } catch (error) {
    console.error("❌ Erro ao registrar TextBlock:", error);
  }

  // Registrar ImageBlock
  try {
    editor.BlockManager.add(ImageBlock.id, ImageBlock);
    console.log("✅ ImageBlock registrado");
  } catch (error) {
    console.error("❌ Erro ao registrar ImageBlock:", error);
  }

  // Registrar ButtonBlock
  try {
    editor.BlockManager.add(ButtonBlock.id, ButtonBlock);
    console.log("✅ ButtonBlock registrado");
  } catch (error) {
    console.error("❌ Erro ao registrar ButtonBlock:", error);
  }

  // Registrar CounterBlock
  try {
    editor.BlockManager.add(CounterBlock.id, CounterBlock);
    console.log("✅ CounterBlock registrado");
  } catch (error) {
    console.error("❌ Erro ao registrar CounterBlock:", error);
  }

  // Registrar CounterComponent (funcionalidade JavaScript)
  try {
    CounterComponent(editor);
    console.log("✅ CounterComponent registrado");
  } catch (error) {
    console.error("❌ Erro ao registrar CounterComponent:", error);
  }

  // Registrar blocos complexos (eles se registram internamente)
  try {
    ProductWidget(editor);
    console.log("✅ ProductWidget registrado");
  } catch (error) {
    console.error("❌ Erro ao registrar ProductWidget:", error);
  }

  try {
    RichTextBlock(editor);
    console.log("✅ RichTextBlock registrado");
  } catch (error) {
    console.error("❌ Erro ao registrar RichTextBlock:", error);
  }

  try {
    AdvancedTextBlock(editor);
    console.log("✅ AdvancedTextBlock registrado");
  } catch (error) {
    console.error("❌ Erro ao registrar AdvancedTextBlock:", error);
  }

  console.log("🎉 Todos os blocos foram registrados com sucesso!");
};

// Coletar todos os CSS dos blocos para injeção no canvas
export const getAllBlocksCSS = () => {
  return [
    sectionCSS,
    textCSS,
    imageCSS,
    buttonCSS,
    counterCSS,
    productCSS,
    richTextCSS,
    advancedTextCSS,
  ].join("\n\n");
};

// Coleção de todos os blocos para referência
export const allBlocks = [
  SectionBlock,
  TextBlock,
  ImageBlock,
  ButtonBlock,
  CounterBlock,
  ProductWidget,
  RichTextBlock,
  AdvancedTextBlock,
];

// Categorias para organização
export const blockCategories = {
  Layout: [SectionBlock],
  Básico: [TextBlock, ImageBlock, ButtonBlock],
  Interativo: [CounterBlock],
  Widgets: [ProductWidget],
  Texto: [RichTextBlock, AdvancedTextBlock],
};

// Exportar individualmente para casos específicos
export {
  SectionBlock,
  TextBlock,
  ImageBlock,
  ButtonBlock,
  CounterBlock,
  RichTextBlock,
  AdvancedTextBlock,
  ProductWidget,
};

// Exportar função principal como padrão
export default setupBlocks;
