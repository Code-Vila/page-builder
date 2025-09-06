<template>
  <div class="editor-container bg-gray-900 text-gray-100">
    <!-- Barra de ferramentas superior reorganizada -->
    <div
      class="editor-toolbar bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 shadow-lg"
    >
      <div class="px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo/Título e Ações Principais -->
          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                  />
                </svg>
              </div>
              <h1 class="text-lg font-semibold text-white">Site Builder</h1>
            </div>

            <!-- Grupo: Ações de Arquivo -->
            <div class="flex items-center bg-gray-750 rounded-lg p-1 space-x-1">
              <button
                @click="savePage"
                :disabled="isSaving"
                :class="[
                  'px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all duration-200',
                  isSaving
                    ? 'bg-blue-500 text-white cursor-not-allowed'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600',
                ]"
                :title="isSaving ? 'Salvando...' : 'Salvar projeto (Ctrl+S)'"
              >
                <svg
                  v-if="isSaving"
                  class="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span class="hidden sm:inline">{{
                  isSaving ? "Salvando..." : "Salvar"
                }}</span>
              </button>

              <button
                @click="exportHTML"
                class="px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-600 transition-all duration-200"
                title="Exportar como HTML"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span class="hidden sm:inline">Exportar</span>
              </button>
            </div>

            <!-- Grupo: Visualização -->
            <div class="flex items-center bg-gray-750 rounded-lg p-1 space-x-1">
              <button
                @click="previewPage"
                class="px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-600 transition-all duration-200"
                title="Visualizar página"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span class="hidden sm:inline">Preview</span>
              </button>

              <button
                @click="togglePreviewMode"
                :class="[
                  'px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all duration-200',
                  previewMode
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600',
                ]"
                :title="
                  previewMode ? 'Voltar para edição' : 'Modo visualização'
                "
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.636 6.636M9.878 9.878a3 3 0 105.304-.943M20.5 20.5l-9.75-9.75"
                  />
                </svg>
                <span class="hidden sm:inline">{{
                  previewMode ? "Editar" : "Visualizar"
                }}</span>
              </button>
            </div>

            <!-- Grupo: Ferramentas de Desenvolvimento -->
            <div class="flex items-center bg-gray-750 rounded-lg p-1 space-x-1">
              <button
                @click="toggleCodeViewer"
                :class="[
                  'px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all duration-200',
                  showCodeViewer
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600',
                ]"
                title="Visualizar código fonte"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <span class="hidden sm:inline">Código</span>
              </button>

              <button
                @click="toggleRulers"
                :class="[
                  'px-3 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all duration-200',
                  rulersEnabled
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600',
                ]"
                title="Mostrar/ocultar réguas"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span class="hidden sm:inline">Réguas</span>
              </button>
            </div>
          </div>

          <!-- Controles de Dispositivo e Configurações -->
          <div class="flex items-center space-x-3">
            <!-- Seletor de Dispositivo -->
            <div class="flex items-center bg-gray-750 rounded-lg p-1 relative">
              <div
                :class="[
                  'absolute left-1 top-1 bottom-1 w-2 rounded-sm transition-all duration-200',
                  selectedDevice === 'Desktop'
                    ? 'bg-green-500'
                    : selectedDevice === 'Tablet'
                    ? 'bg-blue-500'
                    : 'bg-purple-500',
                ]"
              ></div>
              <select
                v-model="selectedDevice"
                @change="changeDevice"
                class="bg-transparent border-none text-white text-sm font-medium px-3 py-2 pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                title="Selecionar dispositivo"
              >
                <option value="Desktop" class="bg-gray-800">🖥️ Desktop</option>
                <option value="Tablet" class="bg-gray-800">📱 Tablet</option>
                <option value="Mobile" class="bg-gray-800">📱 Mobile</option>
              </select>
            </div>

            <!-- Divider -->
            <div class="w-px h-6 bg-gray-600"></div>

            <!-- Botão Tela Cheia -->
            <button
              @click="toggleFullscreen"
              class="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-600 transition-all duration-200"
              title="Alternar tela cheia"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>

            <!-- Menu de Configurações -->
            <div class="relative">
              <button
                @click="showSettingsMenu = !showSettingsMenu"
                class="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-600 transition-all duration-200"
                title="Configurações"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Área principal do editor -->
    <div class="editor-content flex-1 relative flex">
      <!-- Painel lateral esquerdo -->
      <div class="gjs-left-panel w-64 bg-gray-800 border-r border-gray-700">
        <!-- Abas dos painéis -->
        <div class="gjs-panel-tabs border-b border-gray-700">
          <div class="flex">
            <button
              class="gjs-tab-blocks flex-1 p-3 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-blue-500"
              data-tab="blocks"
              @click="switchLeftTab('blocks')"
            >
              Blocos
            </button>
            <button
              class="gjs-tab-layers flex-1 p-3 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent"
              data-tab="layers"
              @click="switchLeftTab('layers')"
            >
              Camadas
            </button>
          </div>
        </div>

        <!-- Conteúdo dos painéis -->
        <div class="gjs-panel-content h-full overflow-y-auto">
          <!-- Painel de blocos -->
          <div id="blocks-container" class="gjs-blocks-container p-3"></div>
          <!-- Painel de camadas -->
          <div
            id="layers-container"
            class="gjs-layers-container p-3"
            style="display: none"
          ></div>
        </div>
      </div>

      <!-- Área do canvas com régua -->
      <div
        class="gjs-canvas-container flex-1 relative flex items-center justify-center bg-gray-900"
      >
        <div id="gjs" class="h-full w-full"></div>

        <!-- Réguas de medida (posicionadas sobre o canvas) -->
        <div
          v-if="rulersEnabled"
          class="rulers-container absolute inset-0 pointer-events-none z-50"
        >
          <!-- Régua horizontal -->
          <div
            class="horizontal-ruler absolute top-0 left-8 right-0 h-8 bg-gray-800 bg-opacity-95 border-b-2 border-gray-500 shadow-lg"
          ></div>

          <!-- Régua vertical -->
          <div
            class="vertical-ruler absolute left-0 top-8 bottom-0 w-8 bg-gray-800 bg-opacity-95 border-r-2 border-gray-500 shadow-lg"
          ></div>

          <!-- Canto superior esquerdo -->
          <div
            class="absolute top-0 left-0 w-8 h-8 bg-gray-800 bg-opacity-95 border-r-2 border-b-2 border-gray-500 flex items-center justify-center shadow-lg z-50"
          >
            <span class="text-xs text-gray-300 font-medium">cm</span>
          </div>
        </div>
      </div>

      <!-- Painel lateral direito -->
      <div class="gjs-right-panel w-64 bg-gray-800 border-l border-gray-700">
        <!-- Abas do painel direito -->
        <div class="gjs-panel-tabs border-b border-gray-700">
          <div class="flex">
            <button
              class="gjs-tab-styles flex-1 p-3 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-blue-500"
              data-tab="styles"
              @click="switchRightTab('styles')"
            >
              🎨 Estilos
            </button>
            <button
              class="gjs-tab-traits flex-1 p-3 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent"
              data-tab="traits"
              @click="switchRightTab('traits')"
            >
              Props
            </button>
          </div>
        </div>

        <!-- Conteúdo dos painéis direitos -->
        <div class="gjs-panel-content h-full overflow-y-auto">
          <!-- Preview/Info do elemento selecionado -->
          <div class="p-4 border-b border-gray-700">
            <div v-if="selectedElementInfo" class="text-center">
              <div class="bg-gray-700 rounded-lg p-3 mb-3">
                <h4 class="text-white text-sm font-medium mb-2">
                  🎯 Elemento Selecionado
                </h4>
                <div class="text-blue-400 text-sm font-medium">
                  {{ selectedElementInfo.type }}
                </div>
                <div class="text-gray-400 text-xs mt-1">
                  {{ selectedElementInfo.classes || "Sem classes" }}
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-400">
              <svg
                class="mx-auto h-12 w-12 mb-3 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"
                />
              </svg>
              <p class="text-sm font-medium">Nenhum elemento selecionado</p>
              <p class="text-xs mt-1">
                Clique em um elemento no canvas para ver suas propriedades
              </p>
            </div>
          </div>

          <!-- Painel de estilos nativo -->
          <div
            id="styles-container"
            class="gjs-styles-container"
            style="display: block"
          ></div>

          <!-- Painel de traits -->
          <div
            id="traits-container"
            class="gjs-traits-container p-3"
            style="display: none"
          ></div>
        </div>
      </div>
    </div>

    <!-- Visualizador de código modal -->
    <div
      v-if="showCodeViewer"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 rounded-lg w-11/12 h-5/6 max-w-4xl flex flex-col">
        <div
          class="flex justify-between items-center p-4 border-b border-gray-700"
        >
          <h3 class="text-lg font-semibold text-white">Código Gerado</h3>
          <button
            @click="toggleCodeViewer"
            class="text-gray-400 hover:text-white"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-auto p-4">
          <div class="mb-4">
            <h4 class="text-white mb-2">HTML:</h4>
            <pre
              class="bg-gray-900 p-4 rounded overflow-x-auto text-sm text-green-400"
            ><code>{{ generatedHTML }}</code></pre>
          </div>

          <div class="mb-4">
            <h4 class="text-white mb-2">CSS:</h4>
            <pre
              class="bg-gray-900 p-4 rounded overflow-x-auto text-sm text-blue-400"
            ><code>{{ generatedCSS }}</code></pre>
          </div>

          <div>
            <h4 class="text-white mb-2">JavaScript:</h4>
            <pre
              class="bg-gray-900 p-4 rounded overflow-x-auto text-sm text-yellow-400"
            ><code>{{ generatedJS }}</code></pre>
          </div>
        </div>

        <div class="p-4 border-t border-gray-700 flex justify-end space-x-2">
          <button
            @click="copyCode('html')"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copiar HTML
          </button>
          <button
            @click="copyCode('css')"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copiar CSS
          </button>
          <button
            @click="copyCode('js')"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copiar JS
          </button>
          <button
            @click="downloadAllCode"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Baixar Tudo
          </button>
        </div>
      </div>
    </div>

    <!-- Notificações -->
    <div v-if="notification.show" class="fixed top-4 right-4 z-50 max-w-sm">
      <div
        :class="[
          'p-4 rounded-lg shadow-lg',
          notification.type === 'success'
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white',
        ]"
      >
        <div class="flex items-center space-x-2">
          <svg
            v-if="notification.type === 'success'"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ notification.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import type { Editor } from "grapesjs";

