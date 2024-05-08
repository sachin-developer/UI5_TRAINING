sap.ui.define(["./BaseController", "sap/m/MessageBox", "sap/ui/model/json/JSONModel"], function (BaseController, MessageBox, JSONModel) {
	"use strict";

	return BaseController.extend("com.cnc.tng.controller.Main", {
		onInit:function(){
			this.oDefaultModel = this.getOwnerComponent().getModel();
			this.oRouter = this.getOwnerComponent().getRouter();
			this.Customers = [];
			this.CustomersModel = new JSONModel();
			this.getView().setBusy(true);
			this.oDefaultModel.read("/Customers",{
				success:oData=>{
					this.Customers = oData.results;
					this.CustomersModel.setData(this.Customers);
					this.getView().setModel(this.CustomersModel,"customers");
					this.getView().setBusy(false);
				},
				error:error=>{
					MessageBox.error(error);
					this.getView().setBusy(false);
				},
			})	
		},
		onSingleCustomerSelect:function(oEvent){
			let itemIndex =  oEvent.getParameter("listItem").getBindingContextPath().split("/")[1];
			let item = this.Customers[itemIndex];
			MessageBox.success(`Customer ${item.CustomerID} Picked`);
		},
		onMultipleCustomerSelect:function(){
			let items = this.getView().byId("idCustomersMultiple").getSelectedItems();
			let Customers = "";
			items.map(item=>{
				let itemIndex =  item.getBindingContextPath().split("/")[1];
				let Customer = this.Customers[itemIndex];
				Customers+= `${Customer.CustomerID},`
			});
			Customers = `Custmers: ${Customers} Picked up`;
			MessageBox.success(Customers);
		},
		onHome:function(){
			this.oRouter.navTo("main");
		}


		
	});
});
