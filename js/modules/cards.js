import {getResurce} from '../services/services';

function cards() {
    
    // Классы для карточек

    class MenuCard {
        constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.classes = classes || 'menu__item';
            this.price = price;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div'); // СОЗДАЕМ элемент и помещаем его на стр, в html удаляем
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // функция getResurse позволит получть из БД данные по карточкам меню, чтобы их здесь не прописывать
    // она похожа на ту что мы использовали для постинга данных с формы 

    //тут была getResurces


    getResurce('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { 
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render(); 
            });
        });
}

export default cards;