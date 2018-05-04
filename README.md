# wrapper-loader
Wrapper loader for Webpack

## Install
```shell
$ npm install --save-dev wrapper-loader
```

## Usage
```javascript
module.exports = {
    //...
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'wrapper-loader',
            options: {
                template: '/*library: <%= name %>*/export default function(){<%= content %>}',
                data: {
                    name: 'test'
                },
            }
        }]
    }
}
```

## Custom view config
view config [more](https://github.com/tj/ejs)
```javascript
module.exports = {
    //...
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'wrapper-loader',
            options: {
                template: '/*library: <?= name ?>*/export default function(){<?= content ?>}',
                data: {
                    name: 'test'
                },
                templateOptions: {
                    delimiter: '?',
                }
            }
        }]
    }
}
```

## Licence
[MIT](http://en.wikipedia.org/wiki/MIT_License)