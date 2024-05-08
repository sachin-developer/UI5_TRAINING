sap.ui.define(["./BaseController", "sap/m/MessageBox", "sap/ui/model/json/JSONModel"], function (BaseController, MessageBox, JSONModel) {
	"use strict";

	return BaseController.extend("com.cnc.tng.controller.Main", {
		onInit:function(){
			this.routesModel = new JSONModel("../model/Routes.json");
		},
		onRoute:function(oRoute){
			if(oRoute === 'SDK'){
				window.open("https://sapui5.hana.ondemand.com/", '_blank');
			}else{
			this.oRouter.navTo(oRoute);
			}
		},
		onAfterRendering:function(){
			this.routesModel.refresh(true);
			this.getView().setModel(this.routesModel, "routes");
			this.oRouter = this.getOwnerComponent().getRouter();
		}
	});
});
