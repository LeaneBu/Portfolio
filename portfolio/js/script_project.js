// script.js

document.addEventListener('DOMContentLoaded', function() {
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

        // Initial setup
        updateCarousel();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchResultsMessage = document.getElementById('search-results-message');
    const projects = document.querySelectorAll('.project');
    const projectSections = document.querySelectorAll('#realisations section');

    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.toLowerCase();
        let hasVisibleProject = false;

        projects.forEach(project => {
            const projectTitle = project.querySelector('h2').textContent.toLowerCase();
            const projectDescription = project.querySelector('p').textContent.toLowerCase();
            const projectYear = project.closest('section').querySelector('h1').textContent.toLowerCase();

            if (projectTitle.includes(searchText) || projectDescription.includes(searchText) || projectYear.includes(searchText)) {
                if (project.classList.contains('hidden')) {
                    project.classList.remove('hidden');
                    project.offsetHeight; // Trigger reflow to restart the transition
                }
                project.style.display = 'flex'; // Assure que le projet est affiché
                hasVisibleProject = true;
            } else {
                if (!project.classList.contains('hidden')) {
                    project.style.display = 'flex'; // Assure que le projet est affiché avant la transition
                    project.classList.add('hidden');
                    project.addEventListener('transitionend', function handler() {
                        project.style.display = 'none'; // Cache le projet après la fin de la transition
                        project.removeEventListener('transitionend', handler);
                    });
                }
            }
        });

        // Cache les sections sans projets visibles
        projectSections.forEach(section => {
            const visibleProjects = section.querySelectorAll('.project:not(.hidden)');
            if (visibleProjects.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });

        // Affiche ou cache le message de résultats en fonction des résultats de la recherche
        if (hasVisibleProject) {
            searchResultsMessage.classList.remove('show');
        } else {
            searchResultsMessage.classList.add('show');
        }
    });
});
