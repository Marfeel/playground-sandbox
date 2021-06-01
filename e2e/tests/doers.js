const { closeCard } = require('../utils/card-actions/close');
const { dragCardTo } = require('../utils/touch');
const { getBrowserInnerSizes } = require('../utils/browser');
const { scrollByStep, scrollToElementStep } = require('../utils/scroll');
const { touchCard: touchCardImpl, touchElementInsideCard: touchElementInsideCardImpl } = require('../utils/touch');
const { triggerInfiniteScroll: triggerInfiniteScrollImpl } = require('../utils/infiniteScroll');
const { getSnapPointValue } = require('../utils/snapPoints');

const dragToSnapPoint = (snapPoint) => {
    return async (card) => {
        const value = snapPoint !== 'hidden' ? getSnapPointValue(card.snapPoints[snapPoint]) : 1;
        const { y } = await getBrowserInnerSizes(browser);

        await dragCardTo(browser, card.cardSelector, value > 1 ? value : value * y);
    };
};

const scrollToTrigger = (trigger) => {
    return async (card) => {
        await scrollByStep(browser, card.triggers[trigger].spec.pixel);
    };
};

const scrollToTriggerElement = (trigger) => {
    return async (card) => {
        await scrollToElementStep(browser, card.triggers[trigger].spec.selector);
    };
}

const scrollViewport = (times = 1) => {
    return async () => {
        const viewport = await getBrowserInnerSizes(browser);

        await scrollByStep(browser, viewport.y * times);
    };
};

const touchCard = () => {
    return async (card) => {
        await touchCardImpl(browser, card.cardSelector);
    };
};

const touchCloseButton = () => {
    return async (card) => {
        await closeCard(browser, card.cardSelector);
    };
};

const touchElementInsideCard = (element) => {
    return async (card) => {
        await touchElementInsideCardImpl(browser, card.cardSelector, element);
    };
};

const triggerInfiniteScroll = () => {
    return async () => {
        await triggerInfiniteScrollImpl(browser);
    };
};

module.exports = {
    dragToSnapPoint,
    scrollToTrigger,
    scrollToTriggerElement,
    scrollViewport,
    touchCard,
    touchCloseButton,
    touchElementInsideCard,
    triggerInfiniteScroll
};