let elementsOfTheUniverse = [];

function createAndAddStarToPage(defaultLeft) {
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

    elementsOfTheUniverse.push(star);

    document.body.appendChild(star);
}

function createAndAddElementToPage(classProp) {
    let element = document.createElement('div');
    element.className = classProp;
    element.style.top = Math.floor(Math.random() * (window.innerHeight - 4)) + 'px';
    element.style.left = -130 + 'px';

    document.body.appendChild(element);
    elementsOfTheUniverse.push(element);
}

function updateElementsPosition() {

    for (let i = 0; i < elementsOfTheUniverse.length; i++) {
        let leftPos = parseInt(elementsOfTheUniverse[i].style.left);

        if (elementsOfTheUniverse[i].className.includes('star')) {
            if (elementsOfTheUniverse[i].className.includes('blue'))
                leftPos += BLUE_STAR_SPEED;
            else if (elementsOfTheUniverse[i].className.includes('red'))
                leftPos += RED_STAR_SPEED;
            else if (elementsOfTheUniverse[i].className.includes('yellow'))
                leftPos += YELLOW_STAR_SPEED;
            else
                leftPos += WHITE_STAR_SPEED;
        }
        else if (elementsOfTheUniverse[i].className.includes('comet'))
            leftPos += COMET_SPEED;

        else if (elementsOfTheUniverse[i].className.includes('sun'))
            leftPos += SUN_SPEED;


        if (leftPos >= PAGE_WIDTH) {
            elementsOfTheUniverse[i].remove();
            elementsOfTheUniverse.splice(i, 1);

            continue;
        }

        elementsOfTheUniverse[i].style.left = leftPos + 'px';
    }
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

for (let i = 0; i < INITIAL_STAR_AMOUNT; i++) createAndAddStarToPage();

setInterval(updateElementsPosition, STAR_UPDATE_INTERVAL);

setInterval(() => {
    createAndAddStarToPage(START_STAR_POSITION);
}, STAR_CREATE_INTERVAL);

setInterval(() => {
    createAndAddElementToPage('comet');
}, COMET_CREATE_INTERVAL);

setInterval(() => {
    createAndAddElementToPage('sun');
}, SUN_CREATE_INTERVAL);

setTimeout(function () {
    let space = document.querySelector('svg');
    space.style.display = 'block';
    space.style.animation = 'goDown 10s linear';

    setTimeout(function () {
        createMessage("Eхидно посмеявшись над вами, инопланетянин отправился в сторону Нибиру");

        setTimeout(function () {
            document.querySelector('.message').remove();
        }, MESSAGE_DISAPPEAR);

    }, MESSAGE_APPEAR);

}, ALIENS_APPEARS);

