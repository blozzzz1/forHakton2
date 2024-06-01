<template>
  <div>
    <div class="editor-buttons">
      <div class="btn-group">
        <div class="btn-wrapper" :class="{ active: isBold }">
          <button @mousedown.prevent="execCmd('bold')"> <font-awesome-icon :icon="['fas', 'bold']" /></button>
        </div>
        <div class="btn-wrapper" :class="{ active: isItalic }">
          <button @mousedown.prevent="execCmd('italic')"> <font-awesome-icon :icon="['fas', 'italic']" /></button>
        </div>
        <div class="btn-wrapper" :class="{ active: isUnderline }">
          <button @mousedown.prevent="execCmd('underline')"> <font-awesome-icon :icon="['fas', 'underline']" /></button>
        </div>
        <div class="btn-wrapper" :class="{ active: isStrikeThrough }">
          <button @mousedown.prevent="execCmd('strikeThrough')"> <font-awesome-icon
              :icon="['fas', 'strikethrough']" /></button>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn-wrapper">

          <font-awesome-icon :icon="['fas', 'font']" />
          <input type="color" v-model="foreColor" @input="execCmd('foreColor', foreColor)" title="Цвет текста">

        </div>

        <div class="btn-wrapper">
          <font-awesome-icon :icon="['fas', 'highlighter']" />
          <input type="color" v-model="backColor" @input="execCmd('backColor', backColor)" title="Цвет фона">
        </div>
      </div>
      <div class="btn-group">
        <div class="btn-wrapper" :class="{ active: isJustifyLeft }">
          <button @mousedown.prevent="execCmd('justifyLeft')"> <font-awesome-icon
              :icon="['fas', 'align-left']" /></button>
        </div>
        <div class="btn-wrapper" :class="{ active: isJustifyCenter }">
          <button @mousedown.prevent="execCmd('justifyCenter')"> <font-awesome-icon
              :icon="['fas', 'align-center']" /></button>
        </div>
        <div class="btn-wrapper" :class="{ active: isJustifyRight }">
          <button @mousedown.prevent="execCmd('justifyRight')"><font-awesome-icon
              :icon="['fas', 'align-right']" /></button>
        </div>
        <div class="btn-wrapper" :class="{ active: isJustifyFull }">
          <button @mousedown.prevent="execCmd('justifyFull')"> <font-awesome-icon
              :icon="['fas', 'align-justify']" /></button>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn-wrapper" :class="{ active: isOrderedList }">
          <button @mousedown.prevent="execCmd('insertOrderedList')"> <font-awesome-icon
              :icon="['fas', 'list-ol']" /></button>
        </div>
        <div class="btn-wrapper" :class="{ active: isUnorderedList }">
          <button @mousedown.prevent="execCmd('insertUnorderedList')">
            <font-awesome-icon :icon="['fas', 'list-ul']" /></button>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn-wrapper">
          <button @mousedown.prevent="insertImage"><font-awesome-icon :icon="['fas', 'image']" /> </button>
        </div>
        <div class="btn-wrapper">
          <button @mousedown.prevent="createLink"><font-awesome-icon :icon="['fas', 'link']" /></button>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn-wrapper">

          <font-awesome-icon :icon="['fas', 'heading']" />
          <select v-model="formatBlock" @change="execCmd('formatBlock', formatBlock)">
            <option value="p" selected>p</option>
            <option value="h1">h1</option>
            <option value="h2">h2</option>
            <option value="h3">h3</option>
          </select>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn-wrapper" :class="{ modeActive: displayMode === 'below' }">
          <button @mousedown.prevent="toggleDisplayMode('below')">
            <font-awesome-icon :icon="['fas', 'table-columns']" :style="{ transform: 'rotate(270deg)' }" /></button>
        </div>
        <div class="btn-wrapper" :class="{ modeActive: displayMode === 'side' }">
          <button @mousedown.prevent="toggleDisplayMode('side')">
            <font-awesome-icon :icon="['fas', 'table-columns']" /></button>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn-wrapper">
          <button @mousedown.prevent="clearFormatting"><font-awesome-icon :icon="['fas', 'eraser']" /></button>
        </div>
      </div>

    </div>

    <div class="editor-container" :class="displayMode">
      <div class="editor " contenteditable="true" ref="editor" @input="updateHtml" @mouseup="updateState"
        @keyup="updateState">
        <p>Введите текст...</p>
      </div>
      <textarea class="html-edit" v-model="htmlContent" v-show="displayMode !== 'hidden'"
        @input="updateEditor"></textarea>
    </div>
    <div class="btn-group">
      <div class="btn-wrapper">
        <button @click="saveHtml">Сохранить как HTML</button>
      </div>
    </div>


  </div>
