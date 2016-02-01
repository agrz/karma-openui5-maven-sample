module.exports = function(config) {
    config.set({
        basePath: '.',
        frameworks: ['openui5','qunit'],
        files: [{
            pattern: 'bower_components/openui5-sap.ui.core/resources/**/*',
            served: true,
            included: false,
            watched: false
        }, {
            pattern: 'bower_components/openui5-sap.m/resources/**/*',
            served: true,
            included: false,
            watched: false
        }, {
            pattern: 'bower_components/openui5-sap.ui.layout/resources/**/*',
            served: true,
            included: false,
            watched: false
        }, {
            pattern: 'bower_components/openui5-themelib_sap_bluecrystal/resources/**/*',
            served: true,
            included: false,
            watched: false
        }, {
            pattern: 'src/main/javascript/**/*',
            served: true,
            included: false,
            watched: true
        }, {
            pattern: 'src/main/javascript/test/**/*.qunit.js',
            served: true,
            included: true,
            watched: true
        }],
		proxies: {
		  "/base/src/main/javascript/resources/": "/base/bower_components/openui5-sap.ui.core/resources/"
		},
        openui5: {
            path: 'bower_components/openui5-sap.ui.core/resources/sap-ui-core.js',
            useMockServer: true
        },
        client: {
            openui5: {
                config: {
                    theme: 'sap_bluecrystal',
                    libs: 'sap.m',
                    resourceroots: {
                        'sap.m': '/base/bower_components/openui5-sap.m/resources/sap/m',
                        'sap.ui.layout': '/base/bower_components/openui5-sap.ui.layout/resources/sap/ui/layout',
						'sap.ui': '/base/bower_components/openui5-sap.ui.core/resources/sap/ui',
						'test': '/base/src/main/javascript/test',
                        'sap.ui.demo.bulletinboard': '/base/src/main/javascript',
						'sap.ui.demo.bulletinboard.app' : '/base/src/main/javascript/test/testService',
						'sap.ui.demo.bulletinboard.test' : '/base/src/main/javascript/test'
                        
                    },
                    themeroots: {
                        'sap_bluecrystal': '/base/bower_components/openui5-themelib_sap_bluecrystal/resources'
                    }                   
                },
				 mockserver: {
                        config: {
                            autoRespond: true
                        },
                        rootUri: '/data/',
                        metadataURL: '/base/src/main/javascript/localService/metadata.xml',
                        mockdataSettings: {'sMockdataBaseUrl':'/base/src/main/javascript/localService/mockdata/','bGenerateMissingMockData' : 'true'}
                }
            }
        },
        reporters: ['progress','junit'], 
		junitReporter: {
		  outputDir: 'target/surefire-reports', // results will be saved as $outputDir/$browserName.xml 
		  outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile 
		  suite: 'openui5', // suite will become the package name attribute in xml testsuite element 
		  useBrowserName: true // add browser name to report and classes names 
		},
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
		loggers: [{type:'console'},
			{
			  "type": "file",
			  "filename": "target/karma.log",
			  "maxLogSize": 20480,
			  "backups": 3
			}
		],
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
