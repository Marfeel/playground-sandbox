const { bootstrap } = require('./actions');

class Tester {
    constructor(experience) {
        this.experience = experience;
    }

    bootstrap(fixture) {
        it('bootstrap experience', async () => {
            await bootstrap.bootstrapExperience(browser, this.experience, fixture);
        });

        return this;
    }

    for(card) {
        it(`changes selected card to ${card}`, () => {
            this.card = this.experience.cards[card];
        });

        return this;
    }

    test(name, ...actions) {
        it(name, async () => {
            // eslint-disable-next-line no-console
            console.log(`==== Test: ${name}`);
            for (const action of actions) {
                await action(this.card);
            }
        });

        return this;
    }
}

module.exports = Tester;