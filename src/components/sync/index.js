import lodash from 'lodash-es';

const sync = function () {
    console.log('Sync')
}

const isArray = function (args) {
    console.log(lodash.isArray(args))
}

export {
    sync,
    isArray
}
