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

    mediaImage.src = '';
    mediaImage.classList.remove('hidden');

    mediaVideo.pause();
    mediaVideo.currentTime = 0;
    mediaVideo.classList.add('hidden');
    mediaVideoSource.src = '';
}


// ========================================
// AFFICHER UNE IMAGE
// ========================================

function openImageViewer(src) {

    mediaVideo.pause();
    mediaVideo.currentTime = 0;
    mediaVideo.classList.add('hidden');
    mediaVideoSource.src = '';

    mediaImage.src = src;
    mediaImage.classList.remove('hidden');

    mediaModal.classList.remove('hidden');
}


// ========================================
// AFFICHER UNE VIDÉO
// ========================================

function openVideoViewer(src) {

    mediaImage.classList.add('hidden');
    mediaImage.src = '';

    mediaVideoSource.src = src;
    mediaVideo.load();

    mediaVideo.classList.remove('hidden');

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