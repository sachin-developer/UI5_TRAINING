sap.ui.define(["./BaseController", "sap/m/MessageBox", "sap/ui/model/json/JSONModel"], function (BaseController, MessageBox, JSONModel) {
	"use strict";

	return BaseController.extend("com.cnc.tng.controller.Main", {
		onInit:function(){
			this.routesModel = new JSONModel("../model/Routes.json");
			this.getView().setModel(this.routesModel, "routes");
			this.oRouter = this.getOwnerComponent().getRouter();
		},
		onRoute:function(oRoute){
			this.oRouter.navTo(oRoute);
		}
	});
});
