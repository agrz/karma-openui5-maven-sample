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
            pattern: 'src/test/javascript/**/*',
            served: true,
            included: false,
            watched: true
        }, {
            pattern: 'src/test/javascript/**/*.qunit.js',
            served: true,
            included: true,
            watched: true
        }],
		proxies: {
		  "/base/src/main/javascript/resources/": "/base/bower_components/openui5-sap.ui.core/resources/",
		  "/webapp/": "/base/src/main/javascript/",
		  "/webapp/test": "/base/src/test/javascript/test",
		  "/webapp/localService": "/base/src/test/javascript/localService"
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
						'test': '/webapp/test',
                        'sap.ui.demo.bulletinboard': '/webapp',
						'sap.ui.demo.bulletinboard.localService' : '/webapp/localService',
						//'sap.ui.demo.bulletinboard.app' : '/webapp/test/testService',
						'sap.ui.demo.bulletinboard.app' : '/webapp/index',
						'sap.ui.demo.bulletinboard.test' : '/webapp/test'
                        
                    },
                    themeroots: {
                        'sap_bluecrystal': '/base/bower_components/openui5-themelib_sap_bluecrystal/resources'
                    },
                    debug: true,
                    frameOptions: 'allow',
                    preload: 'async'

                },
				 mockserver: {
                        config: {
                            autoRespond: true,
							autoRespondAfter : 0
                        },
                        rootUri: '/data/',
                        metadataURL: '/webapp/localService/metadata.xml',
                        mockdataSettings: {'sMockdataBaseUrl':'/webapp/localService/mockdata/','bGenerateMissingMockData' : 'true'}
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
		preprocessors: {
		//  'src/main/javascript/**/*.js': 'coverage'         // (1)
        },
		coverageReporter: {
	      type : 'html',                // (2)
	      dir : 'target/karma-coverage'
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
