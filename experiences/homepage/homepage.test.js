const { bootstrapExperience } = require("../../e2e/utils/bootstrap");
const { scrollTo, scroll } = require("../../e2e/utils/scroll");
const { touchCard } = require("../../e2e/utils/touch");
const { scrollCard } = require("../../e2e/utils/cardActions/scroll");
const { closeCard } = require("../../e2e/utils/cardActions/close");
const { isAtSnapPoint } = require("../../e2e/utils/snapPoints");
const { isCardContentLoaded } = require("../../e2e/utils/cardContent");
const { expect } = require("chai");
const { getUrlFixture } = require("../../e2e/utils/fixtureUrl");
const experience = require("./homepage.json");

describe("homepage experience", function () {
  let homepageConfig, fixture;
  const fixtureUrl = getUrlFixture({
    siteUrl: "https://playground.marfeel.com/templates/article-skeleton.html",
    requestHostname: "playground.marfeel.com",
    technology: "web",
    experienceUrl: "/experiences/homepage/homepage.json",
  });

  // Setup
  before(async () => {
    homepageConfig = experience.cards.homepage;
    fixture = {
      url: fixtureUrl,
      articleTitle: "Article example",
    };

    await bootstrapExperience(browser, experience, fixture);
  });

  it("card should render on scroll", async function () {
    await scrollTo(browser, 400);

    const firstCard = await browser.$(homepageConfig.cardSelector);

    const firstCardExists = await firstCard.waitForExist({ timeout: 5000 });

    expect(firstCardExists).equal(true);
  });

  // it("card should have right content", async function () {
  //   const rightContentLoaded = await isCardContentLoaded(
  //     browser,
  //     homepageConfig.cardSelector,
  //     homepageConfig.content
  //   );

  //   expect(rightContentLoaded).equal(true);
  // });

  it("card should be displayed in viewport at initial snap point", async () => {
    await scrollTo(browser, 800);

    const firstCard = await browser.$(homepageConfig.cardSelector);

    const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

    expect(firstCardIsInViewport).equal(true);

    const isAtInitialSnapPoint = await isAtSnapPoint(
      browser,
      homepageConfig.cardSelector,
      homepageConfig.snapPoints.initial
    );

    expect(isAtInitialSnapPoint).equal(true);
  });

  // fix minimise
  // it("minimise card and should be at minimised snap point", async ()=>{
  // 	await dragCardBy(browser, config.cards.homepage.cardSelector, 200)

  // 	const isAtMinimisedSnapPoint = await isAtSnapPoint(browser,
  // 		config.cards.homepage.cardSelector,
  // 		config.cards.homepage.snapPoints.minimised)

  // 	expect(isAtMinimisedSnapPoint).equal(true);
  // });

  it("activate card by click", async () => {
    await touchCard(browser, homepageConfig.cardSelector);

    const isAtActiveSnapPoint = await isAtSnapPoint(
      browser,
      homepageConfig.cardSelector,
      homepageConfig.snapPoints.active
    );

    expect(isAtActiveSnapPoint).equal(true);
  });

  it("close card by click when opened", async () => {
    /*
     * This test expects to run from a state with flowcard already active
     */

    // Assure card is already in viewport
    const firstCard = await browser.$(homepageConfig.cardSelector);
    const firstCardIsInViewportBeforeClosing = await firstCard.isDisplayedInViewport();
    expect(firstCardIsInViewportBeforeClosing).equal(true);

    // Assure card is already active
    const isFlowcardActiveBeforeClosing = await isAtSnapPoint(
      browser,
      homepageConfig.cardSelector,
      homepageConfig.snapPoints.active
    );

    expect(isFlowcardActiveBeforeClosing).equal(true);

    // QuerySelect Close Button
    const closeButton = await browser.$(
      `${homepageConfig.cardSelector} [data-testid="sticky-close-icon"]`
    );

    //Assure closeButton is invisible
    expect(await closeButton.isDisplayed()).equal(false);

    // Scroll card until close button is visible
    await scrollCard(browser, homepageConfig.cardSelector, 800);

    //TODO Assure closeButton is visible
    // expect(await closeButton.isDisplayed()).equal(true);

    //TODO click close button
    await closeCard(browser, homepageConfig.cardSelector);

    //TODO Assure card is not in viewport
    const firstCardIsInViewportAfterClosing = await firstCard.isDisplayedInViewport();
    expect(firstCardIsInViewportAfterClosing).equal(false);

    // Assure closeButton is invisible
    expect(await closeButton.isDisplayed()).equal(false);
  });
});
