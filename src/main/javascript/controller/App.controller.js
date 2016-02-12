sap.ui.define([
	'sap/ui/demo/bulletinboard/controller/BaseController',
	'sap/ui/model/json/JSONModel'
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("sap.ui.demo.bulletinboard.controller.App", {

		createModel: function (){
                    var oViewModel = new JSONModel({
                        busy: true,
                        delay: 0
                    });
                    return oViewModel;
                }, onInit: function () {
			var oViewModel = this.createModel();

			this.setModel(oViewModel, "appView");

			this.getOwnerComponent().getModel().metadataLoaded().then(function () {
				oViewModel.setProperty("/busy", false);
				jQuery.sap.log.info("MetaModel loaded");
			});

		}
	});

});
