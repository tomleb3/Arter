export const utilService = {
    delay,
    getRandomInt,
    makeId,
    calcRate
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function calcRate(user) {
    if (!user || !user.reviews.length) return
    let sum = 0
    user.reviews.map(review => sum += review.rate)
    const rateAvg = sum / user.reviews.length
    return (Math.round(rateAvg * 100) / 100).toFixed(1)
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}