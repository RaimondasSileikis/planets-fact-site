const meniuButton = document.querySelector('.mobile-nav-toggle');

const meniuList = document.querySelector('.primary-navigation');

meniuButton.addEventListener('click', () => {
    const visibility = meniuList.getAttribute('data-visible');

    if (visibility === 'false') {
        meniuList.setAttribute('data-visible', true)
        meniuButton.setAttribute('aria-expanded', true)
    } else {
        meniuList.setAttribute('data-visible', false)
        meniuButton.setAttribute('aria-expanded', false)
    }
})