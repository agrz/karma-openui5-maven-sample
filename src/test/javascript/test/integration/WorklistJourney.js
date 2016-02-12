sap.ui.require(
	["sap/ui/test/opaQunit",
		"sap/ui/test/Opa5"],
	function (opaTest, Opa5) {
		"use strict";
		QUnit.module("Posts");


		opaTest("Should see the table", function (Given, When, Then) {
			// Arrangements

			//Given.iStartMyApp();


			Given.iStartMyUIComponent({
				componentConfig: {
					height: "100%",
					name: "sap.ui.demo.bulletinboard"
				},

				hash: ""

			});

			jQuery.sap.log.info("Component started");
			When.onTheWorklistPage.iLookAtTheScreen();

			jQuery.sap.log.info("Looking at screen");
			Then.onTheWorklistPage.iShouldSeeTheTable();
			jQuery.sap.log.info("Saw table");
            

		});

		opaTest("Should see the table with all Posts", function (Given, When, Then) {

			Then.onTheWorklistPage.theTitleShouldDisplayTheTotalAmountOfItems().
			and.theTableShouldHaveLimitedEntries();
		});
		
		opaTest("Should be able to load more items", function (Given, When, Then) {
			//Actions
			When.onTheWorklistPage.iPressOnMoreData();
			// Assertions
			Then.onTheWorklistPage.theTableShouldHaveAllEntries().
				and.theTitleShouldDisplayTheTotalAmountOfItems();

			Then.iTeardownMyUIComponent();

			Opa5.emptyQueue();
		});

	}
);
