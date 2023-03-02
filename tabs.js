const mobileWidth = window.matchMedia("(max-width: 24rem)");
const tabList = document.querySelector('[role=tablist]');
const tabs = tabList.querySelectorAll('[role=tab]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach(tab => {
    tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;
let goBack = 0;
let goForward = 0;

function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    const keydownUp = 38;
    const keydownDown = 40;

    if (mobileWidth.matches) {
        goBack = keydownLeft;
        goForward = keydownRight;
    } else {
        goBack = keydownUp;
        goForward = keydownDown;
    }

   if (e.keyCode === goBack || e.keyCode === goForward ) {
        tabs[tabFocus].setAttribute('tabindex', -1);
        if (e.keyCode === goForward) {
            tabFocus ++
            if (tabFocus >= tabs.length) {
            tabFocus = 0;
            }
        } else {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }
    }
    tabs[tabFocus].setAttribute('tabindex', 0);
    tabs[tabFocus].focus();
}

function changeTabPanel(e) {
    const targetTab = e.currentTarget;
    const targetPanel = targetTab.getAttribute('aria-controls-panel');
    const targetPicture = targetTab.getAttribute('aria-controls-picture');
    const tabListContainer = targetTab.parentNode;
    const mainContainer = tabListContainer.parentNode;

    function hideContent(container, content) {
        container
             .querySelectorAll(content)
             .forEach((item) => item.setAttribute('hidden', true));
    }
 
    function showContent(container, content) {
     container
         .querySelector(content)
         .removeAttribute('hidden');
 }

    hideContent(mainContainer, [`[role='tabpanel']`]);
    hideContent(mainContainer, [`[role='tabpicture']`]);

    showContent(mainContainer, [`#${targetPanel}`]);
    showContent(mainContainer, [`#${targetPicture}`]);


    tabListContainer
        .querySelector(`[aria-selected='true']`)
        .setAttribute('aria-selected', false);

    targetTab
        .setAttribute('aria-selected', true);

} 