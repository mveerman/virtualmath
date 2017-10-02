module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'wwwroot/app/bower_components/angular/angular.js',
            'wwwroot/app/bower_components/angular-route/angular-route.js',
            'wwwroot/app/bower_components/angular-mocks/angular-mocks.js',
            'wwwroot/app/bower_components/paper/dist/paper-core.min.js',
            'wwwroot/app/components/**/*.js',
            'wwwroot/app/view*/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
