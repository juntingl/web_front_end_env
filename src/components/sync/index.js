import lodash from 'lodash-es';
import css from './index.css';

const sync = function () {
    console.log('Sync')
    // document.getElementById('app').innerHTML = `
    //     <h1 class="${css.test}">Webpack Css tree shaking, 最新的 CSS 语法 和 Css modules</h1>
    // `
}

const isArray = function (args) {
    console.log(lodash.isArray(args))
}

export {
    sync,
    isArray
}
