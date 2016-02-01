var baseConfig = require('./karma.conf.js');

module.exports = function(config){
    // Load base config
    baseConfig(config);

    // Override base config
    config.set({
		browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false
    });
};
