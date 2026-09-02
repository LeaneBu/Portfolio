// ========================================
// CHARGEMENT DES BIBLIOTHÈQUES EXTERNES
// ========================================
// (pour éviter de les avoir dans l'html)

// JSZip
loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
);

// Prism
loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js'
);

loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js'
);

// Langages Prism
loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markup.min.js'
);

loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-css.min.js'
);

loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js'
);

loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js'
);

loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js'
);

loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-cpp.min.js'
);

loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js'
);

loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js'
);

// PDF.js
loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js'
);


// ========================================
// FONCTION DE CHARGEMENT
// ========================================

function loadScript(src) {

    const script = document.createElement('script');

    script.src = src;
    script.async = false;

    document.head.appendChild(script);
}