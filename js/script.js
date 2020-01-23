var leftArrow = document.getElementById("leftArrow");
var rightArrow = document.getElementById("rightArrow");
var sliderItems = document.getElementById("sliderItems");
var defaultPosition = 0;
var defaultShift = 20;
leftArrow.onclick = function() {
    defaultPosition = parseInt(defaultPosition)-defaultShift+'%';
    shiftPosition = sliderItems.style.left=defaultPosition;
    return shiftPosition;
};
rightArrow.onclick = function() {
    defaultPosition = parseInt(defaultPosition)+defaultShift+'%';
    shiftPosition = sliderItems.style.left=defaultPosition;
    return shiftPosition;
};

var rightSliderPos = sliderItems.getBoundingClientRect();
//var some = sliderItems.lastChild.getBoundingClientRect();
alert(rightSliderPos.right + "px");
alert(rightSliderPos.left + pageXOffset + "px");




//document.getElementById("sliderItems").children.length