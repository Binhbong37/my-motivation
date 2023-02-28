const autoRotate = true;
const rotateSpeed = -60;
let radius = 300;

const respon821 = window.matchMedia('(max-width: 821px)');
const respon625 = window.matchMedia('(max-width: 625px)');

if (respon821.matches) {
    radius = 250;
}

if (respon625.matches) {
    radius = 150;
}

setTimeout(init, 100);

document.body.addEventListener('click', () => {
    document.getElementById('autoPlayAudio').play();
    document.getElementById('touch-me').style.display = 'none';
    console.log('Clicked');
});

const obox = document.getElementById('drag-container');
const ospin = document.getElementById('spin-container');
const aImg = ospin.getElementsByTagName('img');
const aVid = ospin.getElementsByTagName('video');

const aEle = [...aImg, ...aVid];

const ground = document.getElementById('ground');
ground.style.width = radius * 3 + 'px';
ground.style.height = radius * 3 + 'px';

function init(delayTime) {
    for (let i = 0; i < aEle.length; i++) {
        aEle[i].style.transform =
            'rotateY(' +
            i * (360 / aEle.length) +
            'deg) translateZ(' +
            radius +
            'px)';
        aEle[i].style.transition = 'transform 1s';
        aEle[i].style.transitionDelay =
            delayTime || (aEle.length - i) / 4 + 's';
    }
}

function applyTranform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;

    obj.style.transform = 'rotateX(' + -tY + 'deg) rotateY(' + tX + 'deg)';
}

function playSpin(yes) {
    ospin.style.animationPlayState = yes ? 'running' : 'paused';
}

var sX,
    sY,
    nX,
    nY,
    desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

if (autoRotate) {
    const animationName = rotateSpeed > 0 ? 'spin' : 'spinRevert';
    ospin.style.animation = `${animationName} ${Math.abs(
        rotateSpeed
    )}s infinite linear`;
}

document.onpointerdown = function (e) {
    clearInterval(obox.timer);
    e = e || window.event;
    var sX = e.clientX,
        sY = e.clientY;

    this.onpointermove = function (e) {
        e = e || window.event;
        var nX = e.clientX,
            nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(obox);
        sX = nX;
        sY = nY;
    };

    this.onpointerup = function (e) {
        obox.timer = setInterval(function () {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(obox);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(obox.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };

    return false;
};

document.onmousewheel = function (e) {
    e = e || window.event;
    const d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
};
