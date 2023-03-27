import React, { useState } from "react";
import * as Utils from "../../Common/Common";
import { Form } from "react-bootstrap";
import * as CRUD from "../../Common/CRUD";
import axios from "axios";
import Select from "react-select";

export default class CreateSalesForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      formEntity: props.parentRef.state.paramObj ?? {
        customer: "",
        date: "",
        price: "",
        quantity: "",
        commodity: "",
        unit: "",
        notes: "",
        broker_percentage: 0,
        broker_cut: "",
        attachments: null,

        // selectedFile: null,
      },
      CustomerList: [],
      CommodityList: [{ value: "", label: "" }],

      formValidated: false,
      options: [],
      unit_options: [],
      comOptions: [],
    };
  }

  componentDidMount() {
    // for loading customers data
    this.loadGrid();
    // for loading commodities data
    this.loadGridCom();
  }

  // for fetching data of customers from API

  calculatePercentage(e) {
    //debugger;
    if (e.target.value !== "") {
      console.log("Price is:" + this.state.formEntity.price);
      console.log("Quantity is:" + this.state.formEntity.quantity);
      console.log("Percentage is:" + e.target.value);
      var whole = this.state.formEntity.price * this.state.formEntity.quantity;
      let percent = e.target.value;
      var cut = (percent * whole) / 100;

      let _state = this.state;

      _state.formEntity.broker_cut = cut;
      this.setState(_state, function() {
        // executing the set state function
        //debugger;
      });

      console.log(cut);
      //console.log(this.stat)

      return cut;
    }
    if (this.state.formEntity.broker_percentage === "") {
      let _state = this.state;

      _state.formEntity.broker_cut = 0;

      this.setState(_state, function() {
        // executing the set state function
        //debugger;
      });
    }
  }
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
  handleCommodityChange = (e) => {
    //debugger;

    console.log("Commodity is:" + e.value);
    let _state = this.state;
    _state.formEntity.commodity = e.value;
    this.setState(_state, function() {
      // executing the set state function
      //debugger;
    });
  };
  handleUnitChange = (e) => {
    console.log("Unit is:" + e.value);
    let _state = this.state;
    _state.formEntity.unit = e.value;
    // debugger
    this.setState(_state, function() {
      // executing the set state function
      //debugger;
    });
  };

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

  loadGrid(_that) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.List = [];
    _state.isLoading = true;
    _state.loadingStatus = { status: true, message: "Loading ..." };
    CRUD.getRequest(CRUD.APIRoutes.Customer_customer + "?limit=1000", function(
      response
    ) {
      if (response?.data?.results.length > 0) {
        //  debugger;
        _state.isLoading = false;
        _state.loadingStatus = { status: true, message: "" };
        _state.showUsersList = true;

        // debugger;
        _state.options = [];
        response.data.results.map((item, index) => {
          _state.options.push({ value: item.id, label: item?.user?.full_name });
        });
        //  debugger;
        console.log(_state.options);
        //debugger;
        _state.unit_options.push({ value: "kg", label: "Kg" });
        _state.unit_options.push({ value: "ton", label: "Ton" });
        _state.unit_options.push({ value: "Gram", label: "Gram" });

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
  // end of code for fetching data of customers from API

  //for fetching data of commodities from API
  loadGridCom(_that) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.CommodityList = [];
    _state.isLoading = true;
    _state.loadingStatus = {
      status: true,
      message: "Loading ...",
    };

    if (_state.formEntity.date.length > 9) {
      _state.formEntity.date = _that.convertingDate(_state.formEntity.date);
    }
    CRUD.getRequest(
      CRUD.APIRoutes.Commodity_commodities + "?limit=1000",
      function(response) {
        if (response?.data?.results?.length > 0) {
          //   debugger;
          _state.isLoading = false;
          _state.loadingStatus = { status: true, message: "" };
          _state.showUsersList = true;

          //   debugger;
          response.data.results.map((item, index) => {
            _state.comOptions.push({ value: item.id, label: item.name });
          });
          //   debugger;

          _that.setState(_state, function() {
            // _that.initializeDT();
          });
        } // Api Exception
        else {
          let _state = _that.state;
          _state.CommodityList = [];
          _state.isLoading = false;
          _state.loadingStatus = { status: false, message: "" };
          _that.setState(_state);
        }
      }
    );
  }
  // end of code for fetching data of commodities from API

  cancelForm() {
    this.props.parentRef.showListView(true, "customers", this.props.parentRef);
  }
  submitForm() {
    //debugger;
    if (Utils.validateForm("formEntity", this)) {
      let _that = this;
      let _state = _that.state;
      _state.loading = true;
      _that.setState(_state);
      // let postObj= this.state.formEntity;
      // const dd = new Date();
      // let x=dd.toISOString();
      // postObj.date=x;
      _that.onFileUpload();

      // FOR PUT METHOD
      if (this.state.formEntity.id !== undefined) {
        // debugger;

        if (
          _state.formEntity.attachments == null ||
          _state.formEntity.attachments === undefined ||
          _state.formEntity.attachments === ""
        ) {
          //  debugger;
          CRUD.putRequest(
            // end

            CRUD.APIRoutes.Sales_sales + this.state.formEntity.id + "/",
            this.state.formEntity,

            function(response) {
              if (response?.data?.id != null) {
                //   debugger;
                console.log("response is:", response.data.id);
                // //debugger;
                // _that.state.formEntity.Date = _that.sendDate();
                //debugger;

                _that.props.parentRef.loadGrid(_that.props.parentRef, "sales/");
                Utils.showUpsertAlert(
                  // this.props.parentRef.state.paramObj.entityName,
                  "Sales",
                  true
                );
              }
              _state.loading = false;
              _that.setState(_state);
            }
          );
        }
        if (_state.formEntity.attachments != null) {
          // Create an object of formData
          const formData = new FormData();

          // Update the formData object
          if (_state.formEntity.date.length > 9) {
            _state.formEntity.date = _that.convertingDate(
              _state.formEntity.date
            );
          }

          formData.append("customer", this.state.formEntity.customer);

          formData.append("date", this.state.formEntity.date);
          formData.append("price", this.state.formEntity.price);
          formData.append("quantity", this.state.formEntity.quantity);
          formData.append("commodity", this.state.formEntity.commodity);
          formData.append("unit", this.state.formEntity.unit);
          formData.append("notes", this.state.formEntity.notes);
          formData.append(
            "broker_percentage",
            this.state.formEntity.broker_percentage
          );
          formData.append("broker_cut", this.state.formEntity.broker_cut);

          formData.append(
            "attachments",
            this.state.formEntity.attachments
            // event.target.files[0]
          );

          //debugger

          CRUD.putFileRequest(
            CRUD.APIRoutes.Sales_sales + this.state.formEntity.id + "/",
            formData,

            function(response) {
              if (response?.data?.id != null) {
                console.log("response is:", response.data.id);
                // //debugger;
                // _that.state.formEntity.Date = _that.sendDate();
                //debugger;

                _that.props.parentRef.loadGrid(_that.props.parentRef, "sales/");
                Utils.showUpsertAlert("Sales ", true);
              }
              _state.loading = false;
              _that.setState(_state);
            }
          );
        }
      } else if (_state.formEntity.attachments != null) {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object

        formData.append("customer", this.state.formEntity.customer);

        formData.append("date", this.state.formEntity.date);
        formData.append("price", this.state.formEntity.price);
        formData.append("quantity", this.state.formEntity.quantity);
        formData.append("commodity", this.state.formEntity.commodity);
        formData.append("unit", this.state.formEntity.unit);
        formData.append("notes", this.state.formEntity.notes);
        formData.append(
          "broker_percentage",
          this.state.formEntity.broker_percentage
        );
        formData.append("broker_cut", this.state.formEntity.broker_cut);

        formData.append(
          "attachments",
          this.state.formEntity.attachments
          // event.target.files[0]
        );

        //debugger

        CRUD.postFileRequest(
          CRUD.APIRoutes.Sales_sales,
          formData,

          function(response) {
            if (response?.data?.id != null) {
              console.log("response is:", response.data.id);
              // //debugger;
              // _that.state.formEntity.Date = _that.sendDate();
              //debugger;

              _that.props.parentRef.loadGrid(_that.props.parentRef, "sales/");
              Utils.showUpsertAlert("Sales ", false);
            }
            _state.loading = false;
            _that.setState(_state);
          }
        );
      } else if (_state.formEntity.attachments == null) {
        CRUD.postRequest(
          CRUD.APIRoutes.Sales_sales,
          this.state.formEntity,
          function(response) {
            if (response?.data?.id != null) {
              console.log("response is:", response.data.id);
              // //debugger;
              // _that.state.formEntity.Date = _that.sendDate();
              //debugger;

              _that.props.parentRef.loadGrid(_that.props.parentRef, "sales/");
              Utils.showUpsertAlert("Sales ", false);
            }
            _state.loading = false;
            _that.setState(_state);
          }
        );
      }
    }
  }

  onFileChange = (event) => {
    //debugger
    let _state = this.state;
    _state.formEntity.attachments = event.target.files[0];
    this.setState(_state);
  };
  // On file upload (click the upload button)
  onFileUpload = () => {
    //debugger;
    // Create an object of formData
    const formData = new FormData();

    formData.append("attachments", this.state.formEntity.attachments);
    //  ).header("Content-Type", "multipart/form-data");
  };

  render() {
    return (
      <Form
        validated={this.state.formValidated}
        id="formEntity"
        className="needs-validation"
      >
        <div className="row">
          {/* customer name */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Customer Name:<span className="text-danger"> *</span>
            </label>
            <Select
              style={{ overflow: "visible" }}
              id="customer"
              openOnFocus={true}
              name="customer"
              className=""
              options={this?.state?.options}
              menuPortalTarget={document.body}
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

          {/* 2---  commodity */}

          <div className="col-lg-4 form-group">
            <label className="form-label">
              Commodity Name:<span className="text-danger">* </span>
            </label>

            <Select
              id="commodity"
              name="commodity"
              className=""
              options={this?.state?.comOptions}
              //  value={this?.state?.formEntity?.commodity ||this.state.options?.value || ""}
              selectedValue={this.state.formEntity?.commodity?.name || ""}
              placeholder={
                this.state?.formEntity?.commodity?.name || "Please Select"
              }
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: "#1A1A1A", // Placeholder color
                },
              })}
              onChange={(e) => {
                this.handleCommodityChange(e);
              }}
            ></Select>
          </div>

          {/* 3---  quantity */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Quantity<span className="text-danger"> *</span>
            </label>
            {/* input form */}
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="form-control form-control-sm fs-md"
              value={this.state.formEntity?.quantity || ""}
              onChange={(e) => {
                this.calculatePercentage(e);
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                );
              }}
              required
            />
          </div>

          {/* date column */}
          <div className="col-lg-4 form-group">
            {/* adding date */}

            <label className="form-label">
              Date<span className="text-danger"> *</span>
            </label>

            <input
              type="date"
              id="date"
              name="date"
              className="form-control form-control-sm fs-md"
              value={this.convertingDate(this.state.formEntity.date) || ""}
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

          {/* end here */}
          {/* 4--- */}

          <div className="col-lg-4 form-group">
            <label className="form-label">
              Price<span className="text-danger"> *</span>
            </label>
            {/* input form */}
            <input
              type="number"
              id="price"
              name="price"
              className="form-control form-control-sm fs-md"
              value={this.state.formEntity?.price || ""}
              onChange={(e) => {
                this.calculatePercentage(e);
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                );
              }}
              required
            />
          </div>

          {/*     5---- unit dropdown                  */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Unit<span className="text-danger"> *</span>
            </label>
            {/* dropdown  */}

            <Select
              id="unit"
              className=""
              name="unit"
              options={this.state.unit_options}
              selectedValue={this.state.formEntity?.unit || ""}
              placeholder={this.state?.formEntity?.unit || "Please Select"}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: "#1A1A1A", // Placeholder color
                },
              })}
              onChange={(e) => {
                this.handleUnitChange(e);
              }}
            ></Select>
          </div>

          {/* ----8--   */}
          <div className="col-lg-4 form-group">
            {/* broker cut */}

            <label className="form-label">
              Broker's Cut <span className="text-danger"> </span>
            </label>
            {/* input form */}
            <input
              type="text"
              id="broker_cut"
              name="broker_cut"
              className="form-control form-control-sm fs-md"
              value={this?.state?.formEntity?.broker_cut}
              onChange={(e) => {
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                );
              }}
            />

            {/* end of option */}
          </div>

          {/* percentage  */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Percentage %<span className="text-danger"> </span>
            </label>
            {/* input form */}
            <input
              type="number"
              id="broker_percentage"
              name="broker_percentage"
              className="form-control form-control-sm fs-md"
              value={this.state.formEntity?.broker_percentage || ""}
              onChange={(e) => {
                this.calculatePercentage(e);
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                );
              }}
            />
          </div>
          {/* end of option */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Invoice, Receipt or any other document of Sales
            </label>
            <input
              id="attachments"
              name="attachments"
              className="form-control"
              maxLength={10}
              onChange={this.onFileChange}
              size="10"
              type="file"
            ></input>
          </div>

          {/* 7--- */}
          <div className="col-lg-4 form-group">
            {/* Note... */}
            <label className="form-label">
              Any Important Note about this Sale
              <span className="text-danger"> </span>
            </label>
            <textarea
              className="form-control"
              id="notes"
              name="notes"
              rows="3"
              value={this.state.formEntity?.notes || ""}
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

          {/* for applying test commodity here using react Select */}
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
            <span className="fa fa-save"></span> Save
          </button>
        </div>
      </Form>
    );
  }
}
