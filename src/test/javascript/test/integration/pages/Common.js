sap.ui.define([
		"jquery.sap.global",
    "sap/ui/test/Opa5",
    "sap/ui/core/ComponentContainer",
], function(jQuery, Opa5, ComponentContainer) {

    var oContainer = null;
    var oComponent = null;

	function getFrameUrl(sHash, sUrlParameters) {
			sHash = sHash || "";
			var sUrl = jQuery.sap.getResourcePath("sap/ui/demo/bulletinboard/app", ".html");

			if (sUrlParameters) {
				sUrlParameters = "?" + sUrlParameters;
			}

			return sUrl + sUrlParameters + "#" + sHash;
		}
		
    return Opa5.extend("sap.ui.demo.tdg.test.arrangement.CommonArrangement", {
        iStartMyApp: function (oOptions) {
				var sUrlParameters;
				oOptions = oOptions || { delay: 0 };

				sUrlParameters = "serverDelay=" + oOptions.delay;

				var sUrl = getFrameUrl(oOptions.hash, sUrlParameters);
                jQuery.sap.log.info("Start App: "+sUrl);

				this.iStartMyAppInAFrame(sUrl);
			},

			iLookAtTheScreen: function () {
				return this;
			},
        
       /* iStartAComponent: function(sName) {
            if (!oContainer) {
                var $body = jQuery("body");
                $body.addClass("sapUiBody").attr("role", "application");
                if ($body.find("#content").length === 0) {
                    $body.append('<div id="content"></div>');
                }
                oContainer = new ComponentContainer();
                oContainer.placeAt("content");
            }
            if (oComponent) {
                oComponent.destroy();
                Opa5.getPlugin().mViews = {};
                oComponent = null;
            }
            oComponent = sap.ui.getCore().createComponent({
                name: sName,
            });
            oContainer.setComponent(oComponent);
            return this;
        },*/
        iStartAComponent: function(sName) {


            this.iStartMyUIComponent({
                componentConfig: {
                    name: sName
                },
                hash: ""

            }).done(
                function(){
                    jQuery.sap.log.info("Component Loaded: "+sName);

                });

            return this;
        },
        iStopAComponent: function() {

            this.iTeardownMyUIComponent().done(function (sName) {
                jQuery.sap.log.info("Component Stopped: "+sName);
            });
        }
    });
});
