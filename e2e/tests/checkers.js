const { expect } = require('chai');
const selectors = require('./selectors');
const { chore } = require('./utils');

const cardExists = () => {
  return async (card) => {
    const evaluate = async () => await selectors.card.exists(browser, card.cardSelector);
    const result = await chore.waitUntil(browser, evaluate, true, { timeoutMsg: 'Card doesnt exist' });

    expect(result).equal(true);
  };
};

const cardHasHeroImage = () => {
  return async (card) => {
    const result = await selectors.card.hasHeroImage(browser, card.cardSelector);

		expect(result).equal(true);
  };
};

const cardHasProperContent = () => {
  return async (card) => {
    const expected = card.content.url.replace('${PLAYGROUND_PROXY}/${CURRENT_HOSTNAME}', '');
    const evaluate = async () => {
      const content = await selectors.card.getShadowRootContent(browser, card.cardSelector);
      return content.url.includes(expected);
    };
    const result = await chore.waitUntil(browser, evaluate, true, { timeoutMsg: 'Card content is not correct' });

		expect(result).equal(true);
  };
};

const cardIsAttachedToEndOfPage = () => {
  return async (card) => {
    const evaluate = async () => {
      const style = await selectors.styles.getCardPositionerStyles(browser, card.cardSelector);
      return style.includes('position: sticky');
    };
    const result = await chore.waitUntil(browser, evaluate, true, { timeoutMsg: 'Card positioner is not sticky' });

		expect(result).equal(true);
  };
};

const cardIsAtSnapPoint = (snapPoint) => {
  return async (card) => {
    const value = snapPoint !== 'hidden' ? selectors.snapPoints.parseSnapPointValue(card.snapPoints[snapPoint]) : 1;
    const evaluate = async () => {
      const { current, expected } = await selectors.snapPoints.calculateCurrentAndExpectedValues(browser, card.cardSelector, value);
      const difference = current - expected;

      console.log(`
            Expected Snappoint: ${expected} 
            Current Snappoint: ${current} 
            Difference: ${difference}
        `);
    
      if (isNaN(difference) || difference >= 5 || difference <= -5) {
        return false;
      }
    
      return true;
    };
    const result = await chore.waitUntil(browser, evaluate, true, { timeoutMsg: `Card is not at expected ${snapPoint} position` });

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

const hostIsGated = (trigger) => {
  return async (card) => {
    const t = card.triggers[trigger];
    const a = t.action || t.actions.filter(a => a.startsWith('lockContent:'))[0];
    const querySelector = a.split(':')[1];
    const evaluate = async () => {
      const style = await selectors.styles.getElementStyles(browser, querySelector);
      return style.includes('overflow: hidden') && style.includes('position: relative');
    };
    const result = await chore.waitUntil(browser, evaluate, true, { timeoutMsg: 'Host content is not gated' });

		expect(result).equal(true);
  };
};

module.exports = {
  cardExists,
  cardHasHeroImage,
  cardHasProperContent,
  cardIsAttachedToEndOfPage,
  cardIsAtSnapPoint,
  cardIsInViewport,
  hostIsGated
};