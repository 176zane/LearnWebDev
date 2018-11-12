var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* 迭代图片 */
for (var i = 1; i < 6; i++) {
    var imageName = 'images/pic' + i + '.jpg';
    var newImage = document.createElement('img');
    newImage.setAttribute('src', imageName);
    thumbBar.appendChild(newImage);

    newImage.onclick = function(e) {
        var source = e.target.getAttribute('src');
        setDisplayedImage(source);
    }
}

function setDisplayedImage(source) {
    displayedImage.setAttribute('src', source);
}

/* 编写 变亮/变暗按钮 处理器 */
btn.onclick = function() {
    var className = btn.getAttribute('class');
    if (className === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = '变亮';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }else {
        btn.setAttribute('class', 'dark');
        btn.textContent = '变暗';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}