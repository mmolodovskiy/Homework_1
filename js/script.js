var leftArrow = document.getElementById("leftArrow");
var rightArrow = document.getElementById("rightArrow");
var sliderItems = document.getElementById("sliderItems");
var sliderItem = document.getElementsByClassName("slider__item");
var defaultPosition = 0;
var defaultShift = null;

function clickLefttArrow() {
    leftArrow.onclick = function() {
        defaultPosition = parseInt(defaultPosition)-defaultShift+'%';
        sliderItems.style.left=defaultPosition;
    };
}

function clickRightArrow() {
    rightArrow.onclick = function() {
        defaultPosition = parseInt(defaultPosition)+defaultShift+'%';
        sliderItems.style.left=defaultPosition;
    };
}

var slide = sliderItems.querySelector(".slider__item");
var oneSlideWidth = slide.clientWidth;

function checkPosition() {
    for (i = 0; i < sliderItem.length; i++) {
        var dist = sliderItem[i].getBoundingClientRect();
        if (dist.left > 0 && dist.left < oneSlideWidth) {
            defaultPosition = sliderItems.style.left = 0;
        }
    }
}

function checkResize() {
    if (document.body.clientWidth <= 499) {
        for (i = 0; i < sliderItem.length; i++) {
            sliderItem[i].style.flex = '1 0 50%';
        }
        return defaultShift = 50;
    }
    else
        if (document.body.clientWidth <= 799) {
            for (i = 0; i < sliderItem.length; i++) {
                sliderItem[i].style.flex = '1 0 34%';
            }
            return defaultShift = 34;
        }
        else
            if (document.body.clientWidth <= 1170) {
                for (i = 0; i < sliderItem.length; i++) {
                    sliderItem[i].style.flex = '1 0 25%';
                }
                return defaultShift = 25;
            }
            else
                for (i = 0; i < sliderItem.length; i++) {
                    sliderItem[i].style.flex = '1 0 20%';
                }
                return defaultShift = 20;
}

function cloneSlider() {
}

window.addEventListener('resize',function(){
    checkResize();
    checkPosition();
});

window.addEventListener('DOMContentLoaded',function(){
    checkResize();
    clickLefttArrow();
    clickRightArrow();
    cloneSlider();
});






// var slide = sliderItems.querySelector(".slider__item");
// var oneSlideWidth = slide.clientWidth;
// var sliderWrapper = document.getElementById("sliderWrapper");
//
// function checkPosition() {
//     for (i = 0; i < sliderItem.length; i++) {
//         var dist = sliderItem[i].getBoundingClientRect();
//         if (dist.left > 0 && dist.left < oneSlideWidth) {
//             var aa = sliderWrapper.offsetParent.offsetLeft;
//             var ss = ((dist.left - aa)/document.body.clientWidth)*100;
//             defaultShift = sliderItems.style.left=parseInt(defaultPosition)-ss+'%';
//             return defaultShift;
//         }
//     }
// }
