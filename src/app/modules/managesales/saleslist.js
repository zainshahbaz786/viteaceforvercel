import React from "react";
//import { CSVLink } from "react-csv";
// var $  = require( 'jquery' );
import JQUERY from "jquery";
import { Animated } from "react-animated-css";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import CreateSalesForm from "./createsalesform";
import * as CRUD from "../../Common/CRUD";
import * as Utils from "../../Common/Common";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
// import App from "../../../_metronic/_partials/Pagination/App";
import ReactPaginate from "react-paginate";
//import axios from "axios";
import { CSVLink } from "react-csv";
import Select from "react-select";

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
      <InfinitySpin
        // width='460'
        color="#6ee7b7"
      />
    </div>
  </>
);

export default class Saleslist extends React.Component {
  
  constructor(props, context) {
    super(props, context);

    this.state = {
      CustomerList: [],
      //CommodityList:[],

      filter_opt: "",
      filter_id: "",
      date__gte: "",
      date__lte: "",
      sold_by: "",
      customer: "",
      showUsersList: true,
      showDetailedList: true,
      allChecked: false,
      heading: "Sales",
      paramObj: {},
      List: [],
      isdataLoading: false,
      saleModelObject: [],
      clearButton:false,
      transactions: [],
      //  filteredList: [],
      StaffList: [],
      //filter_options: [],
      filterid_options: [],
      //isLoading: true,
      selectedFile: null,
      show: false,
      showDetail: false,
      offset: 0,
      count: 0,
      limit: 20,
      startingPoint: 1,
      defaultCount: 0,
      getMoreUrl: "",
      currentPage: 0,
      // loadingStatus: { status: true, message: "Loading ..." },
    };
  }
  cust_options = [];
  PrintList = [];
  sold_options = [];
  filter_options = [
    { value: "", label: "Select" },
    { value: "customer", label: "Customer" },
    { value: "sold_by", label: "Sold by" },
  ];

  handlePageClick = (e) => {
    //debugger;
    let newState = this.state;
    var selectedPage;
    let url = "";
    let newUrl = this.state.getMoreUrl;
    if (newState.allChecked === false) {
      //   debugger;
      // newState.loadingStatus = true;
      //   this.setState({ newState.loadingStatus: true });
      //debugger;
      selectedPage = e.selected;
      const offset = selectedPage * this.state.limit;

      //debugger;

      url = `${newUrl}/?limit=${this.state.limit}&offset=${offset}`;
      if (
        url.includes("date__gte") ||
        url.includes("date__lte") ||
        url.includes("customer") ||
        url.includes("sold_by")
      ) {
        url = url.replace("/?limit", "&limit");
      }
    } else {
      // debugger;
      url = url + "&limit=1000";
    }

    // debugger;
    this.loadGrid(null, url, selectedPage);
  };

  componentDidMount() {
    this.loadGrid(null, CRUD.APIRoutes.Sales_sales);
    this.loadGridCust();
    // this.loadGridCom();
    //this.loadGridFilter();
    this.loadGridStaff();
    //this.DropDowns();
    //this.initializeSalesDT();
  }

