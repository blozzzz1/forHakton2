<template>
  <div>
    <div class="editor-buttons">
      <button :class="{ active: isBold }" @click="execCmd('bold')">Полужирный</button>
      <button :class="{ active: isItalic }" @click="execCmd('italic')">Курсив</button>
      <button :class="{ active: isUnderline }" @click="execCmd('underline')">Подчеркнутый</button>
      <button :class="{ active: isStrikeThrough }" @click="execCmd('strikeThrough')">Зачеркнутый</button>
      <input type="color" v-model="foreColor" @input="execCmd('foreColor', foreColor)" title="Цвет текста">
      <input type="color" v-model="backColor" @input="execCmd('backColor', backColor)" title="Цвет фона">
      <button :class="{ active: isJustifyLeft }" @click="execCmd('justifyLeft')">По левому краю</button>
      <button :class="{ active: isJustifyCenter }" @click="execCmd('justifyCenter')">По центру</button>
      <button :class="{ active: isJustifyRight }" @click="execCmd('justifyRight')">По правому краю</button>
      <button :class="{ active: isJustifyFull }" @click="execCmd('justifyFull')">По ширине</button>
      <button @click="execCmd('insertOrderedList')">Нумерованный список</button>
      <button @click="execCmd('insertUnorderedList')">Маркированный список</button>
      <button @click="insertImage">Картинка</button>
      <button @click="createLink">Ссылка</button>
      <select v-model="formatBlock" @change="execCmd('formatBlock', formatBlock)">
        <option value="p">Параграф</option>
        <option value="h1">Заголовок 1</option>
        <option value="h2">Заголовок 2</option>
        <option value="h3">Заголовок 3</option>
      </select>
      <button @click="toggleHtml">HTML-код</button>
    </div>

    <div class="editor" contenteditable="true" ref="editor" @input="updateHtml" @mouseup="updateState" @keyup="updateState" v-show="!showHtml">
      <p>Введите текст...</p>
    </div>

    <textarea v-model="htmlContent" v-show="showHtml"></textarea>
    <button @click="saveHtml">Сохранить как HTML</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHtml: false,
      htmlContent: '',
      foreColor: '#000000',
      backColor: '#ffffff',
      formatBlock: 'p',
      isBold: false,
      isItalic: false,
      isUnderline: false,
      isStrikeThrough: false,
      isJustifyLeft: false,
      isJustifyCenter: false,
      isJustifyRight: false,
      isJustifyFull: false
    };
  },
  methods: {
    execCmd(cmd, value = null) {
      document.execCommand(cmd, false, value);
      this.updateState();
    },
    updateHtml() {
      this.htmlContent = this.formatHtml(this.$refs.editor.innerHTML);
    },
    formatHtml(input) {
      return input.replace(/></g, '>\n<');
    },
    toggleHtml() {
      this.showHtml = !this.showHtml;
      if (!this.showHtml) {
        this.$refs.editor.innerHTML = this.htmlContent;
      } else {
        this.htmlContent = this.formatHtml(this.$refs.editor.innerHTML);
      }
    },
    insertImage() {
      const url = prompt('Введите URL картинки:');
      if (url) {
        const width = prompt('Введите ширину картинки (например, 100px или 50%):');
        const height = prompt('Введите высоту картинки (например, 100px или 50%):');
        const img = `<img src="${url}" width="${width}" height="${height}">`;
        document.execCommand('insertHTML', false, img);
        this.updateHtml();
      }
    },
    createLink() {
      const url = prompt('Введите URL ссылки:');
      if (url) {
        document.execCommand('createLink', false, url);
        this.updateHtml();
      }
    },
    saveHtml() {
      const blob = new Blob([this.htmlContent], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'editor-content.html';
      a.click();
    },
    updateState() {
      this.isBold = document.queryCommandState('bold');
      this.isItalic = document.queryCommandState('italic');
      this.isUnderline = document.queryCommandState('underline');
      this.isStrikeThrough = document.queryCommandState('strikeThrough');
      this.isJustifyLeft = document.queryCommandState('justifyLeft');
      this.isJustifyCenter = document.queryCommandState('justifyCenter');
      this.isJustifyRight = document.queryCommandState('justifyRight');
      this.isJustifyFull = document.queryCommandState('justifyFull');
    }
  }
};
</script>

<style>
.editor-buttons {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 1vh;
}
.editor {
  border: 0px solid #ccc;
  min-height: 200px;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  color: black;
}
body {
  background-color: rgb(49, 50, 59);
  color: white;
  font-family: Arial, sans-serif;
}
button, select, input {
  border: 0px solid;
  background-color: rgb(101, 97, 128);
  color: white;
  height: 4vh;
}
select {
  height: 4vh;
}
textarea {
  width: 100%;
  min-height: 500px;
  margin-top: 10px;
  background-color: rgb(101, 97, 128);
  color: white;
  border: 0px solid;
  padding: 10px;
  box-sizing: border-box;
}
#save-html {
  margin-top: 10px;
}
button.active {
  background-color: rgb(150, 150, 200);
}
</style>