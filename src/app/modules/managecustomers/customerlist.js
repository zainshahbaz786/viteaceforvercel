import React from "react";
// var $  = require( 'jquery' );
import JQUERY from "jquery";
import { Animated } from "react-animated-css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import CreateCustomerForm from "./createcustomerform";
import CustomerForm from "./customerform";
import * as CRUD from "../../Common/CRUD";
import * as Utils from "../../Common/Common";
import App from "../../../_metronic/_partials/Pagination/App";
import { InfinitySpin } from  'react-loader-spinner'
import ReactPaginate from "react-paginate";

let dataTable;
const Spinner = () => (
  <>

<div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", paddingTop:"100px" }}>
<br/>
<br/><br/><br/>
<InfinitySpin  
 // width='460'
  color="#6ee7b7"
/>

</div>
</>
);
export default class CustomerList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id:"",
      full_name:"",
      email:"",
      address:"",
      contact_num:"",
      dues:"",
      showCustomerList: true,
      showDisplayCustomer: false,
      entityName: "Customer",
      heading: "Customers",
      paramObj: {},
      List: [],
      isdataLoading: false,
      offset: 0,
      count: 0,
      limit: 20,
      getMoreUrl: "",
      currentPage: 0,
      startingPoint: 1,
      isLoading: true,
      loadingStatus: { status: true, message: "Loading ..." },
    };
  }

  componentDidMount() {
    this.loadGrid(null,CRUD.APIRoutes.Customer_customer);
  }

  handlePageClick = (e) => {
const selectedPage=e.selected;
debugger;

const offset=selectedPage*this.state.limit;
let url=`customers/?limit=${this.state.limit}&offset=${offset}`;
this.loadGrid(null,url,selectedPage);


  }
  showListView(flag, heading, that) {
    that = that ?? this;
    let _state = that.state;
    _state.showCustomerList = flag;
    _state.showDisplayCustomer = false;
    _state.heading = heading;
    debugger;
    that.setState(_state, function() {
      if (flag) {
        this.loadGrid(null,CRUD.APIRoutes.Customer_customer);
      //  that.initializeDT();
      }
    });
  }
  showDetailView(flag,heading, that) {
    debugger;
   
   // let _state = that.state;
   that=that ?? this;
   debugger;
let mainthis=this;
mainthis.state.showDisplayCustomer = true;
mainthis.state.showCustomerList = false;


debugger;
mainthis.state.id=that.id;
mainthis.state.paramObj=that;
    
    mainthis.setState(this.state, function() {
      if (flag) {
        debugger;
       // this.loadGrid(null,CRUD.APIRoutes.Customer_customer);
      //  that.initializeDT();
   //  <CustomerForm parentRef={this} />
      }
    });
  }

  initializeDT() {
    dataTable = JQUERY("#List").DataTable({
      responsive: true,
      retrieve: true,
      info: false,
      paging: false,

      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 },
      ],
    });
  }

  loadGrid(_that,url,selectedPage=0) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.List = [];
    _state.isLoading = true;
    _state.isdataLoading = true;
    _state.loadingStatus = { status: true, message: "Loading ..." };
    CRUD.getRequest(url, function(response) {
      //debugger;
      // //debugger;
      if (response?.data?.results?.length > 0) {
        let _state = _that.state;
        //debugger;
        _state.List = response.data.results;
        _state.isdataLoading = false;
        _state.count=response.data.results.length;
        _state.isLoading = false;
        _state.pageCount= Math.ceil(response.data.count/_state.limit);
        _state.count = response.data.count;
        _state.offset=selectedPage;
        _state.loadingStatus = { status: true, message: "" };
        _state.showCustomerList = true;
        
        _that.setState(_state, function() {
          //  _that.initializeDT();
        });
      } // Api Exception
      else {
        let _state = _that.state;

        _state.List = [];
        _state.isdataLoading = false;
        _state.isLoading = false;
        _state.loadingStatus = { status: false, message: "" };
        _that.setState(_state);
      }
    });
  }

  edit(user) {
    debugger
    let _state = this.state;
    _state.paramObj = user;
    this.setState(_state);
    this.showListView(
      false,
      user
        ? "Edit Customer Profile"
        : "Create New Customer Profile",
    );
  }

  view(user) {
    let _state = this.state;
    debugger;
    _state.paramObj = user;
    this.setState(_state);
    this.showDetailView(
      true,
      //"View Customer Profile"
      "Customer Profile",
      this
      
    );
  }

  

  render() {

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
            {this.state.showCustomerList && (
              <button
                onClick={() => this.edit(undefined)}
                type="button"
                className="btn btn-success btn-sm"
              >
                <i className="fa fa-plus"></i> Create New{" "}
                {this.state.entityName}
              </button>
            )}

            {!this.state.showCustomerList && (
              <button
                onClick={() =>
                  this.showListView(!this.state.showCustomerList, "Customer Profile")
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
          {this.state.isLoading && this.state.showCustomerList
            ? "Loading ..."
            : this.state.showCustomerList && (
                <Animated
                  animationIn="bounceInLeft"
                  animationOut="fadeOut"
                  isVisible={true}
                >


{isdataLoading ? (<Spinner/>):( 
                <div>
                  <table
                    id="List"
                    className="table table-sm table-hover table-striped table-bordered w-100"
                  >
                    <thead className="bg-custom text-white">
                      <tr>
                        {/* structure starts here */}
                        <th data-priority="1">
                          <i className="fa fa-user mr-1"></i> Name
                        </th>
                        <th>
                          <i className="fa fa-envelope mr-1"></i> Email
                        </th>

                        <th className="text-center">
                          <i className="fa fa-mobile mr-1"></i> Phone
                        </th>

                        <th className="text-center">
                          <i className="fa fa-minus-square mr-1"></i> Dues
                        </th>

                        <th data-priority="2" className="text-center">
                          <i className="fa fa-address-card"></i> Address
                        </th>

                        <th className="text-center">
                              <i className="fa fa-bolt mr-1"></i> Action
                            </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.List != null && this.state.List.length > 0 ? (
                        // mapping implement here
                        this.state.List.map((item, index) => (
                          <tr key={index} id={`row_${item.id}`}>
                            <td id="full_name">{item.user.full_name}</td>
                            <td id="email">{item.user.email}</td>
                            <td id="contact_num"align="center">{item.user.contact_num}</td>
                            <td id="dues" align="center">{"Rs.  "}{item.dues}</td>
                            <td align="center">{item.user.address}</td>
                            <td
                                  align="center"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
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

                                  {/* <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip> Edit Customer Profile </Tooltip>}
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
                                  </OverlayTrigger> */}

                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip> Detailed Page </Tooltip>}
                                  >
                                    <button
                                     onClick={() => this.showDetailView(true, "",item)}
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
                          <td colSpan="7" className="text-center text-danger">
                            {" "}
                            <h5>No Data Available</h5>{" "}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center",flexDirection:"row"}}>
               
               
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




{/* react paginate */}
        <div>
        <ReactPaginate
                    previousLabel={"prev"}
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
                  />
                  </div>
                  
      </div>
      </div>)}
                </Animated>
              )}

          {!this.state.showCustomerList && !this.state.showDisplayCustomer && (
            <Animated
              animationIn="bounceInLeft"
              animationOut="fadeOut"
              isVisible={true}
            >
            
              <CreateCustomerForm parentRef={this} />
            </Animated>
          )}

          {this.state.showDisplayCustomer && (
            <Animated
              animationIn="bounceInLeft"
              animationOut="fadeOut"
              isVisible={true}
            >
              
              <CustomerForm parentRef={this} />
            </Animated>
          )}

        </div>
        {/* end of customers page structure */}
      </div>
    );
  }
}
