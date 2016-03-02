# Stylist

Stylist is a dynamic CSS rule manager using `CSSStyleSheet.insertRule`, `CSSStyleSheet.deleteRule` APIs.

## Setup

```
$ npm install @fallroot/stylist --save
$ cp node_modules/@fallroot/stylist/build/stylist.js your_path
```

## API

### Usage

```
Stylist.append('body', {
    backgroundColor: 'yellow'
});

Stylist.replace('#myid', {
    'font-size': 32
});

Stylist.remove('.myclass');
Stylist.removeAll('.myclass');
Stylist.clear();
```

- All apis are static method of `Stylist` singleton.
- `selector` is a CSS selector string.
- `styles` is a single object of key-value pairs.
* Each key is a CSS property string or camel cased object key.
* Each value is a CSS rule string.
* A numeric value will be converted to pixel unit automatically.

### append(selector, styles)

Insert every style in the rule of matched selector.

### replace(selector, styles)

Replace each style with the rule of matched selector.

### clear()

Remove all rules.

### remove(selector)

Remove one recent rule of matched selector.

### removeAll(selector)

Remove all rules of matched selector.

## Browser compatibility

Internet Explorer 9+ and other major browsers are supported.

## License

The MIT License (MIT)

Copyright (c) 2016 CK Moon <fallroot@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
