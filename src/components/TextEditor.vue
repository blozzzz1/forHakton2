<template>
  <div class="text-editor">
    <quill-editor v-model="editorContent" :options="editorOptions" />
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    quillEditor
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorContent: this.modelValue,
      editorOptions: {
        theme: 'snow'
      }
    }
  },
  watch: {
    editorContent(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  }
}
</script>

<style scoped>
.text-editor {
  height: 300px;
}
</style>