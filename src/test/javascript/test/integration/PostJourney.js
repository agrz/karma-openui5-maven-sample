/**
 * Post details behavior test
 */
sap.ui.require(
	["sap/ui/test/opaQunit",
		"sap/ui/test/Opa5"],
	function (opaTest, Opa5) {
		"use strict";
		QUnit.module("Post");
		opaTest("Should see the post page when a user clicks on an entry of the list", function (Given, When, Then) {
			// Arrangements

			//Given.iStartMyApp();
			Given.iStartMyUIComponent({
				componentConfig: {
					height: "100%",
					name: "sap.ui.demo.bulletinboard"
				},
				hash: ""

			});

			//Actions
			When.onTheWorklistPage.iPressOnTheItemWithTheID("PostID_15");
			// Assertions
			Then.onThePostPage.theTitleShouldDisplayTheName("Jeans");
		});
		opaTest("Should go back to the TablePage", function (Given, When, Then) {
			// Actions
			When.onThePostPage.iPressTheBackButton();

			// Assertions
			Then.onTheWorklistPage.iShouldSeeTheTable();
		});
		opaTest("Should be on the post page again when browser forwards is pressed", function (Given, When, Then) {
			// Actions
			When.onTheBrowser.iPressOnTheForwardButton();
			// Assertions
			Then.onThePostPage.theTitleShouldDisplayTheName("Jeans");

			Then.iTeardownMyUIComponent();

			Opa5.emptyQueue();
		});
	}
);