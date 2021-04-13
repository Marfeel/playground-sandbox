

async function checkAbsoluteSnapPoint(browser, cardSelector, expectedAbsoluteYposition){
    const currentAbsolutePositionYPosition = await browser.executeAsync(async (cardSelector, done) => {
        const y = document.querySelector(cardSelector).getBoundingClientRect().y
        done(y)
    }, cardSelector);

    const difference = currentAbsolutePositionYPosition - expectedAbsoluteYposition
    console.log(`
        Expected Snappoint: ${expectedAbsoluteYposition} 
        Current Snappoint: ${currentAbsolutePositionYPosition} 
        Difference: ${difference}
    `)

    if (difference >= 5 || difference <= -5){
        return false
    }

    return true
}

const checkPercentageSnapPoint = async (browser, cardSelector, expectedSnapPointPercentage)=>{
    const currentPercentage = await browser.executeAsync(async (cardSelector, done) => {
        const percentage = (document.querySelector(cardSelector).getBoundingClientRect().y)/window.innerHeight
        done(percentage)
    }, cardSelector);

    const difference = currentPercentage - expectedSnapPointPercentage
    console.log(`
        Expected Snappoint: ${expectedSnapPointPercentage} 
        Current Snappoint: ${currentPercentage} 
        Difference: ${difference}
    `)
    if (difference >= 0.05 || difference <= -0.05){
        return false
    }

    return true
}

const isAtSnapPoint = async (browser, cardSelector, snapPointValue)=>{
    let check;

    if (snapPointValue <= 1){
        check = checkPercentageSnapPoint;
    } else {
        check = checkAbsoluteSnapPoint;
    }

    let isAtSnapPoint = false;

    await browser.waitUntil(async ()=>{
        isAtSnapPoint = await check(browser, cardSelector, snapPointValue)

        return isAtSnapPoint;
    }, {
        timeout: 5000,
        interval: 500,
        timeoutMsg: `Card is not at expected snapPoint: ${snapPointValue}`
    });

    return isAtSnapPoint;
}

module.exports = {
    isAtSnapPoint,
    checkAbsoluteSnapPoint,
    checkPercentageSnapPoint
}