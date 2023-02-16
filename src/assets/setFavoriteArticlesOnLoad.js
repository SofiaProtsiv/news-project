export default function setFavoriteArticlesOnLoad(favorite) {
    document.querySelectorAll(".article__item").forEach((item) => {
        const itemID = item.dataset.id;
        const favBtn = item.querySelector(".article__image-button--favorite");
        const favBtnText = favBtn.firstElementChild;

        const favoriteArticles = favorite.filter(({ id }) => id === itemID)
        favoriteArticles.forEach(article => {
            favBtn.classList.add("active")
            favBtnText.textContent = 'Remove from favorite';
        })
    })
}