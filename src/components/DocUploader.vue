<template>
  <div class="doc-uploader">
    <div
      class="upload-area"
      :class="{ dragover: isDragOver, uploading: isUploading }"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept=".doc,.docx,.txt"
        @change="handleFileSelect"
        style="display: none"
      />

      <div v-if="!isUploading" class="upload-content">
        <div class="upload-icon">📄</div>
        <h3>Converter Documento para Template</h3>
        <p>Arraste um arquivo DOC/DOCX aqui ou clique para selecionar</p>
        <div class="supported-formats">
          <span class="format-tag">DOC</span>
          <span class="format-tag">DOCX</span>
          <span class="format-tag">TXT</span>
        </div>
      </div>

      <div v-else class="uploading-content">
        <div class="loading-spinner"></div>
        <p>Convertendo documento...</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Modal de Resultado da Conversão -->
    <div
      v-if="conversionResult"
      class="modal-overlay"
      @click="closeConversionModal"
    >
      <div class="modal-content conversion-modal" @click.stop>
        <div class="modal-header">
          <h3>✅ Documento Convertido com Sucesso!</h3>
          <button @click="closeConversionModal" class="close-btn">×</button>
        </div>

        <div class="modal-body">
          <div class="result-info">
            <div class="info-item">
              <strong>Título:</strong> {{ conversionResult.metadata.title }}
            </div>
            <div class="info-item">
              <strong>Estrutura:</strong>
              {{ conversionResult.structure.paragraphs }} parágrafos,
              {{ conversionResult.structure.headings.length }} títulos,
              {{ conversionResult.structure.images }} imagens,
              {{ conversionResult.structure.tables }} tabelas
            </div>
          </div>

          <div class="preview-section">
            <h4>Preview do Template:</h4>
            <div class="preview-container">
              <div
                v-html="conversionResult.html"
                class="preview-content document-template"
                ref="previewElement"
              ></div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="closeConversionModal" class="btn-secondary">
            Cancelar
          </button>
          <button @click="addToCanvasDirectly" class="btn-primary">
            🎨 Adicionar ao Canvas
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Configuração do Template -->
    <div
      v-if="showTemplateModal"
      class="modal-overlay"
      @click="closeTemplateModal"
    >
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Configurar Template</h3>
          <button @click="closeTemplateModal" class="close-btn">×</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Nome do Template:</label>
            <input
              v-model="templateName"
              type="text"
              placeholder="Ex: Documento Oficial"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>Descrição:</label>
            <textarea
              v-model="templateDescription"
              placeholder="Descrição do template..."
              class="form-textarea"
            ></textarea>
          </div>

          <div class="form-group">
            <label>Categoria:</label>
            <select v-model="templateCategory" class="form-select">
              <option value="Templates">Templates</option>
              <option value="Documentos">Documentos</option>
              <option value="Relatórios">Relatórios</option>
              <option value="Certificados">Certificados</option>
            </select>
          </div>

          <div class="form-group">
            <label class="flex items-center space-x-2">
              <input
                v-model="addToCanvas"
                type="checkbox"
                class="form-checkbox"
              />
              <span>Adicionar diretamente ao canvas</span>
            </label>
            <p class="text-sm text-gray-500 mt-1">
              Se marcado, o template será adicionado ao canvas automaticamente
            </p>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="closeTemplateModal" class="btn-secondary">
            Cancelar
          </button>
          <button @click="confirmCreateTemplate" class="btn-primary">
            🎨 Criar Template
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  advancedDocConverter,
  type DocConversionResult,
} from "../editor/utils/docConverter";

// Refs
const fileInput = ref<HTMLInputElement>();
const previewElement = ref<HTMLDivElement>();
const isDragOver = ref(false);
const isUploading = ref(false);
const progress = ref(0);
const conversionResult = ref<DocConversionResult | null>(null);
const showTemplateModal = ref(false);
const templateName = ref("");
const templateDescription = ref("");
const templateCategory = ref("Templates");
const addToCanvas = ref(true);

// Props
const props = defineProps<{
  onTemplateCreated?: (template: any) => void;
}>();

// Emits
const emit = defineEmits<{
  templateCreated: [template: any];
}>();

// Métodos
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    processFile(file);
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;

  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    processFile(files[0]);
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = true;
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const processFile = async (file: File) => {
  if (!isValidFile(file)) {
    alert("Formato de arquivo não suportado. Use DOC, DOCX ou TXT.");
    return;
  }

  isUploading.value = true;
  progress.value = 0;

  try {
    // Simular progresso
    const progressInterval = setInterval(() => {
      if (progress.value < 90) {
        progress.value += 10;
      }
    }, 200);

    const result = await advancedDocConverter.convertDocToHtml(file);

    clearInterval(progressInterval);
    progress.value = 100;

    setTimeout(() => {
      conversionResult.value = result;
      templateName.value = result.metadata.title;
      isUploading.value = false;
      progress.value = 0;
    }, 500);
  } catch (error) {
    console.error("Erro na conversão:", error);
    alert("Erro ao converter o documento. Tente novamente.");
    isUploading.value = false;
    progress.value = 0;
  }
};

