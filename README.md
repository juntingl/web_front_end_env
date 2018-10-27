# Webpack 知识点回顾

* `webpack` 构建 `production` 环境下代码时，会自动 `tree shaking` 清理无用多余的代码。但是检查不到函数和 `scope(块)`内部，无法 `tree shaking`。

```js
import lodash from 'lodash-es';

const sync = function () {
    console.log('Sync')
}

const isArray = function (args) { // 此函数没有调用过，按理 tree shaking 会把 lodash、isArray 去除，但并没有
    console.log(lodash.isArray(args))
}

export {
    sync,
    isArray
}
```
