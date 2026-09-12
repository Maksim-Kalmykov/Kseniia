const contentInner = document.querySelector('.content__inner');
const header = document.querySelector('.header');
const content = document.querySelector('.content');
const footer = document.querySelector('.footer');
const body = document.querySelector('body');
const contentWrap = document.querySelector('.content__wrap');
const footerTextOpen = document.querySelector('.footer__image-wrap');
const footerTextMyHeart = document.querySelector('.footer__signature');
const hidden = document.querySelectorAll('.footer__signature-text-hidden');
const hidden1 = document.querySelectorAll('.footer__signature-heart-hidden');
const testButton = document.querySelector('.test__button');
const testWapper = document.querySelector('.test__wrap');




// /////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////




// ДИНАМИЧЕСКОЕ ОБНОВЛЕНИЕ ВЫСОТЫ (БЕЗ СКРОЛЛОВ)
function setAppHeight() {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}
window.addEventListener('resize', setAppHeight);
window.addEventListener('orientationchange', setAppHeight);
setAppHeight();

// /////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////




// Прелоадер



        window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        setTimeout(() => preloader.classList.add('preloader--hidden'), 3000); // меняйте 3000 на нужное значение (в миллисекундах)
    });


// Прелоадер конец


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


// Хедер



header.addEventListener('click', () => {
  contentInner.classList.toggle('content__inner--wide');
  header.classList.toggle('header--wide');
  content.classList.toggle('content--wide');
  footer.classList.toggle('footer--wide');
  contentWrap.classList.toggle('content__wrap--hidden');
  footerTextOpen.classList.toggle('footer__image-wrap--hidden');
  footerTextMyHeart.classList.toggle('footer__signature--show');




// Находим элемент, за которым будем наблюдать
const triggerElement = document.querySelector('.trigger-footer-content');

// Переменная для хранения таймера
let timeoutId = null;

// Создаём наблюдатель
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Элемент полностью появился в области просмотра
      // Отменяем старый таймер и удаляем класс (на случай повторного появления)
      if (timeoutId) clearTimeout(timeoutId);
      hidden.forEach(element => element.classList.remove('visible'));
      hidden1.forEach(element => element.classList.remove('visible'));

      // Запускаем таймер на добавление класса через 1 секунды
      timeoutId = setTimeout(() => {
        hidden.forEach(element => element.classList.add('visible'));
        timeoutId = null;
      }, 1000);

      timeoutId = setTimeout(() => {
        hidden1.forEach(element => element.classList.add('visible'));
        timeoutId = null;
      }, 3000);

    } else {
      // Элемент ушёл из области просмотра
      if (timeoutId) {
        clearTimeout(timeoutId);    // отменяем запланированное добавление
        timeoutId = null;
      }
      hidden.forEach(element => element.classList.remove('visible'));
      hidden1.forEach(element => element.classList.remove('visible'));
    }
  });
}, {
  threshold: 1,      // полное появление (1 = 100% видимости)
  rootMargin: '0px'
});

// Начинаем наблюдение
if (triggerElement) {
  observer.observe(triggerElement);
}




// Сохраняем текущую позицию скролла
  const scrollY = window.scrollY;
  
  // Получаем ширину скроллбара, чтобы страница не дёргалась при его скрытии
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  
  // Блокируем прокрутку
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.style.position = 'relative';
  
  // Через 3 секунды восстанавливаем прокрутку
  setTimeout(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.style.position = '';
    // Возвращаем позицию скролла (на случай, если за 3 секунды ничего не изменилось)
    window.scrollTo(0, scrollY);
  }, 2000);

  
});

// /////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////





// Футер



footer.addEventListener('click', () => {
  contentInner.classList.toggle('content__inner--wide');
  header.classList.toggle('header--wide');
  content.classList.toggle('content--wide');
  footer.classList.toggle('footer--wide');
  contentWrap.classList.toggle('content__wrap--hidden');
  footerTextOpen.classList.toggle('footer__image-wrap--hidden');
  footerTextMyHeart.classList.toggle('footer__signature--show');
 

// Находим оба элемента для наблюдения
const element1 = document.querySelector('.trigger-footer-content');
const element2 = document.querySelector('.footer');

// Флаги полной видимости каждого элемента
let isTriggerFooterContentFullyVisible = false;
let isFooterFullyVisible = false;

// Переменная для хранения таймера (как в оригинале)
let timeoutId = null;

// Функция, которая выполняется, когда оба элемента видны (100%)
function onBothVisible() {
  // Оригинальный код из if (entry.isIntersecting)
  if (timeoutId) clearTimeout(timeoutId);
  hidden.forEach(element => element.classList.remove('visible'));
  hidden1.forEach(element => element.classList.remove('visible'));

  timeoutId = setTimeout(() => {
    hidden.forEach(element => element.classList.add('visible'));
    timeoutId = null;
  }, 1000);

  timeoutId = setTimeout(() => {
    hidden1.forEach(element => element.classList.add('visible'));
    timeoutId = null;
  }, 3000);
}

// Функция, когда хотя бы один элемент не полностью виден
function onNotBothVisible() {
  // Оригинальный код из else
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  hidden.forEach(element => element.classList.remove('visible'));
  hidden1.forEach(element => element.classList.remove('visible'));
}

// Создаём наблюдатель с порогом 1 (100% видимости)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Обновляем флаги в зависимости от того, какой элемент изменился
    if (entry.target === element1) {
      isTriggerFooterContentFullyVisible = entry.isIntersecting;
    } else if (entry.target === element2) {
      isFooterFullyVisible = entry.isIntersecting;
    }
  });

  // Проверяем, видны ли оба элемента полностью
  if (isTriggerFooterContentFullyVisible && isFooterFullyVisible) {
    onBothVisible();
  } else {
    onNotBothVisible();
  }
}, {
  threshold: 0.77,
  rootMargin: '0px'
});

// Начинаем наблюдение за обоими элементами
if (element1) observer.observe(element1);
if (element2) observer.observe(element2);




// Сохраняем текущую позицию скролла
  const scrollY = window.scrollY;
  
  // Получаем ширину скроллбара, чтобы страница не дёргалась при его скрытии
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  
  // Блокируем прокрутку
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.style.position = 'relative';
  
  // Через 3 секунды восстанавливаем прокрутку
  setTimeout(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.style.position = '';
    // Возвращаем позицию скролла (на случай, если за 3 секунды ничего не изменилось)
    window.scrollTo(0, scrollY);
  }, 2000);




});


// Футер конец 

// /////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////




// Ждем полной загрузки страницы
window.addEventListener('load', function() {
  // Получаем элемент path
  const path = document.querySelector('.footer__image-wrap path');
  
  // Получаем длину пути
  const length = Math.ceil(path.getTotalLength());
  
  // Выводим длину на страницу
  // document.getElementById('pathLength').textContent = length + ' пикселей';
  
  // Генерируем CSS код с точной длиной
  const cssCode = `.footer__image-wrap path {
    stroke-dasharray: ${length};
    stroke-dashoffset: ${length};
    stroke: url(#b);
    stroke-width: 2;
    fill: transparent;
    animation: draw1 3s linear forwards;
  }

  @keyframes draw1 {
    to {
        stroke-dashoffset: 0;
        fill: url(#b);
    }
  }`;
  
  // document.getElementById('cssCode').textContent = cssCode;
  
  // Применяем точную длину к анимации
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  
  // console.log(`Точная длина пути: ${length}px`);
});
