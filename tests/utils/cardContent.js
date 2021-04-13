


const hasRightContentLoaded = async (browser, cardSelector)=>{
    const currentPercentage = await browser.executeAsync(async (cardSelector, done) => {
        const percentage = (document.querySelector(`${cardSelector} article`).firstElementChild.shadowRoot.DOCUMENT_NODE)
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
    hasRightContentLoaded
}