// Importar configuração do editor
import { setupGrapesEditor } from "../editor/index";

// Estado do componente
const editor = ref<Editor | null>(null);
const isSaving = ref(false);
const selectedDevice = ref("Desktop");
const showCodeViewer = ref(false);
const rulersEnabled = ref(false);
const previewMode = ref(false);
const showSettingsMenu = ref(false);
const selectedElementInfo = ref<{ type: string; classes: string } | null>(null);
const generatedHTML = ref("");
const generatedCSS = ref("");
const generatedJS = ref("");

// Sistema de notificações
const notification = reactive({
  show: false,
  type: "success" as "success" | "error",
  message: "",
});

// Configuração do editor
const editorConfig = {
  container: "#gjs",
  height: "100%",
  width: "100%",
  fromElement: true,
  avoidInlineStyle: false,
  storageManager: false,

  // Configuração dos blocos
  blockManager: {
    appendTo: "#blocks-container",
  },

  // Configuração do canvas
  canvas: {
    styles: [
      `
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: #1f2937;
        color: #f3f4f6;
      }
      .gjs-frame {
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      `,
    ],
  },

  // Configuração do gerenciador de estilo
  styleManager: {
    appendTo: "#styles-container",
    sectors: [
      {
        name: "Layout",
        open: false,
        properties: [
          "display",
          "position",
          "top",
          "right",
          "left",
          "bottom",
          "width",
          "height",
          "max-width",
          "min-height",
          "margin",
          "padding",
        ],
      },
      {
        name: "Tipografia",
        open: false,
        properties: [
          "font-family",
          "font-size",
          "font-weight",
          "letter-spacing",
          "color",
          "line-height",
          "text-shadow",
          "text-align",
        ],
      },
      {
        name: "Aparência",
        open: false,
        properties: [
          "background-color",
          "background-image",
          "border",
          "border-radius",
          "box-shadow",
          "opacity",
        ],
      },
    ],
  },

  // Configuração do gerenciador de camadas
  layerManager: {
    appendTo: "#layers-container",
  },

  // Configuração do gerenciador de seletores (classes CSS)
  selectorManager: {
    appendTo: "#styles-container",
  },

  // Configuração do gerenciador de traits
  traitManager: {
    appendTo: "#traits-container",
  },

  // Configuração do Device Manager
  deviceManager: {
    devices: [
      {
        name: "Desktop",
        width: "",
        id: "desktop-device",
      },
      {
        name: "Tablet",
        width: "768px",
        widthMedia: "1024px",
        id: "tablet-device",
      },
      {
        name: "Mobile",
        width: "375px",
        widthMedia: "767px",
        id: "mobile-device",
      },
    ],
  },

  // Habilitar réguas e guias
  canvasCss: `
    :root {
      --gjs-primary-color: #111827;
      --gjs-secondary-color: #374151;
      --gjs-tertiary-color: #4b5563;
    }
    .gjs-rulers {
      background-color: rgba(30, 41, 59, 0.8);
      border-color: #374151;
    }
    .gjs-ruler-h {
      top: 0;
      height: 25px;
      border-bottom: 1px solid #374151;
    }
    .gjs-ruler-v {
      left: 0;
      width: 25px;
      border-right: 1px solid #374151;
    }
    .gjs-one-bg, .gjs-primary-color {
      background-color: #111827 !important;
    }
  `,

  // Configurações para melhor experiência
  showOffsets: true,
  showDevices: false, // Desabilitar exibição automática de dispositivos

  // Desabilitar painéis automáticos
  panels: {
    defaults: [],
  },

  // Configurações adicionais para evitar painéis automáticos
  noticeOnUnload: false,
  clearOnRender: true,
};

