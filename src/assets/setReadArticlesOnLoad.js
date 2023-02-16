export default function setReadArticlesOnLoad(read) {
    document.querySelectorAll('.article__item').forEach(item => {
        const itemID = item.dataset.id;
        const readMark = item.querySelector('.article__image-mark');
        const overlay = item.querySelector('.article__overlay');

        const readArticles = read.filter(({ id }) => id === itemID);
        readArticles.forEach(article => {
            readMark.classList.add('active');
            overlay.classList.add('active');
        });
    });
}
