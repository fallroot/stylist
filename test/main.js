import assert from 'assert';
import Stylist from '../src/main';

let div = document.createElement('div');
div.setAttribute('id', 'rect');
document.body.appendChild(div);

function getStyle(selector, property) {
    let el = document.querySelector(selector);
    return getComputedStyle(el).getPropertyValue(property);
}

describe('Initialization', () => {
    describe('Stylist.count', () => {
        it('should be zero when initialized', () => {
            assert.equal(Stylist.count, 0);
        });
    });
});

describe('Stylist.clear', () => {
    it('should clear all css rules', () => {
        Stylist.clear();
        assert.equal(Stylist.count, 0);

        Stylist.sheet.insertRule('#rect {background:yellow}', 0);
        assert.equal(Stylist.count, 1);

        Stylist.sheet.insertRule('#rect {color:black}', 1);
        assert.equal(Stylist.count, 2);

        Stylist.clear();
        assert.equal(Stylist.count, 0);
    });
});

describe('Stylist.append', () => {
    describe('1st paramter : "selector"', () => {
        it('should be string only', () => {
            assert.doesNotThrow(() => {
                Stylist.append('#rect');
            });

            assert.throws(() => {
                Stylist.append(document.body);
            });
        });
    });

    describe('2nd paramter : "styles"', () => {
        beforeEach(() => {
            Stylist.clear();
        });

        it('can be snake cased key', () => {
            Stylist.append('#rect', {
                'background-color': 'rgb(255, 255, 0)'
            });
            assert.equal(getStyle('#rect', 'background-color'), 'rgb(255, 255, 0)');
        });

        it('can be camel cased key', () => {
            Stylist.append('#rect', {
                backgroundColor: 'rgb(255, 255, 0)'
            });
            assert.equal(getStyle('#rect', 'background-color'), 'rgb(255, 255, 0)');
        });

        it('should be pixel unit when numeric value passed', () => {
            Stylist.append('#rect', {fontSize: 32});
            assert.equal(getStyle('#rect', 'font-size'), '32px');
        });
    });

    describe('Usage', () => {
        beforeEach(() => {
            Stylist.clear();
        });

        it('should overwrite previous style', () => {
            Stylist.append('#rect', {fontSize: 32});
            assert.equal(getStyle('#rect', 'font-size'), '32px');

            Stylist.append('#rect', {fontSize: 64});
            assert.equal(getStyle('#rect', 'font-size'), '64px');
        });

        it('should increase css rule by one', () => {
            Stylist.append('#rect', {backgroundColor: 'rgb(255, 255, 0)'});
            assert.equal(Stylist.count, 1);

            Stylist.append('#rect', {backgroundColor: 'rgb(255, 255, 255)'});
            assert.equal(Stylist.count, 2);
        });
    });
});

describe('Stylist.replace', () => {
    describe('1st paramter : "selector"', () => {
        beforeEach(() => {
            Stylist.clear();
        });

        it('should be string only', () => {
            assert.doesNotThrow(() => {
                Stylist.replace('#rect');
            });

            assert.throws(() => {
                Stylist.replace(document.body);
            });
        });
    });

    describe('2nd paramter : "styles"', () => {
        beforeEach(() => {
            Stylist.clear();
        });

        it('can be snake cased key', () => {
            Stylist.replace('#rect', {
                'background-color': 'rgb(255, 255, 0)'
            });
            assert.equal(getStyle('#rect', 'background-color'), 'rgb(255, 255, 0)');
        });

        it('can be camel cased key', () => {
            Stylist.replace('#rect', {
                backgroundColor: 'rgb(255, 255, 0)'
            });
            assert.equal(getStyle('#rect', 'background-color'), 'rgb(255, 255, 0)');
        });

        it('should be pixel unit when numeric value passed', () => {
            Stylist.replace('#rect', {fontSize: 32});
            assert.equal(getStyle('#rect', 'font-size'), '32px');
        });
    });

    describe('Usage', () => {
        beforeEach(() => {
            Stylist.clear();
        });

        it('should overwrite previous style', () => {
            Stylist.replace('#rect', {fontSize: 32});
            assert.equal(getStyle('#rect', 'font-size'), '32px');

            Stylist.replace('#rect', {fontSize: 64});
            assert.equal(getStyle('#rect', 'font-size'), '64px');
        });

        it('should overwrite rule when css property is identical', () => {
            Stylist.replace('#rect', {fontSize: 32});
            assert.equal(Stylist.count, 1);

            Stylist.replace('#rect', {fontSize: 20});
            assert.equal(Stylist.count, 1);
        });

        it('should overwrite rule when css property is different', () => {
            Stylist.replace('#rect', {fontSize: 32});
            assert.equal(Stylist.count, 1);

            Stylist.replace('#rect', {fontColor: 'rgb(255, 255, 255)'});
            assert.equal(Stylist.count, 1);
        });
    });
});

describe('Stylist.remove', () => {
    beforeEach(() => {
        Stylist.clear();
    });

    it('should be ok when empty', () => {
        assert.equal(Stylist.count, 0);

        assert.doesNotThrow(() => {
            Stylist.remove('#rect');
        });

        assert.equal(Stylist.count, 0);
    });

    it('should decrease rule by one', () => {
        Stylist.append('#rect', {fontColor: 'yellow'});
        assert.equal(Stylist.count, 1);

        Stylist.append('#rect', {fontSize: 32});
        assert.equal(Stylist.count, 2);

        Stylist.remove('#rect');
        assert.equal(Stylist.count, 1);

        Stylist.remove('#rect');
        assert.equal(Stylist.count, 0);
    });

    it('should remove recent rule first', () => {
        Stylist.append('#rect', {fontSize: 16});
        assert.equal(getStyle('#rect', 'font-size'), '16px');

        Stylist.append('#rect', {fontSize: 32});
        assert.equal(getStyle('#rect', 'font-size'), '32px');

        Stylist.append('#rect', {fontSize: 64});
        assert.equal(getStyle('#rect', 'font-size'), '64px');

        Stylist.remove('#rect');
        assert.equal(getStyle('#rect', 'font-size'), '32px');

        Stylist.remove('#rect');
        assert.equal(getStyle('#rect', 'font-size'), '16px');
    });
});

describe('Stylist.removeAll', () => {
    beforeEach(() => {
        Stylist.clear();
    });

    it('should be ok when empty', () => {
        assert.equal(Stylist.count, 0);

        assert.doesNotThrow(() => {
            Stylist.removeAll('#rect');
        });

        assert.equal(Stylist.count, 0);
    });

    it('should remove rules of identical selector', () => {
        Stylist.append('#another', {fontSize: 16});
        Stylist.append('#rect', {fontColor: 'yellow'});
        Stylist.append('#rect', {fontSize: 32});
        assert.equal(Stylist.count, 3);

        Stylist.removeAll('#rect');
        assert.equal(Stylist.count, 1);
    });
});