// Novos métodos
const toggleRulers = () => {
  rulersEnabled.value = !rulersEnabled.value;
  // Por enquanto, apenas alterna o estado visual
  // A implementação completa dos rulers pode ser adicionada depois
  console.log(`Rulers ${rulersEnabled.value ? "ativadas" : "desativadas"}`);
};

const togglePreviewMode = () => {
  previewMode.value = !previewMode.value;
  // Por enquanto, apenas alterna o estado visual
  // A implementação completa do preview mode pode ser adicionada depois
};

const toggleCodeViewer = () => {
  showCodeViewer.value = !showCodeViewer.value;
  if (showCodeViewer.value && editor.value) {
    generatedHTML.value = editor.value.getHtml();
    generatedCSS.value = editor.value.getCss();
    generatedJS.value = editor.value.getJs();
  }
};

const copyCode = (type: string) => {
  let code = "";
  switch (type) {
    case "html":
      code = generatedHTML.value;
      break;
    case "css":
      code = generatedCSS.value;
      break;
    case "js":
      code = generatedJS.value;
      break;
  }

  navigator.clipboard.writeText(code).then(() => {
    showNotification(
      `${type.toUpperCase()} copiado para a área de transferência!`
    );
  });
};

const downloadAllCode = () => {
  const fullCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Gerada</title>
    <style>
        ${generatedCSS.value}
    </style>
</head>
<body>
    ${generatedHTML.value}
    <script>
        ${generatedJS.value}
    <\/script>
</body>
</html>`;

  const blob = new Blob([fullCode], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pagina-completa.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showNotification("Página completa baixada com sucesso!");
};

// Métodos existentes...
const showNotification = (
  message: string,
  type: "success" | "error" = "success"
) => {
  notification.message = message;
  notification.type = type;
  notification.show = true;

  setTimeout(() => {
    notification.show = false;
  }, 3000);
};

const savePage = async () => {
  if (!editor.value) return;

  isSaving.value = true;

  try {
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000));
    showNotification("Página salva com sucesso!", "success");
  } catch (error) {
    console.error("Erro ao salvar:", error);
    showNotification("Erro ao salvar a página", "error");
  } finally {
    isSaving.value = false;
  }
};

const exportHTML = () => {
  if (!editor.value) return;

  const html = editor.value.getHtml();
  const css = editor.value.getCss();
  const js = editor.value.getJs();

  const fullHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Gerada</title>
    <style>
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        ${css}
    </style>
</head>
<body>
    ${html}
    <script>
        ${js}
    <\/script>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pagina-export.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showNotification("HTML exportado com sucesso!", "success");
};

const previewPage = () => {
  if (!editor.value) return;

  const html = editor.value.getHtml();
  const css = editor.value.getCss();
  const js = editor.value.getJs();

  const fullHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview da Página</title>
    <style>
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        ${css}
    </style>
</head>
<body>
    ${html}
    <script>
        ${js}
    <\/script>
</body>
</html>`;

  const previewWindow = window.open("", "_blank");
  if (previewWindow) {
    previewWindow.document.write(fullHtml);
    previewWindow.document.close();
  }
};

