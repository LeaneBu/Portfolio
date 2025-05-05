document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const searchResultsMessage = document.getElementById('search-results-message');
    const cards = document.querySelectorAll('.card');

    searchInput.addEventListener('input', function () {
        const searchText = searchInput.value.toLowerCase();
        let hasVisibleCard = false;

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchText) || description.includes(searchText)) {
                card.style.display = 'flex';
                hasVisibleCard = true;
            } else {
                card.style.display = 'none';
            }
        });

        searchResultsMessage.style.display = hasVisibleCard ? 'none' : 'block';
    });
});



