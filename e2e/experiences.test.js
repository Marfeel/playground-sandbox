
const brandedContentTest = require('../experiences/branded-content/branded-content-card.test');
const commentsTest = require('../experiences/comments/comments.test');
const facebookTest = require('../experiences/facebook/facebook.test');
const featuredArticleTest = require('../experiences/featured_article/featured-article.test');
const homepageTest = require('../experiences/homepage/homepage.test');
const multicardTest = require('../experiences/multicard/multicard.test');
const newsletterTest = require('../experiences/newsletter/newsletter.test');
const pushNotificationsTest = require('../experiences/push_notifications/push-notifications.test');
const taboolaTest = require('../experiences/taboola/taboola.test');
const topArticlesTest = require('../experiences/top_articles/top-articles.test');

describe('branded content experience', brandedContentTest);
describe('comments experience', commentsTest);
describe('facebook experience', facebookTest);
describe('featured article experience', featuredArticleTest);
describe('homepage experience', homepageTest);
describe('multicard experience', multicardTest);
describe('newsletter experience', newsletterTest);
describe('push notifications experience', pushNotificationsTest);
describe('taboola experience', taboolaTest);
describe('top articles experience', topArticlesTest);
