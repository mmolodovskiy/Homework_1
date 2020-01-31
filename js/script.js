var arrow = document.getElementsByClassName("slider__nav-arrow"),
    sliderItems = document.getElementById("sliderItems"),
    slide = sliderItems.querySelector(".slider__item"),
    oneSlideWidth = slide.clientWidth,
    sliderItem = document.getElementsByClassName("slider__item"),
    defaultPosition = 0,
    defaultShift = 0,
    clonedCount = 0;

for (i = 0; i < arrow.length; i++) {
    arrow[i].onclick = function (event) {
        var target = event.currentTarget;
        if ((target.tagName.toLowerCase()) == "button") {
            clickArrow(target);
        }
        else
            return;
    };
}

function clickArrow(target) {
    if (target.classList.contains("slider_left-arrow")) {
        cycleSlides(false);
        defaultPosition = parseInt(defaultPosition)+defaultShift+'%';
    }
    else {
        cycleSlides(true);
        defaultPosition = parseInt(defaultPosition)-defaultShift+'%';
    }
    sliderItems.style.left=defaultPosition;
}

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
            document.getElementsByClassName("info_button_select__items")[0].style.pointerEvents = "none";
            setTimeout(function () {
                document.getElementsByClassName("info_button_select__items")[0].style.pointerEvents = "all";
            }, 500);
            var headerBottomValue = document.getElementsByTagName('header')[0].getBoundingClientRect().top
                + document.getElementsByTagName('header')[0].getBoundingClientRect().height,
                sliderTitleTopValueInDoc = document.querySelector(".slider__top-title").getBoundingClientRect().top + pageYOffset,
                offsetPosition = sliderTitleTopValueInDoc - headerBottomValue;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            var slidesArray = Array.from(sliderItem),
                anchorsArray = Array.from(anchors),
                anchorsArrayIndex = anchorsArray.indexOf(this, 0)+1,
                selectedSlide = slidesArray[anchorsArrayIndex-1];

            for (i = 0; i <= slidesArray.length-1; i++) {
                slidesArray[i].classList.remove("slide-active");
            }

            setTimeout(function () {
                defaultPosition = sliderItems.style.left = -((anchorsArrayIndex-1) * defaultShift)+'%';
                selectedSlide.classList.add("slide-active");
            }, 500);

            if (anchorsArrayIndex >= 5) {
                cycleSlides(true);
            }
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
    e.preventDefault();
    goToHeader();
});

window.addEventListener('resize',function(){
    checkResize();
    checkPosition();
});

window.addEventListener('DOMContentLoaded',function(){
    checkResize();
    scrollToAnchor();
});