import { closeModal, showModal} from "./modal";
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    
    // Form
    
    // Теперь перепишем запросы в новом формате(как formData, так и JSON)

    const forms = document.querySelectorAll(formSelector);

    const message = { // объект для вывода текста при отправке формы
        loading: 'img/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Произошла ошибка'
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    // Вынесем функционал по общению с сервером fetch в одлеьную функцию

    // а тут была postData, теепрь она в services


    function bindPostData(form) { // функция для отправки данных на сервер
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            
            form.insertAdjacentElement('afterend', statusMessage); // или append()

            const formData = new FormData(form); // в верстке должен быть указан атрибут name

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data); // выводим объект в консоль(необяз)
                showThanksModal(message.success); // показываем сообщение
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset(); // в любом исходе очищаем форму
            });

        });
    }

    // Spiner on modal
    // клиент отправляет форму, появляется новое окно со спинером
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); 

        prevModalDialog.classList.add('hide');
        showModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add("modal__dialog"); // то есть мы один .modal__dialog, заменяем новым, по этому использ класс
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        // если пользователь захочет через какоето время открыть модалку, то он снова должен видеть форму
        // реализуем функционал: новый блок исчезает, старый появляется
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
}

export default forms;