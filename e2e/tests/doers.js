const { card } = require('./actions');
const { scroll, touch } = require('./gestures');
const { browser: { getBrowserInnerSizes } } = require('./utils');
const { snapPoints } = require('./selectors');

const dragToSnapPoint = (snapPoint) => {
    return async (card) => {
        const value = snapPoint !== 'hidden' ? snapPoints.parseSnapPointValue(card.snapPoints[snapPoint]) : 1;
        const { y } = await getBrowserInnerSizes(browser);

        await touch.dragCardTo(browser, card.cardSelector, value > 1 ? value : value * y);
    };
};

const scrollToTrigger = (trigger) => {
    return async (card) => {
        await scroll.scrollByStep(browser, card.triggers[trigger].spec.pixel);
    };
};

const scrollToTriggerElement = (trigger) => {
    return async (card) => {
        await scroll.scrollToElementStep(browser, card.triggers[trigger].spec.selector);
    };
}

const scrollViewport = (times = 1) => {
    return async () => {
        const viewport = await getBrowserInnerSizes(browser);

        await scroll.scrollByStep(browser, viewport.y * times);
    };
};

const touchCard = () => {
    return async (card) => {
        await touch.touchCard(browser, card.cardSelector);
    };
};

const touchCloseButton = () => {
    return async (card) => {
        await touch.touchCloseButton(browser, card.cardSelector);
    };
};

const touchElementInsideCard = (element) => {
    return async (card) => {
        await touch.touchElementInsideCard(browser, card.cardSelector, element);
    };
};

const triggerInfiniteScroll = () => {
    return async () => {
        await card.triggerInfiniteScroll(browser);
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