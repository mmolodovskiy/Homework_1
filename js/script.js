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
    const anchors = [].slice.call(document.querySelectorAll('.info_button_select__items a[href*="#"]')),
        animationTime = 300,
        framesCount = 20;

    anchors.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
            let scroller = setInterval(function() {
                let scrollBy = coordY / framesCount;
                if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                    window.scrollBy(0, scrollBy);
                } else {
                    window.scrollTo(0, coordY);
                    clearInterval(scroller);
                }
            }, animationTime / framesCount);
        });
    });
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