</template>

<script src="https://kit.fontawesome.com/66e9e352b6.js" crossorigin="anonymous"></script>
<script>
export default {
  data() {
    return {
      showHtml: false, // Скрываем HTML по умолчанию
      htmlContent: '',
      foreColor: '#000000',
      backColor: '#ffffff',
      formatBlock: '',
      displayMode: 'hidden', // Режим по умолчанию - скрыт
      isBold: false,
      isItalic: false,
      isUnderline: false,
      isStrikeThrough: false,
      isJustifyLeft: false,
      isJustifyCenter: false,
      isJustifyRight: false,
      isJustifyFull: false,
      isOrderedList: false,
      isUnorderedList: false,
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
    toggleDisplayMode(mode) {
      this.displayMode = this.displayMode === mode ? 'hidden' : mode;
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
    clearFormatting() {
      document.execCommand('removeFormat', false, null);
      this.updateHtml();
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
      this.foreColor = this.rgbToHex(document.queryCommandValue('foreColor'));
      this.backColor = this.rgbToHex(document.queryCommandValue('backColor'));
      this.isOrderedList = document.queryCommandState('insertOrderedList');
      this.isUnorderedList = document.queryCommandState('insertUnorderedList');
      this.updateFormatBlock();
    },
    rgbToHex(rgb) {
      if (!rgb) return '#000000';
      const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
      return result ? "#" + ((1 << 24) + (parseInt(result[1]) << 16) + (parseInt(result[2]) << 8) + parseInt(result[3])).toString(16).slice(1).toUpperCase() : rgb;
    },
    updateFormatBlock() {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const commonAncestorContainer = range.commonAncestorContainer.nodeType === 3
          ? range.commonAncestorContainer.parentNode
          : range.commonAncestorContainer;

        const parentElements = this.getParentElements(commonAncestorContainer);
        const uniqueTags = new Set(parentElements.map(el => el.tagName.toLowerCase()));

        if (uniqueTags.size === 1) {
          this.formatBlock = uniqueTags.values().next().value;
        } else {
          this.formatBlock = '';
        }
      }
    },
    getParentElements(element) {
      const parentElements = [];
      while (element) {
        if (['p', 'h1', 'h2', 'h3'].includes(element.tagName.toLowerCase())) {
          parentElements.push(element);
        }
        element = element.parentElement;
      }
      return parentElements;
    },
    updateEditor() {
      this.$refs.editor.innerHTML = this.htmlContent;
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

.editor-buttons {
  padding: 30px 60px;
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;


}

.btn-group:first-child {
  border-left: 1px solid #A9B9CA;
}

.btn-group:nth-last-of-type(1) {
  border-right: 1px solid #A9B9CA;
}

.editor-buttons * {

  font-size: 20px;
}

.select-wrapper {
  display: flex;
  align-items: center;
}

.select-wrapper select {
  margin-left: 5px;
}

.editor-container {
  display: flex;
  flex-direction: column;
  background-color: #A9B9CA;
  padding: 60px;
  gap: 40px;
}

.editor-container>* {
  padding: 20px;
}

.editor-container.side {
  flex-direction: row;
}

.editor {
  border-radius: 23px;
  border: 0px;
  min-height: 200px;

  background-color: rgb(255, 255, 255);
  color: black;
  flex: 1;
}

body {
  background-color: #fff;
  color: white;
  font-family: Arial, sans-serif;
}

.btn-group {
  display: flex;
  padding: 0 40px;
  gap: 9px;
}


.btn-group+.btn-group {
  border-left: 1px solid #A9B9CA;
}

.btn-wrapper {
  padding: 2px;
  border: 0px solid;
  color: #122C4F;
  background-color: #FFF;
  transition: background .3s;
  border-radius: 5px;
}

.btn-wrapper>* {
  color: #122C4F;
  background-color: unset;
  border: 0px solid;

}

.btn-wrapper:hover,
.btn-wrapper *:hover {
  cursor: pointer;
  background-color: #A9B9CA;
}

.btn-wrapper *:hover {
  cursor: pointer;
  background-color: unset;
}

.btn-wrapper.active,
.btn-wrapper.modeActive {
  background-color: #A9B9CA;
}


button,
select,
input {
  height: 100%;
}


.html-edit {
  border-radius: 23px;
  width: 100%;
  min-height: 500px;
  background-color: rgb(255, 255, 255);
  color: black;
  border: 0px solid;
  box-sizing: border-box;
  flex: 1;
}

.editor-container.below .html-edit {}

.editor-container.side .html-edit {
  width: 50%;

}
</style>