// ========================================
// LECTEUR PDF
// ========================================

const pdfModal = document.getElementById('pdf-modal');
const pdfPages = document.getElementById('pdf-pages');
const pdfFileName = document.getElementById('pdf-file-name');

const pdfClose = pdfModal.querySelector('.pdf-close');


// ========================================
// OUVERTURE D'UN PDF
// ========================================

async function openPDF(url) {

    pdfPages.innerHTML = '';

    pdfFileName.textContent =
        decodeURIComponent(
            url.split('/').pop()
        );

    pdfModal.classList.remove('hidden');

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Impossible de charger le PDF (${response.status})`
            );
        }

        const arrayBuffer =
            await response.arrayBuffer();

        const pdf =
            await pdfjsLib.getDocument({
                data: arrayBuffer
            }).promise;


        // Afficher toutes les pages

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
                pdfPages.clientWidth - 40;

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

            canvas.className = 'pdf-page';

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


            pdfPages.appendChild(canvas);
        }

    } catch (error) {

        console.error(
            'Erreur lors du chargement du PDF :',
            error
        );

        pdfPages.innerHTML = `
            <p class="pdf-error">
                Impossible d'afficher ce PDF.
            </p>
        `;
    }
}


// ========================================
// BOUTONS "OPEN PDF"
// ========================================

document.querySelectorAll('.open-pdf').forEach(link => {

    link.addEventListener('click', event => {

        event.preventDefault();

        openPDF(link.href);

    });

});


// ========================================
// FERMETURE
// ========================================

function closePDF() {

    pdfModal.classList.add('hidden');

    pdfPages.innerHTML = '';

    pdfFileName.textContent =
        'Document PDF';
}


pdfClose.addEventListener(
    'click',
    closePDF
);


pdfModal.addEventListener(
    'click',
    event => {

        if (event.target === pdfModal) {
            closePDF();
        }

    }
);