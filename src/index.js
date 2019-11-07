import style from './index.sass';
var src = require('./bg.png');
var root = document.getElementById('root');
var img = new Image();
img.classList.add(style.pic);
img.src = src;
root.append(img);
