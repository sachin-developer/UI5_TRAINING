sap.ui.define(["./BaseController", "sap/m/MessageBox", "sap/ui/model/json/JSONModel"], function (BaseController, MessageBox, JSONModel) {
	"use strict";

	return BaseController.extend("com.cnc.tng.controller.Main", {
		onInit:function(){
			this.oDefaultModel = this.getOwnerComponent().getModel();
			this.oDefaultModel.read("/Products",{
				success:oData=>{
					console.log(oData.results);
				},
				error:error=>{
					console.log(error);
				}
			})
		},
		
	});
});
