# 📄 Guia de Instalação do Mammoth.js (Opcional)

## 🎯 **Status Atual:**

O sistema de conversão de documentos está funcionando com **conversão básica** para arquivos TXT. Para suporte completo a DOC/DOCX, você pode instalar o pacote `mammoth.js`.

## 🚀 **Instalação do Mammoth.js:**

### **1. Instalar o Pacote:**
```bash
cd projetos/page-builder
npm install mammoth
```

### **2. Ativar Conversão Avançada:**
Após a instalação, o sistema automaticamente detectará o mammoth.js e ativará a conversão avançada para DOC/DOCX.

## 🔧 **Funcionalidades por Tipo de Arquivo:**

### **✅ Sem Mammoth.js (Atual):**
- **TXT**: Conversão completa com formatação
- **DOC/DOCX**: Template básico com mensagem informativa

### **✅ Com Mammoth.js (Após instalação):**
- **TXT**: Conversão completa com formatação
- **DOC**: Conversão completa com formatação preservada
- **DOCX**: Conversão completa com formatação preservada
- **Imagens**: Convertidas para base64
- **Tabelas**: Estrutura preservada
- **Títulos**: Hierarquia mantida

## 🎨 **Recursos do Mammoth.js:**

### **Formatação Preservada:**
- ✅ Títulos (H1, H2, H3, etc.)
- ✅ Parágrafos com formatação
- ✅ Listas numeradas e com marcadores
- ✅ Tabelas com estrutura
- ✅ Imagens embutidas
- ✅ Links e referências

### **Metadados Extraídos:**
- ✅ Título do documento
- ✅ Autor (se disponível)
- ✅ Data de criação
- ✅ Estrutura completa

## 🔄 **Como Funciona:**

### **Detecção Automática:**
```typescript
// O sistema detecta automaticamente se mammoth está disponível
if (this.mammoth) {
  return this.convertWithMammoth(file); // Conversão avançada
} else {
  return this.convertWithBasicMethod(file); // Conversão básica
}
```

### **Fallback Inteligente:**
- Se mammoth não estiver disponível → usa conversão básica
- Se mammoth estiver disponível → usa conversão avançada
- Sempre funciona, independente da instalação

## 📋 **Exemplo de Uso:**

### **Antes da Instalação:**
```
Arquivo: documento.docx
Resultado: Template básico com mensagem informativa
```

### **Após a Instalação:**
```
Arquivo: documento.docx
Resultado: Template completo com formatação preservada
```

## 🎯 **Recomendação:**

### **Para Uso Básico:**
- ✅ Sistema atual é suficiente
- ✅ Funciona com arquivos TXT
- ✅ Cria templates editáveis

### **Para Uso Avançado:**
- ✅ Instale mammoth.js
- ✅ Suporte completo a DOC/DOCX
- ✅ Preservação de formatação
- ✅ Melhor experiência do usuário

## 🚀 **Instalação Rápida:**

```bash
# No diretório do projeto
npm install mammoth

# Reiniciar o servidor de desenvolvimento
npm run dev
```

---

**💡 Dica: O sistema funciona perfeitamente sem mammoth.js, mas com ele você terá uma experiência muito melhor para documentos DOC/DOCX!**
