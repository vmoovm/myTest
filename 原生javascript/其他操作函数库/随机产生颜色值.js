/**
 * 随机产生颜色值
 * @returns {*}  rgb(34,60,238)  一个rgb值
 */
function randomColor() {
    //randomNumber是上面定义的函数
    //写法1
    return 'rgb(' + randomNumber(255) + ',' + randomNumber(255) + ',' + randomNumber(255) + ')';

    //写法2
    //return '#'+Math.random().toString(16).substring(2).substr(0,6);

    //写法3
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += '0123456789abcdef'[randomNumber(15)];
    }
    return color;
}
