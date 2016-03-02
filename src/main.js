import {dasherize} from './util';

class Stylist {
    constructor() {
        this.element = document.createElement('style');
        document.head.appendChild(this.element);
        this.sheet = this.element.sheet;
    }

    get count() {
        return this.sheet.cssRules.length;
    }

    clear() {
        let rules = this.sheet.cssRules;

        for (let i = rules.length - 1; i >= 0; --i) {
            this.sheet.deleteRule(i);
        }
    }

    append(selector, styles) {
        if (typeof selector !== 'string') {
            throw 'selector should be string type.';
        }

        let rules = [];

        for (let key in styles) {
            if (!styles.hasOwnProperty(key)) {
                return;
            }

            let value = styles[key];

            if (typeof value === 'number') {
                value += 'px';
            }

            rules.push(`${dasherize(key)}:${value}`);
        }

        if (rules.length) {
            this.sheet.insertRule(`${selector}\{${rules.join(';')}\}`, this.count);
        }
    }

    replace(selector, styles) {
        let rule = this.find(selector);

        if (rule) {
            for (let key in styles) {
                if (!styles.hasOwnProperty(key)) {
                    return;
                }

                let value = styles[key];

                if (typeof value === 'number') {
                    value += 'px';
                }

                rule.style[key] = value;
            }
        } else {
            this.append(selector, styles);
        }
    }

    matches(rule, selector) {
        return rule.selectorText.replace(/,\s*/, ',') === selector;
    }

    each(callback) {
        let rules = this.sheet.cssRules;
        let length = rules.length;

        for (let i = length - 1; i >= 0; --i) {
            let rule = rules[i];

            if (callback(rule, i)) {
                return rule;
            }
        }
    }

    find(selector) {
        return this.each((rule, index) => {
            return this.matches(rule, selector);
        });
    }

    remove(selector) {
        this.each((rule, index) => {
            if (this.matches(rule, selector)) {
                this.sheet.deleteRule(index);
                return true;
            }
        });
    }

    removeAll(selector) {
        this.each((rule, index) => {
            if (this.matches(rule, selector)) {
                this.sheet.deleteRule(index);
            }
        });
    }
}

export default new Stylist;
