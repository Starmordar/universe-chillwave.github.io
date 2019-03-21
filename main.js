const STAR_AMOUNT = 50;
let starContainer = [];
const WIDTH = window.innerWidth;

function initStar(defaultLeft) {
    let setColor;

    let color = Math.floor(1 + Math.random() * 4);
    if (color == 1) setColor = 'white';
    else if (color == 2) setColor = 'blue';
    else if (color == 3) setColor = 'red';
    else setColor = 'yellow';

    let size = Math.floor(1 + Math.random() * 3) + 'px';
    let star = document.createElement('div');
    star.className = "star " + setColor;
    star.style.top = Math.floor(Math.random() * (window.innerHeight - 4)) + 'px';
    star.style.left = defaultLeft || Math.floor(Math.random() * (window.innerWidth - 4)) + 'px';
    star.style.width = size;
    star.style.height = size;
    starContainer.push(star);
}

for (let i = 0; i < STAR_AMOUNT; i++) {
    initStar();
}

for (let i = 0; i < starContainer.length; i++) {
    document.body.appendChild(starContainer[i]);
}



setInterval(function () {
    for (let i = 0; i < starContainer.length; i++) {
        let leftPos = starContainer[i].style.left;
        leftPos = leftPos.slice(0, leftPos.length - 2);
        if (starContainer[i].className.includes('blue')) {
            leftPos = Number(leftPos) + 2;
        }
        else if (starContainer[i].className.includes('red')) {
            leftPos = Number(leftPos) + 4;
        }
        else if (starContainer[i].className.includes('yellow')) {
            leftPos = Number(leftPos) + 7;
        } else {
            leftPos = Number(leftPos) + 5;
        }
        if (leftPos >= WIDTH - 5) {
            starContainer[i].remove();
            continue;
        }
        starContainer[i].style.left = leftPos + 'px';
    }
}, 25);


setInterval(function () {
    initStar('0px');
    document.body.appendChild(starContainer[starContainer.length - 1]);
}, 100)




setInterval(function () {
    let comet = document.createElement('div');
    comet.className = "comet ";
    comet.style.top = Math.floor(Math.random() * (window.innerHeight - 4)) + 'px';
    comet.style.left = -130 + 'px';
    document.body.appendChild(comet);

    setInterval(function () {
        let leftPos = comet.style.left;
        leftPos = leftPos.slice(0, leftPos.length - 2);
        leftPos = Number(leftPos) + 100;
        if (leftPos >= WIDTH) {
            comet.remove();
        }
        comet.style.left = leftPos + 'px';
    }, 15);

}, 500);

function createMessage(msg) {
    let container = document.createElement('div');
    container.className = 'message';
    let msgCon = document.createElement('p');
    let msgText = document.createTextNode(msg);
    msgCon.appendChild(msgText);
    container.appendChild(msgCon);


    container.style.width = '300px';
    container.style.height = '90px';
    if (document.querySelector('.message') == null) document.body.appendChild(container);
}

setTimeout(function () {
    let space = document.querySelector('svg');
    space.style.display = 'block';
    space.style.animation = 'down 10s linear';
    setTimeout(function () {
        createMessage("Eхидно посмеявшись над вами, инопланетянин отправился в сторону Нибиру");

        setTimeout(function () {
            document.querySelector('.message').remove();
        }, 5000);

    }, 2500);
}, 500);

