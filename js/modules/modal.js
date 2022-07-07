function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show'); // необходимо из верстки убрать класс hide
    document.body.style.overflow = 'hidden'; // прокрутка стр при вызове онка откл
    

    console.log(modalTimerId);
    if (modalTimerId) { // очитска таймера будет, только если есть modalTimerId
        clearInterval(modalTimerId); // если пользователь уже открыл модальное окно, то по таймеру оно запускаться не будет 
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = 'visible'; // прокрутка вкл
}

function modal(modalSelector, triggerSelector, modalTimerId) { // modalTimerId передаем везде где вызывается showModal
    
    // Modal

    const modal = document.querySelector(modalSelector),
          modalTriger = document.querySelectorAll(triggerSelector);

    
    modalTriger.forEach(btn => {
        btn.addEventListener('click', () => showModal(modalSelector, modalTimerId)); // обернули showModal в стрелочную функцию, потому что в коллбэк в обработчике нельзя сразу вызывать функцию
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") { // если объект клика это modal, а не modal__dialog, то закрываем окно || если getAttribute(true or false) вернул пустую строку то тоже закрываем окно
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) { //  проверяется код события
            closeModal(modalSelector);
        }
    });

    // когда-то тут был const modalTimerId = setTimeout(showModal, 6000), теперь он в главном скрипте

    // Modal при прокрутке в самый низ

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // если сумма того на сколько пролистана страница вниз совпадает с высотой элемента >= высоты элемента с прокруткой
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    // window.addEventListener('scroll', showModalByScroll);
}

export default modal;

export {closeModal};
export {showModal}; 