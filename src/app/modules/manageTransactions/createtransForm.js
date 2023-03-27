import React from "react";
import * as Utils from "../../Common/Common";
import { Form } from "react-bootstrap";
import * as CRUD from "../../Common/CRUD";
import Select from "react-select";
export default class CreateTransForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    //debugger;
    this.state = {
      formEntity: props.parentRef.state.paramObj ?? {
        sales: "",
        customer: "",
        amount: "",
        date: "",
        payment_method: "",
        created_by: "",
        notes: "",
        attachments: null,
      },
      formValidated: false,
      List: [],
      SalesList: [],
      CustList: [],
      StaffList: [],
      loading: false,
      updateBool: false,
      options: [],

      createdOption: [],
      salesOption: [],
      customerOption: [],
    };
  }
  createdByOption = [];
  salesOption = [];
  customerOption = [];
  convertingDate(x) {
    const backendDate = x;
    const dateObject = new Date(backendDate);
    const dateString = dateObject.toLocaleDateString();

    var [month, date, year] = dateString.split("/");
    if (month !== undefined && date !== undefined && year !== undefined) {
      if (month.length < 2) {
        month = "0" + month;
      }
      if (date.length < 2) {
        date = "0" + date;
      }
    }
    const newDate = `${year}-${month}-${date}`;
    //const newDate="2022-12-01";
    // exact date format is : yyyy-mm-dd

    return newDate;
  }

  componentDidMount() {
    this.loadGrid(this);
    this.loadGridCust();
    this.loadGridStaff();
  }

  onFileChange = (event) => {
    // debugger;
    // Update the state
    let _state = this.state;
    _state.formEntity.attachments = event.target.files[0];
    this.setState(_state);
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append("attachments", this.state.formEntity.attachments);
  };

  handleCreatedbyChange = (e) => {
    //debugger;

    console.log("created by:" + e.value);
    let _state = this.state;
    _state.formEntity.created_by = e.value;

    this.setState(_state, function() {
      // executing the set state function
      //debugger;
    });
  };

  handleSalesChange = (e) => {
    //debugger;

    console.log("sales:" + e.value);
    let _state = this.state;
    //debugger
    _state.formEntity.sales = e.value;
    this.setState(_state, function() {
      // executing the set state function
      //debugger;
    });
  };
  handleCustomerChange = (e) => {
    //debugger;

    console.log("Customer is:" + e.value);
    let _state = this.state;
    _state.formEntity.customer = e.value;
    this.setState(_state, function() {
      // executing the set state function
      //debugger;
    });
  };

  // code added for fetching sales data from API
  loadGrid(_that) {
    //debugger;

    _that = _that ?? this;
    let _state = _that.state;
    _state.SalesList = [];
    _state.isLoading = true;
    //  if(_state.paramObj!=null){
    //       _state.updateBool=true;

    //     }
    _state.loadingStatus = {
      status: true,
      message: "Loading ...",
    };
    // _state.List = [];
    // _state.isLoading = false;
    // _state.loadingStatus = { status: false, message: "" };
    // _that.setState(_state);
    CRUD.getRequest(CRUD.APIRoutes.Sales_sales + "?limit=1000", function(
      response
    ) {
      if (response?.data?.results.length > 0) {
        // debugger;
        _state.isLoading = false;
        _state.loadingStatus = { status: true, message: "" };
        _state.showUsersList = true;

        //  debugger;
        _state.salesOption = [];
        response.data.results.map((item, index) => {
          _state.salesOption.push({
            value: item.id,
            label: item?.customer?.user?.full_name,
          });
        });
        //  debugger;
        console.log(_state.customerOption);

        _that.setState(_state, function() {
          // _that.initializeDT();
        });
      } // Api Exception // Api Exception
      else {
        let _state = _that.state;
        _state.CustomerList = [];
        _state.isLoading = false;
        _state.loadingStatus = { status: false, message: "" };
        _that.setState(_state);
      }
    });
  }

  // start of data fetching from API

  // end of data fetching from API

  // code for fetching customer data from API
  loadGridCust(_that) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.CustList = [];
    _state.isLoading = true;
    _state.loadingStatus = { status: true, message: "Loading ..." };
    CRUD.getRequest(CRUD.APIRoutes.Customer_customer, function(response) {
      //  debugger;
      _state.isLoading = false;
      _state.loadingStatus = { status: true, message: "" };
      _state.showUsersList = true;

      // debugger;
      _state.customerOption = [];
      response.data.results.map((item, index) => {
        _state.customerOption.push({
          value: item.id,
          label: item?.user?.full_name,
        });
      });

      // debugger;

      _that.setState(_state, function() {
        // _that.initializeDT();
      });
    });
  }
  // end of customer API data fetching

  // calling the API fr store staff

  loadGridStaff(_that) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.StaffList = [];
    _state.isLoading = true;
    _state.loadingStatus = { status: true, message: "Loading ..." };
    CRUD.getRequest(CRUD.APIRoutes.Staff_staff + "?limit=1000", function(
      response
    ) {
      //   debugger;
      _state.isLoading = false;
      _state.loadingStatus = { status: true, message: "" };
      _state.showUsersList = true;

      //   debugger;
      response.data.results.map((item, index) => {
        _state.createdOption.push({
          value: item.id,
          label: item?.user?.full_name,
        });
      });
      //debugger;

      _that.setState(_state, function() {
        // _that.initializeDT();
      });
    });
  }

  // end of store staff API data fetching

  cancelForm() {
    this.props.parentRef.showListView(
      true
      // this.props.parentRef.state.paramObj.entityName + "s",
      // this.props.parentRef
    );
  }
  submitForm() {
    if (Utils.validateForm("formEntity", this)) {
      let _that = this;
      let _state = _that.state;
      _state.loading = true;

      _that.setState(_state);
      _that.onFileUpload();

      // FOR PUT METHOD
      if (this.state.formEntity.id !== undefined) {
        if (
          _state.formEntity.attachments == null ||
          _state.formEntity.attachments === undefined ||
          _state.formEntity.attachments === ""
        ) {
          if (_state.formEntity.date.length > 9) {
            _state.formEntity.date = _that.convertingDate(
              _state.formEntity.date
            );
            _that.setState(_state);
          }

          CRUD.putRequest(
            CRUD.APIRoutes.Transactions_transactions +
              this.state.formEntity.id +
              "/",
            this.state.formEntity,

            function(response) {
              if (response?.data?.id != null) {
                console.log("response is:", response.data.id);
                // //debugger;

                _that.props.parentRef.loadGrid(
                  _that.props.parentRef,
                  "transactions/"
                );
                Utils.showUpsertAlert(
                  // this.props.parentRef.state.paramObj.entityName,
                  "Profile",
                  true
                );
              }
              _state.loading = false;
              _that.setState(_state);
            }
          );
        }
        if (_state.formEntity.attachments != null) {
          const formData = new FormData();
          formData.append("customer", this.state.formEntity.customer);
          formData.append("amount", this.state.formEntity.amount);
          formData.append("date", this.state.formEntity.date);
          formData.append("sales", this.state.formEntity.sales);
          formData.append(
            "payment_method",
            this.state.formEntity.payment_method
          );
          formData.append("created_by", this.state.formEntity.created_by);
          formData.append("notes", this.state.formEntity.notes);
          formData.append("attachments", this.state.formEntity.attachments);

          CRUD.putFileRequest(
            // CRUD.APIRoutes.Transactions_transactions,this.state.formEntity.id +
            // "/",
            // formData,

            CRUD.APIRoutes.Transactions_transactions +
              this.state.formEntity.id +
              "/",
            formData,
            function(response) {
              if (response?.data?.id != null) {
                console.log("response is:", response.data.id);
                // //debugger;

                _that.props.parentRef.loadGrid(
                  _that.props.parentRef,
                  "transactions/"
                );
                Utils.showUpsertAlert("Profile", false);
              }
              _state.loading = false;
              _that.setState(_state);
            }
          );
        }
      } else if (_state.formEntity.attachments != null) {
        if (_state.formEntity.date.length > 9) {
          _state.formEntity.date = _that.convertingDate(_state.formEntity.date);
        }
        const formData = new FormData();
        formData.append("customer", this.state.formEntity.customer);
        formData.append("amount", this.state.formEntity.amount);
        formData.append("date", this.state.formEntity.date);
        formData.append("sales", this.state.formEntity.sales);
        formData.append("payment_method", this.state.formEntity.payment_method);
        formData.append("created_by", this.state.formEntity.created_by);
        formData.append("notes", this.state.formEntity.notes);
        formData.append("attachments", this.state.formEntity.attachments);

        CRUD.postFileRequest(
          CRUD.APIRoutes.Transactions_transactions,
          formData,

          function(response) {
            if (response?.data?.id != null) {
              console.log("response is:", response.data.id);
              // //debugger;

              _that.props.parentRef.loadGrid(
                _that.props.parentRef,
                "transactions/"
              );
              Utils.showUpsertAlert("Profile", false);
            }
            _state.loading = false;
            _that.setState(_state);
          }
        );
      } else if (_state.formEntity.attachments == null) {
        //  debugger;
        CRUD.postRequest(
          CRUD.APIRoutes.Transactions_transactions,
          this.state.formEntity,
          function(response) {
            if (response?.data?.id != null) {
              //     debugger;
              console.log("response is:", response.data.id);
              // //debugger;

              _that.props.parentRef.loadGrid(
                _that.props.parentRef,
                "transactions/"
              );
              Utils.showUpsertAlert("Profile ", false);
            }
            _state.loading = false;
            _that.setState(_state);
          }
        );
      }
    }
  }

  render() {
    return (
      <Form
        noValidate
        validated={this.state.formValidated}
        id="formEntity"
        className="needs-validation"
      >
        <div className="row">
          {/* store staff div  */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Created by:<span className="text-danger"> *</span>
            </label>

            <Select
              id="created_by"
              name="created_by"
              className=""
              options={this?.state.createdOption}
              selectedValue={this?.state?.formEntity?.created_by || ""}
              placeholder={
                this?.state?.formEntity?.created_by?.user?.full_name ||
                "Please Select"
              }
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: "#1A1A1A", // Placeholder color
                },
              })}
              onChange={(e) => {
                this.handleCreatedbyChange(e);
              }}
            ></Select>
          </div>

          {/* sales */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Sales<span className="text-danger"> *</span>
            </label>
            <Select
              id="sales"
              name="sales"
              className=""
              options={this?.state.salesOption}
              selectedValue={this?.state?.formEntity?.sold_by || ""}
              placeholder={
                this?.state?.formEntity?.sold_by?.user?.full_name ||
                "Please Select"
              }
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: "#1A1A1A", // Placeholder color
                },
              })}
              onChange={(e) => {
                this.handleSalesChange(e);
              }}
            ></Select>

            {/*  */}
          </div>

          <div className="col-lg-4 form-group">
            {/* customer */}
            <label className="form-label">
              Customer<span className="text-danger"> *</span>
            </label>
            <Select
              style={{ overflow: "visible" }}
              id="customer"
              openOnFocus={true}
              name="customer"
              className=""
              options={this?.state?.customerOption}
              //menuPortalTarget={document.body}
              selectedValue={this?.state?.formEntity?.customer || ""}
              placeholder={
                this.state?.formEntity?.customer?.user?.full_name ||
                "Please Select"
              }
              theme={(theme) => ({
                ...theme,
                overflow: "visible",
                colors: {
                  ...theme.colors,
                  neutral50: "#1A1A1A", // Placeholder color
                },
              })}
              onChange={(e) => {
                this.handleCustomerChange(e);
              }}
            ></Select>
          </div>

          <div className="col-lg-4 form-group">
            {/* Amount */}
            <label className="form-label">
              Amount<span className="text-danger"> *</span>
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-control form-control-sm fs-md"
              value={this?.state?.formEntity?.amount || ""}
              onChange={(e) =>
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                )
              }
              required
            />
          </div>

          <div className="col-lg-4 form-group">
            {/* adding date */}

            <label className="form-label">
              Date <span className="text-danger"> *</span>
            </label>
            {/* input form */}
            <input
              type="date"
              id="date"
              name="date"
              className="form-control form-control-sm fs-md"
              //value="2021-01-01"

              value={this.convertingDate(this?.state?.formEntity?.date) || ""}
              //value={this.state.formEntity.date || ""}
              placeholder={this.state.formEntity.date}
              onChange={(e) =>
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                )
              }
              required
            />
          </div>

          <div className="col-lg-4 form-group">
            {/*payment method  */}
            <label className="form-label">
              Payment Method
              <span className="text-danger">
                <span className="text-danger"> *</span>{" "}
              </span>
            </label>
            <input
              type="text"
              id="payment_method"
              name="payment_method"
              className="form-control form-control-sm fs-md "
              value={this?.state?.formEntity?.payment_method || ""}
              onChange={(e) =>
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                )
              }
              required
            />
          </div>

          {/* <div className="col-lg-4 form-group">
           
            <label className="form-label">
              Created By<span className="text-danger"> </span>
            </label>
            <input
              type="text"
              id="created_by"
              name="created_by"
              className="form-control form-control-sm fs-md"
              value={this.state.formEntity.created_by || ""}
              onChange={(e) =>
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                )
              }
              required
            />
          </div> */}

          <div className="col-lg-4 form-group">
            <label className="form-label">
              Invoice, Receipt or any other document of Transaction
            </label>
            <input
              id="attachments"
              name="attachments"
              className="form-control"
              maxLength={10}
              onChange={this.onFileChange}
              // onClick={this.onFileUpload}
              size="10"
              type="file"
            ></input>
          </div>

          <div className="col-lg-4 form-group">
            {/* Note... */}
            <label className="form-label">
              Any Important Note about this Transaction
              <span className="text-danger"> </span>
            </label>

            <textarea
              className="form-control"
              id="notes"
              name="notes"
              rows="3"
              value={this.state.formEntity.notes || ""}
              onChange={(e) =>
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                )
              }
            ></textarea>

            {/* end ff option */}
          </div>
        </div>

        <div className="d-flex justify-content-end mt-10">
          <button
            type="button"
            id="btnCloseUserModal"
            onClick={() => this.cancelForm()}
            className="btn btn-sm btn-danger mr-5"
          >
            {" "}
            <span className="fa fa-times"></span> Close
          </button>
          <button
            type="button"
            id="btnSaveUser"
            onClick={() => this.submitForm()}
            className="btn btn-sm btn-success"
          >
            {" "}
            {!this.state.loading && <span className="fa fa-save"></span>}
            {this.state.loading && (
              <span className="ml-3 spinner spinner-white"></span>
            )}{" "}
            Save
          </button>
        </div>
      </Form>
    );
  }
}
