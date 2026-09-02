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



    // ========================================
    // Lecteur ZIP
    // ========================================

    const zipModal = document.getElementById('zip-modal');
    const zipTitle = document.getElementById('zip-title');
    const zipFiles = document.getElementById('zip-files');
    const zipFileName = document.getElementById('zip-file-name');
    const zipCode = document.querySelector('#zip-code code');
    const zipPreview = document.getElementById('zip-preview');
    const copyCodeButton = document.getElementById('copy-code');
    const zipPdfPreview = document.getElementById('zip-pdf-preview');
    const zipPdfPages = document.getElementById('zip-pdf-pages');
    const closeZipModal = zipModal.querySelector('.zip-close');


    let currentZip = null;


    // ========================================
    // Extensions texte
    // ========================================

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


    // ========================================
    // Déterminer l'extension
    // ========================================

    function getExtension(filename) {

        return filename
            .split('.')
            .pop()
            .toLowerCase();

    }


    // ========================================
    // Langage Prism
    // ========================================

    function getPrismLanguage(filename) {

    const extension = filename
        .split('.')
        .pop()
        .toLowerCase();

    const languages = {

        // Web
        html: 'markup',
        htm: 'markup',
        xml: 'markup',
        svg: 'markup',

        css: 'css',

        js: 'javascript',
        mjs: 'javascript',
        jsx: 'javascript',

        // Java / C
        java: 'java',
        c: 'c',
        h: 'c',
        cpp: 'cpp',
        hpp: 'cpp',

        // Python
        py: 'python',

        // PHP
        php: 'php',

        // Données
        json: 'json',

        // Texte
        txt: null,
        md: 'markdown'

    };

    return languages[extension] ?? null;
}

    //afficher PDF 
    async function displayPDF(file) {

    // Nettoyage
    zipPdfPages.innerHTML = '';

    // Récupération du PDF depuis le ZIP
    const arrayBuffer = await file.async('arraybuffer');

    // Chargement avec PDF.js
    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;


    // Parcours des pages
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {

        const page = await pdf.getPage(pageNumber);


        // Taille de base
        const viewport = page.getViewport({
            scale: 1
        });


        // Largeur disponible
        const containerWidth =
            zipPdfPreview.clientWidth - 40;


        // Adapter le PDF à la largeur
        const scale =
            Math.min(
                containerWidth / viewport.width,
                1.5
            );


        const scaledViewport =
            page.getViewport({
                scale: scale
            });


        // Canvas
        const canvas =
            document.createElement('canvas');


        canvas.classList.add('pdf-page');


        canvas.width =
            scaledViewport.width;

        canvas.height =
            scaledViewport.height;


        const context =
            canvas.getContext('2d');


        // Rendu de la page
        await page.render({

            canvasContext: context,

            viewport: scaledViewport

        }).promise;


        zipPdfPages.appendChild(canvas);

    }

}
    // TODO : retirer les consol.log et les saut de ligne inutile (pareild ans le css) et reformater tout beau !!! xD

    // ========================================
    // Afficher un fichier
    // ========================================

    async function openZipFile(file, filename) {
    console.log("OPEN ZIP FILE fonctionne !");
    console.log("Fichier reçu :", filename);

    zipFileName.textContent = filename;

    // Nettoyer les affichages précédents
    zipPreview.classList.add('hidden');
    zipPreview.innerHTML = '';

    zipPdfPreview.classList.add('hidden');
    zipPdfPages.innerHTML = '';

    zipCode.parentElement.classList.remove('hidden');

    copyCodeButton.classList.add('hidden');

    zipCode.textContent = 'Chargement...';


    // Extension du fichier
    const extension = filename
        .split('.')
        .pop()
        .toLowerCase();


    console.log("Fichier :", filename);
    console.log("Extension détectée :", extension);


    // ========================================
    // PDF
    // ========================================

    if (extension === 'pdf') {

        try {

            // Cacher le code
            zipCode.parentElement.classList.add('hidden');

            // Cacher les images
            zipPreview.classList.add('hidden');

            // Afficher la zone PDF
            zipPdfPreview.classList.remove('hidden');

            // Afficher le PDF
            await displayPDF(file);

        } catch (error) {

            console.error("Erreur PDF :", error);

            zipCode.parentElement.classList.remove('hidden');

            zipPdfPreview.classList.add('hidden');

            zipCode.textContent =
                "Impossible d'afficher ce PDF.\n\n" +
                error.message;
        }

        return;
    }


    // ========================================
    // Images
    // ========================================

    const imageExtensions = [
        'png',
        'jpg',
        'jpeg',
        'gif',
        'webp',
        'svg'
    ];


    if (imageExtensions.includes(extension)) {

        try {

            const blob =
                await file.async('blob');

            const url =
                URL.createObjectURL(blob);

            const img =
                document.createElement('img');

            img.src = url;

            img.alt = filename;

            zipPreview.appendChild(img);

            zipCode.parentElement.classList.add(
                'hidden'
            );

            zipPreview.classList.remove(
                'hidden'
            );

        } catch (error) {

            console.error(error);

            zipCode.textContent =
                "Impossible d'afficher cette image.";

        }

        return;
    }


    // ========================================
    // Fichiers texte
    // ========================================

    if (!textExtensions.includes(extension)) {

        zipCode.textContent =
            "Aperçu non disponible pour ce type de fichier.\n\n" +
            "Fichier : " + filename;

        return;
    }


    // ========================================
    // Lecture texte
    // ========================================

    try {

        const content =
            await file.async('text');


        const language =
            getPrismLanguage(filename);


        if (
            language &&
            Prism.languages[language]
        ) {

            try {

                zipCode.className =
                    `language-${language}`;

                zipCode.innerHTML =
                    Prism.highlight(
                        content,
                        Prism.languages[language],
                        language
                    );

            } catch (error) {

                console.warn(
                    "Erreur de coloration Prism :",
                    error
                );

                // Si Prism plante, on affiche quand même le code
                zipCode.className = '';

                zipCode.textContent =
                    content;
            }

        } else {

            zipCode.className = '';

            zipCode.textContent =
                content;
        }

        copyCodeButton.classList.remove(
            'hidden'
        );


    } catch (error) {

        console.error(error);

        zipCode.textContent =
            "Impossible de lire ce fichier.";

    }

}
    

    // ========================================
    // Création de l'arborescence
    // ========================================

    function createTree(zip) {

        const root = {
            folders: {},
            files: []
        };


        Object.keys(zip.files).forEach(path => {

            const zipEntry = zip.files[path];

            const parts = path
                .split('/')
                .filter(part => part !== '');


            let current = root;


            parts.forEach((part, index) => {

                const isLast = index === parts.length - 1;


                if (isLast) {

                    if (zipEntry.dir) {

                        if (!current.folders[part]) {

                            current.folders[part] = {
                                folders: {},
                                files: []
                            };

                        }

                    } else {

                        current.files.push({
                            name: part,
                            path: path,
                            zipEntry: zipEntry
                        });

                    }

                    return;

                }


                if (!current.folders[part]) {

                    current.folders[part] = {
                        folders: {},
                        files: []
                    };

                }


                current = current.folders[part];

            });

        });


        return root;

    }


    // ========================================
    // Afficher l'arborescence
    // ========================================

    function renderTree(tree, container, level = 0) {


        // ----------------------------------------
        // Dossiers
        // ----------------------------------------

        Object.keys(tree.folders)
            .sort()
            .forEach(folderName => {

                const folderContainer =
                    document.createElement('div');


                const folderButton =
                    document.createElement('button');


                folderButton.classList.add(
                    'zip-tree-item',
                    'zip-folder'
                );


                folderButton.textContent = folderName;


                folderContainer.appendChild(folderButton);


                const children =
                    document.createElement('div');


                children.classList.add(
                    'zip-tree-children'
                );


                children.style.display = 'none';


                renderTree(
                    tree.folders[folderName],
                    children,
                    level + 1
                );


                folderContainer.appendChild(children);


                // Ouvrir / fermer
                folderButton.addEventListener(
                    'click',
                    () => {

                        const isOpen =
                            children.style.display !== 'none';


                        children.style.display =
                            isOpen ? 'none' : 'block';


                        folderButton.classList.toggle(
                            'open',
                            !isOpen
                        );

                    }
                );


                container.appendChild(folderContainer);

            });


        // ----------------------------------------
        // Fichiers
        // ----------------------------------------

        tree.files
            .sort((a, b) =>
                a.name.localeCompare(b.name)
            )
            .forEach(file => {

                const button =
                    document.createElement('button');


                button.classList.add(
                    'zip-tree-item',
                    'zip-file'
                );


                button.textContent = file.name;


                button.title = file.path;


                button.addEventListener(
                    'click',
                    () => {

                        openZipFile(
                            file.zipEntry,
                            file.path
                        );

                    }
                );


                container.appendChild(button);

            });

    }


    // ========================================
    // Ouvrir un ZIP
    // ========================================

    document.querySelectorAll('.open-zip')
        .forEach(link => {

            link.addEventListener('click', async (e) => {

                e.preventDefault();


                const zipPath = link.href;


                // Reset
                zipTitle.textContent =
                    'Chargement du projet...';

                zipFiles.innerHTML = '';

                zipFileName.textContent =
                    'Sélectionnez un fichier';

                zipCode.textContent =
                    'Chargement...';

                zipPreview.innerHTML = '';

                zipPreview.classList.add('hidden');

                zipCode.parentElement.classList.remove(
                    'hidden'
                );


                copyCodeButton.classList.add('hidden');


                // Ouvrir la modale
                zipModal.classList.remove('hidden');


                try {

                    const response =
                        await fetch(zipPath);


                    if (!response.ok) {

                        throw new Error(
                            'Impossible de récupérer le ZIP.'
                        );

                    }


                    const blob =
                        await response.blob();


                    currentZip =
                        await JSZip.loadAsync(blob);


                    // Nom du projet
                    const zipName =
                        zipPath
                            .split('/')
                            .pop()
                            .replace(/\.zip$/i, '');


                    zipTitle.textContent =
                        zipName;


                    // Arborescence
                    const tree =
                        createTree(currentZip);


                    renderTree(
                        tree,
                        zipFiles
                    );


                } catch (error) {

                    console.error(error);


                    zipTitle.textContent =
                        'Erreur';


                    zipFiles.innerHTML = '';


                    zipCode.textContent =
                        "Impossible d'ouvrir le projet.\n\n" +
                        "Vérifiez que le fichier ZIP existe bien.";

                }

            });

        });


    // ========================================
    // Copier le code
    // ========================================

    copyCodeButton.addEventListener(
        'click',
        async () => {

            try {

                await navigator.clipboard.writeText(
                    zipCode.textContent
                );


                const originalText =
                    copyCodeButton.textContent;


                copyCodeButton.textContent =
                    'Copié !';


                setTimeout(() => {

                    copyCodeButton.textContent =
                        originalText;

                }, 1500);


            } catch (error) {

                console.error(
                    'Impossible de copier.',
                    error
                );

            }

        }
    );


    // ========================================
    // Fermer
    // ========================================

    function closeZip() {

        zipModal.classList.add('hidden');

        zipFiles.innerHTML = '';

        zipFileName.textContent =
            'Sélectionnez un fichier';

        zipCode.textContent = '';

        zipPreview.innerHTML = '';

        zipPreview.classList.add('hidden');

        zipPdfPages.innerHTML = '';
        zipPdfPreview.classList.add('hidden');

        zipCode.parentElement.classList.remove(
            'hidden'
        );

        copyCodeButton.classList.add('hidden');

    }


    closeZipModal.addEventListener(
        'click',
        closeZip
    );


    zipModal.addEventListener(
        'click',
        (e) => {

            if (e.target === zipModal) {

                closeZip();

            }

        }
    );

});
