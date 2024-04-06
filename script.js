let uploadedImages = []; // Массив для хранения данных загруженных изображений

document.getElementById('imageUpload').addEventListener('change', function() {
  const files = this.files;
  const gallery = document.getElementById('gallery');

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      uploadedImages.push({id: uniqueId, data: e.target.result, file: file});

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      imageContainer.setAttribute('data-id', uniqueId);
      
      const img = new Image();
      img.src = e.target.result;
      img.alt = file.name;

      imageContainer.appendChild(img);

      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-image');
      removeButton.innerHTML = 'X';
      removeButton.addEventListener('click', function() {
        const parent = this.parentNode;
        const idToRemove = parent.getAttribute('data-id');
        const indexToRemove = uploadedImages.findIndex(item => item.id === idToRemove);
        if (indexToRemove !== -1) {
          uploadedImages.splice(indexToRemove, 1); // Удаление изображения из массива
          updateImageCount(); // Обновляем счётчик изображений
        }
        gallery.removeChild(parent);
      });
      
      imageContainer.appendChild(removeButton);
      gallery.appendChild(imageContainer);
      updateImageCount(); // Обновляем счётчик изображений при добавлении нового изображения
    };
    
    reader.readAsDataURL(file);
  });
});

function updateImageCount() {
  const count = uploadedImages.length;
  const imageCountElement = document.getElementById('imageCount');
  imageCountElement.textContent = `${count} изображений`; // Обновление текста счётчика
}

document.getElementById('submitImages').addEventListener('click', function() {
  console.log(uploadedImages); // Показываем текущее состояние массива uploadedImages
  alert('Изображения отправлены (нет, это только демонстрация)');
});

