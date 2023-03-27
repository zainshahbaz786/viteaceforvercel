import React from "react";
// var $  = require( 'jquery' );
import JQUERY from "jquery";
import { Animated } from "react-animated-css";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import CreateTransForm from "./createtransForm";
import { Button, Checkbox } from "react-bootstrap";
import * as CRUD from "../../Common/CRUD";
import * as Utils from "../../Common/Common";
import { Form } from "react-bootstrap";
import { isNull } from "lodash";
import App from "../../../_metronic/_partials/Pagination/App";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { CSVLink } from "react-csv";

import { InfinitySpin } from "react-loader-spinner";
let dataTable;

const Spinner = () => (
  <>
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        paddingTop: "100px",
      }}
    >
      <br />
      <br />
      <br />
      <br />
      <InfinitySpin color="#6ee7b7" />
    </div>
  </>
);
export default class KeyWordList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showUsersList: true,
      entityName: "Transactions",
      heading: "Transactions",
      paramObj: {},
      List: [],
      allChecked: false,
      isdataLoading: false,
      transModelObject: [],
      SalesList: [],
      CustList: [],
      //PrintList: [],
      filterid_options: [],
      filter_opt: "",
      filter_id: "",
      date__gte: "",
      date__lte: "",
      isLoading: true,
      offset: 0,
      count: 0,
      limit: 20,
      getMoreUrl: "",
      currentPage: 0,
      startingPoint: 1,
      showDetail: false,
      clearButton: false,

      loadingStatus: { status: true, message: "Loading ..." },
    };
  }
  // On file select (from the pop up)

  PrintList = [];
  cust_options = [];
  sales_options = [];

  filter_opt = [
    { value: "sales", label: "Sales" },
    { value: "customer", label: "Customer" },
  ];

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  handlefilterOpt = (e) => {
    console.log("filter opt is:" + e.value);
    let _that = this;
    let _state = this.state;

    console.log("filter opt is:" + e.value + "  " + e.label);
    _state.filter_opt = e.value;
    //debugger;
    this.setState(_state, function() {
      // executing the set state function
      //debugger;
    });
    if (e.value === "customer") {
      _state.filterid_options = _that.cust_options;
      _state.filter_opt = e.value;
      //  _that.loadGridCust();
    }
    if (e.value === "sales") {
      _state.filterid_options = _that.sales_options;
      _state.filter_opt = e.value;
    }
    if(e.value !==""){
      _state.clearButton=true;
    
    }
  };

  handlefilterid = (e) => {
    console.log("filter id is:" + e.value);
    let _state = this.state;
    console.log("filter id is:" + e.value + "  " + e.label);
    _state.filter_id = e.value;
    if(_state.filter_id!==""){
      _state.clearButton=true;
    }
    this.setState(_state, function() {
      // executing the set state function
      //debugger;
    });
  };

  handleCheckbox = (e) => {
    const target = e.target;
    const checked = target.checked;
    console.log(checked);
    let _state = this.state;
    _state.allChecked = checked;

    // debugger;
  };

  clearFilter(that) {
    debugger;
    let _that = that ?? this;
    let _state = this.state;
    _state.date__gte = "";
    _state.date__lte = "";
    _state.filter_opt = "";
    _state.filter_id = "";


debugger;
    if(document.getElementsByClassName(' css-1uccc91-singleValue')[0]!==undefined){
    document.getElementsByClassName(' css-1uccc91-singleValue')[0].innerHTML = "Select";
    if(document.getElementsByClassName(' css-1uccc91-singleValue')[1]!==undefined){
    document.getElementsByClassName(' css-1uccc91-singleValue')[1].innerHTML = "Select";
    }
  }
    


    debugger;
    document.getElementById("date__gte").value = "";
    document.getElementById("date__lte").value = "";
    
    document.getElementById("filter_opt").value = "";

    document.getElementById("filter_id").value = "";
  }

  handlePageClick = (e) => {
    let newState = this.state;
    var selectedPage;
    let url = "";
    let newUrl = this.state.getMoreUrl;
    if (newState.allChecked === false) {
      //   debugger;
      newState.loadingStatus = true;
      this.setState({ loadingStatus: true });
      //debugger;
      selectedPage = e.selected;
      const offset = selectedPage * this.state.limit;
      //const offset =selectedPage;

     

      url = `${newUrl}/?limit=${this.state.limit}&offset=${offset}`;
      if (
        url.includes("date__gte") ||
        url.includes("date__lte") ||
        url.includes("customer") ||
        url.includes("sales")
      ) {
        url = url.replace("/?limit", "&limit");
      }
    } else {
      
      url = url + "&limit=1000";
    }

   
    this.loadGrid(null, url, selectedPage);
  };

  componentDidMount() {
    this.loadGrid(null, CRUD.APIRoutes.Transactions_transactions);

    this.loadGridSales();
    this.loadGridCust();
    // this.loadGridFilter();
    // this.loadGrid(null,CRUD.APIRoutes.Transactions_transactions);
  }

  printData() {
    window.print();
  }

  // for data table
  initializeFilteredDT() {
    // dataTable = JQUERY("#List").DataTable({
    //   responsive: true,
    //   columnDefs: [
    //     { responsivePriority: 1, targets: 0 },
    //     { responsivePriority: 2, targets: -1 },
    //   ],
    // });
  }

  showListView(flag, heading, that) {
    that = that ?? this;
    let _state = that.state;
    _state.showUsersList = flag;
    _state.heading = heading;
    that.setState(_state, function() {
      if (flag) {
        that.loadGrid(null, CRUD.APIRoutes.Transactions_transactions);
        // that.initializeDT();
      }
    });
  }
  // shouldComponentUpdate() {
  //     return false; // This will cause component to never re-render.
  //   }
  showDetailedModal(item) {
    //debugger;
    console.log(item);
    console.log("in new model");

    let _state = this.state;
    // debugger;
    _state.showDetail = true;
    _state.transModelObject = item;
    // debugger;
    console.log("Display List Array is:-");
    console.log(_state.transModelObject);
    this.setState(_state);
    //this.loadTransaction(item);
  }

  loadGrid(_that, url, selectedPage = 0) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.List = [];

    _state.loadingStatus = {
      status: true,
      message: "Loading ...",
    };
    _state.isdataLoading = true;

    //debugger;
    _that.setState(_state, function() {});

    // if(_state.allChecked){
    //   url+="?limit=1000";
    // }
    // if(!_state.allChecked){
    //   _state.limit=20;
    //   //url+="?limit=20";
    // }

    // comment it for testing purpose
    CRUD.getRequest(url, function(response) {
  debugger;
      if (response?.data?.results?.length > 0) {
        //debugger;
        let _state = _that.state;
        _state.List = response.data.results;
        _state.isdataLoading = false;
        _state.isLoading = false;
        //debugger
        if (_state.allChecked == false) {
          _state.pageCount = Math.ceil(response?.data.count / _state.limit);
          _state.count = response?.data.count;
          _state.getMoreUrl = url;
          _state.startingPoint = 1;
          //_state.currentPage=_state.handlePageClick.selectedPage;
          console.log("Selected page is:" + _state.currentPage);
          //debugger;
          // main working line....
          _state.offset = selectedPage;
        }
        if (_state.allChecked == true) {
          _state.count = response?.data.count;
          _state.startingPoint = 1;
        }
        // debugger;
        console.log("Seleced page is:" + _state.currentPage);
        console.log(
          "Page count is:" + _state.pageCount + " and count is:" + _state.count
        );
        _state.loadingStatus = { status: true, message: "" };
        _state.showUsersList = true;
        _that.PrintingListFun(_state.List);

        _that.setState(_state, function() {
          //  debugger;
          console.log(_state.List);
        });
      } // Api Exception
      else {
        let _state = _that.state;
        _state.isdataLoading = false;
        _state.startingPoint = 0;
        _state.pageCount = 0;
        _state.count = 0;
        _state.List = [];
        // _state.isLoading = false;
        _state.loadingStatus = { status: true, message: "" };
        _that.setState(_state);
      }
    });
  }
  // for sales data
  loadGridSales(_that) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.SalesList = [];
    _state.isLoading = true;
    _state.loadingStatus = {
      status: true,
      message: "Loading ...",
    };

    CRUD.getRequest(CRUD.APIRoutes.Sales_sales + "?limit=100", function(
      response
    ) {
      if (response?.data?.results?.length > 0) {
        //debugger;
        console.log(response.data.results);
        let _state = _that.state;
        _state.SalesList = response.data.results;
        _state.isLoading = false;
        _state.loadingStatus = { status: true, message: "" };
        _state.showUsersList = true;

        //_state.filterid_options=[];
        //debugger;
        _that.sales_options = [];
        
        response.data.results.map((item, index) => {
          _that.sales_options.push({
            value: item.id,
            label: item?.customer?.user?.full_name || "N/A",
          });
        });

        debugger;
        console.log(_that.sales_options);

        _that.setState(_state, function() {});
      } // Api Exception
      else {
        let _state = _that.state;
        _state.SalesList = [];
        _state.isLoading = false;
        _state.loadingStatus = { status: false, message: "" };
        _that.setState(_state);
      }
    });
  }

  // for customer data
  loadGridCust(_that) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.CustList = [];
    _state.isLoading = true;
    _state.loadingStatus = { status: true, message: "Loading ..." };
    CRUD.getRequest(CRUD.APIRoutes.Customer_customer + "?limit=100", function(
      response
    ) {
      // debugger;
      if (response.data.results.length > 0) {
        let _state = _that.state;
        _state.CustList = response.data.results;
        _state.isLoading = false;
        _state.loadingStatus = { status: true, message: "" };
        _state.showUsersList = true;
        // debugger;
        _that.cust_options = [];
        response.data.results.map((item, index) => {
          _that.cust_options.push({
            label: item.user.full_name,
            value: item.id,
          });
        });

        console.log(_that.cust_options);
        //debugger;
        _that.setState(_state, function() {
          //   _that.initializeDT();
        });
      } // Api Exception
      else {
        let _state = _that.state;
        _state.isdataLoading = false;
        _state.CustList = [];
        _state.isLoading = false;
        _state.loadingStatus = { status: false, message: "" };
        _that.setState(_state);
      }
    });
  }

  // load grid for filtered data
  loadGridFilter(_that) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.List = [];
    //_state.isLoading = true;
    _state.loadingStatus = {
      status: true,
      message: "Loading ...",
    };

    _that.filterSend(_that);
    // end of filtered data fetching function

    // for filtering of data
  }
  // function for applying the data filter....
  filterSend(that) {
    // debugger;
    let _that = that ?? this;
    let _state = this.state;

    if (document.querySelectorAll('[aria-label="Page 1"]')[0]) {
      document.querySelectorAll('[aria-label="Page 1"]')[0].click();
    }
    //  debugger;
    let url = CRUD.APIRoutes.Transactions_transactions;

    //                                            start of if else
    if (_state?.date__gte !== "" && _state?.date__lte !== "") {
      console.log("start date is:" + _state?.date__gte);
      url =
        url +
        "?date__gte=" +
        _state?.date__gte +
        "&date__lte=" +
        _state?.date__lte;

      //  if start date and end date is present

      if (
        _state?.filter_opt === "customer" ||
        _state?.filter_opt === "customer"
      ) {
        url = url + "&customer=" + _state?.filter_id;
      }
      if (_state?.filter_opt === "sales" || _state?.filter_opt === "sales") {
        url = url + "&sales=" + _state?.filter_id;
      }
    }

    if (_state?.date__gte !== "" && _state?.date__lte == "") {
      // if only start date is present
      url = url + "?date__gte=" + _state?.date__gte;
      if (_state?.filter_opt === "sales" || _state?.filter_opt === "sales") {
        url = url + "&sales=" + _state?.filter_id;
      }
      if (
        _state?.filter_opt === "customer" ||
        _state?.filter_opt === "customer"
      ) {
        url = url + "&customer=" + _state?.filter_id;
      }
    }

    if (_state?.date__lte !== "" && _state?.date__gte == "") {
      // if only end date is present
      url = url + "?date__lte=" + _state?.date__lte;
      if (
        _state?.filter_opt === "customer" ||
        _state?.customer === "customer"
      ) {
        url = url + "&customer=" + _state?.filter_id;
      }
      if (_state?.filter_opt === "sales" || _state?.filter_opt === "sales") {
        url = url + "&sales=" + _state?.filter_id;
      }
    }

    if (_state?.date__gte === "" && _state?.date__lte === "") {
      // debugger;
      // if no date is selected
      if (
        _state?.filter_opt === "customer" ||
        _state?.customer === "customer"
      ) {
        url = url + "?customer=" + _state?.filter_id;
      }
      if (_state?.filter_opt === "sales" || _state?.filter_opt === "sales") {
        url = url + "?sales=" + _state?.filter_id;
      }
    }

    if (_state.allChecked === true) {
      _state.limit = 1000;
      _state.pageCount = 1;
      _state.offset = 0;

      const conditions = ["customer", "sales", "date__gte", "date__lte"];
      if (conditions.some((el) => url.includes(el))) {
        //url=url+'&limit='+_state.limit+'&offset='+_state.offset;
        url = url + "&limit=" + _state.limit;
      } else {
        url = url + "?limit=" + _state.limit;
      }
    
    }
    if (_state.allChecked === false) {
      _state.limit = 20;
    
    }
    this.loadGrid(_that, url);

    
  }

  edit(user) {
    //debugger;
    let _state = this.state;
    _state.paramObj = user;

    this.setState(_state);
    this.showListView(
      false,
      user
        ? `Edit ${this.state.entityName}`
        : `Add New ${this.state.entityName}`
    );
  }
  delete(id) {
    let _that = this;
    Utils.showConfirmation(
      `Do you want to delete this ${this.state.entityName}?`,
      "Are you sure?",
      () => {
        CRUD.deleteRequest(CRUD.APIRoutes.Transaction_transaction, id, function(
          response
        ) {
          if (response?.data) {
            // debugger;
            Utils.showDeleteAlert(_that.state.entityName);
            let _state = _that.state;
            _state.List = Utils.removeElementFromArray(_state.List, "id", id);
            _that.setState(_state, function() {
              dataTable
                .row(JQUERY("#row_" + id)[0])
                .remove()
                .draw();
            });
          }
        });
      },
      null
    );
  }

  handleClose() {
    let _state = this.state;
    _state.show = false;
    _state.showDetail = false;
    this.setState(_state, function() {});
  }

  dateChanger(oldDate) {
    const backendDate = oldDate;
    const dateObject = new Date(backendDate);
    const dateString = dateObject.toLocaleDateString(); // "5/15/2022" (default format based on user's locale)
    const timeString = dateObject.toLocaleTimeString(); // "5:30:00 AM" (default format based on user's locale)
    // const formattedDate = dateString + " " + timeString; // "5/15/2022 5:30:00 AM"
    return dateString;
  }

  PrintingListFun(list) {
    list = list ?? this.state.list;
    //let listResult = [];
    this.PrintList = [];
    list.map((item, index) => {
      this.PrintList.push({
        CUSTOMER: item?.customer?.user?.full_name || "N/A",

        SALES: item?.sales || "N/A",
        AMOUNT: item?.amount || "N/A",
        PAYMENT_METHOD: item?.payment_method || "N/A",

        CREATED_DATE: new Date(item.date).toLocaleDateString(),
      });
    });
    //return ;
  }

  render() {
    // styling internal for modal

    // if (this.state.isLoading) {
    //   return (
    //     <>
    //       <span>Loading...</span>
    //     </>
    //   );
    // }
    const { isdataLoading, List } = this.state;

    return (
      <div className="card card-custom">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label font-weight-bolder text-dark">
              {this.state.heading}
            </h3>
          </div>
          <div className="card-toolbar">
            {this.state.showUsersList && (
              <button
                onClick={() => this.edit(undefined)}
                type="button"
                className="btn btn-success btn-sm"
              >
                <i className="fa fa-plus"></i> Create New{" "}
                {this.state.entityName}
              </button>
            )}

            {!this.state.showUsersList && (
              <button
                onClick={() =>
                  this.showListView(!this.state.showUsersList, "Transactions")
                }
                type="button"
                className="btn btn-dark btn-sm"
              >
                <i className="fa fa-arrow-left"></i> Back To List
              </button>
            )}
          </div>
        </div>
        <div className="card-body">
          {this.state.isLoading && this.state.showUsersList
            ? "Loading ..."
            : this.state.showUsersList && (
                <Animated
                  animationIn="bounceInLeft"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  {/* table for filtering */}

                  <Form>
                    <div className="row">
                      <div className="col-lg-10 d-flex flex-row">
                        {/* ----1----- */}
                        <div className="col-lg-2 form-group">
                          {/* adding date */}

                          <label className="form-label"> Start Date</label>

                          <input
                            type="date"
                            id="date__gte"
                            name="date__gte"
                            style={{ width: "100%" }}
                            className="form-control form-control-sm fs-md"
                            value={this?.state?.date__gte || ""}
                            //placeholder={this.state.formEntity?.date__gte}
                            onChange={(e) =>
                              Utils.updateInputValueInState(
                                this.state,
                                e,
                                this,
                                this.state
                              )
                            }
                            required
                          />
                        </div>
                        {/* ----2---- */}
                        <div className="col-lg-2 form-group">
                          {/* adding date */}

                          <label className="form-label">End Date</label>

                          <input
                            type="date"
                            id="date__lte"
                            name="date__lte"
                            style={{ width: "100%" }}
                            className="form-control form-control-sm fs-md"
                            value={this.state?.date__lte || ""}
                            // placeholder={this.state.formEntity?.date__lte}
                            onChange={(e) =>
                              Utils.updateInputValueInState(
                                this.state,
                                e,
                                this,
                                this.state
                              )
                            }
                            required
                          />
                        </div>

                        <div className="col-lg-2 form-group">
                          <label className="form-label">Choose by Type</label>
                          <Select
                            id="filter_opt"
                            className=""
                            //style={{ width: "50%" }}
                            name="filter_opt"
                            Placeholder="Choose by Type"
                            options={this.filter_opt}
                            //value={this.state?.filter_opt}
                            onChange={(e) => {
                              this.handlefilterOpt(e);
                            }}
                          ></Select>
                        </div>
                        {/* ----3----- */}
                        <div className="col-lg-2 form-group">
                          <label className="form-label">Choose by Name </label>

                          <Select
                            id="filter_id"
                            className=""
                            //style={{ width: "50%" }}
                            name="filter_id"
                            Placeholder="Choose by Name"
                            options={this.state.filterid_options}
                            //value={this.state?.filter_opt}
                            onChange={(e) => {
                              this.handlefilterid(e);
                            }}
                          ></Select>
                        </div>
                        {/* ----4---- */}
                        <div
                          className="col-lg-2 form-group flex flex-end "
                          style={{
                            display: "flex",
                            float: "right",
                            marginTop: "30px",
                            marginLeft: "40px",
                          }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="checkbox"
                            style={{ width: "25px", height: "25px" }}
                            onChange={(e) => {
                              this.handleCheckbox(e);
                            }}
                          />
                          <label
                            className="form-label"
                            style={{ marginLeft: "20px", marginTop: "5px" }}
                          >
                            Show All Records
                          </label>
                        </div>

                        {this.state.clearButton ? (
                          <div className="col-lg-2 form-group flex flex-end mt-8 px-12">
                            <Button type="button"
                            className="btn btn-secondary  "
                             onClick={() => this.clearFilter()}
                            >
                              <i
                                className="fa fa-filter"
                                aria-hidden="true"
                              ></i>
                              Clear Filters
                            </Button>
                          </div>):("")}

                      </div>

                      <div
                        className="col-lg-2 form-group mt-8 "
                        style={{ display: "flex-end", float: "right" }}
                      >
                        <Button
                          style={{ float: "right" }}
                          onClick={() => this.filterSend()}
                          className="btn btn-info"
                        >
                          <i className="fa fa-filter" aria-hidden="true"></i>
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </Form>
              
<br/>
<br/>
                  {/* end of area for filtering */}
                  <div className="table-responsive">
                    <div>
                      {/* for buttons */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Button
                          style={{ float: "left", marginRight: "10px" }}
                          onClick={() => this.printData()}
                          className="btn btn-warning btn-sm"
                        >
                          <i className="fa fa-file-pdf" aria-hidden="true"></i>
                          Export to PDF
                        </Button>

                        <CSVLink
                          data={this.PrintList}
                          filename={"Viteace Transactions Record"}
                        >
                          <Button
                            style={{ float: "right" }}
                            //onClick={() => this.printDataCSV()}
                            className="btn btn-primary btn-sm"
                          >
                            <i
                              className="fa fa-file-excel"
                              aria-hidden="true"
                            ></i>
                            Export to CSV
                          </Button>
                        </CSVLink>
                      </div>
                    </div>

                    <div className="table_responsive02">
                      {isdataLoading ? (
                        <Spinner />
                      ) : (
                        <table
                          id="List"
                          className="table table-sm table-hover table-striped table-bordered w-80"
                        >
                          <thead className="bg-custom text-white">
                            <tr>
                              {/* <th>
                          <i className="fa fa-list-ol mr-1"></i> No.
                        </th> */}
                              {/* name */}
                              <th className="text-center">
                                <i className="fa fa-users"></i> Customer
                              </th>

                              <th className="text-center">
                                <i className="fa fa-clipboard-list mr-1"></i>{" "}
                                Sales
                              </th>
                              {/* created date */}
                              <th className="text-center">
                                <i className="fa fa-info-circle"></i> Amount
                              </th>

                              <th className="text-center">
                                <i className="fa fa-credit-card"></i> Payment
                                Method
                              </th>

                              <th className="text-center">
                                <i className="fa fa-calendar-alt mr-1"></i>{" "}
                                Created Date
                              </th>
                              {/* <th className="text-center">
                          <i className="fa fa-check-circle mr-1"></i> Active
                        </th> */}
                              <th className="text-center">
                                <i className="fa fa-bolt mr-1"></i> Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.List != null &&
                            this.state.List.length > 0 ? (
                              this.state.List.map((item, index) => (
                                <tr key={index} id={`row_${item.id}`}>
                                  {/* <td>{item.id}</td> */}

                                  <td align="center">
                                    {item.customer?.user?.full_name ?? "N/A"}
                                  </td>
                                  <td align="center">{item.sales ?? "N/A"}</td>
                                  <td align="center">
                                    {"Rs.  "}
                                    {item.amount ?? "N/A"}
                                  </td>
                                  <td align="center">
                                    {item.payment_method ?? "N/A"}
                                  </td>
                                  <td align="center">
                                    {new Date(item.date).toLocaleDateString() ??
                                      "N/A"}
                                    {/* {item.date} */}
                                  </td>
                                  {/* <td align="center">
                              <div className="custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  defaultChecked={item.active}
                                  className="custom-control-input"
                                  id={"activeSwitch" + index}
                                  readOnly={true}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={"activeSwitch" + index}
                                ></label>
                              </div>
                            </td>
                            <td align="center">
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip> Edit </Tooltip>}
                              >
                                <button
                                  onClick={() => this.edit(item)}
                                  className="btn btn-xs btn-icon btn-outline-primary"
                                >
                                  <i className="fa fa-pen"></i>
                                </button>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip> Delete </Tooltip>}
                              >
                                <button
                                  onClick={() => this.delete(item.id)}
                                  className="btn btn-xs btn-icon btn-outline-danger ml-3"
                                >
                                  <i className="fa fa-trash-alt"></i>
                                </button>
                              </OverlayTrigger>
                            </td> */}

                                  <td align="center">
                                    {/* show  Transaction */}
                                    {/* <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip> Show transaction </Tooltip>
                                    }
                                  >
                                    <button
                                      onClick={() => this.showModal(item)}
                                      className="btn btn-xs btn-icon btn-outline-primary"
                                    >
                                      <i className="fa fa-envelope-open-text"></i>
                                    </button>
                                  </OverlayTrigger> */}
                                    {/*  Edit transaction */}
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip> Edit Transaction </Tooltip>
                                      }
                                    >
                                      <button
                                        onClick={() => this.edit(item)}
                                        type="button"
                                        //  className="btn btn-success btn-sm"
                                        className="btn btn-xs btn-icon btn-outline-primary"
                                      >
                                        <i
                                          className="fa fa-edit"
                                          style={{ padding: "10px" }}
                                        ></i>
                                      </button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip> Detailed Page </Tooltip>
                                      }
                                    >
                                      <button
                                        onClick={() =>
                                          this.showDetailedModal(item)
                                        }
                                        type="button"
                                        //  className="btn btn-success btn-sm"
                                        className="btn btn-xs btn-icon btn-outline-primary"
                                      >
                                        <i
                                          className="fa fa-eye"
                                          style={{ padding: "10px" }}
                                        ></i>
                                      </button>
                                    </OverlayTrigger>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="5"
                                  className="text-center text-danger"
                                >
                                  {" "}
                                  <h5>No Data Available</h5>{" "}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <div>
                          <div>
                            {this.state.offset * this.state.limit +
                              this.state.limit >
                            this.state.count ? (
                              <span>
                                {" "}
                                Showing{" "}
                                {this.state.offset * this.state.limit +
                                  this.state.startingPoint}{" "}
                                to {this.state.count} from {this.state.count}
                              </span>
                            ) : (
                              <span>
                                {" "}
                                Showing{" "}
                                {this.state.offset * this.state.limit +
                                  this.state.startingPoint}{" "}
                                to{" "}
                                {this.state.offset * this.state.limit +
                                  this.state.limit}{" "}
                                from {this.state.count}{" "}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            //initialPage={0}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Animated>
              )}

          {!this.state.showUsersList && (
            <Animated
              animationIn="bounceInLeft"
              animationOut="fadeOut"
              isVisible={true}
            >
              <CreateTransForm parentRef={this} />
            </Animated>
          )}
        </div>

        {/* start of modal */}
        <Modal
          size="xl"
          centered
          show={this.state.showDetail}
          onHide={this.handleClose}
        >
          <Modal.Header
            closeButton={true}
            style={{ backgroundColor: "#eaedf2" }}
          >
            <Modal.Title
              style={{
                marginLeft: "38%",
                marginRight: "38%",
                color: "#19c5bd",
              }}
            >
              {" "}
              Transactions Detail Page
            </Modal.Title>
          </Modal.Header>

          {/* {this.state.List.map((item, index) =>  (<li className="list-group-item" key={index}> */}

          {/* <Modal.Body style={{ boxShadow: "0px 8px 12px rgb(44,123,204)" }}> */}
          <Modal.Body>
            {/*  full line  1 covered */}

            <div className="row d-flex justify-content-center">
              <div className="col-lg-12 form-group">
                <h4>Sales:{"  "}</h4>
                <h3 style={{ color: "#369afe" }}>
                  {"   "}
                  {this?.state?.transModelObject?.sales ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              {/* <div className="col-lg-4 form-group">
                <label>Customer Contact No:</label>
                <b>
                  {"   "}
                  {this?.state?.transModelObject?.customer?.user?.contact_num ??
                    "N/A"}
                </b>
              </div> */}

              {/* <div className="col-lg-4 form-group">
                <label>Customer Email:</label>
                <b>
                  {"   "}
                  {this?.state?.transModelObject?.customer?.user?.email ??
                    "N/A"}
                </b>
              </div> */}

              {/* complete of row */}
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-lg-4 form-group">
                <label>Customer Full Name:</label>
                <b>
                  {"   "}
                  {this?.state?.transModelObject?.customer?.user?.full_name ??
                    "N/A"}
                </b>
              </div>

              <div className="col-lg-4 form-group">
                <label>Date: </label>

                <b>
                  {"   "}
                  {this.dateChanger(this?.state?.transModelObject?.date) ??
                    "N/A"}
                </b>
              </div>

              <div className="col-lg-4 form-group ">
                <label>Amount: </label>

                <b>
                  {"   "}
                  {this?.state?.transModelObject?.amount ?? "N/A"}
                </b>
              </div>
            </div>

            {/* line 2 */}
            <div className="row d-flex justify-content-between">
              <div className="col-lg-4 form-group ">
                <label>Dues: </label>
                <b>
                  {"  Rs. "}
                  {this?.state?.transModelObject?.customer?.dues ?? "N/A"}
                </b>
              </div>

              <div className="col-lg-4 form-group">
                <label>Payment Method: </label>
                <b>
                  {"   "}
                  {this?.state?.transModelObject?.payment_method ?? "N/A"}
                </b>
              </div>
              <div className="col-lg-4 form-group ">
                <label>Created By: </label>
                <b>
                  {"   "}
                  {this?.state?.transModelObject?.created_by?.user?.full_name ??
                    "N/A"}
                </b>
              </div>
            </div>

            <div className="row d-flex justify-content-between">
              <div className="col-lg-4 form-group ">
                <h4>Notes: </h4>
                <h5>
                  {"   "}
                  {this?.state?.transModelObject?.notes ?? "N/A"}
                </h5>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-8">
              <button
                type="button"
                id="btnCloseUserModal"
                onClick={() => this.handleClose()}
                className="btn btn-sm btn-danger mr-5"
              >
                {" "}
                <span className="fa fa-times mr-1"></span> Close
              </button>
            </div>
          </Modal.Body>

          {/* </li>))} */}
        </Modal>
        {/* end of modal */}
      </div>
    );
  }
}