const changeDevice = () => {
  if (!editor.value) return;

  console.log(`📱 Iniciando mudança para: ${selectedDevice.value}`);

  try {
    const editorInstance = editor.value as any;

    // Método 1: runCommand do GrapesJS
    if (editorInstance.runCommand) {
      editorInstance.runCommand("set-device", { name: selectedDevice.value });
      console.log("✅ Comando set-device executado");
    }

    // Método 2: Device Manager diretamente
    const deviceManager = editorInstance.DeviceManager;
    if (deviceManager) {
      const devices = deviceManager.getAll();
      const targetDevice = devices.find(
        (d: any) => d.get("name") === selectedDevice.value
      );

      if (targetDevice) {
        deviceManager.select(targetDevice);
        console.log("✅ Dispositivo selecionado via DeviceManager");
      } else {
        console.warn("⚠️ Dispositivo não encontrado:", selectedDevice.value);
      }
    }

    // Método 3: Atualizar manualmente canvas e frame
    forceCanvasUpdate();

    // Método 4: Refresh e triggers
    setTimeout(() => {
      if (editorInstance.refresh) {
        editorInstance.refresh();
      }

      if (editorInstance.trigger) {
        editorInstance.trigger("canvas:update");
        editorInstance.trigger("canvas:render");
      }

      console.log("✅ Refresh e atualizações executados");
    }, 150);

    showNotification(`Canvas alterado para ${selectedDevice.value}`, "success");
    console.log(`✅ Dispositivo ${selectedDevice.value} processado`);
  } catch (error) {
    console.error("❌ Erro ao alterar dispositivo:", error);
    showNotification(`Erro ao alterar para ${selectedDevice.value}`, "error");
  }
};

