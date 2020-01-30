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

    function flexBasis(percent){
        for (i = 0; i < sliderItem.length; i++) {
            sliderItem[i].style.flex = '1 0 '+percent+'%';
        }
        return defaultShift = percent;
    }

    if (document.body.clientWidth <= 499) {
        flexBasis(50);
    }
    else if (document.body.clientWidth <= 799) {
        flexBasis(34);
    }
    else if (document.body.clientWidth <= 1170) {
        flexBasis(25);
    }
    else
        flexBasis(20);
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

            var linkMenuText = this.textContent;
            document.querySelectorAll('.info_button_select__btn')[0].innerHTML = "" + linkMenuText + "";
            //document.getElementsByClassName("info_button_select__items")[0].style.pointerEvents = "none";
            var headerBottomValue = document.getElementsByTagName('header')[0].getBoundingClientRect().top
                + document.getElementsByTagName('header')[0].getBoundingClientRect().height,
                sliderTitleTopValueInDoc = document.querySelector(".slider__top-title").getBoundingClientRect().top + pageYOffset,
                offsetPosition = sliderTitleTopValueInDoc - headerBottomValue;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            var slidesArray = Array.from(sliderItem);
            var anchorsArray = Array.from(anchors);
            var anchorsArrayIndex = anchorsArray.indexOf(this, 0)+1;
            defaultPosition = sliderItems.style.left = -((anchorsArrayIndex-1) * defaultShift)+'%';
            if (anchorsArrayIndex >= 5) {
                cycleSlides(true);
            }

            var selectedSlide = slidesArray[anchorsArrayIndex-1];
            for (i = 0; i <= slidesArray.length-1; i++) {
                slidesArray[i].classList.remove("slide-active");
            }
            setTimeout(function () {
                selectedSlide.classList.add("slide-active");
            }, 330);
        })
    }
}

function goToHeader() {
    window.scrollBy(0,-50);
    if (window.pageYOffset > 0) {
        requestAnimationFrame(goToHeader);
    }
}

document.getElementById('anchorToTop').addEventListener('click', function(e) {
    e.preventDefault();  // запрет перехода по ссылке, вместо него скрипт
    goToHeader();
});

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