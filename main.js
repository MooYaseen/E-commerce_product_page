const mainImage = document.querySelector('#main-image');
const thumbnails = document.querySelectorAll('.image-container .thumbnail img');



const imageScreen = document.querySelector('#image-screen');
const imageScreenThumbnails = document.querySelectorAll('#image-screen .thumbnails .thumbnail')
console.log(imageScreenThumbnails)
const mainImageScreen = document.querySelector('#image-screen .main-image');
const closeImageScreen = document.querySelector('#image-screen .close')
const next = document.querySelector('#image-screen .img .next')
const prev = document.querySelector('#image-screen .img .prev')
let currentThumb = 0





// changing the main image 
// toggle active class to main thumbnails
thumbnails.forEach((img, index) => {
    img.addEventListener('click', (e) => {

        thumbnails.forEach(ele => {
            ele.parentElement.classList.remove('active')
        })
        e.currentTarget.parentElement.classList.add('active')

        imageScreenThumbnails.forEach(thumb => {
            thumb.classList.remove('active')
        })
        imageScreenThumbnails[index].classList.add('active')
        currentThumb = index

        mainImage.setAttribute('src', `images/image-product-${index + 1}.jpg`)
        mainImageScreen.setAttribute('src', `images/image-product-${index + 1}.jpg`)
    })
});

// show image splash screen
mainImage.addEventListener('click', () => {
    if (window.innerWidth > 991) {
        imageScreen.classList.add('show')
    }
})

// hide image splash screen - two different ways
imageScreen.addEventListener('click', (e) => {
    if (e.target === e.currentTarget || e.target === closeImageScreen) {
        e.currentTarget.classList.remove('show')
        console.log(e.target)
    }
})
document.addEventListener('keydown', (e) => {
    if (imageScreen.classList.contains('show') && e.key === 'Escape') {
        imageScreen.classList.remove('show');
    }
})


// change main image in image splash screen
// toggle ative class to thumbnails
//? next image
next.addEventListener('click', () => {
    imageScreenThumbnails[currentThumb].classList.remove('active')
    currentThumb++
    console.log(currentThumb)
    if (currentThumb === thumbnails.length) {
        currentThumb = 0
    }
    imageScreenThumbnails[currentThumb].classList.add('active')
    mainImageScreen.setAttribute('src', `images/image-product-${currentThumb + 1}.jpg`)
})

//? previous image
prev.addEventListener('click', () => {
    imageScreenThumbnails[currentThumb].classList.remove('active')
    if (currentThumb === 0) {
        currentThumb = imageScreenThumbnails.length
    }
    currentThumb--
    console.log(currentThumb)
    imageScreenThumbnails[currentThumb].classList.add('active')
    mainImageScreen.setAttribute('src', `images/image-product-${currentThumb + 1}.jpg`)
})

// end images

// start cart

// show cart list

const cartIcon = document.querySelector('.cart-profile .cart')
const cartList = document.querySelector('.cart-list')

cartIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    cartList.classList.toggle('show')
})


document.addEventListener('click', (e) => {
    if (cartList.classList.contains('show') && !cartList.contains(e.target)) {
        cartList.classList.remove('show');
    }
});


// add to cart button

const amount = document.querySelector('.item-details .add-to-cart .amount')
const plus = document.querySelector('.item-details .add-to-cart .plus')
const minus = document.querySelector('.item-details .add-to-cart .minus')


plus.addEventListener('click', (e) => {
    amount.textContent++
})





minus.addEventListener('click', (e) => {
    if (amount.textContent > 0) {
        amount.textContent--
    }
})




// hold click to continously adding or removing items

let increaseInterval;
let Timeout

plus.addEventListener('mousedown', () => {
    Timeout = setTimeout(() => {
        increaseInterval = setInterval(() => {
            amount.textContent++;
        }, 100);
    }, 500);
});

document.addEventListener('mouseup', () => {
    clearInterval(decreaseInterval);
    clearInterval(increaseInterval);
    clearTimeout(Timeout)
});

let decreaseInterval; // متغير نخزن فيه الـ ID

minus.addEventListener('mousedown', () => {
    Timeout = setTimeout(() => {
        decreaseInterval = setInterval(() => {
            amount.textContent--;
            if (amount.textContent == 0) {
                clearInterval(decreaseInterval);
            }
        }, 100);
    }, 500);
});







const cartCount = document.querySelector('.header .cart-profile .cart-count')
const addToCart = document.querySelector('.item-details .add-to-cart .add-btn')

const emptyCart = document.querySelector('.cart-list .empty')
const cartItem = document.querySelector('.cart-list .cart-item')

const price = document.querySelector('.item-details .price .current .number')
const totalPrice = document.querySelector('.cart-list .cart-item .total-price .number')

const calcNumber = document.getElementById('item-number')

let cartNumber, amountNumber, priceNumber

addToCart.addEventListener('click', () => {
    let cartNumber = parseInt(cartCount.textContent)
    let amountNumber = parseInt(amount.textContent)
    let priceNumber = parseInt(price.textContent)
    if (amount.textContent > 0) {

        cartCount.textContent = cartNumber + amountNumber
        cartNumber = cartNumber + amountNumber

        calcNumber.textContent = cartNumber

        cartCount.classList.add('show')
        emptyCart.classList.remove('show')
        cartItem.classList.add('show')

        totalPrice.textContent = cartNumber * priceNumber

        amount.textContent = '0'
    }
})


// check out

const checkOut = document.querySelector('.cart-list .checkout-btn')

checkOut.addEventListener('click', () => {
    emptyCart.classList.add('show')
    cartItem.classList.remove('show')
    cartCount.textContent = '0'
    let time = setTimeout(() => {
        cartCount.classList.remove('show')
        clearTimeout(time)
    }, 500);
})

const deleteBtn = document.querySelector('.cart-list .delete-btn')

deleteBtn.addEventListener('click', () => {
    emptyCart.classList.add('show')
    cartItem.classList.remove('show')
    cartCount.textContent = '0'
    let time = setTimeout(() => {
        cartCount.classList.remove('show')
        clearTimeout(time)
    }, 500);
})





const showMenu = document.getElementById('menu')
const navMenu = document.querySelector('.header .nav')
const hideMenu = document.querySelector('.header .nav li a.close')

showMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.add('show')
})

hideMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.remove('show')
})


document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show') && !navMenu.contains(e.currentTarget)) {
        navMenu.classList.remove('show')
    }
})


const mobilePrev = document.querySelector('.image-container .prev')
const mobileNext = document.querySelector('.image-container .next')

mobileNext.addEventListener('click', () => {
    currentThumb++
    if (currentThumb == thumbnails.length) {
        currentThumb = 0
    }
    mainImage.setAttribute('src', `images/image-product-${currentThumb + 1}.jpg`)
})

mobilePrev.addEventListener('click', () => {
    if (currentThumb === 0) {
        currentThumb = imageScreenThumbnails.length
    }
    currentThumb--
    mainImage.setAttribute('src', `images/image-product-${currentThumb + 1}.jpg`)
})


