document.addEventListener('DOMContentLoaded', function () {
    // --- Carousel
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const images = carousel.querySelector('.carousel-images');
        const imageCount = images.children.length;
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const nextButton = carousel.querySelector('.carousel-button.next');
        let index = 0;

        function updateCarousel() {
            const width = images.querySelector('img').clientWidth;
            images.style.transform = `translateX(-${index * width}px)`;
        }

        prevButton.addEventListener('click', () => {
            index = (index > 0) ? index - 1 : imageCount - 1;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            index = (index < imageCount - 1) ? index + 1 : 0;
            updateCarousel();
        });

        updateCarousel();
    });


    // --- Modal image + vidéo
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = modal.querySelector('.close-modal');

    const modalVideo = document.getElementById("modal-video");
    const modalVideoSource = document.getElementById("modal-video-source");


    // --- Image modal (zoom)
    document.querySelectorAll('.carousel .carousel-images').forEach(imageContainer => {
        const images = imageContainer.querySelectorAll('img');

        images.forEach((img, index) => {
            if (index > 0) {
                img.style.cursor = 'zoom-in';

                img.addEventListener('click', () => {

                    // Cacher la vidéo si elle était ouverte
                    modalVideo.pause();
                    modalVideo.currentTime = 0;
                    modalVideo.classList.add("hidden");

                    // Afficher l'image
                    modalImage.classList.remove("hidden");
                    modalImage.src = img.src;

                    // Ouvrir la modal
                    modal.classList.remove('hidden');
                });
            }
        });
    });

    // --- Vidéo modal en cliquant sur un bouton
    document.querySelectorAll(".open-video").forEach(button => {

        button.addEventListener("click", (e) => {
            e.preventDefault();

            // Cacher l'image
            modalImage.classList.add("hidden");
            modalImage.src = "";

            // Charger la vidéo
            modalVideoSource.src = button.dataset.video;
            modalVideo.load();

            // Afficher la vidéo
            modalVideo.classList.remove("hidden");

            // Ouvrir la modal
            modal.classList.remove("hidden");
        });

    });

    // --- Vidéo modal intégré dans le caroussel avec miniature
    document.querySelectorAll(".video-thumbnail").forEach(img => {

        img.addEventListener("click", () => {

            // cacher l'image
            modalImage.classList.add("hidden");
            modalImage.src = "";

            // afficher la vidéo
            modalVideo.classList.remove("hidden");

            modalVideo.src = img.dataset.video;
            modalVideo.load();

            modal.classList.remove("hidden");

        });

    });


    // --- Fermeture modal (bouton X)
    closeModal.addEventListener('click', () => {

        modal.classList.add('hidden');

        // Reset image
        modalImage.src = "";
        modalImage.classList.remove("hidden");

        // Reset vidéo
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.classList.add("hidden");
        modalVideoSource.src = "";
    });


    // --- Fermeture modal (clic en dehors)
    modal.addEventListener('click', (e) => {

        if (e.target === modal) {

            modal.classList.add('hidden');

            // Reset image
            modalImage.src = "";
            modalImage.classList.remove("hidden");

            // Reset vidéo
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.classList.add("hidden");
            modalVideoSource.src = "";
        }

    });


    // --- Recherche
    const searchInput = document.getElementById('search');
    const searchResultsMessage = document.getElementById('search-results-message');
    const projects = document.querySelectorAll('.project');
    const projectSections = document.querySelectorAll('#realisations section');

    searchInput?.addEventListener('input', function () {
        const searchText = searchInput.value.toLowerCase();

        if (!searchText) {
            // Réinitialiser tous les projets
            projects.forEach(project => {
                project.classList.remove('hidden');
                project.style.display = 'flex';
            });

            // Réafficher toutes les sections
            projectSections.forEach(section => {
                section.style.display = 'block';
            });

            // Cacher le message "aucun projet"
            searchResultsMessage.classList.remove('show');
            return;
        }

        let hasVisibleProject = false;

        projects.forEach(project => {
            const projectTitle = project.querySelector('h2').textContent.toLowerCase();
            const projectDescription = project.querySelector('p').textContent.toLowerCase();
            const projectYear = project.closest('section')?.querySelector('h1')?.textContent.toLowerCase() || '';

            if (projectTitle.includes(searchText) || projectDescription.includes(searchText) || projectYear.includes(searchText)) {
                project.classList.remove('hidden');
                project.style.display = 'flex';
                hasVisibleProject = true;
            } else {
                project.classList.add('hidden');
                project.style.display = 'none'; // Ajout direct, sans transitionend
            }
        });

        // Masquer les sections vides
        projectSections.forEach(section => {
            const visibleProjects = Array.from(section.querySelectorAll('.project')).filter(p => p.style.display !== 'none');
            section.style.display = visibleProjects.length === 0 ? 'none' : 'block';
        });


        // Message résultat
        if (hasVisibleProject) {
            searchResultsMessage.classList.remove('show');
        } else {
            searchResultsMessage.classList.add('show');
        }
    });



    // Modale projet
    const projectModal = document.getElementById('project-modal');
    const projectModalText = document.getElementById('modal-project-text');
    const closeProjectModal = projectModal.querySelector('.close-modal');

    // On cible tous les boutons "plus de détails"
    document.querySelectorAll('.details-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
            const project = btn.closest('.project');
            const details = project.querySelector('.project-details');

            // Injecte le contenu dans la modale
            projectModalText.innerHTML = details.innerHTML;

            // Affiche la modale
            projectModal.classList.remove('hidden');
        });
    });

    // Fermer la modale (X ou clic hors modale)
    closeProjectModal.addEventListener('click', () => {
        projectModal.classList.add('hidden');
        projectModalText.innerHTML = '';
    });

    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.add('hidden');
            projectModalText.innerHTML = '';
        }
    });


    
    // =========================
    // Lecteur ZIP
    // =========================

    const zipModal = document.getElementById('zip-modal');
    const zipTitle = document.getElementById('zip-title');
    const zipFiles = document.getElementById('zip-files');
    const zipFileName = document.getElementById('zip-file-name');
    const zipCode = document.getElementById('zip-code');
    const closeZipModal = zipModal.querySelector('.zip-close');


    // Extensions que l'on considère comme lisibles en texte
    const textExtensions = [
        'txt',
        'html',
        'htm',
        'css',
        'js',
        'jsx',
        'ts',
        'tsx',
        'java',
        'c',
        'h',
        'cpp',
        'hpp',
        'py',
        'php',
        'json',
        'xml',
        'md',
        'csv',
        'sql',
        'sh',
        'bat',
        'yml',
        'yaml'
    ];


    function isTextFile(filename) {

        const extension = filename
            .split('.')
            .pop()
            .toLowerCase();

        return textExtensions.includes(extension);
    }


    // Ouvre un fichier du ZIP
    async function openZipFile(file, filename) {

        zipFileName.textContent = filename;

        if (!isTextFile(filename)) {

            zipCode.textContent =
                "Aperçu non disponible pour ce type de fichier.\n\n" +
                "Fichier : " + filename;

            return;
        }

        try {

            const content = await file.async("text");

            zipCode.textContent = content;

        } catch (error) {

            console.error(error);

            zipCode.textContent =
                "Impossible de lire ce fichier.";

        }
    }


    // Affiche les fichiers du ZIP
    function displayZipFiles(zip) {

        zipFiles.innerHTML = "";

        const fileNames = Object.keys(zip.files);

        fileNames.forEach(filename => {

            const file = zip.files[filename];

            // Dossier
            if (file.dir) {

                const folder = document.createElement('div');

                folder.classList.add('zip-file', 'zip-folder');

                folder.textContent = filename;

                zipFiles.appendChild(folder);

                return;
            }


            // Fichier
            const button = document.createElement('button');

            button.classList.add('zip-file', 'file');

            button.textContent = filename;

            button.addEventListener('click', () => {

                openZipFile(file, filename);

            });

            zipFiles.appendChild(button);

        });
    }


    // Boutons "Voir le projet (.zip)"
    document.querySelectorAll('.open-zip').forEach(button => {

        button.addEventListener('click', async (e) => {

            e.preventDefault();

            const zipPath = button.dataset.zip;

            // Reset
            zipTitle.textContent = "Chargement du projet...";
            zipFiles.innerHTML = "";
            zipFileName.textContent = "";
            zipCode.textContent = "Chargement...";

            // Ouvre la modale
            zipModal.classList.remove('hidden');


            try {

                // Récupération du ZIP
                const response = await fetch(zipPath);

                if (!response.ok) {
                    throw new Error("Impossible de récupérer le ZIP.");
                }

                const blob = await response.blob();

                // Lecture du ZIP
                const zip = await JSZip.loadAsync(blob);

                // Titre
                const zipName = zipPath
                    .split('/')
                    .pop()
                    .replace('.zip', '');

                zipTitle.textContent = zipName;

                // Affichage des fichiers
                displayZipFiles(zip);

            } catch (error) {

                console.error(error);

                zipTitle.textContent = "Erreur";

                zipFiles.innerHTML = "";

                zipCode.textContent =
                    "Impossible d'ouvrir le projet.\n\n" +
                    "Vérifiez que le fichier ZIP existe bien.";

            }

        });

    });


    // Fermeture avec X
    closeZipModal.addEventListener('click', () => {

        zipModal.classList.add('hidden');

    });


    // Fermeture en cliquant à l'extérieur
    zipModal.addEventListener('click', (e) => {

        if (e.target === zipModal) {

            zipModal.classList.add('hidden');

        }

    });

});
