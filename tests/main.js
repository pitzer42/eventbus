require.config({
    baseUrl: '../src',
    paths: {
        'jasmine': ['../tests/lib/jasmine'],
        'jasmine-html': ['../tests/lib/jasmine-html'],
        'jasmine-boot': ['../tests/lib/boot']
    },
    shim: {
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        }
    }
});

require(['jasmine-boot'], function () {
    require([
        '../tests/specs/eventbus-spec'
    ], function () {
        window.onload();
    })
});
