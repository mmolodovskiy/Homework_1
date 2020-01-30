var leftArrow = document.getElementById("leftArrow"),
    rightArrow = document.getElementById("rightArrow"),
    sliderItems = document.getElementById("sliderItems"),
    sliderItem = document.getElementsByClassName("slider__item"),
    defaultPosition = 0,
    defaultShift = 0,
    clonedCount = 0;

function clickLeftArrow() {
    leftArrow.onclick = function() {
        cycleSlides(true);
        defaultPosition = parseInt(defaultPosition)-defaultShift+'%';
        sliderItems.style.left=defaultPosition;
    };
}

function clickRightArrow() {
    rightArrow.onclick = function() {
        cycleSlides(false);
        defaultPosition = parseInt(defaultPosition)+defaultShift+'%';
        sliderItems.style.left=defaultPosition;
    };
}

var slide = sliderItems.querySelector(".slider__item"),
    oneSlideWidth = slide.clientWidth;

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
    else if (document.body.clientWidth <= 799) {
        for (i = 0; i < sliderItem.length; i++) {
            sliderItem[i].style.flex = '1 0 34%';
        }
        return defaultShift = 34;
    }
    else if (document.body.clientWidth <= 1170) {
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

function cycleSlides(isLeft) {
    var slidesCount = sliderItem.length;

    function cloneSlides(isLeft) {
        var cloned = sliderItem[isLeft ? clonedCount : sliderItem.length - 1].cloneNode(true);
        isLeft ? sliderItems.append(cloned) : sliderItems.prepend(cloned);
    }

    var xx = -(parseInt(defaultPosition))/defaultShift;
    var yy = sliderItem.length-(-(parseInt(defaultPosition))/defaultShift);

    if (isLeft && xx >= slidesCount - 5) {
        cloneSlides(isLeft);
        clonedCount++;
    }
    else if (!isLeft && xx == 0) {
        cloneSlides(isLeft);
        clonedCount--;
    }
}

function scrollToAnchor() {
    var anchors = document.querySelectorAll('a.info_button_link');

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var attr = anchor.getAttribute('href');
            var slideArray = Array.from(sliderItem);
            var anchorArray = Array.from(anchors);
            var anchorArrayIndex = anchorArray.indexOf(this, 0)+1;
            var gtgtg = slideArray[anchorArrayIndex-1];
            console.log(anchorArrayIndex);
            for (i = 0; i <= slideArray.length-1; i++) {
                    slideArray[i].classList.remove(".slide-active");
                }
            gtgtg.classList.add(".slide-active");

            // for (i = 0; i <= slideArray.length-2; i++) {
            //     if (slideArray.indexOf(i, 0) == anchorArray.indexOf(i, 0)) {
            //         console.log(this);
            //         slideArray[i].classList.add(".slide-active");
            //     }
            // }

            var headerBottomValue = document.getElementsByTagName('header')[0].clientHeight;
            var sliderTopValue = sliderItems.getBoundingClientRect().top;
            var heightSliderTitle = document.querySelector(".slider__top-title").offsetHeight;
            var offsetPosition = sliderTopValue - headerBottomValue - heightSliderTitle;
            var aa = document.querySelector(".slider__top-title").getBoundingClientRect().top;
            var bb = document.getElementsByTagName('header')[0].clientHeight
                + document.getElementsByTagName('header')[0].getBoundingClientRect().top;
            console.log(aa);
            console.log(bb);

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        })
    }
}

window.addEventListener('resize',function(){
    checkResize();
    checkPosition();
});

window.addEventListener('DOMContentLoaded',function(){
    checkResize();
    scrollToAnchor();
    clickLeftArrow();
    clickRightArrow();
});