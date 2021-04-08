

const isAtAbsoluteSnapPoint = async (browser, cardSelector, expectedAbsoluteYposition)=>{
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

const isAtPercentageSnapPoint = async (browser, cardSelector, expectedSnapPointPercentage)=>{
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

module.exports = {
    isAtPercentageSnapPoint,
    isAtAbsoluteSnapPoint
}