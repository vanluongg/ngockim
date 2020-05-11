var index = 0;
var listItemsSlider = document.querySelectorAll('.slider-item');

showSliderAuto();
showSlider(index);

function nextView() {
    index = index + 1;
    if (index > listItemsSlider.length-1) {
        index = 0;
    }

    showSlider(index);
}

function priveView() {
    index = index - 1;
    if (index == -1) {
        index = listItemsSlider.length - 1;
    }

    showSlider(index);
}

function showSlider(index) {
    for (var i = 0; i < listItemsSlider.length; i++) {
        listItemsSlider[i].style.display = 'none';
    }

    listItemsSlider[index].style.display = 'block';

    resetStyleOption(index);
}

function showSliderAuto() {
    for (var i = 0; i < listItemsSlider.length; i++) {
        listItemsSlider[i].style.display = 'none';
    }

    if (index >= listItemsSlider.length) {
        index = 0;
    }

    listItemsSlider[index].style.display = 'block';

    resetStyleOption(index);
    index++;

    setTimeout(showSliderAuto, 3000);
}

function changeIndex(index) {
    showSlider(index);
}

function resetStyleOption(index) {
    var listOption = document.querySelectorAll(".btn-change");

    for (let i = 0; i < listOption.length; i++) {
        listOption[i].style.color = 'white';
        listOption[i].style.fontSize = '10px';
    }

    listOption[index].style.color = 'black';
    listOption[index].style.fontSize = '16px';
}
