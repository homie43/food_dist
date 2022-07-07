function tabs(tabsParentSelector, tabsContentSelector, tabsSelector, activeClass) {
    // Tabs

    const tabParent = document.querySelector(tabsParentSelector),
          tabs = document.querySelectorAll(tabsContentSelector),
          tabContent = document.querySelectorAll(tabsSelector);
    
    function hideTabContent() {
        tabContent.forEach((item) => {
            item.style.cssText = 'display: none';
        });

        tabs.forEach((tab) => {
            tab.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].style.cssText = 'display: block';
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (e) => {
        tabs.forEach((item, i) => {
            if (e.target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    });
}

export default tabs;