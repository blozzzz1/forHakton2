<template>
  <div id="app">
    <div class="toolbar">
      <h1>Text and HTML Editor</h1>
    </div>
    <div class="container">
      <div class="text-container">
        <TextEditor v-model="textContent" />
      </div>
      <div class="html-container">
        <pre>{{ textContent }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import TextEditor from './components/TextEditor.vue'

export default {
  name: 'App',
  components: {
    TextEditor
  },
  data() {
    return {
      textContent: ''
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.toolbar {
  background-color: #42b983;
  color: white;
  padding: 10px;
}

.container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.text-container, .html-container {
  width: 45%;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>