const { expect } = require('chai');
const { hasHeroImage } = require('../utils/heroImage.js');
const { isAttachedToEndOfPage } = require('../utils/infiniteScroll');
const { isAtSnapPoint } = require('../utils/snapPoints');
const { isCardContentLoaded } = require('../utils/cardContent');
const { isCardExisting } = require('../utils/card');

const cardExists = () => {
  return async (card) => {
    console.log(card)
    const result = await isCardExisting(browser, card.cardSelector);

    expect(result).equal(true);
  };
};

const cardHasHeroImage = () => {
  return async (card) => {
    const result = await hasHeroImage(browser, card.cardSelector);

		expect(result).equal(true);
  };
};

const cardHasProperContent = () => {
  return async (card) => {
    const result = await isCardContentLoaded(browser, card.cardSelector, card.content);

		expect(result).equal(true);
  };
};

const cardIsAttachedToEndOfPage = () => {
  return async (card) => {
    const result = await isAttachedToEndOfPage(browser, card.cardSelector);
    
    expect(result).equal(true);
  };
};

const cardIsAtSnapPoint = (snapPoint) => {
  return async (card) => {
    const result = await isAtSnapPoint(browser, card.cardSelector, snapPoint !== 'hidden' ? card.snapPoints[snapPoint] : 1);

		expect(result).equal(true);
  };
};

const cardIsInViewport = () => {
  return async (card) => {
    const element = await browser.$(card.cardSelector);
		const result = await element.isDisplayedInViewport();

		expect(result).equal(true);
  };
};

module.exports = {
  cardExists,
  cardHasHeroImage,
  cardHasProperContent,
  cardIsAttachedToEndOfPage,
  cardIsAtSnapPoint,
  cardIsInViewport
};