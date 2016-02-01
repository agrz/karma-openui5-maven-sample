sap.ui.require([
	"test/unit/allTests",

], function() { 
	"use strict"; 
	jQuery.sap.require("sap.ui.qunit.qunit-css");
		jQuery.sap.require("sap.ui.thirdparty.qunit");
		jQuery.sap.require("sap.ui.qunit.qunit-junit");
		jQuery.sap.require("sap.ui.qunit.qunit-coverage");

		QUnit.config.autostart = false;
        console.log('Starting QUnit Tests')
		sap.ui.require(
				["test/unit/allTests"]//,
				/* function() {
					QUnit.start();
				} */
		);
	});