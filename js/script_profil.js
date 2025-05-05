document.addEventListener('DOMContentLoaded', function() {
    const flipContainer = document.getElementById('flip-container');
    flipContainer.addEventListener('mouseover', function() {
        flipContainer.querySelector('.flipper').style.transform = 'rotateY(180deg)';
    });
    flipContainer.addEventListener('mouseout', function() {
        flipContainer.querySelector('.flipper').style.transform = 'rotateY(0deg)';
    });
});
