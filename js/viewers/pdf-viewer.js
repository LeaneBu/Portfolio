// ========================================
// PDF VIEWER
// ========================================

const pdfModal = document.getElementById('pdf-modal');
const pdfPages = document.getElementById('pdf-pages');
const pdfFileName = document.getElementById('pdf-file-name');
const pdfClose = pdfModal.querySelector('.pdf-close');

async function openPdfViewer(url, filename = 'Document PDF') {
    pdfModal.classList.remove('hidden');

    pdfFileName.textContent = filename;
    pdfPages.innerHTML = '<p class="pdf-loading">Chargement du PDF...</p>';

    try {
        const pdf = await pdfjsLib.getDocument(url).promise;

        pdfPages.innerHTML = '';

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);

            const pageContainer = document.createElement('div');
            pageContainer.className = 'pdf-page';

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const availableWidth = Math.min(
                window.innerWidth - 40,
                1200
            );

            const viewport = page.getViewport({ scale: 1 });

            const scale = availableWidth / viewport.width;

            const scaledViewport = page.getViewport({
                scale: scale
            });

            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;

            canvas.style.width = `${scaledViewport.width}px`;
            canvas.style.height = `${scaledViewport.height}px`;

            pageContainer.appendChild(canvas);
            pdfPages.appendChild(pageContainer);

            await page.render({
                canvasContext: context,
                viewport: scaledViewport
            }).promise;
        }

    } catch (error) {
        console.error('Erreur lors du chargement du PDF :', error);

        pdfPages.innerHTML = `
            <p class="pdf-error">
                Impossible de charger ce PDF.
            </p>
        `;
    }
}


// ========================================
// BOUTONS PDF
// ========================================

document.querySelectorAll('.open-pdf').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();

        const url = button.href;
        const filename = url.split('/').pop();

        openPdfViewer(url, filename);
    });
});


// ========================================
// FERMETURE
// ========================================

function closePdfViewer() {
    pdfModal.classList.add('hidden');
    pdfPages.innerHTML = '';
}

pdfClose.addEventListener('click', closePdfViewer);

pdfModal.addEventListener('click', event => {
    if (event.target === pdfModal) {
        closePdfViewer();
    }
});