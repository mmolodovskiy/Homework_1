var leftArrow = document.getElementById("leftArrow");
var rightArrow = document.getElementById("rightArrow");
var sliderItems = document.getElementById("sliderItems");
var sliderItem = document.getElementsByClassName("slider__item");
var defaultPosition = 0;
var defaultShift = null;

function lefttArrowClick() {
    leftArrow.onclick = function() {
        defaultPosition = parseInt(defaultPosition)-defaultShift+'%';
        shiftPosition = sliderItems.style.left=defaultPosition;
    };
}

function rightArrowClick() {
    rightArrow.onclick = function() {
        defaultPosition = parseInt(defaultPosition)+defaultShift+'%';
        shiftPosition = sliderItems.style.left=defaultPosition;
    };
}

var slide = sliderItems.querySelector(".slider__item");
var oneSlideWidth = slide.clientWidth;

function checkPosition() {
    // var j = sliderItem.length;
    // console.log('Количество слайдов: ' + j);
    for (i = 0; i < sliderItem.length; i++) {
        var dist = sliderItem[i].getBoundingClientRect();
        if (dist.left > 0 && dist.left < oneSlideWidth) {
            console.log('dist.left: ' + dist.left);
            console.log('Слайд №' + sliderItem[i]);
            sliderItem[i].clientLeft = 0;
        }
    }


    // var dist = sliderItem.getBoundingClientRect();
    //
    //      if (dist.left > 0 && dist.left < oneSlideWidth) {
    //          console.log('dist.left: ' + dist.left);
    //          console.log('Слайд №' + sliderItems[i]);
    //          sliderItems[i].clientLeft = 0;
    //      }
    // }
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

lefttArrowClick();
rightArrowClick();

window.addEventListener('resize',function(){
    checkPosition();
    checkResize();
    lefttArrowClick();
    rightArrowClick();
});

window.addEventListener('DOMContentLoaded',function(){
    checkResize();
    lefttArrowClick();
    rightArrowClick();
});