const forceCanvasUpdate = () => {
  try {
    console.log("🔧 Forçando atualização manual do canvas...");

    const canvas = document.querySelector(".gjs-cv-canvas") as HTMLElement;
    const frame = document.querySelector(".gjs-frame") as HTMLElement;

    if (canvas && frame) {
      // Atualizar classes e atributos
      canvas.setAttribute("data-device", selectedDevice.value);
      canvas.className = canvas.className.replace(/gjs-device-\w+/g, "");
      canvas.classList.add(`gjs-device-${selectedDevice.value.toLowerCase()}`);

      // Aplicar estilos diretamente no frame
      frame.style.transition = "all 0.3s ease-in-out";

      if (selectedDevice.value === "Desktop") {
        frame.style.maxWidth = "calc(100% - 40px)";
        frame.style.width = "calc(100% - 40px)";
        frame.style.borderColor = "#10b981";
        frame.style.boxShadow = "0 10px 25px rgba(16, 185, 129, 0.3)";
      } else if (selectedDevice.value === "Tablet") {
        frame.style.maxWidth = "768px";
        frame.style.width = "768px";
        frame.style.borderColor = "#3b82f6";
        frame.style.boxShadow = "0 10px 25px rgba(59, 130, 246, 0.3)";
      } else if (selectedDevice.value === "Mobile") {
        frame.style.maxWidth = "375px";
        frame.style.width = "375px";
        frame.style.borderColor = "#8b5cf6";
        frame.style.boxShadow = "0 10px 25px rgba(139, 92, 246, 0.3)";
      }

      frame.style.borderWidth = "3px";
      frame.style.borderStyle = "solid";

      console.log(
        `✅ Estilos aplicados manualmente para ${selectedDevice.value}`
      );
      console.log(`📏 Largura definida: ${frame.style.width}`);
    } else {
      console.warn("⚠️ Canvas ou frame não encontrados");
    }
  } catch (error) {
    console.error("❌ Erro na atualização manual:", error);
  }
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const switchLeftTab = (tab: string) => {
  const blocksContainer = document.getElementById("blocks-container");
  const layersContainer = document.getElementById("layers-container");
  const blocksTab = document.querySelector(".gjs-tab-blocks");
  const layersTab = document.querySelector(".gjs-tab-layers");

  if (blocksContainer && layersContainer && blocksTab && layersTab) {
    if (tab === "blocks") {
      blocksContainer.style.display = "block";
      layersContainer.style.display = "none";
      blocksTab.classList.add("border-blue-500", "text-white");
      blocksTab.classList.remove("border-transparent", "text-gray-300");
      layersTab.classList.remove("border-blue-500", "text-white");
      layersTab.classList.add("border-transparent", "text-gray-300");
    } else {
      blocksContainer.style.display = "none";
      layersContainer.style.display = "block";
      layersTab.classList.add("border-blue-500", "text-white");
      layersTab.classList.remove("border-transparent", "text-gray-300");
      blocksTab.classList.remove("border-blue-500", "text-white");
      blocksTab.classList.add("border-transparent", "text-gray-300");
    }
  }
};

const switchRightTab = (tab: string) => {
  const stylesContainer = document.getElementById("styles-container");
  const traitsContainer = document.getElementById("traits-container");
  const stylesTab = document.querySelector(".gjs-tab-styles");
  const traitsTab = document.querySelector(".gjs-tab-traits");

  if (stylesContainer && traitsContainer && stylesTab && traitsTab) {
    if (tab === "styles") {
      stylesContainer.style.display = "block";
      traitsContainer.style.display = "none";
      stylesTab.classList.add("border-blue-500", "text-white");
      stylesTab.classList.remove("border-transparent", "text-gray-300");
      traitsTab.classList.remove("border-blue-500", "text-white");
      traitsTab.classList.add("border-transparent", "text-gray-300");
    } else {
      stylesContainer.style.display = "none";
      traitsContainer.style.display = "block";
      traitsTab.classList.add("border-blue-500", "text-white");
      traitsTab.classList.remove("border-transparent", "text-gray-300");
      stylesTab.classList.remove("border-blue-500", "text-white");
      stylesTab.classList.add("border-transparent", "text-gray-300");
    }
  }
};

// Lifecycle
onMounted(() => {
  console.log("🚀 Inicializando GrapesJS Editor...");

  nextTick(() => {
    editor.value = grapesjs.init(editorConfig);

    // Configurar editor personalizado com blocos e componentes
    setupGrapesEditor(editor.value);

    // Debug dos dispositivos disponíveis
    setTimeout(() => {
      const deviceManager = (editor.value as any).DeviceManager;
      if (deviceManager) {
        console.log("🔧 Device Manager disponível:", deviceManager);
        const devices = deviceManager.getAll();
        console.log(
          "📱 Dispositivos disponíveis:",
          devices.map((d: any) => d.get("name"))
        );

        // Definir dispositivo inicial
        deviceManager.select("Desktop");
        console.log("🖥️ Dispositivo Desktop selecionado inicialmente");

        // Teste automático completo para debug
        setTimeout(() => {
          console.log("🧪 INICIANDO TESTE COMPLETO DE DISPOSITIVOS");

          // Teste 1: Tablet
          console.log("📱 Teste 1: Mudando para Tablet");
          selectedDevice.value = "Tablet";
          changeDevice();

          setTimeout(() => {
            const frame = document.querySelector(".gjs-frame") as HTMLElement;
            if (frame) {
              console.log(
                "📏 Largura do frame após Tablet:",
                frame.style.width
              );
              console.log(
                "🖼️ Largura computada:",
                getComputedStyle(frame).width
              );
            }

            // Teste 2: Mobile
            console.log("📱 Teste 2: Mudando para Mobile");
            selectedDevice.value = "Mobile";
            changeDevice();

            setTimeout(() => {
              if (frame) {
                console.log(
                  "📏 Largura do frame após Mobile:",
                  frame.style.width
                );
                console.log(
                  "🖼️ Largura computada:",
                  getComputedStyle(frame).width
                );
              }

              // Teste 3: Voltar para Desktop
              setTimeout(() => {
                console.log("📱 Teste 3: Voltando para Desktop");
                selectedDevice.value = "Desktop";
                changeDevice();

                setTimeout(() => {
                  if (frame) {
                    console.log(
                      "📏 Largura final do frame:",
                      frame.style.width
                    );
                    console.log("✅ Teste automático concluído");
                  }
                }, 1000);
              }, 2000);
            }, 2000);
          }, 2000);
        }, 5000);
      } else {
        console.error("❌ Device Manager não encontrado!");
      }
    }, 200);

    // Forçar remoção de painéis automáticos após inicialização
    setTimeout(() => {
      // Remover painéis automáticos do DOM
      const viewsPanel = document.querySelector(
        ".gjs-pn-panel.gjs-pn-views-container"
      );
      const devicesPanel = document.querySelector(
        ".gjs-pn-panel.gjs-pn-devices-c"
      );
      const commandsPanel = document.querySelector(".gjs-pn-commands");
      const optionsPanel = document.querySelector(".gjs-pn-options");

      if (viewsPanel) viewsPanel.remove();
      if (devicesPanel) devicesPanel.remove();
      if (commandsPanel) commandsPanel.remove();
      if (optionsPanel) optionsPanel.remove();

      // Remover painéis específicos do Style Manager e Selector Manager
      const smContainers = document.querySelectorAll(".gjs-sm-container");
      const clmContainers = document.querySelectorAll(".gjs-clm-container");

      smContainers.forEach((container) => container.remove());
      clmContainers.forEach((container) => container.remove());

      console.log("🧹 Painéis automáticos do GrapesJS removidos");
    }, 100);

    // Adicionar comandos personalizados
    editor.value.Commands.add("toggle-rulers", {
      run: () => {
        // Implementação futura para rulers
        console.log("Toggling rulers");
      },
    });

    // Configurar comandos para dispositivos
    editor.value.Commands.add("set-device-desktop", {
      run: () => {
        selectedDevice.value = "Desktop";
        const deviceManager = (editor.value as any).DeviceManager;
        deviceManager.select("Desktop");
        console.log("Setting desktop device");
      },
    });

    editor.value.Commands.add("set-device-tablet", {
      run: () => {
        selectedDevice.value = "Tablet";
        const deviceManager = (editor.value as any).DeviceManager;
        deviceManager.select("Tablet");
        console.log("Setting tablet device");
      },
    });

    editor.value.Commands.add("set-device-mobile", {
      run: () => {
        selectedDevice.value = "Mobile";
        const deviceManager = (editor.value as any).DeviceManager;
        deviceManager.select("Mobile");
        console.log("Setting mobile device");
      },
    });

    // Configurar eventos para as abas
    const blocksTab = document.querySelector(".gjs-tab-blocks");
    const layersTab = document.querySelector(".gjs-tab-layers");
    const stylesTab = document.querySelector(".gjs-tab-styles");
    const traitsTab = document.querySelector(".gjs-tab-traits");

    if (blocksTab && layersTab) {
      blocksTab.addEventListener("click", () => switchLeftTab("blocks"));
      layersTab.addEventListener("click", () => switchLeftTab("layers"));
    }

    if (stylesTab && traitsTab) {
      stylesTab.addEventListener("click", () => switchRightTab("styles"));
      traitsTab.addEventListener("click", () => switchRightTab("traits"));
    }

    // Configurar eventos para melhor debug
    editor.value.on("block:add", (block: any) => {
      console.log("Bloco adicionado:", block);
    });

    editor.value.on("component:add", (component: any) => {
      console.log("Componente adicionado:", component);
    });

    // Debug eventos de dispositivos
    editor.value.on("device:add", (device: any) => {
      console.log("🔧 Dispositivo adicionado:", device.get("name"));
    });

    editor.value.on("device:select", (device: any) => {
      console.log("📱 Dispositivo selecionado:", device.get("name"));
      const canvas = document.querySelector(".gjs-cv-canvas");
      if (canvas) {
        canvas.setAttribute("data-device", device.get("name"));
      }
    });

    editor.value.on("device:update", (device: any) => {
      console.log("🔄 Dispositivo atualizado:", device.get("name"));
    });

    // Controlar placeholder do Style Manager (removido)
    editor.value.on("component:selected", (component: any) => {
      // Capturar informações do elemento selecionado
      if (component) {
        selectedElementInfo.value = {
          type: component.get("tagName") || "div",
          classes: component.getClasses().join(" "),
        };
      }
    });

    editor.value.on("component:deselected", () => {
      // Limpar informações do elemento
      selectedElementInfo.value = null;
    });

    // Sincronizar estado do dispositivo quando alterado
    editor.value.on("device:select", (device: any) => {
      const deviceName = device.get("name");
      if (deviceName !== selectedDevice.value) {
        selectedDevice.value = deviceName;
        console.log(`Dispositivo sincronizado: ${deviceName}`);
      }
    });

    // Adicionar hotkeys
    document.addEventListener("keydown", (e) => {
      // Esc para fechar modais
      if (e.key === "Escape") {
        if (showCodeViewer.value) {
          toggleCodeViewer();
        }
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault();
            savePage();
            break;
          case "e":
            e.preventDefault();
            exportHTML();
            break;
          case "p":
            e.preventDefault();
            previewPage();
            break;
          case "/":
            e.preventDefault();
            toggleCodeViewer();
            break;
        }
      }
    });

    console.log("✅ Editor inicializado com sucesso!");
  });
});
</script>

