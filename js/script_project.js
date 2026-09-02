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

    // --- Viewers
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');

            script.src = src;

            script.onload = resolve;
            script.onerror = () => {
                reject(new Error(`Impossible de charger : ${src}`));
            };

            document.body.appendChild(script);
        });
    }

    async function loadViewers() {
        await loadScript('js/viewers/image-video-viewer.js');
        await loadScript('js/viewers/pdf-viewer.js');
        await loadScript('js/viewers/zip-viewer.js');

    }

    loadViewers().catch(error => {
        console.error('Erreur lors du chargement des viewers :', error);
    });


    // --- Recherche
    const searchInput = document.getElementById('search');
    const searchResultsMessage = document.getElementById('search-results-message');
    const projects = document.querySelectorAll('.project');
    const projectSections = document.querySelectorAll('#realisations section');

    searchInput?.addEventListener('input', function () {
        const searchText = searchInput.value.toLowerCase();

        if (!searchText) {
            projects.forEach(project => {
                project.classList.remove('hidden');
                project.style.display = 'flex';
            });

            projectSections.forEach(section => {
                section.style.display = 'block';
            });

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
                project.style.display = 'none';
            }
        });

        // sections vides
        projectSections.forEach(section => {
            const visibleProjects = Array.from(section.querySelectorAll('.project')).filter(p => p.style.display !== 'none');
            section.style.display = visibleProjects.length === 0 ? 'none' : 'block';
        });


        if (hasVisibleProject) {
            searchResultsMessage.classList.remove('show');
        } else {
            searchResultsMessage.classList.add('show');
        }
    });



    // --- Modale details projet
    const projectModal = document.getElementById('project-modal');
    const projectModalText = document.getElementById('modal-project-text');
    const closeProjectModal = projectModal.querySelector('.close-modal');

    document.querySelectorAll('.details-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
            const project = btn.closest('.project');
            const details = project.querySelector('.project-details');

            // contenu dans la modale
            projectModalText.innerHTML = details.innerHTML;

            // print la modale
            projectModal.classList.remove('hidden');
        });
    });

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

});
