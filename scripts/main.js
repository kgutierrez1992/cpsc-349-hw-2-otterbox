var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var TINY_EFFECT_CLASS = 'is-tiny';
var PREVIOUS_BUTTON_SELECTOR = '[data-button-role="back"]'
var NEXT_BUTTON_SELECTOR = '[data-button-role="forward"]'

const ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    })

}

function getThumbnailsArray() {
    'use strict';
    var thumbs = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbArray = [].slice.call(thumbs);
    return thumbArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR)
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);

    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS)
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function forwardClickEvent() {
    'use strict';
    var fwdbtn = document.querySelector(NEXT_BUTTON_SELECTOR);
    fwdbtn.addEventListener('click', function () {
        setDetailsFromThumb(nextImg());
        showDetails();
    });
}

function backClickEvent() {
    'use strict';
    var bckbtn = document.querySelector(PREVIOUS_BUTTON_SELECTOR);
    bckbtn.addEventListener('click', function () {
        setDetailsFromThumb(prevImg());
        showDetails();
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    forwardClickEvent();
    backClickEvent();
}

function nextImg() {
    'use strict';

    //Get the array
    var arry = getThumbnailsArray();
    //get current image link
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var detailImageLink = detailImage.getAttribute('src');

    //find current image in arry
    var arryindex = 0;
    while (arryindex < arry.length) {
        if (detailImageLink === imageFromThumb(arry[arryindex])) {
            break;
        } else {
            arryindex++;
        }
    }
    //if not at end. set picture to next element 
    if (arryindex < arry.length - 1) {
        return arry[arryindex + 1];
    }
    //else loopback to beginning
    else {
        return arry[0];
    }

}

function prevImg() {
    'use strict';

    //Get the array
    var arry = getThumbnailsArray();
    //get current image link
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var detailImageLink = detailImage.getAttribute('src');

    //find current image in arry
    var arryindex = 0;
    while (arryindex < arry.length) {
        if (detailImageLink === imageFromThumb(arry[arryindex])) {
            break;
        } else {
            arryindex++;
        }
    }

    //if at start of the arry setDetailsFromThumb(arry[arry.len - 1])
    if (arryindex > 0) {return arry[arryindex - 1];}

    //else setDetailsFromThumb(arry[i-1])
    else { return arry[arry.length - 1]}
}

initializeEvents();