<style scoped>
/* Estilos existentes... */

/* Estilos para as réguas */
.rulers-container {
  background: transparent;
}

.horizontal-ruler {
  background-color: rgba(31, 41, 59, 0.95);
  background-image: 
    /* Marcações principais a cada cm (37.795px ≈ 1cm) */ repeating-linear-gradient(
      90deg,
      transparent,
      transparent 55.795px,
      #f3f4f6 55.795px,
      #f3f4f6 39.795px
    ),
    /* Marcações médias a cada 5mm */
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 18.8975px,
        #d1d5db 18.8975px,
        #d1d5db 8.8975px
      ),
    /* Marcações pequenas a cada mm */
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 3.7795px,
        #9ca3af 3.7795px,
        #9ca3af 4.7795px
      );
  position: relative;
  backdrop-filter: blur(2px);
}

.horizontal-ruler::after {
  content: "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30";
  position: absolute;
  bottom: 2px;
  left: 8px;
  font-size: 11px;
  color: #f3f4f6;
  font-weight: 500;
  letter-spacing: 26px;
  white-space: nowrap;
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.vertical-ruler {
  background-color: rgba(31, 41, 59, 0.95);
  background-image: 
    /* Marcações principais a cada cm */ repeating-linear-gradient(
      0deg,
      transparent,
      transparent 37.795px,
      #f3f4f6 37.795px,
      #f3f4f6 39.795px
    ),
    /* Marcações médias a cada 5mm */
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 18.8975px,
        #d1d5db 18.8975px,
        #d1d5db 20.8975px
      ),
    /* Marcações pequenas a cada mm */
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3.7795px,
        #9ca3af 3.7795px,
        #9ca3af 4.7795px
      );
  position: relative;
  backdrop-filter: blur(2px);
}

.vertical-ruler::after {
  content: "0\\A 1\\A 2\\A 3\\A 4\\A 5\\A 6\\A 7\\A 8\\A 9\\A 10\\A 11\\A 12\\A 13\\A 14\\A 15\\A 16\\A 17\\A 18\\A 19\\A 20";
  position: absolute;
  right: 2px;
  top: 8px;
  font-size: 11px;
  color: #f3f4f6;
  font-weight: 500;
  line-height: 37.795px;
  white-space: pre;
  pointer-events: none;
  writing-mode: vertical-lr;
  text-orientation: mixed;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Estilos para o visualizador de código */
pre {
  font-family: "Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace;
  line-height: 1.5;
}

code {
  font-family: inherit;
}

.editor-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #111827;
}

.editor-content {
  flex: 1;
  overflow: hidden;
}

/* Estilização das abas */
.gjs-panel-tabs button {
  transition: all 0.2s ease;
}

.gjs-panel-tabs button:hover {
  background-color: #374151;
}

