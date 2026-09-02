// ========================================
// ZIP VIEWER
// ========================================

const zipModal =
    document.getElementById('zip-modal');

const zipTitle =
    document.getElementById('zip-title');

const zipFiles =
    document.getElementById('zip-files');

const zipFileName =
    document.getElementById('zip-file-name');

const zipCode =
    document.querySelector('#zip-code code');

const zipPreview =
    document.getElementById('zip-preview');

const zipPdfPreview =
    document.getElementById('zip-pdf-preview');

const zipPdfPages =
    document.getElementById('zip-pdf-pages');

const closeZipModal =
    zipModal.querySelector('.zip-close');


let currentZip = null;


// ========================================
// EXTENSIONS TEXTE
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
// EXTENSION
// ========================================

function getExtension(filename) {

    return filename
        .split('.')
        .pop()
        .toLowerCase();
}


// ========================================
// LANGAGE PRISM
// ========================================

function getPrismLanguage(filename) {

    const extension =
        getExtension(filename);

    const languages = {

        html: 'markup',
        htm: 'markup',
        xml: 'markup',
        svg: 'markup',

        css: 'css',

        js: 'javascript',
        mjs: 'javascript',
        jsx: 'javascript',

        java: 'java',

        c: 'c',
        h: 'c',

        cpp: 'cpp',
        hpp: 'cpp',

        py: 'python',

        php: 'php',

        json: 'json',

        txt: null,

        md: 'markdown'
    };

    return languages[extension] ?? null;
}


// ========================================
// AFFICHER UN PDF DANS LE ZIP
// ========================================

async function displayZipPDF(file) {

    zipPdfPages.innerHTML = '';

    const arrayBuffer =
        await file.async('arraybuffer');

    const pdf =
        await pdfjsLib.getDocument({
            data: arrayBuffer
        }).promise;


    for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
    ) {

        const page =
            await pdf.getPage(pageNumber);

        const viewport =
            page.getViewport({
                scale: 1
            });

        const containerWidth =
            zipPdfPreview.clientWidth - 40;

        const scale =
            Math.min(
                containerWidth / viewport.width,
                1.5
            );

        const scaledViewport =
            page.getViewport({
                scale: scale
            });

        const canvas =
            document.createElement('canvas');

        canvas.classList.add('pdf-page');

        canvas.width =
            scaledViewport.width;

        canvas.height =
            scaledViewport.height;

        const context =
            canvas.getContext('2d');

        await page.render({
            canvasContext: context,
            viewport: scaledViewport
        }).promise;

        zipPdfPages.appendChild(canvas);
    }
}


// ========================================
// AFFICHER UN FICHIER DU ZIP
// ========================================

async function openZipFile(file, filename) {

    zipFileName.textContent = filename;

    // Reset aperçu
    zipPreview.innerHTML = '';
    zipPreview.classList.add('hidden');

    zipPdfPreview.classList.add('hidden');
    zipPdfPages.innerHTML = '';

    zipCode.parentElement.classList.remove('hidden');

    zipCode.className = '';
    zipCode.textContent = 'Chargement...';


    const extension =
        getExtension(filename);


    // ====================================
    // PDF
    // ====================================

    if (extension === 'pdf') {

        try {

            zipCode.parentElement.classList.add(
                'hidden'
            );

            zipPdfPreview.classList.remove(
                'hidden'
            );

            await displayZipPDF(file);

        } catch (error) {

            console.error(
                'Erreur PDF :',
                error
            );

            zipCode.parentElement.classList.remove(
                'hidden'
            );

            zipPdfPreview.classList.add(
                'hidden'
            );

            zipCode.textContent =
                "Impossible d'afficher ce PDF.\n\n" +
                error.message;
        }

        return;
    }


    // ====================================
    // IMAGES
    // ====================================

    const imageExtensions = [
        'png',
        'jpg',
        'jpeg',
        'gif',
        'webp',
        'svg'
    ];

    if (
        imageExtensions.includes(extension)
    ) {

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


    // ====================================
    // FICHIERS NON SUPPORTÉS
    // ====================================

    if (
        !textExtensions.includes(extension)
    ) {

        zipCode.textContent =
            "Aperçu non disponible pour ce type de fichier.\n\n" +
            "Fichier : " +
            filename;

        return;
    }


    // ====================================
    // FICHIERS TEXTE
    // ====================================

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
                    'Erreur Prism :',
                    error
                );

                zipCode.className = '';
                zipCode.textContent = content;
            }

        } else {

            zipCode.className = '';
            zipCode.textContent = content;
        }

    } catch (error) {

        console.error(error);

        zipCode.textContent =
            "Impossible de lire ce fichier.";
    }
}


// ========================================
// CRÉER L'ARBORESCENCE
// ========================================

function createTree(zip) {

    const root = {
        folders: {},
        files: []
    };


    Object.keys(zip.files)
        .forEach(path => {

            const zipEntry =
                zip.files[path];

            const parts =
                path
                    .split('/')
                    .filter(part => part !== '');


            let current = root;


            parts.forEach((part, index) => {

                const isLast =
                    index === parts.length - 1;


                if (isLast) {

                    if (zipEntry.dir) {

                        if (
                            !current.folders[part]
                        ) {

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


                if (
                    !current.folders[part]
                ) {

                    current.folders[part] = {
                        folders: {},
                        files: []
                    };
                }


                current =
                    current.folders[part];
            });
        });


    return root;
}


// ========================================
// AFFICHER L'ARBORESCENCE
// ========================================

function renderTree(
    tree,
    container
) {

    // ------------------------------------
    // DOSSIERS
    // ------------------------------------

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

            folderButton.textContent =
                folderName;

            folderContainer.appendChild(
                folderButton
            );


            const children =
                document.createElement('div');

            children.classList.add(
                'zip-tree-children'
            );

            children.style.display =
                'none';


            renderTree(
                tree.folders[folderName],
                children
            );

            folderContainer.appendChild(
                children
            );


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


            container.appendChild(
                folderContainer
            );
        });


    // ------------------------------------
    // FICHIERS
    // ------------------------------------

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

            button.textContent =
                file.name;

            button.title =
                file.path;


            button.addEventListener(
                'click',
                () => {

                    openZipFile(
                        file.zipEntry,
                        file.path
                    );
                }
            );


            container.appendChild(
                button
            );
        });
}


// ========================================
// OUVRIR UN ZIP
// ========================================

document
    .querySelectorAll('.open-zip')
    .forEach(link => {

        link.addEventListener(
            'click',
            async event => {

                event.preventDefault();

                const zipPath =
                    link.href;


                // Reset
                zipTitle.textContent =
                    'Chargement du projet...';

                zipFiles.innerHTML = '';

                zipFileName.textContent =
                    'Sélectionnez un fichier';

                zipCode.textContent =
                    'Chargement...';

                zipPreview.innerHTML = '';

                zipPreview.classList.add(
                    'hidden'
                );

                zipPdfPreview.classList.add(
                    'hidden'
                );

                zipPdfPages.innerHTML = '';

                zipCode.parentElement.classList.remove(
                    'hidden'
                );

                zipModal.classList.remove(
                    'hidden'
                );


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


                    const zipName =
                        zipPath
                            .split('/')
                            .pop()
                            .replace(/\.zip$/i, '');


                    zipTitle.textContent =
                        zipName;


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
            }
        );
    });


// ========================================
// FERMER
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
}


closeZipModal.addEventListener(
    'click',
    closeZip
);


zipModal.addEventListener(
    'click',
    event => {

        if (event.target === zipModal) {
            closeZip();
        }
    }
);