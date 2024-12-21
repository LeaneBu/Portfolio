document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchResultsMessage = document.getElementById('search-results-message');
    const project = document.querySelectorAll('.project');

    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.toLowerCase();
        let hasVisibleCard = false;

        project.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDescription = card.querySelector('p').textContent.toLowerCase();

            if (cardTitle.includes(searchText) || cardDescription.includes(searchText)) {
                if (card.classList.contains('hidden')) {
                    card.classList.remove('hidden');
                    card.offsetHeight; // Trigger reflow to restart the transition
                }
                card.style.display = 'flex'; // Assure que la carte est affichée
                hasVisibleCard = true;
            } else {
                if (!card.classList.contains('hidden')) {
                    card.style.display = 'flex'; // Assure que la carte est affichée avant la transition
                    card.classList.add('hidden');
                    card.addEventListener('transitionend', function handler() {
                        card.style.display = 'none'; // Cache la carte après la fin de la transition
                        card.removeEventListener('transitionend', handler);
                    });
                }
            }
        });

        // Affiche ou cache le message de résultats en fonction des résultats de la recherche
        if (hasVisibleCard) {
            searchResultsMessage.classList.remove('show');
        } else {
            searchResultsMessage.classList.add('show');
        }
    });
});


