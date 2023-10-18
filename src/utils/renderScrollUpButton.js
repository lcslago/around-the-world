export function renderScrollUpButton() {
    window.addEventListener('scroll', () => {
        const scrollUpButton = document.querySelector('[data-scroll-up]');

        if (window.scrollY > 300) {
            scrollUpButton.hidden = false;
        } else if (window.scrollY === 0) {
            scrollUpButton.hidden = true;
        }

        scrollUpButton.addEventListener('click', () => {
            window.scrollBy({
                top: -window.innerHeight - 1000000,
                behavior: "instant"
            })
        })
    });
}