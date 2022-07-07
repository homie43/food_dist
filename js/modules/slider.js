function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    
    // Slider 1

    let slideIndex = 1;

    const slider = document.querySelector(container),
          slides = document.querySelectorAll(slide),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    
    // Slider 2

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    slidesField.style.width = 100 * slides.length + '%'; // для того чтобы все слайды на странице поместить в slidesField по ширине 
    slides.forEach(slide => { // устанвливаем для каждого слайда единую ширину, потому что они мб разные
        slide.style.width = width;
    });
    slidesField.style.display = 'flex'; // слайды в горизонтальное положение
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden'; // ограничиваем ширину родителя по ширине, те прячем слайды

    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        // current.textContent = slideIndex;
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // если долистал до конца, 
            offset = 0; // то переходим в начало
        } else {
            offset += deleteNotDigits(width); // offset добавляем ширину слайда, на которую смещаемся
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dotsArr.forEach(dot => dot.style.opacity = '0.5'); // тут реализуем этот функционал ** 
        dotsArr[slideIndex - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        if (offset == 0) { // если долистал до первого, 
            offset = deleteNotDigits(width) * (slides.length - 1); // то переходим в конец
        } else {
            offset -= deleteNotDigits(width); // из offset отнимаем ширину слайда, на которую смещаемся
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) { // когда на 1 слайде
            slideIndex = slides.length; // при клике смещаемся в конец
        } else {
            slideIndex--;
        }
        
        // подставляем 0
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        
        dotsArr.forEach(dot => dot.style.opacity = '0.5'); // тут реализуем этот функционал ** 
        dotsArr[slideIndex - 1].style.opacity = '1';
    });

    // Dots

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          dotsArr = []; // dot помещаем в созданный массив, для того чтобы при переключении слайдов, менялся класс активности у точек **
    dots.style.position = 'absolute';
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); // устанавливаем атрибут, который говорит что первая точка, идет к первому слайду
        dot.classList.add('dot');
        dots.append(dot);
        dotsArr.push(dot);

        if (i == 0) {
            dot.style.opacity = 1;
        }
    }
    
    dotsArr.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dotsArr.forEach(dot => dot.style.opacity = '0.5'); // тут реализуем этот функционал ** 
            dotsArr[slideIndex - 1].style.opacity = '1';
        });
    });
}

export default slider;