const isValidFile = (file: File): boolean => {
  const validTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  const validExtensions = [".doc", ".docx", ".txt"];
  const fileExtension = file.name
    .toLowerCase()
    .substring(file.name.lastIndexOf("."));

  return (
    validTypes.includes(file.type) || validExtensions.includes(fileExtension)
  );
};

const closeConversionModal = () => {
  conversionResult.value = null;
  resetUploader();
};

const closeTemplateModal = () => {
  showTemplateModal.value = false;
};

const addToCanvasDirectly = () => {
  if (!conversionResult.value) return;

  // Criar um template simples para usar a abordagem de blocos
  const template = {
    id: `converted-${Date.now()}`,
    label: conversionResult.value.metadata.title,
    content: conversionResult.value.html,
    css: conversionResult.value.css,
  };

  // Emitir evento com addToCanvas = true
  (template as any).addToCanvas = true;

  emit("templateCreated", template);

  // Fechar modal
  closeConversionModal();
};

const confirmCreateTemplate = () => {
  console.log("🔧 confirmCreateTemplate chamado!");
  console.log("conversionResult:", conversionResult.value);
  console.log("templateName:", templateName.value);

  if (!conversionResult.value || !templateName.value.trim()) {
    alert("Nome do template é obrigatório");
    return;
  }

  const template = advancedDocConverter.createGrapesJSTemplate(
    conversionResult.value,
    templateName.value.trim()
  );

  // Adicionar metadados extras
  (template as any).description = templateDescription.value;
  (template as any).category = {
    id: templateCategory.value,
    label: templateCategory.value,
    open: true,
    attributes: {},
  };
  (template as any).addToCanvas = addToCanvas.value;

  // Emitir evento
  console.log("Emitindo evento templateCreated:", template);
  emit("templateCreated", template);

  // Callback opcional
  if (props.onTemplateCreated) {
    console.log("Chamando callback onTemplateCreated:", template);
    props.onTemplateCreated(template);
  }

  // Reset após um pequeno delay para garantir que o evento seja processado
  setTimeout(() => {
    closeTemplateModal();
    resetUploader();
  }, 100);
};

const resetUploader = () => {
  conversionResult.value = null;
  templateName.value = "";
  templateDescription.value = "";
  templateCategory.value = "Templates";
  addToCanvas.value = true;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

// Watcher para injetar CSS quando o resultado da conversão mudar
watch(
  conversionResult,
  (newResult) => {
    if (newResult && newResult.css && previewElement.value) {
      // Remover CSS anterior se existir
      const existingStyle = previewElement.value.querySelector(
        "style[data-doc-css]"
      );
      if (existingStyle) {
        existingStyle.remove();
      }

      // Criar novo elemento style
      const styleElement = document.createElement("style");
      styleElement.setAttribute("data-doc-css", "true");
      styleElement.textContent = newResult.css;

      // Inserir o CSS no preview
      previewElement.value.appendChild(styleElement);
    }
  },
  { immediate: true }
);

onMounted(() => {
  // Inicializar conversor
  advancedDocConverter.initialize();
});
</script>

<style scoped>
.doc-uploader {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.upload-area {
  border: 2px dashed #3498db;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.upload-area:hover {
  border-color: #2980b9;
  background: #e3f2fd;
}

.upload-area.dragover {
  border-color: #27ae60;
  background: #e8f5e8;
  transform: scale(1.02);
}

.upload-area.uploading {
  border-color: #f39c12;
  background: #fef9e7;
  cursor: not-allowed;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.upload-content h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 24px;
}

.upload-content p {
  margin: 0;
  color: #7f8c8d;
  font-size: 16px;
}

.supported-formats {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.format-tag {
  background: #3498db;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.uploading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.progress-bar {
  width: 200px;
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #3498db;
  transition: width 0.3s ease;
}

.conversion-modal {
  max-width: 700px;
  max-height: 90vh;
}

.conversion-result {
  margin-top: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ecf0f1;
}

.result-header h3 {
  margin: 0;
  color: #27ae60;
}

.create-template-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.create-template-btn:hover {
  background: #2980b9;
}

.result-info {
  margin-bottom: 20px;
}

.info-item {
  margin: 8px 0;
  color: #2c3e50;
}

.preview-section h4 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.preview-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ecf0f1;
  border-radius: 6px;
  padding: 15px;
  background: #f8f9fa;
}

.preview-content {
  font-family: "Times New Roman", serif;
  line-height: 1.6;
  color: #2c3e50;
}

.preview-content h1,
.preview-content h2,
.preview-content h3 {
  color: #2c3e50;
  margin: 15px 0 10px 0;
}

.preview-content p {
  margin: 10px 0;
  text-align: justify;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ecf0f1;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #e74c3c;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #2c3e50;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #3498db;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-checkbox {
  width: 16px;
  height: 16px;
  accent-color: #3498db;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #ecf0f1;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.btn-primary {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.btn-primary:hover {
  background: #2980b9;
}
</style>
