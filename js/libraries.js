// ========================================
// CHARGEMENT DES LIBRAIRIES
// ========================================

function loadScript(src) {
    return new Promise((resolve, reject) => {

        const script = document.createElement('script');

        script.src = src;

        script.onload = resolve;

        script.onerror = () => {
            reject(new Error(`Impossible de charger : ${src}`));
        };

        document.head.appendChild(script);
    });
}


// ========================================
// CHARGEMENT DANS LE BON ORDRE
// ========================================

async function loadLibraries() {

    // JSZip
    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
    );


    // Prism
    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js'
    );

    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js'
    );


    // Langages Prism
    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markup.min.js'
    );

    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-css.min.js'
    );

    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js'
    );

    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js'
    );

    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js'
    );

    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-cpp.min.js'
    );

    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js'
    );

    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js'
    );


    // PDF.js
    await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js'
    );


    // Worker PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';


}


// ========================================
// LANCEMENT
// ========================================

loadLibraries()
    .then(() => {

        const script = document.createElement('script');

        script.src = 'js/script_project.js';

        document.body.appendChild(script);

    })
    .catch(error => {

        console.error(
            'Erreur lors du chargement des librairies :',
            error
        );

    });