document.addEventListener('DOMContentLoaded', function() {
  // Функция для обработки команд форматирования
  function formatDoc(cmd, value) {
    document.execCommand(cmd, false, value);
  }

  // Привязываем функцию к кнопкам форматирования
  document.querySelector('#bold').addEventListener('click', function() { formatDoc('bold'); });
  document.querySelector('#italic').addEventListener('click', function() { formatDoc('italic'); });
  document.querySelector('#underline').addEventListener('click', function() { formatDoc('underline'); });
  document.querySelector('#strikeThrough').addEventListener('click', function() { formatDoc('strikeThrough'); });
  document.querySelector('#foreColor').addEventListener('change', function() { formatDoc('foreColor', this.value); });
  document.querySelector('#backColor').addEventListener('change', function() { formatDoc('backColor', this.value); });
  document.querySelector('#justifyLeft').addEventListener('click', function() { formatDoc('justifyLeft'); });
  document.querySelector('#justifyCenter').addEventListener('click', function() { formatDoc('justifyCenter'); });
  document.querySelector('#justifyRight').addEventListener('click', function() { formatDoc('justifyRight'); });
  document.querySelector('#justifyFull').addEventListener('click', function() { formatDoc('justifyFull'); });
  document.querySelector('#insertOrderedList').addEventListener('click', function() { formatDoc('insertOrderedList'); });
  document.querySelector('#insertUnorderedList').addEventListener('click', function() { formatDoc('insertUnorderedList'); });
  document.querySelector('#insertImage').addEventListener('click', function() { var url = prompt('Введите URL изображения:', 'http://'); if (url) { formatDoc('insertImage', url);} });
  document.querySelector('#createLink').addEventListener('click', function() { var url = prompt('Введите URL:', 'http://'); if (url) { formatDoc('createLink', url);} });
  document.querySelector('#html').addEventListener('click', function() { var html = document.querySelector('.editor').innerHTML; alert(html); });
  
  // Устанавливаем редактируемый элемент
  document.querySelector('.editor').setAttribute('contenteditable', true);
});