/* Melhorar o visual dos blocos */
:deep(.gjs-block) {
  background: #374151;
  border: 1px solid #4b5563;
  border-radius: 6px;
  margin: 4px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #f3f4f6;
}

:deep(.gjs-block:hover) {
  background: #3b82f6;
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

:deep(.gjs-block-category) {
  color: #f3f4f6;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 8px;
  padding: 0 8px;
  border-bottom: 1px solid #4b5563;
}

/* Sobrescrever estilos do GrapesJS para tema escuro */
:deep(.gjs-pn-panel) {
  background: #1f2937 !important;
  border-color: #374151 !important;
}

:deep(.gjs-pn-btn) {
  color: #f3f4f6 !important;
}

:deep(.gjs-pn-btn:hover) {
  background: #374151 !important;
}

:deep(.gjs-cv-canvas) {
  background: #111827 !important;
}

/* Forçar o canvas a ocupar toda a área disponível */
:deep(.gjs-editor-cont) {
  height: 100% !important;
  width: 100% !important;
  display: flex !important;
  flex-direction: column !important;
}

:deep(.gjs-cv-canvas) {
  width: 100% !important;
  height: 100% !important;
  flex: 1 !important;
  margin: 0 !important;
  padding: 0 !important;
  background: #111827 !important;
}

:deep(.gjs-cv-canvas-c) {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  background: #111827 !important;
}

:deep(.gjs-frame-wrapper) {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  background: #1f2937 !important;
}

:deep(.gjs-frame) {
  border: 2px solid #374151 !important;
  border-radius: 12px !important;
  background: white !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
  max-width: calc(100% - 40px) !important;
  width: calc(100% - 40px) !important;
  height: calc(100% - 40px) !important;
  min-height: 500px !important;
  margin-top: 0px !important;
  transition: all 0.3s ease-in-out !important;
}

/* Remover qualquer margem ou padding extra do GrapesJS */
:deep(#gjs) {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  background: #111827 !important;
  display: flex !important;
  flex-direction: column !important;
}

:deep(#gjs > *) {
  flex: 1 !important;
  height: 100% !important;
}

/* Sobrescrever a cor primária do GrapesJS para o tema do projeto */
:deep(.gjs-one-bg) {
  background-color: #1f2937 !important; /* Usar a cor de fundo do projeto */
}

/* Outras cores primárias do GrapesJS que podem aparecer */
:deep(.gjs-primary-color) {
  background-color: #111827 !important;
}

:deep([style*="background-color: var(--gjs-primary-color)"]) {
  background-color: #111827 !important;
}

/* Remover espaçamentos extras que podem causar a barra cinza */
:deep(.gjs-cv-canvas__frames) {
  margin: 0 !important;
  padding: 0 !important;
  background: #111827 !important;
}

:deep(.gjs-cv-canvas__frame) {
  margin: 0 !important;
  padding: 0 !important;
  background: #111827 !important;
}

/* Forçar elementos específicos do canvas a ocupar toda altura */
:deep(.gjs-cv-canvas.gjs-no-touch-actions.gjs-cv-canvas-bg) {
  height: 100% !important;
  width: 100% !important;
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  background: #111827 !important;
}

:deep(.gjs-sm-sector) {
  border-color: #374151 !important;
}

:deep(.gjs-sm-label) {
  color: #f3f4f6 !important;
}

:deep(.gjs-sm-property) {
  border-color: #374151 !important;
}

:deep(.gjs-sm-input) {
  background: #374151 !important;
  border-color: #4b5563 !important;
  color: #f3f4f6 !important;
}

:deep(.gjs-layer) {
  color: #f3f4f6 !important;
  border-color: #374151 !important;
}

:deep(.gjs-layer:hover) {
  background: #374151 !important;
}

/* Estilos customizados para a nova toolbar */
.bg-gray-750 {
  background-color: #374151;
}

.editor-toolbar {
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(55, 65, 81, 0.5);
}

.editor-toolbar button {
  position: relative;
  overflow: hidden;
}

.editor-toolbar button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s;
}

.editor-toolbar button:hover::before {
  left: 100%;
}

/* Indicadores de estado ativo */
.editor-toolbar button[class*="bg-blue-600"],
.editor-toolbar button[class*="bg-green-600"],
.editor-toolbar button[class*="bg-purple-600"] {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

/* Animações suaves */
.editor-toolbar button,
.editor-toolbar select {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.editor-toolbar button:active {
  transform: translateY(0);
}

/* Melhorias no select */
.editor-toolbar select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .editor-toolbar .hidden {
    display: none !important;
  }

  .editor-toolbar .space-x-6 {
    gap: 1rem;
  }

  .editor-toolbar .space-x-3 {
    gap: 0.5rem;
  }
}

/* Melhorar aparência do Style Manager nativo */
:deep(.gjs-sm-container) {
  background: #1f2937 !important;
}

:deep(.gjs-sm-sector) {
  border-color: #374151 !important;
  background: #1f2937 !important;
}

:deep(.gjs-sm-sector .gjs-sm-title) {
  background: #374151 !important;
  color: #f3f4f6 !important;
  border-color: #4b5563 !important;
  padding: 12px 16px !important;
  font-weight: 600 !important;
}

:deep(.gjs-sm-properties) {
  background: #1f2937 !important;
  padding: 8px !important;
}

:deep(.gjs-sm-property) {
  border-color: #374151 !important;
  padding: 8px 12px !important;
  background: #1f2937 !important;
}

:deep(.gjs-sm-property:hover) {
  background: #374151 !important;
}

:deep(.gjs-sm-label) {
  color: #f3f4f6 !important;
  font-weight: 500 !important;
}

:deep(.gjs-sm-input) {
  background: #374151 !important;
  border: 1px solid #4b5563 !important;
  color: #f3f4f6 !important;
  border-radius: 4px !important;
  padding: 6px 8px !important;
}

:deep(.gjs-sm-input:focus) {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3) !important;
}

