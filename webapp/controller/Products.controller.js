sap.ui.define([
	"./BaseController", 
	"sap/m/MessageBox", 
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',], 
	function (BaseController, 
			MessageBox, 
			JSONModel,
			Filter,
			FilterOperator) {
	"use strict";

	return BaseController.extend("com.cnc.tng.controller.Main", {
		onInit:function(){
			this.oDefaultModel = this.getOwnerComponent().getModel();
			this.oRouter = this.getOwnerComponent().getRouter();
			this.productsModel = new JSONModel();
			this.productsData = [];
			this.getView().setBusy(true);
			this.oDefaultModel.read("/Products",{
				success:oData=>{
					this.productsData = oData.results;
					this.productsModel.setData(this.productsData);
					this.getView().setBusy(false);
					this.getView().setModel(this.productsModel, "products");
				},
				error:error=>{
					console.log(error);
					this.getView().setBusy(false);
				}
			});
		},
		onSearchProducts:function(oEvent){
			let sQuery = oEvent.getParameter("query");
			let oFilter1 = new Filter("ProductName",FilterOperator.Contains, sQuery);
			let oFilter2 = new Filter("UnitPrice",FilterOperator.EQ, sQuery);
			let oFinalFilter = new Filter({
				filters:[oFilter1, oFilter2],
				and:false
			})
			this.getView().byId("idProductsSingle").getBinding("items").filter(oFinalFilter);
		},
		onSelectRecord:function(oEvent){
			let itemContext = oEvent.getParameter('listItem');
			let id = itemContext.getBindingContextPath().split("/")[1];
			let item = this.productsData[id];
			MessageBox.success(`Product: ${item.ProductName} picked`);
		},
		onMultipleProducts:function(){
			let items = this.getView().byId("idProductsMultiple").getSelectedItems();
			let Products = "";
			let i=0;
			for(i;i<items.length;i++){
				let id = items[i].getBindingContextPath().split("/")[1];
				Products+= `${this.productsData[id].ProductName},`
			}
			Products = `Products Picked: ${Products}`;
			MessageBox.success(Products);
		},
		onHome:function(){
			this.oRouter.navTo("main");
		},
	});
	
});
