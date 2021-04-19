const scrollCard = async (browser, cardSelector, y) => {
  return await browser.executeAsync(
    async (cardSelector, yBrowser, done) => {
      const cardElement = document.querySelector(cardSelector);

      cardElement.parentElement.scroll(0, yBrowser);
      // cardElement.dispatchEvent(new CustomEvent("scroll", {}));
      done(cardElement.scrollLeft === 0 && cardElement.scrollTop === yBrowser);
    },
    cardSelector,
    y
  );
};

module.exports = {
  scrollCard,
};
