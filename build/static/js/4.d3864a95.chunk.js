(this.webpackJsonpViteaceInventory=this.webpackJsonpViteaceInventory||[]).push([[4],{988:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),s=a(39),i=a(40),o=a(187),r=a(44),d=a(43),c=a(3),u=a.n(c),m=a(162),v=a(981),f=a(972),h=a(977),g=a(31),p=a(23),E=a(14),b=a(978),y=a(20),_=a(163),N=function(e){Object(r.a)(a,e);var t=Object(d.a)(a);function a(e,l){var n,i;return Object(s.a)(this,a),(i=t.call(this,e,l)).createdByOption=[],i.salesOption=[],i.customerOption=[],i.onFileChange=function(e){var t=i.state;t.formEntity.attachments=e.target.files[0],i.setState(t)},i.onFileUpload=function(){(new FormData).append("attachments",i.state.formEntity.attachments)},i.handleCreatedbyChange=function(e){console.log("created by:"+e.value);var t=i.state;t.formEntity.created_by=e.value,i.setState(t,(function(){}))},i.handleSalesChange=function(e){console.log("sales:"+e.value);var t=i.state;t.formEntity.sales=e.value,i.setState(t,(function(){}))},i.handleCustomerChange=function(e){console.log("Customer is:"+e.value);var t=i.state;t.formEntity.customer=e.value,i.setState(t,(function(){}))},i.state={formEntity:null!==(n=e.parentRef.state.paramObj)&&void 0!==n?n:{sales:"",customer:"",amount:"",date:"",payment_method:"",created_by:"",notes:"",attachments:null},formValidated:!1,List:[],SalesList:[],CustList:[],StaffList:[],loading:!1,updateBool:!1,options:[],createdOption:[],salesOption:[],customerOption:[]},i}return Object(i.a)(a,[{key:"convertingDate",value:function(e){var t=new Date(e).toLocaleDateString().split("/"),a=Object(p.a)(t,3),l=a[0],n=a[1],s=a[2];return void 0!==l&&void 0!==n&&void 0!==s&&(l.length<2&&(l="0"+l),n.length<2&&(n="0"+n)),"".concat(s,"-").concat(l,"-").concat(n)}},{key:"componentDidMount",value:function(){this.loadGrid(this),this.loadGridCust(),this.loadGridStaff()}},{key:"loadGrid",value:function(e){var t,a=(e=null!==(t=e)&&void 0!==t?t:this).state;a.SalesList=[],a.isLoading=!0,a.loadingStatus={status:!0,message:"Loading ..."},y.e(y.a.Sales_sales+"?limit=1000",(function(t){var l;if((null===t||void 0===t||null===(l=t.data)||void 0===l?void 0:l.results.length)>0)a.isLoading=!1,a.loadingStatus={status:!0,message:""},a.showUsersList=!0,a.salesOption=[],t.data.results.map((function(e,t){var l,n;a.salesOption.push({value:e.id,label:null===e||void 0===e||null===(l=e.customer)||void 0===l||null===(n=l.user)||void 0===n?void 0:n.full_name})})),console.log(a.customerOption),e.setState(a,(function(){}));else{var n=e.state;n.CustomerList=[],n.isLoading=!1,n.loadingStatus={status:!1,message:""},e.setState(n)}}))}},{key:"loadGridCust",value:function(e){var t,a=(e=null!==(t=e)&&void 0!==t?t:this).state;a.CustList=[],a.isLoading=!0,a.loadingStatus={status:!0,message:"Loading ..."},y.e(y.a.Customer_customer,(function(t){a.isLoading=!1,a.loadingStatus={status:!0,message:""},a.showUsersList=!0,a.customerOption=[],t.data.results.map((function(e,t){var l;a.customerOption.push({value:e.id,label:null===e||void 0===e||null===(l=e.user)||void 0===l?void 0:l.full_name})})),e.setState(a,(function(){}))}))}},{key:"loadGridStaff",value:function(e){var t,a=(e=null!==(t=e)&&void 0!==t?t:this).state;a.StaffList=[],a.isLoading=!0,a.loadingStatus={status:!0,message:"Loading ..."},y.e(y.a.Staff_staff+"?limit=1000",(function(t){a.isLoading=!1,a.loadingStatus={status:!0,message:""},a.showUsersList=!0,t.data.results.map((function(e,t){var l;a.createdOption.push({value:e.id,label:null===e||void 0===e||null===(l=e.user)||void 0===l?void 0:l.full_name})})),e.setState(a,(function(){}))}))}},{key:"cancelForm",value:function(){this.props.parentRef.showListView(!0)}},{key:"submitForm",value:function(){if(E.l("formEntity",this)){var e=this,t=e.state;if(t.loading=!0,e.setState(t),e.onFileUpload(),void 0!==this.state.formEntity.id){if(null!=t.formEntity.attachments&&void 0!==t.formEntity.attachments&&""!==t.formEntity.attachments||(t.formEntity.date.length>9&&(t.formEntity.date=e.convertingDate(t.formEntity.date),e.setState(t)),y.i(y.a.Transactions_transactions+this.state.formEntity.id+"/",this.state.formEntity,(function(a){var l;null!=(null===a||void 0===a||null===(l=a.data)||void 0===l?void 0:l.id)&&(console.log("response is:",a.data.id),e.props.parentRef.loadGrid(e.props.parentRef,"transactions/"),E.i("Profile",!0)),t.loading=!1,e.setState(t)}))),null!=t.formEntity.attachments){var a=new FormData;a.append("customer",this.state.formEntity.customer),a.append("amount",this.state.formEntity.amount),a.append("date",this.state.formEntity.date),a.append("sales",this.state.formEntity.sales),a.append("payment_method",this.state.formEntity.payment_method),a.append("created_by",this.state.formEntity.created_by),a.append("notes",this.state.formEntity.notes),a.append("attachments",this.state.formEntity.attachments),y.h(y.a.Transactions_transactions+this.state.formEntity.id+"/",a,(function(a){var l;null!=(null===a||void 0===a||null===(l=a.data)||void 0===l?void 0:l.id)&&(console.log("response is:",a.data.id),e.props.parentRef.loadGrid(e.props.parentRef,"transactions/"),E.i("Profile",!1)),t.loading=!1,e.setState(t)}))}}else if(null!=t.formEntity.attachments){t.formEntity.date.length>9&&(t.formEntity.date=e.convertingDate(t.formEntity.date));var l=new FormData;l.append("customer",this.state.formEntity.customer),l.append("amount",this.state.formEntity.amount),l.append("date",this.state.formEntity.date),l.append("sales",this.state.formEntity.sales),l.append("payment_method",this.state.formEntity.payment_method),l.append("created_by",this.state.formEntity.created_by),l.append("notes",this.state.formEntity.notes),l.append("attachments",this.state.formEntity.attachments),y.f(y.a.Transactions_transactions,l,(function(a){var l;null!=(null===a||void 0===a||null===(l=a.data)||void 0===l?void 0:l.id)&&(console.log("response is:",a.data.id),e.props.parentRef.loadGrid(e.props.parentRef,"transactions/"),E.i("Profile",!1)),t.loading=!1,e.setState(t)}))}else null==t.formEntity.attachments&&y.g(y.a.Transactions_transactions,this.state.formEntity,(function(a){var l;null!=(null===a||void 0===a||null===(l=a.data)||void 0===l?void 0:l.id)&&(console.log("response is:",a.data.id),e.props.parentRef.loadGrid(e.props.parentRef,"transactions/"),E.i("Profile ",!1)),t.loading=!1,e.setState(t)}))}}},{key:"render",value:function(){var e,t,a,l,s,i,o,r,d,c,u,m,v,f,h,p,y,N,C,L,S,w,k,x,O,A=this;return n.a.createElement(b.a,{noValidate:!0,validated:this.state.formValidated,id:"formEntity",className:"needs-validation"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-lg-4 form-group"},n.a.createElement("label",{className:"form-label"},"Created by:",n.a.createElement("span",{className:"text-danger"}," *")),n.a.createElement(_.a,{id:"created_by",name:"created_by",className:"",options:null===this||void 0===this?void 0:this.state.createdOption,selectedValue:(null===this||void 0===this||null===(e=this.state)||void 0===e||null===(t=e.formEntity)||void 0===t?void 0:t.created_by)||"",placeholder:(null===this||void 0===this||null===(a=this.state)||void 0===a||null===(l=a.formEntity)||void 0===l||null===(s=l.created_by)||void 0===s||null===(i=s.user)||void 0===i?void 0:i.full_name)||"Please Select",theme:function(e){return Object(g.a)(Object(g.a)({},e),{},{colors:Object(g.a)(Object(g.a)({},e.colors),{},{neutral50:"#1A1A1A"})})},onChange:function(e){A.handleCreatedbyChange(e)}})),n.a.createElement("div",{className:"col-lg-4 form-group"},n.a.createElement("label",{className:"form-label"},"Sales",n.a.createElement("span",{className:"text-danger"}," *")),n.a.createElement(_.a,{id:"sales",name:"sales",className:"",options:null===this||void 0===this?void 0:this.state.salesOption,selectedValue:(null===this||void 0===this||null===(o=this.state)||void 0===o||null===(r=o.formEntity)||void 0===r?void 0:r.sold_by)||"",placeholder:(null===this||void 0===this||null===(d=this.state)||void 0===d||null===(c=d.formEntity)||void 0===c||null===(u=c.sold_by)||void 0===u||null===(m=u.user)||void 0===m?void 0:m.full_name)||"Please Select",theme:function(e){return Object(g.a)(Object(g.a)({},e),{},{colors:Object(g.a)(Object(g.a)({},e.colors),{},{neutral50:"#1A1A1A"})})},onChange:function(e){A.handleSalesChange(e)}})),n.a.createElement("div",{className:"col-lg-4 form-group"},n.a.createElement("label",{className:"form-label"},"Customer",n.a.createElement("span",{className:"text-danger"}," *")),n.a.createElement(_.a,{style:{overflow:"visible"},id:"customer",openOnFocus:!0,name:"customer",className:"",options:null===this||void 0===this||null===(v=this.state)||void 0===v?void 0:v.customerOption,selectedValue:(null===this||void 0===this||null===(f=this.state)||void 0===f||null===(h=f.formEntity)||void 0===h?void 0:h.customer)||"",placeholder:(null===(p=this.state)||void 0===p||null===(y=p.formEntity)||void 0===y||null===(N=y.customer)||void 0===N||null===(C=N.user)||void 0===C?void 0:C.full_name)||"Please Select",theme:function(e){return Object(g.a)(Object(g.a)({},e),{},{overflow:"visible",colors:Object(g.a)(Object(g.a)({},e.colors),{},{neutral50:"#1A1A1A"})})},onChange:function(e){A.handleCustomerChange(e)}})),n.a.createElement("div",{className:"col-lg-4 form-group"},n.a.createElement("label",{className:"form-label"},"Amount",n.a.createElement("span",{className:"text-danger"}," *")),n.a.createElement("input",{type:"number",id:"amount",name:"amount",className:"form-control form-control-sm fs-md",value:(null===this||void 0===this||null===(L=this.state)||void 0===L||null===(S=L.formEntity)||void 0===S?void 0:S.amount)||"",onChange:function(e){return E.k(A.state.formEntity,e,A,A.state)},required:!0})),n.a.createElement("div",{className:"col-lg-4 form-group"},n.a.createElement("label",{className:"form-label"},"Date ",n.a.createElement("span",{className:"text-danger"}," *")),n.a.createElement("input",{type:"date",id:"date",name:"date",className:"form-control form-control-sm fs-md",value:this.convertingDate(null===this||void 0===this||null===(w=this.state)||void 0===w||null===(k=w.formEntity)||void 0===k?void 0:k.date)||"",placeholder:this.state.formEntity.date,onChange:function(e){return E.k(A.state.formEntity,e,A,A.state)},required:!0})),n.a.createElement("div",{className:"col-lg-4 form-group"},n.a.createElement("label",{className:"form-label"},"Payment Method",n.a.createElement("span",{className:"text-danger"},n.a.createElement("span",{className:"text-danger"}," *")," ")),n.a.createElement("input",{type:"text",id:"payment_method",name:"payment_method",className:"form-control form-control-sm fs-md ",value:(null===this||void 0===this||null===(x=this.state)||void 0===x||null===(O=x.formEntity)||void 0===O?void 0:O.payment_method)||"",onChange:function(e){return E.k(A.state.formEntity,e,A,A.state)},required:!0})),n.a.createElement("div",{className:"col-lg-4 form-group"},n.a.createElement("label",{className:"form-label"},"Invoice, Receipt or any other document of Transaction"),n.a.createElement("input",{id:"attachments",name:"attachments",className:"form-control",maxLength:10,onChange:this.onFileChange,size:"10",type:"file"})),n.a.createElement("div",{className:"col-lg-4 form-group"},n.a.createElement("label",{className:"form-label"},"Any Important Note about this Transaction",n.a.createElement("span",{className:"text-danger"}," ")),n.a.createElement("textarea",{className:"form-control",id:"notes",name:"notes",rows:"3",value:this.state.formEntity.notes||"",onChange:function(e){return E.k(A.state.formEntity,e,A,A.state)}}))),n.a.createElement("div",{className:"d-flex justify-content-end mt-10"},n.a.createElement("button",{type:"button",id:"btnCloseUserModal",onClick:function(){return A.cancelForm()},className:"btn btn-sm btn-danger mr-5"}," ",n.a.createElement("span",{className:"fa fa-times"})," Close"),n.a.createElement("button",{type:"button",id:"btnSaveUser",onClick:function(){return A.submitForm()},className:"btn btn-sm btn-success"}," ",!this.state.loading&&n.a.createElement("span",{className:"fa fa-save"}),this.state.loading&&n.a.createElement("span",{className:"ml-3 spinner spinner-white"})," ","Save")))}}]),a}(n.a.Component),C=a(501),L=(a(261),a(530),a(139)),S=a.n(L),w=a(487),k=a(267),x=function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{style:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",paddingTop:"100px"}},n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement(k.a,{color:"#6ee7b7"})))},O=function(e){Object(r.a)(a,e);var t=Object(d.a)(a);function a(e,l){var n;return Object(s.a)(this,a),(n=t.call(this,e,l)).PrintList=[],n.cust_options=[],n.sales_options=[],n.filter_opt=[{value:"sales",label:"Sales"},{value:"customer",label:"Customer"}],n.onFileChange=function(e){n.setState({selectedFile:e.target.files[0]})},n.handlefilterOpt=function(e){console.log("filter opt is:"+e.value);var t=Object(o.a)(n),a=n.state;console.log("filter opt is:"+e.value+"  "+e.label),a.filter_opt=e.value,n.setState(a,(function(){})),"customer"===e.value&&(a.filterid_options=t.cust_options,a.filter_opt=e.value),"sales"===e.value&&(a.filterid_options=t.sales_options,a.filter_opt=e.value),""!==e.value&&(a.clearButton=!0)},n.handlefilterid=function(e){console.log("filter id is:"+e.value);var t=n.state;console.log("filter id is:"+e.value+"  "+e.label),t.filter_id=e.value,""!==t.filter_id&&(t.clearButton=!0),n.setState(t,(function(){}))},n.handleCheckbox=function(e){var t=e.target.checked;console.log(t),n.state.allChecked=t},n.handlePageClick=function(e){var t,a=n.state,l="",s=n.state.getMoreUrl;if(!1===a.allChecked){a.loadingStatus=!0,n.setState({loadingStatus:!0});var i=(t=e.selected)*n.state.limit;((l="".concat(s,"/?limit=").concat(n.state.limit,"&offset=").concat(i)).includes("date__gte")||l.includes("date__lte")||l.includes("customer")||l.includes("sales"))&&(l=l.replace("/?limit","&limit"))}else l+="&limit=1000";n.loadGrid(null,l,t)},n.state={showUsersList:!0,entityName:"Transactions",heading:"Transactions",paramObj:{},List:[],allChecked:!1,isdataLoading:!1,transModelObject:[],SalesList:[],CustList:[],filterid_options:[],filter_opt:"",filter_id:"",date__gte:"",date__lte:"",isLoading:!0,offset:0,count:0,limit:20,getMoreUrl:"",currentPage:0,startingPoint:1,showDetail:!1,clearButton:!1,loadingStatus:{status:!0,message:"Loading ..."}},n}return Object(i.a)(a,[{key:"clearFilter",value:function(e){var t=this.state;t.date__gte="",t.date__lte="",t.filter_opt="",t.filter_id="",void 0!==document.getElementsByClassName(" css-1uccc91-singleValue")[0]&&(document.getElementsByClassName(" css-1uccc91-singleValue")[0].innerHTML="Select",void 0!==document.getElementsByClassName(" css-1uccc91-singleValue")[1]&&(document.getElementsByClassName(" css-1uccc91-singleValue")[1].innerHTML="Select")),document.getElementById("date__gte").value="",document.getElementById("date__lte").value="",document.getElementById("filter_opt").value="",document.getElementById("filter_id").value=""}},{key:"componentDidMount",value:function(){this.loadGrid(null,y.a.Transactions_transactions),this.loadGridSales(),this.loadGridCust()}},{key:"printData",value:function(){window.print()}},{key:"initializeFilteredDT",value:function(){}},{key:"showListView",value:function(e,t,a){var l,n=(a=null!==(l=a)&&void 0!==l?l:this).state;n.showUsersList=e,n.heading=t,a.setState(n,(function(){e&&a.loadGrid(null,y.a.Transactions_transactions)}))}},{key:"showDetailedModal",value:function(e){console.log(e),console.log("in new model");var t=this.state;t.showDetail=!0,t.transModelObject=e,console.log("Display List Array is:-"),console.log(t.transModelObject),this.setState(t)}},{key:"loadGrid",value:function(e,t){var a,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=(e=null!==(a=e)&&void 0!==a?a:this).state;n.List=[],n.loadingStatus={status:!0,message:"Loading ..."},n.isdataLoading=!0,e.setState(n,(function(){})),y.e(t,(function(a){var n,s;if((null===a||void 0===a||null===(n=a.data)||void 0===n||null===(s=n.results)||void 0===s?void 0:s.length)>0){var i=e.state;i.List=a.data.results,i.isdataLoading=!1,i.isLoading=!1,0==i.allChecked&&(i.pageCount=Math.ceil((null===a||void 0===a?void 0:a.data.count)/i.limit),i.count=null===a||void 0===a?void 0:a.data.count,i.getMoreUrl=t,i.startingPoint=1,console.log("Selected page is:"+i.currentPage),i.offset=l),1==i.allChecked&&(i.count=null===a||void 0===a?void 0:a.data.count,i.startingPoint=1),console.log("Seleced page is:"+i.currentPage),console.log("Page count is:"+i.pageCount+" and count is:"+i.count),i.loadingStatus={status:!0,message:""},i.showUsersList=!0,e.PrintingListFun(i.List),e.setState(i,(function(){console.log(i.List)}))}else{var o=e.state;o.isdataLoading=!1,o.startingPoint=0,o.pageCount=0,o.count=0,o.List=[],o.loadingStatus={status:!0,message:""},e.setState(o)}}))}},{key:"loadGridSales",value:function(e){var t,a=(e=null!==(t=e)&&void 0!==t?t:this).state;a.SalesList=[],a.isLoading=!0,a.loadingStatus={status:!0,message:"Loading ..."},y.e(y.a.Sales_sales+"?limit=100",(function(t){var a,l;if((null===t||void 0===t||null===(a=t.data)||void 0===a||null===(l=a.results)||void 0===l?void 0:l.length)>0){console.log(t.data.results);var n=e.state;n.SalesList=t.data.results,n.isLoading=!1,n.loadingStatus={status:!0,message:""},n.showUsersList=!0,e.sales_options=[],t.data.results.map((function(t,a){var l,n;e.sales_options.push({value:t.id,label:(null===t||void 0===t||null===(l=t.customer)||void 0===l||null===(n=l.user)||void 0===n?void 0:n.full_name)||"N/A"})})),console.log(e.sales_options),e.setState(n,(function(){}))}else{var s=e.state;s.SalesList=[],s.isLoading=!1,s.loadingStatus={status:!1,message:""},e.setState(s)}}))}},{key:"loadGridCust",value:function(e){var t,a=(e=null!==(t=e)&&void 0!==t?t:this).state;a.CustList=[],a.isLoading=!0,a.loadingStatus={status:!0,message:"Loading ..."},y.e(y.a.Customer_customer+"?limit=100",(function(t){if(t.data.results.length>0){var a=e.state;a.CustList=t.data.results,a.isLoading=!1,a.loadingStatus={status:!0,message:""},a.showUsersList=!0,e.cust_options=[],t.data.results.map((function(t,a){e.cust_options.push({label:t.user.full_name,value:t.id})})),console.log(e.cust_options),e.setState(a,(function(){}))}else{var l=e.state;l.isdataLoading=!1,l.CustList=[],l.isLoading=!1,l.loadingStatus={status:!1,message:""},e.setState(l)}}))}},{key:"loadGridFilter",value:function(e){var t,a=(e=null!==(t=e)&&void 0!==t?t:this).state;a.List=[],a.loadingStatus={status:!0,message:"Loading ..."},e.filterSend(e)}},{key:"filterSend",value:function(e){var t=null!==e&&void 0!==e?e:this,a=this.state;document.querySelectorAll('[aria-label="Page 1"]')[0]&&document.querySelectorAll('[aria-label="Page 1"]')[0].click();var l=y.a.Transactions_transactions;if(""!==(null===a||void 0===a?void 0:a.date__gte)&&""!==(null===a||void 0===a?void 0:a.date__lte)&&(console.log("start date is:"+(null===a||void 0===a?void 0:a.date__gte)),l=l+"?date__gte="+(null===a||void 0===a?void 0:a.date__gte)+"&date__lte="+(null===a||void 0===a?void 0:a.date__lte),"customer"!==(null===a||void 0===a?void 0:a.filter_opt)&&"customer"!==(null===a||void 0===a?void 0:a.filter_opt)||(l=l+"&customer="+(null===a||void 0===a?void 0:a.filter_id)),"sales"!==(null===a||void 0===a?void 0:a.filter_opt)&&"sales"!==(null===a||void 0===a?void 0:a.filter_opt)||(l=l+"&sales="+(null===a||void 0===a?void 0:a.filter_id))),""!==(null===a||void 0===a?void 0:a.date__gte)&&""==(null===a||void 0===a?void 0:a.date__lte)&&(l=l+"?date__gte="+(null===a||void 0===a?void 0:a.date__gte),"sales"!==(null===a||void 0===a?void 0:a.filter_opt)&&"sales"!==(null===a||void 0===a?void 0:a.filter_opt)||(l=l+"&sales="+(null===a||void 0===a?void 0:a.filter_id)),"customer"!==(null===a||void 0===a?void 0:a.filter_opt)&&"customer"!==(null===a||void 0===a?void 0:a.filter_opt)||(l=l+"&customer="+(null===a||void 0===a?void 0:a.filter_id))),""!==(null===a||void 0===a?void 0:a.date__lte)&&""==(null===a||void 0===a?void 0:a.date__gte)&&(l=l+"?date__lte="+(null===a||void 0===a?void 0:a.date__lte),"customer"!==(null===a||void 0===a?void 0:a.filter_opt)&&"customer"!==(null===a||void 0===a?void 0:a.customer)||(l=l+"&customer="+(null===a||void 0===a?void 0:a.filter_id)),"sales"!==(null===a||void 0===a?void 0:a.filter_opt)&&"sales"!==(null===a||void 0===a?void 0:a.filter_opt)||(l=l+"&sales="+(null===a||void 0===a?void 0:a.filter_id))),""===(null===a||void 0===a?void 0:a.date__gte)&&""===(null===a||void 0===a?void 0:a.date__lte)&&("customer"!==(null===a||void 0===a?void 0:a.filter_opt)&&"customer"!==(null===a||void 0===a?void 0:a.customer)||(l=l+"?customer="+(null===a||void 0===a?void 0:a.filter_id)),"sales"!==(null===a||void 0===a?void 0:a.filter_opt)&&"sales"!==(null===a||void 0===a?void 0:a.filter_opt)||(l=l+"?sales="+(null===a||void 0===a?void 0:a.filter_id))),!0===a.allChecked){a.limit=1e3,a.pageCount=1,a.offset=0;l=["customer","sales","date__gte","date__lte"].some((function(e){return l.includes(e)}))?l+"&limit="+a.limit:l+"?limit="+a.limit}!1===a.allChecked&&(a.limit=20),this.loadGrid(t,l)}},{key:"edit",value:function(e){var t=this.state;t.paramObj=e,this.setState(t),this.showListView(!1,e?"Edit ".concat(this.state.entityName):"Add New ".concat(this.state.entityName))}},{key:"delete",value:function(e){var t=this;E.e("Do you want to delete this ".concat(this.state.entityName,"?"),"Are you sure?",(function(){y.d(y.a.Transaction_transaction,e,(function(a){if(null===a||void 0===a?void 0:a.data){E.f(t.state.entityName);var l=t.state;l.List=E.d(l.List,"id",e),t.setState(l,(function(){(void 0).row(u()("#row_"+e)[0]).remove().draw()}))}}))}),null)}},{key:"handleClose",value:function(){var e=this.state;e.show=!1,e.showDetail=!1,this.setState(e,(function(){}))}},{key:"dateChanger",value:function(e){var t=new Date(e),a=t.toLocaleDateString();t.toLocaleTimeString();return a}},{key:"PrintingListFun",value:function(e){var t,a=this;e=null!==(t=e)&&void 0!==t?t:this.state.list,this.PrintList=[],e.map((function(e,t){var l,n;a.PrintList.push({CUSTOMER:(null===e||void 0===e||null===(l=e.customer)||void 0===l||null===(n=l.user)||void 0===n?void 0:n.full_name)||"N/A",SALES:(null===e||void 0===e?void 0:e.sales)||"N/A",AMOUNT:(null===e||void 0===e?void 0:e.amount)||"N/A",PAYMENT_METHOD:(null===e||void 0===e?void 0:e.payment_method)||"N/A",CREATED_DATE:new Date(e.date).toLocaleDateString()})}))}},{key:"render",value:function(){var e,t,a,l,s,i,o,r,d,c,u,g,p,y,L,k,O,A,j,D,P,T,M,F,U,R,V,G,B,I,q,H=this,z=this.state,J=z.isdataLoading;z.List;return n.a.createElement("div",{className:"card card-custom"},n.a.createElement("div",{className:"card-header"},n.a.createElement("div",{className:"card-title"},n.a.createElement("h3",{className:"card-label font-weight-bolder text-dark"},this.state.heading)),n.a.createElement("div",{className:"card-toolbar"},this.state.showUsersList&&n.a.createElement("button",{onClick:function(){return H.edit(void 0)},type:"button",className:"btn btn-success btn-sm"},n.a.createElement("i",{className:"fa fa-plus"})," Create New"," ",this.state.entityName),!this.state.showUsersList&&n.a.createElement("button",{onClick:function(){return H.showListView(!H.state.showUsersList,"Transactions")},type:"button",className:"btn btn-dark btn-sm"},n.a.createElement("i",{className:"fa fa-arrow-left"})," Back To List"))),n.a.createElement("div",{className:"card-body"},this.state.isLoading&&this.state.showUsersList?"Loading ...":this.state.showUsersList&&n.a.createElement(m.Animated,{animationIn:"bounceInLeft",animationOut:"fadeOut",isVisible:!0},n.a.createElement(b.a,null,n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-lg-10 d-flex flex-row"},n.a.createElement("div",{className:"col-lg-2 form-group"},n.a.createElement("label",{className:"form-label"}," Start Date"),n.a.createElement("input",{type:"date",id:"date__gte",name:"date__gte",style:{width:"100%"},className:"form-control form-control-sm fs-md",value:(null===this||void 0===this||null===(e=this.state)||void 0===e?void 0:e.date__gte)||"",onChange:function(e){return E.k(H.state,e,H,H.state)},required:!0})),n.a.createElement("div",{className:"col-lg-2 form-group"},n.a.createElement("label",{className:"form-label"},"End Date"),n.a.createElement("input",{type:"date",id:"date__lte",name:"date__lte",style:{width:"100%"},className:"form-control form-control-sm fs-md",value:(null===(t=this.state)||void 0===t?void 0:t.date__lte)||"",onChange:function(e){return E.k(H.state,e,H,H.state)},required:!0})),n.a.createElement("div",{className:"col-lg-2 form-group"},n.a.createElement("label",{className:"form-label"},"Choose by Type"),n.a.createElement(_.a,{id:"filter_opt",className:"",name:"filter_opt",Placeholder:"Choose by Type",options:this.filter_opt,onChange:function(e){H.handlefilterOpt(e)}})),n.a.createElement("div",{className:"col-lg-2 form-group"},n.a.createElement("label",{className:"form-label"},"Choose by Name "),n.a.createElement(_.a,{id:"filter_id",className:"",name:"filter_id",Placeholder:"Choose by Name",options:this.state.filterid_options,onChange:function(e){H.handlefilterid(e)}})),n.a.createElement("div",{className:"col-lg-2 form-group flex flex-end ",style:{display:"flex",float:"right",marginTop:"30px",marginLeft:"40px"}},n.a.createElement("input",{className:"form-check-input",type:"checkbox",value:"",id:"checkbox",style:{width:"25px",height:"25px"},onChange:function(e){H.handleCheckbox(e)}}),n.a.createElement("label",{className:"form-label",style:{marginLeft:"20px",marginTop:"5px"}},"Show All Records")),this.state.clearButton?n.a.createElement("div",{className:"col-lg-2 form-group flex flex-end mt-8 px-12"},n.a.createElement(C.a,{type:"button",className:"btn btn-secondary  ",onClick:function(){return H.clearFilter()}},n.a.createElement("i",{className:"fa fa-filter","aria-hidden":"true"}),"Clear Filters")):""),n.a.createElement("div",{className:"col-lg-2 form-group mt-8 ",style:{display:"flex-end",float:"right"}},n.a.createElement(C.a,{style:{float:"right"},onClick:function(){return H.filterSend()},className:"btn btn-info"},n.a.createElement("i",{className:"fa fa-filter","aria-hidden":"true"}),"Apply Filters")))),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("div",{className:"table-responsive"},n.a.createElement("div",null,n.a.createElement("div",{style:{display:"flex",justifyContent:"flex-start"}},n.a.createElement(C.a,{style:{float:"left",marginRight:"10px"},onClick:function(){return H.printData()},className:"btn btn-warning btn-sm"},n.a.createElement("i",{className:"fa fa-file-pdf","aria-hidden":"true"}),"Export to PDF"),n.a.createElement(w.CSVLink,{data:this.PrintList,filename:"Viteace Transactions Record"},n.a.createElement(C.a,{style:{float:"right"},className:"btn btn-primary btn-sm"},n.a.createElement("i",{className:"fa fa-file-excel","aria-hidden":"true"}),"Export to CSV")))),n.a.createElement("div",{className:"table_responsive02"},J?n.a.createElement(x,null):n.a.createElement("table",{id:"List",className:"table table-sm table-hover table-striped table-bordered w-80"},n.a.createElement("thead",{className:"bg-custom text-white"},n.a.createElement("tr",null,n.a.createElement("th",{className:"text-center"},n.a.createElement("i",{className:"fa fa-users"})," Customer"),n.a.createElement("th",{className:"text-center"},n.a.createElement("i",{className:"fa fa-clipboard-list mr-1"})," ","Sales"),n.a.createElement("th",{className:"text-center"},n.a.createElement("i",{className:"fa fa-info-circle"})," Amount"),n.a.createElement("th",{className:"text-center"},n.a.createElement("i",{className:"fa fa-credit-card"})," Payment Method"),n.a.createElement("th",{className:"text-center"},n.a.createElement("i",{className:"fa fa-calendar-alt mr-1"})," ","Created Date"),n.a.createElement("th",{className:"text-center"},n.a.createElement("i",{className:"fa fa-bolt mr-1"})," Action"))),n.a.createElement("tbody",null,null!=this.state.List&&this.state.List.length>0?this.state.List.map((function(e,t){var a,l,s,i,o,r,d;return n.a.createElement("tr",{key:t,id:"row_".concat(e.id)},n.a.createElement("td",{align:"center"},null!==(a=null===(l=e.customer)||void 0===l||null===(s=l.user)||void 0===s?void 0:s.full_name)&&void 0!==a?a:"N/A"),n.a.createElement("td",{align:"center"},null!==(i=e.sales)&&void 0!==i?i:"N/A"),n.a.createElement("td",{align:"center"},"Rs.  ",null!==(o=e.amount)&&void 0!==o?o:"N/A"),n.a.createElement("td",{align:"center"},null!==(r=e.payment_method)&&void 0!==r?r:"N/A"),n.a.createElement("td",{align:"center"},null!==(d=new Date(e.date).toLocaleDateString())&&void 0!==d?d:"N/A"),n.a.createElement("td",{align:"center"},n.a.createElement(v.a,{placement:"top",overlay:n.a.createElement(f.a,null," Edit Transaction ")},n.a.createElement("button",{onClick:function(){return H.edit(e)},type:"button",className:"btn btn-xs btn-icon btn-outline-primary"},n.a.createElement("i",{className:"fa fa-edit",style:{padding:"10px"}}))),n.a.createElement(v.a,{placement:"top",overlay:n.a.createElement(f.a,null," Detailed Page ")},n.a.createElement("button",{onClick:function(){return H.showDetailedModal(e)},type:"button",className:"btn btn-xs btn-icon btn-outline-primary"},n.a.createElement("i",{className:"fa fa-eye",style:{padding:"10px"}})))))})):n.a.createElement("tr",null,n.a.createElement("td",{colSpan:"5",className:"text-center text-danger"}," ",n.a.createElement("h5",null,"No Data Available")," ")))),n.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:"row"}},n.a.createElement("div",null,n.a.createElement("div",null,this.state.offset*this.state.limit+this.state.limit>this.state.count?n.a.createElement("span",null," ","Showing"," ",this.state.offset*this.state.limit+this.state.startingPoint," ","to ",this.state.count," from ",this.state.count):n.a.createElement("span",null," ","Showing"," ",this.state.offset*this.state.limit+this.state.startingPoint," ","to"," ",this.state.offset*this.state.limit+this.state.limit," ","from ",this.state.count," "))),n.a.createElement("div",null,n.a.createElement(S.a,{previousLabel:"prev",nextLabel:"next",breakLabel:"...",breakClassName:"break-me",pageCount:this.state.pageCount,marginPagesDisplayed:2,pageRangeDisplayed:5,onPageChange:this.handlePageClick,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})))))),!this.state.showUsersList&&n.a.createElement(m.Animated,{animationIn:"bounceInLeft",animationOut:"fadeOut",isVisible:!0},n.a.createElement(N,{parentRef:this}))),n.a.createElement(h.a,{size:"xl",centered:!0,show:this.state.showDetail,onHide:this.handleClose},n.a.createElement(h.a.Header,{closeButton:!0,style:{backgroundColor:"#eaedf2"}},n.a.createElement(h.a.Title,{style:{marginLeft:"38%",marginRight:"38%",color:"#19c5bd"}}," ","Transactions Detail Page")),n.a.createElement(h.a.Body,null,n.a.createElement("div",{className:"row d-flex justify-content-center"},n.a.createElement("div",{className:"col-lg-12 form-group"},n.a.createElement("h4",null,"Sales:","  "),n.a.createElement("h3",{style:{color:"#369afe"}},"   ",null!==(a=null===this||void 0===this||null===(l=this.state)||void 0===l||null===(s=l.transModelObject)||void 0===s?void 0:s.sales)&&void 0!==a?a:"N/A"))),n.a.createElement("div",{className:"row d-flex justify-content-center"}),n.a.createElement("div",{className:"row d-flex justify-content-center"},n.a.createElement("div",{className:"col-lg-4 form-group"},n.a.createElement("label",null,"Customer Full Name:"),n.a.createElement("b",null,"   ",null!==(i=null===this||void 0===this||null===(o=this.state)||void 0===o||null===(r=o.transModelObject)||void 0===r||null===(d=r.customer)||void 0===d||null===(c=d.user)||void 0===c?void 0:c.full_name)&&void 0!==i?i:"N/A")),n.a.createElement("div",{className:"col-lg-4 form-group"},n.a.createElement("label",null,"Date: "),n.a.createElement("b",null,"   ",null!==(u=this.dateChanger(null===this||void 0===this||null===(g=this.state)||void 0===g||null===(p=g.transModelObject)||void 0===p?void 0:p.date))&&void 0!==u?u:"N/A")),n.a.createElement("div",{className:"col-lg-4 form-group "},n.a.createElement("label",null,"Amount: "),n.a.createElement("b",null,"   ",null!==(y=null===this||void 0===this||null===(L=this.state)||void 0===L||null===(k=L.transModelObject)||void 0===k?void 0:k.amount)&&void 0!==y?y:"N/A"))),n.a.createElement("div",{className:"row d-flex justify-content-between"},n.a.createElement("div",{className:"col-lg-4 form-group "},n.a.createElement("label",null,"Dues: "),n.a.createElement("b",null,"  Rs. ",null!==(O=null===this||void 0===this||null===(A=this.state)||void 0===A||null===(j=A.transModelObject)||void 0===j||null===(D=j.customer)||void 0===D?void 0:D.dues)&&void 0!==O?O:"N/A")),n.a.createElement("div",{className:"col-lg-4 form-group"},n.a.createElement("label",null,"Payment Method: "),n.a.createElement("b",null,"   ",null!==(P=null===this||void 0===this||null===(T=this.state)||void 0===T||null===(M=T.transModelObject)||void 0===M?void 0:M.payment_method)&&void 0!==P?P:"N/A")),n.a.createElement("div",{className:"col-lg-4 form-group "},n.a.createElement("label",null,"Created By: "),n.a.createElement("b",null,"   ",null!==(F=null===this||void 0===this||null===(U=this.state)||void 0===U||null===(R=U.transModelObject)||void 0===R||null===(V=R.created_by)||void 0===V||null===(G=V.user)||void 0===G?void 0:G.full_name)&&void 0!==F?F:"N/A"))),n.a.createElement("div",{className:"row d-flex justify-content-between"},n.a.createElement("div",{className:"col-lg-4 form-group "},n.a.createElement("h4",null,"Notes: "),n.a.createElement("h5",null,"   ",null!==(B=null===this||void 0===this||null===(I=this.state)||void 0===I||null===(q=I.transModelObject)||void 0===q?void 0:q.notes)&&void 0!==B?B:"N/A"))),n.a.createElement("div",{className:"d-flex justify-content-end mt-8"},n.a.createElement("button",{type:"button",id:"btnCloseUserModal",onClick:function(){return H.handleClose()},className:"btn btn-sm btn-danger mr-5"}," ",n.a.createElement("span",{className:"fa fa-times mr-1"})," Close")))))}}]),a}(n.a.Component);function A(){return n.a.createElement(O,null)}a.d(t,"default",(function(){return A}))}}]);
//# sourceMappingURL=4.d3864a95.chunk.js.map