const { bootstrapExperience } = require("../../e2e/utils/bootstrap");
const { scrollTo } = require("../../e2e/utils/scroll");
const { touchCard } = require("../../e2e/utils/touch");
const { isAtSnapPoint } = require("../../e2e/utils/snapPoints");
const { isCardContentLoaded } = require("../../e2e/utils/cardContent");
const { expect } = require("chai");
const { getUrlFixture } = require("../../e2e/utils/fixtureUrl");
const experience = require("./comments.json");

describe("comments experience", function () {
  let config, fixture;
  const fixtureUrl = getUrlFixture({
    siteUrl: "https://playground.marfeel.com/templates/article-skeleton.html",
    requestHostname: "playground.marfeel.com",
    technology: "web",
    experienceUrl: "/experiences/comments/comments.json",
  });

  it("setup", async function () {
    config = experience;
    fixture = {
      url: fixtureUrl,
      articleTitle: "Article example",
    };

    await bootstrapExperience(browser, config, fixture);
  });

  it("card should render on scroll", async function () {
    await scrollTo(browser, 400);

    const firstCard = await browser.$(config.cards.comments.cardSelector);

    const firstCardExists = await firstCard.waitForExist({ timeout: 5000 });

    expect(firstCardExists).equal(true);
  });

  it("card should have right content", async function () {
    const rightContentLoaded = await isCardContentLoaded(
      browser,
      config.cards.comments.cardSelector,
      config.cards.comments.content
    );

    expect(rightContentLoaded).equal(true);
  });

  it("card should be displayed in viewport at initial snap point", async () => {
    await scrollTo(browser, 800);

    const firstCard = await browser.$(config.cards.comments.cardSelector);

    const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

    expect(firstCardIsInViewport).equal(true);

    const isAtInitialSnapPoint = await isAtSnapPoint(
      browser,
      config.cards.comments.cardSelector,
      config.cards.comments.snapPoints.initial
    );

    expect(isAtInitialSnapPoint).equal(true);
  });

  // fix minimise
  // it("minimise card and should be at minimised snap point", async ()=>{
  // 	await dragCardBy(browser, config.cards.comments.cardSelector, 200)

  // 	const isAtMinimisedSnapPoint = await isAtSnapPoint(browser,
  // 		config.cards.comments.cardSelector,
  // 		config.cards.comments.snapPoints.minimised)

  // 	expect(isAtMinimisedSnapPoint).equal(true);
  // });

  it("activate card by click", async () => {
    await touchCard(browser, config.cards.comments.cardSelector);

    const isAtActiveSnapPoint = await isAtSnapPoint(
      browser,
      config.cards.comments.cardSelector,
      config.cards.comments.snapPoints.active
    );

    expect(isAtActiveSnapPoint).equal(true);
  });
});
