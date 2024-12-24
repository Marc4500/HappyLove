window.onload = function() {
    // Récupération des éléments
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const music = document.getElementById('music');

    // Afficher la popup et l'overlay dès que la page charge
    popup.style.display = 'block';
    overlay.style.display = 'block';

    // Gestion du bouton "Oui"
    yesButton.addEventListener('click', () => {
        music.play()
            .then(() => {
                console.log("La musique a été lancée !");
            })
            .catch(error => {
                alert("Impossible de lancer la musique : " + error.message);
            });

        // Fermer la popup
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    
    // Gestion du bouton "Non"
    noButton.addEventListener('click', () => {
        console.log("Vous avez choisi de ne pas lancer la musique.");
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });
};


function next(){
    window.location.href='./reveal.html'
}
function next1(){
    window.location.href='./love.html'
}
function next2(){
    window.location.href='./mery.html'
}
