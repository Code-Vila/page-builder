# 📄 Guia: Converter DOC para Template

## 🎯 **Funcionalidade Implementada:**

Sistema completo para converter documentos DOC/DOCX/TXT em templates editáveis do GrapesJS.

## 🚀 **Como Usar:**

### **1. Upload de Documento:**
- ✅ **Drag & Drop** de arquivos DOC/DOCX/TXT
- ✅ **Seleção manual** de arquivos
- ✅ **Suporte** a múltiplos formatos
- ✅ **Validação** automática de formato

### **2. Conversão Automática:**
- ✅ **Mammoth.js** para DOC/DOCX (quando disponível)
- ✅ **Conversão básica** para TXT
- ✅ **Preservação** de formatação
- ✅ **Extração** de metadados

### **3. Criação de Template:**
- ✅ **Preview** do resultado
- ✅ **Configuração** de nome e categoria
- ✅ **Integração** com GrapesJS
- ✅ **CSS otimizado** para edição

## 🛠️ **Implementação:**

### **1. DocConverter (`docConverter.ts`):**
```typescript
// Converter documento para HTML
const result = await docConverter.convertDocToHtml(file);

// Criar template GrapesJS
const template = docConverter.createGrapesJSTemplate(result, 'Meu Template');
```

### **2. DocUploader (`DocUploader.vue`):**
```vue
<template>
  <DocUploader @template-created="handleTemplateCreated" />
</template>
```

### **3. TemplateManager (`templateManager.ts`):**
```typescript
// Gerenciar templates
const manager = getTemplateManager(editor);
await manager.addDocumentTemplate(file, {
  name: 'Documento Oficial',
  category: 'Documentos'
});
```

## 📋 **Formatos Suportados:**

### **✅ Suporte Completo:**
- **DOC** - Microsoft Word 97-2003
- **DOCX** - Microsoft Word 2007+
- **TXT** - Texto simples

### **🔧 Conversão com Mammoth.js:**
- Preserva formatação
- Converte imagens para base64
- Mantém estrutura de títulos
- Suporte a tabelas

### **📝 Conversão Básica:**
- Texto simples para HTML
- Detecção automática de títulos
- Formatação básica
- Estrutura limpa

## 🎨 **Recursos do Template Gerado:**

### **1. HTML Otimizado:**
- Classes editáveis do GrapesJS
- Estrutura semântica
- Elementos clicáveis
- Compatibilidade total

### **2. CSS Responsivo:**
- Design profissional
- Tipografia otimizada
- Cores consistentes
- Sombras e bordas

### **3. Metadados:**
- Título do documento
- Data de criação
- Estrutura analisada
- Estatísticas de conteúdo

## 🔧 **Configuração:**

### **1. Instalar Dependências:**
```bash
npm install mammoth
```

### **2. Integrar no Editor:**
```typescript
// No Editor.vue
import DocUploader from './components/DocUploader.vue';
import { getTemplateManager } from './editor/utils/templateManager';

// Inicializar gerenciador
const templateManager = getTemplateManager(editor.value);
```

### **3. Usar o Uploader:**
```vue
<template>
  <div class="template-upload-section">
    <h3>Converter Documento para Template</h3>
    <DocUploader @template-created="onTemplateCreated" />
  </div>
</template>

<script setup>
const onTemplateCreated = (template) => {
  console.log('Template criado:', template);
  // Template já está registrado no GrapesJS
};
</script>
```

## 📊 **Estrutura do Template:**

### **Metadados Extraídos:**
```typescript
{
  title: "Nome do Documento",
  author: "Autor (se disponível)",
  created: Date,
  pages: number,
  structure: {
    headings: Array<{level, text, id}>,
    paragraphs: number,
    images: number,
    tables: number
  }
}
```

### **HTML Gerado:**
```html
<div class="gjs-document-template">
  <h1 class="gjs-heading">Título Principal</h1>
  <h2 class="gjs-heading">Subtítulo</h2>
  <p class="gjs-text">Parágrafo editável...</p>
  <img class="gjs-image" src="data:image/..." alt="Imagem">
  <table class="gjs-table">...</table>
</div>
```

## 🎯 **Casos de Uso:**

### **1. Documentos Oficiais:**
- Certificados
- Contratos
- Relatórios
- Propostas

### **2. Templates Reutilizáveis:**
- Cartas
- Memorandos
- Ata de reuniões
- Documentação

### **3. Conversão em Massa:**
- Biblioteca de templates
- Padronização de documentos
- Migração de conteúdo

## 🚀 **Próximos Passos:**

1. **Teste** o upload de um documento DOC
2. **Configure** o nome e categoria do template
3. **Use** o template no editor GrapesJS
4. **Edite** o conteúdo conforme necessário

---

**🎉 Agora você pode converter qualquer documento DOC em um template editável!**
