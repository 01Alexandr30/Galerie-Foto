// Elemente HTML
const fileInput = document.getElementById('fileInput');
const gallery = document.getElementById('gallery');

// Funcție pentru a adăuga imagini în galerie
function addImages(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const imgData = event.target.result;

            // Adaugă imaginea în localStorage
            let savedImages = JSON.parse(localStorage.getItem('images')) || [];
            savedImages.push(imgData);
            localStorage.setItem('images', JSON.stringify(savedImages));

            // Afișează imaginea în galerie
            displayImage(imgData);
        };
        
        reader.readAsDataURL(file);
    }
}

// Funcție pentru a afișa imaginea
function displayImage(imgData) {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    
    const imgElement = document.createElement('img');
    imgElement.src = imgData;
    imgElement.alt = "Image";
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Șterge";
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = function() {
        // Șterge imaginea din localStorage
        let savedImages = JSON.parse(localStorage.getItem('images')) || [];
        savedImages = savedImages.filter(img => img !== imgData);
        localStorage.setItem('images', JSON.stringify(savedImages));

        // Șterge imaginea din galerie
        galleryItem.remove();
    };

    galleryItem.appendChild(imgElement);
    galleryItem.appendChild(deleteButton);
    gallery.appendChild(galleryItem);
}

// Funcție pentru a încărca imaginile la redeschiderea aplicației
function loadImages() {
    let savedImages = JSON.parse(localStorage.getItem('images')) || [];
    savedImages.forEach(imgData => {
        displayImage(imgData);
    });
}

// Încarcă imaginile salvate la încărcarea paginii
window.onload = loadImages;

// Evenimentul de încărcare a fișierelor
fileInput.addEventListener('change', function(event) {
    const files = event.target.files;
    addImages(files);
});
