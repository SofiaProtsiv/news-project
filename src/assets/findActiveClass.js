export default function findActiveClass(container, element = "") {
    document.querySelectorAll(`${container} ${element}`).forEach(element => {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
        }
    });
}