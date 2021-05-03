
const facebookTest = require('../experiences/facebook/facebook.test');
const featuredArticleTest = require('../experiences/featured_article/featured-article.test');
const homepageTest = require('../experiences/homepage/homepage.test');
const multicardTest = require('../experiences/multicard/multicard.test');
const paywallTest = require('../experiences/paywall/paywall.test');

describe('homepage experience', homepageTest);
describe('facebook experience', facebookTest);
describe('featured article experience', featuredArticleTest);
describe('multicard experience', multicardTest);
describe('paywall experience', paywallTest);
