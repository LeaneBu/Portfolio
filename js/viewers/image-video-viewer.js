// ========================================
// IMAGE / VIDEO VIEWER
// ========================================

const mediaModal = document.getElementById('image-modal');
const mediaImage = document.getElementById('modal-image');
const mediaVideo = document.getElementById('modal-video');
const mediaVideoSource = document.getElementById('modal-video-source');
const mediaClose = mediaModal.querySelector('.close-modal');


// ========================================
// RESET
// ========================================

function closeMediaViewer() {
    mediaModal.classList.add('hidden');

    // Reset image
    mediaImage.src = '';
    mediaImage.classList.remove('hidden');

    // Reset vidéo
    mediaVideo.pause();
    mediaVideo.currentTime = 0;
    mediaVideo.classList.add('hidden');
    mediaVideoSource.src = '';
}


// ========================================
// AFFICHER UNE IMAGE
// ========================================

function openImageViewer(src) {

    // Cacher la vidéo
    mediaVideo.pause();
    mediaVideo.currentTime = 0;
    mediaVideo.classList.add('hidden');
    mediaVideoSource.src = '';

    // Afficher l'image
    mediaImage.src = src;
    mediaImage.classList.remove('hidden');

    // Ouvrir la modale
    mediaModal.classList.remove('hidden');
}


// ========================================
// AFFICHER UNE VIDÉO
// ========================================

function openVideoViewer(src) {

    // Cacher l'image
    mediaImage.classList.add('hidden');
    mediaImage.src = '';

    // Charger la vidéo
    mediaVideoSource.src = src;
    mediaVideo.load();

    // Afficher la vidéo
    mediaVideo.classList.remove('hidden');

    // Ouvrir la modale
    mediaModal.classList.remove('hidden');
}


// ========================================
// IMAGES DES CAROUSELS
// ========================================

document
    .querySelectorAll('.carousel .carousel-images')
    .forEach(imageContainer => {

        const images =
            imageContainer.querySelectorAll('img');

        images.forEach((img, index) => {

            // On conserve ton comportement :
            // première image = pas de zoom
            if (index > 0) {

                img.style.cursor = 'zoom-in';

                img.addEventListener('click', () => {
                    openImageViewer(img.src);
                });
            }
        });
    });


// ========================================
// BOUTONS "VOIR LA VIDÉO"
// ========================================

document
    .querySelectorAll('.open-video')
    .forEach(button => {

        button.addEventListener('click', event => {

            event.preventDefault();

            openVideoViewer(
                button.dataset.video
            );
        });
    });


// ========================================
// MINIATURES VIDÉO
// ========================================

document
    .querySelectorAll('.video-thumbnail')
    .forEach(img => {

        img.addEventListener('click', () => {

            openVideoViewer(
                img.dataset.video
            );
        });
    });


// ========================================
// FERMETURE
// ========================================

mediaClose.addEventListener(
    'click',
    closeMediaViewer
);

mediaModal.addEventListener(
    'click',
    event => {

        if (event.target === mediaModal) {
            closeMediaViewer();
        }
    }
);