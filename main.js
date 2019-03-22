let starContainer = [];


function initStar(defaultLeft) {
    let color,
        colorNumber = Math.floor(1 + Math.random() * 4);

    if (colorNumber == 1) color = 'white';
    else if (colorNumber == 2) color = 'blue';
    else if (colorNumber == 3) color = 'red';
    else color = 'yellow';

    let star = document.createElement('div'),
        starSize = Math.floor(1 + Math.random() * 3) + 'px';

    star.className = "star " + color;
    star.style.top = Math.floor(Math.random() * (PAGE_HEIGHT - 4)) + 'px';
    star.style.left = defaultLeft || Math.floor(Math.random() * (PAGE_WIDTH - 4)) + 'px';

    star.style.width = starSize;
    star.style.height = starSize;

    starContainer.push(star);
}

function updateStarPosition() {

    for (let i = 0; i < starContainer.length; i++) {

        let leftPos = parseInt(starContainer[i].style.left);

        if (starContainer[i].className.includes('blue'))
            leftPos = leftPos + BLUE_STAR_SPEED;
        else if (starContainer[i].className.includes('red'))
            leftPos = leftPos + RED_STAR_SPEED;
        else if (starContainer[i].className.includes('yellow'))
            leftPos = leftPos + YELLOW_STAR_SPEED;
        else
            leftPos = leftPos + WHITE_STAR_SPEED;

        if (leftPos >= PAGE_WIDTH) {
            starContainer[i].remove();
            starContainer.splice(i, 1);

            continue;
        }

        starContainer[i].style.left = leftPos + 'px';
    }
}

function addNewStar() {
    initStar(START_STAR_POSITION);

    let newStar = starContainer[starContainer.length - 1];
    document.body.appendChild(newStar);
}

function addNewComet() {
    let comet = document.createElement('div');
    comet.className = "comet ";
    comet.style.top = Math.floor(Math.random() * (window.innerHeight - 4)) + 'px';
    comet.style.left = -130 + 'px';
    document.body.appendChild(comet);

    return comet;
}

function addNewSun() {
    let sun = document.createElement('div');
    sun.className = "sun";
    sun.style.top = Math.floor(Math.random() * (window.innerHeight - 4)) + 'px';
    sun.style.left = -130 + 'px';
    document.body.appendChild(sun);

    return sun;
}

function updateCometPosition(comet) {
    let leftPos = parseInt(comet.style.left);

    leftPos = leftPos + 100;
    if (leftPos >= PAGE_WIDTH) {
        comet.remove();
        return;
    }

    comet.style.left = leftPos + 'px';
}

function updateSunPosition(sun) {
    let leftPos = parseInt(sun.style.left);

    leftPos = leftPos + 5;
    if (leftPos >= PAGE_WIDTH) {
        sun.remove();
        return;
    }

    sun.style.left = leftPos + 'px';
}

function createMessage(msg) {
    let container = document.createElement('div');
    container.className = 'message';

    let p = document.createElement('p');
    let msgText = document.createTextNode(msg);
    p.appendChild(msgText);
    container.appendChild(p);


    container.style.width = '300px';
    container.style.height = '90px';

    if (document.querySelector('.message') == null) document.body.appendChild(container);
}

for (let i = 0; i < STAR_AMOUNT; i++) initStar();

for (let i = 0; i < starContainer.length; i++) document.body.appendChild(starContainer[i]);

setInterval(updateStarPosition, STAR_UPDATE_INTERVAL);
setInterval(addNewStar, STAR_CREATE_INTERVAL);

setInterval(function () {
    let comet = addNewComet();

    setInterval(function () { updateCometPosition(comet) }, COMET_UPDATE_INTERVAL);

}, COMET_CREATE_INTERVAL);

setInterval(function () {
    let sun = addNewSun();

    setInterval(function () { updateSunPosition(sun) }, 25);

}, 6000);

setTimeout(function () {
    let space = document.querySelector('svg');
    space.style.display = 'block';
    space.style.animation = 'down 10s linear';

    setTimeout(function () {
        createMessage("Eхидно посмеявшись над вами, инопланетянин отправился в сторону Нибиру");

        setTimeout(function () {
            document.querySelector('.message').remove();
        }, MESSAGE_DISAPPEAR);

    }, MESSAGE_APPEAR);

}, ALIENS_APPEARS);