:deep(.gjs-sm-btn) {
  background: #374151 !important;
  border: 1px solid #4b5563 !important;
  color: #f3f4f6 !important;
  border-radius: 4px !important;
  padding: 6px 12px !important;
}

:deep(.gjs-sm-btn:hover) {
  background: #3b82f6 !important;
  border-color: #2563eb !important;
}

:deep(.gjs-sm-color-picker) {
  background: #374151 !important;
  border: 1px solid #4b5563 !important;
}

:deep(.gjs-sm-select) {
  background: #374151 !important;
  border: 1px solid #4b5563 !important;
  color: #f3f4f6 !important;
  border-radius: 4px !important;
}

/* Estilos para o Selector Manager (Classes CSS) */
:deep(.gjs-clm-container) {
  background: #1f2937 !important;
  border-bottom: 1px solid #374151 !important;
  margin-bottom: 16px !important;
}

:deep(.gjs-clm-header) {
  background: #374151 !important;
  border-bottom: 1px solid #4b5563 !important;
  padding: 12px 16px !important;
}

:deep(.gjs-clm-header-label) {
  color: #f3f4f6 !important;
  font-weight: 600 !important;
  font-size: 14px !important;
}

:deep(.gjs-clm-tags) {
  background: #1f2937 !important;
  padding: 12px 16px !important;
}

:deep(.gjs-clm-tag) {
  background: #4b5563 !important;
  border: 1px solid #6b7280 !important;
  border-radius: 4px !important;
  margin: 2px !important;
  color: #f3f4f6 !important;
  padding: 4px 8px !important;
  font-size: 12px !important;
}

:deep(.gjs-clm-tag:hover) {
  background: #3b82f6 !important;
  border-color: #2563eb !important;
}

:deep(.gjs-clm-tag.gjs-clm-tag--selected) {
  background: #059669 !important;
  border-color: #047857 !important;
}

:deep(.gjs-clm-tags-btn) {
  background: #059669 !important;
  border: 1px solid #047857 !important;
  border-radius: 4px !important;
  color: white !important;
  padding: 4px 8px !important;
  margin: 2px !important;
  font-size: 12px !important;
}

:deep(.gjs-clm-tags-btn:hover) {
  background: #047857 !important;
}

/* Melhorias para mudança de dispositivos */
:deep(.gjs-cv-canvas) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

:deep(.gjs-frame-wrapper) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Estilos específicos para dispositivos - Mais visuais */
:deep(.gjs-device-desktop .gjs-frame),
:deep(.gjs-cv-canvas[data-device="Desktop"] .gjs-frame) {
  max-width: calc(100% - 40px) !important;
  width: calc(100% - 40px) !important;
  border-color: #10b981 !important;
  border-width: 3px !important;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3) !important;
}

:deep(.gjs-device-tablet .gjs-frame),
:deep(.gjs-cv-canvas[data-device="Tablet"] .gjs-frame) {
  max-width: 768px !important;
  width: 768px !important;
  border-color: #3b82f6 !important;
  border-width: 3px !important;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3) !important;
}

:deep(.gjs-device-mobile .gjs-frame),
:deep(.gjs-cv-canvas[data-device="Mobile"] .gjs-frame) {
  max-width: 375px !important;
  width: 375px !important;
  border-color: #8b5cf6 !important;
  border-width: 3px !important;
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3) !important;
}

/* Estilos para o container do canvas */
:deep(.gjs-cv-canvas) {
  transition: all 0.3s ease-in-out !important;
}

:deep(.gjs-frame) {
  margin: 0 auto !important;
  transition: all 0.3s ease-in-out !important;
  border-style: solid !important;
  border-radius: 8px !important;
}

/* Estilos para destacar quando está em modo tablet/mobile */
:deep(.gjs-cv-canvas[data-device="Tablet"]) {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1),
    rgba(59, 130, 246, 0.05)
  ) !important;
}

:deep(.gjs-cv-canvas[data-device="Mobile"]) {
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1),
    rgba(139, 92, 246, 0.05)
  ) !important;
}

/* Indicador visual do dispositivo ativo */
:deep(.gjs-cv-canvas[data-device="Desktop"]) {
  background: radial-gradient(
    circle at center,
    rgba(16, 185, 129, 0.05) 0%,
    #111827 70%
  ) !important;
}

:deep(.gjs-cv-canvas[data-device="Tablet"]) {
  background: radial-gradient(
    circle at center,
    rgba(59, 130, 246, 0.05) 0%,
    #111827 70%
  ) !important;
}

:deep(.gjs-cv-canvas[data-device="Mobile"]) {
  background: radial-gradient(
    circle at center,
    rgba(139, 92, 246, 0.05) 0%,
    #111827 70%
  ) !important;
}

/* Melhorar seletor de dispositivos */
.editor-toolbar select {
  border: 1px solid transparent !important;
  transition: all 0.2s ease !important;
}

.editor-toolbar select:focus {
  transform: scale(1.02) !important;
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3) !important;
}

.editor-toolbar select option {
  transition: all 0.2s ease !important;
  padding: 8px 12px !important;
}

.editor-toolbar select option:hover {
  background-color: #374151 !important;
}
</style>
