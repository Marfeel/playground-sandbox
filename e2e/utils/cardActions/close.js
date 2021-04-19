const closeCard = async (browser, cardSelector) => {
  const contentInfo = await browser.executeAsync(async (cardSelector, done) => {
    const closeButton = document.querySelector(
      `${cardSelector} [data-testid="sticky-close-icon"]`
    );
    closeButton.click();
    done();
  }, cardSelector);

  return contentInfo;
};

module.exports = {
  closeCard,
};
