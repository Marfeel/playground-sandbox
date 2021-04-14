
const dragCardTo = async (browser, cardSelector, yPos)=>{
    await browser.executeAsync(async (cardSelector, yPos, done) => {
        const createTouch = (target, clientY, clientX = 200) => {
            return new Touch({
                identifier: 123,
                target,
                clientY,
                clientX,
                radiusX: 2.5,
                radiusY: 2.5,
                rotationAngle: 10,
                force: 0.5,
            });
        };

        let drag = async (el, y1, y2) => {
            const touchStart = createTouch(el, y1);
            const touchMove = createTouch(el, y2);
            const touchEnd = createTouch(el, undefined);

            const touchStartEvent = new TouchEvent("touchstart", { bubbles:true, touches: [touchStart] });
            const touchMoveEvent = new TouchEvent("touchmove", {bubbles:true, touches: [touchMove] });
            const touchEndEvent = new TouchEvent("touchend", {bubbles:true,  touches: [touchEnd] });

            await el.dispatchEvent(touchStartEvent);
            await el.dispatchEvent(touchMoveEvent);
            await el.dispatchEvent(touchEndEvent);
        };

        let dragTo = async (el, targetY) => {
            const { y } = await el.getBoundingClientRect();
            await drag(el, y + 15, targetY);
        };

        let dragCardTo = async (dragTarget, y) => {
            await dragTo(dragTarget, y);
        };

        let dragHandler = document.querySelector(`${cardSelector} [data-testid=cardDragTarget]`);
        
        await dragCardTo(dragHandler, yPos);

        done()
    }, cardSelector, yPos);
}

const dragCardBy = async (browser, cardSelector, dragByY)=>{
    const currentYPosition = await browser.executeAsync(async (cardSelector, done) => {
        const dragHandler = document.querySelector(`${cardSelector} [data-testid=cardDragTarget]`);
        const { y } = dragHandler.getBoundingClientRect();
        done(y)
    }, cardSelector);

    const wantedYPosition = currentYPosition+dragByY;

    console.log(`wantedYPosition: ${wantedYPosition}`);

    await dragCardTo(browser, cardSelector, wantedYPosition)
}

const touchCard = async (browser, cardSelector)=>{
    await browser.execute(async (cardSelector) => {
        const createTouch = (target, clientY, clientX = 200) => {
            return new Touch({
                identifier: 123,
                target,
                clientY,
                clientX,
                radiusX: 2.5,
                radiusY: 2.5,
                rotationAngle: 10,
                force: 0.5,
            });
        };

        let touch = async (el, y1) => {
            const touchStart = createTouch(el, y1);
            const touchEnd = createTouch(el, y1);

            const touchStartEvent = new TouchEvent("touchstart", { bubbles:true, touches: [touchStart] });
            const touchEndEvent = new TouchEvent("touchend", {bubbles:true,  touches: [touchEnd] });

            await el.dispatchEvent(touchStartEvent);
            await el.dispatchEvent(touchEndEvent);
        };

        const touchCard = async (el) => {
            const { y } = await el.getBoundingClientRect();
            await touch(el, y + 15);
        };

        const dragHandler = document.querySelector(`${cardSelector} [data-testid=cardDragTarget]`);
        await touchCard(dragHandler);
    }, cardSelector);
}

module.exports = {
    dragCardTo,
    dragCardBy,
    touchCard,
}