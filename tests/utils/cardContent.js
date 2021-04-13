
const playgroundUrlPlaceholders = '${PLAYGROUND_PROXY}/${CURRENT_HOSTNAME}'

const getCardAMPContent = async (browser, cardSelector) => {
    const contentInfo = await browser.executeAsync(async (cardSelector, done) => {
        let amp = document.querySelector(`${cardSelector} article`).firstElementChild.shadowRoot.AMP
        let info = {url: amp.url, title: amp.title};
        done(info)
    }, cardSelector); 

    return contentInfo
}

const hasRightContentLoaded = async (browser, cardSelector, contentConfig) => {
    const expectedUrl = contentConfig.url.includes(playgroundUrlPlaceholders) ? 
    contentConfig.url.replace(playgroundUrlPlaceholders, '') :
    contentConfig.url;
    
    const contentInfo = await getCardAMPContent(browser, cardSelector);
    
    return contentInfo.url.includes(expectedUrl);
}

module.exports = {
    hasRightContentLoaded
}