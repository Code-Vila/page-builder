<template>
  <div id="app">
    <Editor />
  </div>
</template>

<script setup lang="ts">
import Editor from "./components/Editor.vue";
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
}

#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