  handlefilterOpt = (e) => {
    console.log("filter opt is:" + e.value);
    let _that = this;
    let _state = this.state;
    console.log("hjdsbx is:" + e.value + "  " + e.label);
    _state.filter_opt = e.value;
    //debugger;
    this.setState(_state, function() {
      // executing the set state function
      //debugger;
    });
  
    if (e.value === "customer") {
      _state.filterid_options = _that.cust_options;
      //  _that.loadGridCust();
    }
    if (e.value === "sold_by") {
      _state.filterid_options = _that.sold_options;
    }
    // if(e.value === ""){
    //   _state.filterid_options = [];
    // }
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

  showListView(flag, heading, that) {
    that = that ?? this;
    let _state = that.state;
    _state.showUsersList = flag;
    _state.heading = heading;
    that.setState(_state, function() {
      if (flag) {
        //that.initializeSalesDT();
        that.loadGrid(null, CRUD.APIRoutes.Sales_sales);
      }
    });
  }

  showModal(item) {
    //debugger;
    console.log(item);

    let _state = this.state;
    _state.show = true;
    this.setState(_state);
    this.loadTransaction(item);
  }

  showDetailedModal(item) {
    //debugger;
    console.log(item);
    console.log("in new model");

    let _state = this.state;
    // debugger;
    _state.showDetail = true;
    _state.saleModelObject = item;
    // debugger;
    console.log("Display List Array is:-");
    console.log(_state.saleModelObject);
    this.setState(_state);
    //this.loadTransaction(item);
  }

  handleClose() {
    let _state = this.state;
    _state.show = false;
    _state.showDetail = false;
    this.setState(_state, function() {});
  }

  initializeSalesDT() {
    JQUERY(document).ready(function() {
      // var indexLastColumn = ("list").find('tr')[0].cells.length - 1;
      JQUERY("#List").DataTable({
        dom: "Bfrtip",
        retrieve: "true",
        paging: false,
        info: false,
        buttons: ["pdfHtml5", "csvHtml5"],
      });
    });
  }

  initializeFilteredDT() {
    dataTable = JQUERY("#filteredList").DataTable({
      responsive: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 },
      ],
    });
  }

  initializeTransactionsDT() {
    dataTable = JQUERY("#TransactionsTable").DataTable({
      responsive: true,
      paging: true,
      info: false,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 },
      ],
    });
  }

  PrintingListFun(list) {
    debugger;
    this.PrintList = [];
    list.map((item, index) => {
      this.PrintList.push({
        CUSTOMER: item?.customer?.user?.full_name,

        COMMODITY: item?.commodity?.name,
        QUANTITY: item?.quantity,
        DATE: item?.date,
        TOTAL: item?.total,
      });
    });
    //return listResult;
  }

  // for exporting data to pdf
  printData() {
    window.print();
    //JQUERY( ".buttons-pdf" ).trigger( "click" );
  }

  printDataCSV() {
    // JQUERY( ".buttons-csv" ).trigger( "click" );
  }

  loadGrid(_that, url, selectedPage = 0) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.List = [];
    _state.isdataLoading = true;
    // _state.isLoading = true;
    // _state.loadingStatus = {
    //   status: true,
    //   message: "Loading ...",
    // };
    _that.setState(_state, function() {});

    // debugger;

    CRUD.getRequest(url, function(response) {
      if (response?.data?.results?.length > 0) {
        //debugger;
        let _state = _that.state;
        _state.List = response.data.results;

        _state.isdataLoading = false;

        // _state.isLoading = false;
        //debugger
        if (_state.allChecked == false) {
          _state.pageCount = Math.ceil(response?.data.count / _state.limit);
          _state.count = response?.data.count;
          _state.getMoreUrl = url;
          _state.startingPoint = 1;
          //_state.currentPage=_state.handlePageClick.selectedPage;
          console.log("Seleced page is:" + _state.currentPage);
          //debugger;
          // main working line....
          _state.offset = selectedPage;
        }
        if (_state.allChecked == true) {
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
        // debugger;
        console.log("Seleced page is:" + _state.currentPage);
        console.log(
          "Page count is:" + _state.pageCount + " and count is:" + _state.count
        );
        // _state.loadingStatus = { status: true, message: "" };
        _state.showUsersList = true;
        debugger;

        _that.PrintingListFun(_state.List);

        _that.setState(_state, function() {
          //  debugger;
          console.log(_state.List);
        });
      } // Api Exception
      else {
        //  debugger;
        let _state = _that.state;

        _state.List = [];
        _state.isdataLoading = false;
        _state.startingPoint = 0;
        _state.limit = 0;
        //    _state.isLoading = false;
        //    _state.loadingStatus = { status: false, message: "" };
        _state.pageCount = 0;
        _state.count = 0;
        _that.PrintList = _that.List;
        _that.setState(_state);
        //_that.initializeSalesDT();
      }
    });
  }
  //
  // for fetching data of customers from API

  loadGridCust(_that) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.List = [];
    // _state.isLoading = true;
    // _state.loadingStatus = { status: true, message: "Loading ..." };
    CRUD.getRequest(CRUD.APIRoutes.Customer_customer + "?limit=100", function(
      response
    ) {
      if (response?.data?.results.length > 0) {
        // console.log(response?.data?.results?.user.full_name);

        let _state = _that.state;
        _state.CustomerList = response.data.results;
        //     _state.isLoading = false;
        //    _state.loadingStatus = { status: true, message: "" };
        _state.showUsersList = true;

        // _state.filterid_options = [];
        response.data.results.map((item, index) => {
          _that.cust_options.push({
            label: item.user.full_name,
            value: item.id,
          });
        });

        _that.setState(_state, function() {});
      } // Api Exception
      else {
        let _state = _that.state;
        _state.CustomerList = [];
        //   _state.isLoading = false;
        //     _state.loadingStatus = { status: false, message: "" };
        _that.setState(_state);
      }
    });
  }
  // end of code for fetching data of customers from API

  // staff id:

  loadGridStaff(_that) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.StaffList = [];
    // _state.isLoading = true;
    // _state.loadingStatus = { status: true, message: "Loading ..." };
    CRUD.getRequest(CRUD.APIRoutes.Staff_staff + "?limit=100", function(
      response
    ) {
      //
      if (response.data.results.length > 0) {
        //  debugger;
        let _state = _that.state;
        _state.StaffList = response.data.results;
        //   _state.isLoading = false;
        //    _state.loadingStatus = { status: true, message: "" };

        _state.showUsersList = true;

        // _state.filterid_options = [];
        response.data.results.map((item, index) => {
          _that.sold_options.push({
            label: item?.user?.full_name,
            value: item.id,
          });
        });

        _that.setState(_state, function() {
          //   _that.initializeDT();
        });
      } // Api Exception
      else {
        let _state = _that.state;
        _state.StaffList = [];
        //    _state.isLoading = false;
        //    _state.loadingStatus = { status: false, message: "" };
        _that.setState(_state);
      }
    });
  }

  // load grid for filtered data
  loadGridFilter(_that) {
    _that = _that ?? this;
    let _state = _that.state;
    // _state.filteredList = [];
    _state.List = [];
    _state.getMoreUrl = "";
    //   _state.isLoading = true;
    // _state.loadingStatus = {
    //    status: true,
    //    message: "Loading ...",
    //  };

    this.filterSend(_that);
    // end of filtered data fetching function

    // for filtering of data
  }

  // printCSV(that) {
  //   this.PrintingListFun(that);
  // }

  // function for applying the data filter....
  filterSend(that) {
    let _that = that ?? this;
    let _state = this.state;
    debugger;

    if (document.querySelectorAll('[aria-label="Page 1"]')[0]) {
      document.querySelectorAll('[aria-label="Page 1"]')[0].click();
    }

    var url = CRUD.APIRoutes.Sales_sales;

    //  start of if else
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
      if (_state?.filter_opt === "sold_by" || _state?.filter_opt === "sales") {
        url = url + "&sold_by=" + _state?.filter_id;
      }
    }

    if (_state?.date__gte !== "" && _state?.date__lte == "") {
      // if only start date is present
      url = url + "?date__gte=" + _state?.date__gte;
      if (
        _state?.filter_opt === "sold_by" ||
        _state?.filter_opt === "sold_by"
      ) {
        url = url + "&sold_by=" + _state?.filter_id;
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
      if (
        _state?.filter_opt === "sold_by" ||
        _state?.filter_opt === "sold_by"
      ) {
        url = url + "&sold_by=" + _state?.filter_id;
      }
    }

    if (_state?.date__gte === "" && _state?.date__lte === "") {
      // if no date is selected
      if (
        _state?.filter_opt === "customer" ||
        _state?.customer === "customer"
      ) {
        url = url + "?customer=" + _state?.filter_id;
      }
      if (
        _state?.filter_opt === "sold_by" ||
        _state?.filter_opt === "sold_by"
      ) {
        url = url + "?sold_by=" + _state?.filter_id;
      }
    }
    if (_state.allChecked === true) {
      _state.limit = 1000;
      _state.pageCount = 1;
      _state.offset = 0;
      const conditions = ["customer", "sold_by", "date__gte", "date__lte"];

      if (conditions.some((el) => url.includes(el))) {
        //url=url+'&limit='+_state.limit+'&offset='+_state.offset;
        url = url + "&limit=" + 1000;
      } else {
        url = url + "?limit=" + 1000;
      }
    }
    if (_state.allChecked === false) {
      _state.limit = 20;
    }

    // _state.setState(_state => {});

    _that.setState(_state, function() {});

    console.log("url at filter send time is:" + url);
    //debugger;
    // `sales/?limit=${this.state.limit}&offset=${offset}`
    this.loadGrid(_that, url);
  }

  clearFilter(that) {

    let _that = that ?? this;
    let _state = this.state;
    _state.date__gte = "";
    _state.date__lte = "";
    _state.filter_opt = "";
    _state.filter_id = "";

    if(document.getElementsByClassName(' css-1uccc91-singleValue')[0]!==undefined){
    document.getElementsByClassName(' css-1uccc91-singleValue')[0].innerHTML = "Select";
    if(document.getElementsByClassName(' css-1uccc91-singleValue')[1]!==undefined){
    document.getElementsByClassName(' css-1uccc91-singleValue')[1].innerHTML = "Select";
    }
    }
    



    document.getElementById("date__gte").value = "";
    document.getElementById("date__lte").value = "";
    
    document.getElementById("filter_opt").value = "";

    document.getElementById("filter_id").value = "";
  }

  loadTransaction(sale) {
    let _that = this;
    let _state = this.state;
    _state.transactions = [];

    var SaleID = sale.id;
    //debugger;
    // _that.setState(_state);
    CRUD.getRequest(
      CRUD.APIRoutes.Sales_transactions + "?sales=" + SaleID,
      function(response) {
        //
        if (response?.data?.results?.length > 0) {
          let _state = _that.state;
          _state.transactions = response.data.results;

          _that.setState(_state, function() {
            _that.initializeTransactionsDT();
          });
        } // Api Exception
        else {
          // let _state = _that.state;
          // _state.List = [];
          // _state.isLoading = false;
          // _state.loadingStatus = { status: false, message: "" };
          // _that.setState(_state);
        }
      }
    );
  }
  edit(user) {
    let _state = this.state;
    _state.paramObj = user;
    this.setState(_state);
    this.showListView(
      false,
      user ? `Edit ${this.state.entityName}` : `Edit Customer Profile`
    );
  }

  detailed(user) {
    let _state = this.state;
    _state.paramObj = user;
    this.setState(_state);
    this.showListView(
      false,
      user ? `Edit ${this.state.entityName}` : `Edit Customer Profile`
    );
  }

  delete(id) {
    let _that = this;
    Utils.showConfirmation(
      `Do you want to delete this ${this.state.entityName}?`,
      "Are you sure?",
      () => {
        CRUD.deleteRequest(CRUD.SalesPingAPIRoutes.Keyword_Delete, id, function(
          response
        ) {
          if (response?.data) {
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

  dateChanger(oldDate) {
    if (oldDate == undefined) {
      //debugger;
      const backendDate = oldDate;
      const dateObject = new Date(backendDate);
      const dateString = dateObject.toLocaleDateString(); // "5/15/2022" (default format based on user's locale)
      const timeString = dateObject.toLocaleTimeString(); // "5:30:00 AM" (default format based on user's locale)
      // const formattedDate = dateString + " " + timeString; // "5/15/2022 5:30:00 AM"
      return dateString;
    }
  }

  render() {
    // const { date__gte, date__lte, filteredData } = this.state;
    const { isdataLoading, List } = this.state;

    return (
      <>
        <div className="card card-custom">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label font-weight-bolder text-dark">
                {/* {this.state.heading} */}
                Sales
              </h3>
            </div>
            <div className="card-toolbar">
              {this.state.showUsersList && (
                <button
                  onClick={() => this.edit(undefined)}
                  type="button"
                  className="btn btn-success btn-sm"
                >
                  <i className="fa fa-plus"></i> Create New Sales Detail
                </button>
              )}

              {!this.state.showUsersList && (
                <button
                  onClick={() =>
                    this.showListView(!this.state.showUsersList, "Users")
                  }
                  type="button"
                  className="btn btn-dark btn-sm"
                >
                  <i className="fa fa-arrow-left"></i> Back To List
                </button>
              )}
            </div>
          </div>
          {/* area of playing for filtering */}

          {/* end of this section */}
          <div className="card-body">
            {this.state.isLoading && this.state.showUsersList
              ? "Loading ..."
              : this.state.showUsersList && (
                  <Animated
                    animationIn="bounceInLeft"
                    animationOut="fadeOut"
                    isVisible={true}
                  >
                    <Form>
                      <div className="row">
                        <div className="col-lg-10 d-flex flex-row form-group">
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

                          {/* ---3--- */}
                          <div className="col-lg-2 form-group">
                            <label className="form-label">Choose by Type</label>



                            <Select
                              id="filter_opt"
                             // value={this.state?.filter_opt || "Select"}
                              
                              className=""
                              //style={{ width: "50%" }}
                              name="filter_opt"
                              //isClearable={true}
                              // isClearable={true}
                             
                              Placeholder="Choose by Type"
                              options={this.filter_options}
                              
                             
                              onChange={(e) => {
                                this.handlefilterOpt(e);
                              }}
                            ></Select>
                          </div>
                          {/* ----4----- */}
                          <div className="col-lg-2 form-group">
                            <label className="form-label">
                              Choose the Name
                            </label>
                            <Select
                              id="filter_id"
                              className=""
                              
                         // isClearable={true}
                              // isClearable={true}
                              name="filter_id"
                              style={{ width: "50%" }}
                              options={this.state?.filterid_options}
                              //value={this.state?.filter_id || ""}
                              onChange={(e) => {
                                this.handlefilterid(e);
                              }}
                            ></Select>
                          </div>

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
                              className="form-label "
                              style={{ marginLeft: "20px", marginTop: "1px" }}
                            >
                              Show All Records
                            </label>
                          </div>

{this.state.clearButton ? (<div className="col-lg-2 form-group flex flex-end mt-7 px-12">
                            <Button type="button"
                            className="btn btn-secondary "
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

                        <div className="col-lg-2 form-group mt-7">
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
<br/>
<br/>
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
                            <i
                              className="fa fa-file-pdf"
                              aria-hidden="true"
                            ></i>
                            Export to PDF
                          </Button>

                          <CSVLink
                            data={this.PrintList || []}
                            filename={"Viteace Sales Record"}
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
                    </Form>

                    <div className="table_responsive01">
                      {isdataLoading ? (
                        <Spinner />
                      ) : (
                        <table
                          id="List"
                          className="table table-sm table-hover table-striped table-bordered w-70"
                        >
                          <thead className="bg-custom text-white">
                            <tr>
                              <th className="text-center">
                                <i className="fa fa-list-ol mr-1"></i> Customer
                              </th>
                              {/* <th className="text-center">
                          <i className="fa fa-clipboard-list mr-1"></i> Sold By
                        </th>  */}
                              <th className="text-center">
                                <i className="fa fa-calendar-alt mr-1"></i>{" "}
                                Commodity
                              </th>
                              <th className="text-center">
                                <i className="fa fa-calendar mr-1"></i> Date
                              </th>

                              <th className="text-center">
                                <i className="fa fa-check-circle mr-1"></i>{" "}
                                Quantity
                              </th>

                              <th className="text-center">
                                <i className="fa fa-credit-card mr-1"></i>{" "}
                                Amount
                              </th>

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
                                  {/* 1 */}
                                  <td align="center">
                                    {item.customer?.user?.full_name ?? "N/A"}
                                  </td>
                                  {/* 2 */}
                                  {/* <td align="center">{item?.sold_by?.user?.full_name ?? item?.sold_by ?? "N/A"}</td>  */}
                                  {/* 3 */}
                                  <td align="center">
                                    {item.commodity?.name ?? "N/A"}
                                  </td>
                                  {/* 4 */}
                                  <td align="center">
                                    {new Date(item.date).toLocaleDateString()}
                                    {/* {item.date} */}
                                  </td>
                                  {/* 5 */}
                                  <td align="center">
                                    {item.quantity ?? "N/A"}
                                  </td>

                                  {/* 6 */}
                                  <td align="center">
                                    {" "}
                                    {"Rs.  "}
                                    {item.price ?? "N/A"}{" "}
                                  </td>

                                  {/* edit button code */}
                                  <td
                                    align="center"
                                    // style={{
                                    //   display: "flex",
                                    //   justifyContent: "center",
                                    // }}
                                  >
                                    {/* show  Transaction */}
                                    <OverlayTrigger
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
                                    </OverlayTrigger>
                                    {/*  Edit transaction */}
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip> Edit Sales </Tooltip>}
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

                      {/* for implementing pagination */}
                      {/* wrapper div starts */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <div>
                          {/* condition for pagination text */}
                          {/* {this.state.offset * 2 * this.state.limit <
                          this.state.count ? (
                            this.state.limit > this.state.count ? (
                              <span style={{ color: "#162b55" }}>
                                Showing{" "}
                                {this.state.offset * this.state.limit + this.state.startingPoint} to{" "}
                                {this.state.count} from {this.state.count}

                                
                              </span>
                            ) : (
                              <span style={{ color: "#162b55" }}>
                                Showing{" "}
                                {this.state.offset * this.state.limit + this.state.startingPoint} to{" "}
                                {this.state.offset * this.state.limit +
                                  this.state.limit}{" "}
                                from {this.state.count}
                              </span>
                            )
                          ) : (
                            <span style={{ color: "#162b55" }}>
                              Showing {this.state.offset * this.state.limit + this.state.startingPoint}{" "}
                              to {this.state.offset * this.state.count} from{" "}
                              {this.state.count}
                            </span>
                          )} */}

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
                            // initialPage={0}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            renderOnZeroPageCount={null}
                          />
                        </div>
                      </div>
                      {/*  ends of wrapper div   */}
                    </div>

                    {/*               REPLICA OF TABLE FOR PRINTING... */}
                  </Animated>
                )}

            {!this.state.showUsersList && (
              <Animated
                animationIn="bounceInLeft"
                animationOut="fadeOut"
                isVisible={true}
              >
                {/* Form for updating the   data.*/}
                {/* A component embed here for moving us on Sales Form */}
                <CreateSalesForm parentRef={this} />
              </Animated>
            )}
          </div>

          {/* start of modal */}
          <Modal
            size="lg"
            centered
            show={this.state.show}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton={true}>
              <Modal.Title>Transactions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* div of table in modal */}
              <div>
                {/* table in the transaction portion */}
                <table
                  id="TransactionsTable"
                  className="table table-sm table-hover table-striped table-bordered w-80"
                >
                  <thead className="bg-custom text-white">
                    <tr>
                      <th>
                        <i className="fa fa-list-ol mr-1"></i> Sales
                      </th>

                      <th className="text-center">
                        <i className="fa fa-calendar mr-1"></i> Date
                      </th>

                      <th className="text-center">
                        <i className="fa fa-credit-card mr-1"></i> Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.transactions != null &&
                    this.state.transactions.length > 0 ? (
                      this.state.transactions.map((item, index) => (
                        <tr key={index} id={`row_${item.id}`}>
                          {/* we use quantity as sales */}
                          <td align="center">{item.sales ?? "N/A"}</td>

                          <td align="center">
                            {new Date(item.date).toLocaleDateString() ?? "N/A"}
                            {/* {item.date} */}
                          </td>

                          <td align="center">
                            {" "}
                            {"Rs.  " + item.amount ?? "N/A"}{" "}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-danger">
                          {" "}
                          <h5>No Data Available</h5>{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
          </Modal>
          {/* end of modal */}

          {/* for detailing */}
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
                  marginLeft: "40%",
                  marginRight: "40%",
                  color: "#19c5bd",
                }}
              >
                {" "}
                Sales Detail Page
              </Modal.Title>
            </Modal.Header>

            {/* {this?.state?.List.map((item, index) =>  (<li className="list-group-item" key={index}> */}

            <Modal.Body>
              {/* line  1 */}

              <div className="row d-flex justify-content-center">
                <div className="col-lg-4 form-group">
                  <label>Customer Name: </label>

                  <b>
                    {"   "}
                    {this.state.saleModelObject?.customer?.user?.full_name ??
                      "N/A"}
                  </b>
                </div>
                <div className="col-lg-4 form-group">
                  <label>Sold by:</label>
                  {"   "}{" "}
                  <b>
                    {this?.state?.saleModelObject?.sold_by?.user?.full_name ??
                      this?.state?.saleModelObject?.sold_by ??
                      "N/A"}
                  </b>
                </div>

                <div className="col-lg-4 form-group ">
                  <label>Commodity Name: </label>
                  <b>
                    {"   "}
                    {this?.state?.saleModelObject?.commodity?.name ?? "N/A"}
                  </b>
                </div>
              </div>

              {/* line 2 */}
              <div className="row d-flex justify-content-between">
                <div className="col-lg-4 form-group ">
                  <label>Date:</label>
                  {/* {this.dateChanger(this?.state?.saleModelObject?.date)} */}
                  <b>
                    {"   "}
                    {this.dateChanger(this?.state?.saleModelObject?.date) ??
                      "N/A"}
                  </b>
                </div>

                <div className="col-lg-4 form-group">
                  <label>Quantity: </label>
                  <b>
                    {"   "}
                    {this?.state?.saleModelObject?.quantity ?? "N/A"}
                  </b>
                </div>

                <div className="col-lg-4 form-group ">
                  <label>Price:</label>
                  <b>
                    {"   "}
                    {"Rs.  " + this?.state?.saleModelObject?.price ?? "N/A"}
                  </b>
                </div>
              </div>

              {/*line 3  */}
              <div className="row d-flex justify-content-between">
                <div className="col-lg-4 form-group ">
                  <label>Unit Type:</label>
                  <b>
                    {"   "}
                    {this?.state?.saleModelObject?.unit ?? "N/A"}
                  </b>
                </div>
                <div className="col-lg-4 form-group">
                  <label>Cut:</label>
                  <b>
                    {"   "}
                    {this?.state?.saleModelObject?.broker_cut ?? "N/A"}
                  </b>
                </div>

                <div className="col-lg-4 form-group ">
                  <label>Percentage:</label>
                  <b>
                    {"   "}
                    {this?.state?.saleModelObject?.broker_percentage ?? "N/A"}
                  </b>
                </div>
              </div>

              {/* line 4 */}
              <div className="row d-flex justify-content-between">
                <div className="col-lg-4 form-group ">
                  <h4>Total:</h4>
                  <h2>
                    {"   "}
                    {"Rs.  " + this?.state?.saleModelObject?.total ?? "N/A"}
                  </h2>
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
      </>
    );
  }
}
