import React from "react";
import * as Utils from "../../Common/Common";
import { Form } from "react-bootstrap";
import * as CRUD from "../../Common/CRUD";
import moment from "moment";
import ReactPaginate from "react-paginate";
export default class CustomerForm extends React.Component {
  //debugger;
  constructor(props, context) {
    super(props, context);
    var paramObject = {
      full_name: "",
      email: "",
      address: "",
      dob: "",
      country_code: "",
      contact_num: "",
      dues: "",
    };
    console.log(paramObject);
    // debugger;

    // debugger;
    this.state = {
      // formEntity: paramObject,
      formValidated: false,
      entityName: "Customer",
      formEntity: props.parentRef.state.paramObj ?? {
        full_name: "",
        email: "",
        address: "",
        dob: "",
        country_code: "",
        contact_num: "",
        dues: "",
      },
      offset: 0,
      count: 0,
      limit: 20,
      List: [],
      startingPoint: 1,
      defaultCount: 0,
      getMoreUrl: "",
      currentPage: 0,
      loading: false,
    };

    if (props.parentRef.state.paramObj?.id != undefined) {
      //debugger;
      console.log(
        "props.parentRef.state.paramObj:  ",
        props.parentRef.state.paramObj
      );
      // paramObject.name=props.parentRef.state.paramObj.first_name;
    }
  }

  componentDidMount() {
    this.loadGrid(
      this,
      CRUD.APIRoutes.Sales_sales + "?customer=" + this.state.formEntity.id
    );
    // document.getElementById('expiryDate').min = moment().format('YYYY-MM-DD');
    // this.setState({});
  }

  loadGrid(_that, url, selectedPage = 0) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.List = [];
    _state.isLoading = true;
    _state.loadingStatus = {
      status: true,
      message: "Loading ...",
    };
    //debugger;
    CRUD.getRequest(url, function(response) {
      //  debugger
      if (response?.data?.results?.length > 0) {
        let _state = _that.state;
        _state.List = response.data.results;
        //   debugger;
        _state.startingPoint = 1;

        // _state.PrintList = _that.PrintingListFun(response.data.results);

        _state.isLoading = false;
        if (response?.data?.count <= 20) {
          _state.pageCount = 1;
        } else {
          _state.pageCount = Math.ceil(response?.data.count / _state.limit);
          _state.count = response?.data.count;
          _state.offset = selectedPage;
          // main working line....
          _state.offset = selectedPage;
        }

        _state.loadingStatus = { status: true, message: "" };
        // _state.showUsersList = true;
        _that.setState(_state, function() {
          //  _that.initializeSalesDT();
        });
      } // Api Exception
      else {
        let _state = _that.state;
        _state.List = [];
        _state.startingPoint = 0;
        _state.isLoading = false;
        _state.loadingStatus = { status: false, message: "" };
        // _that.PrintList = _that.List;
        _that.setState(_state);
        //_that.initializeSalesDT();
      }
    });
    //debugger;
    // _that.initializeSalesDT();
  }

  cancelForm() {
    this.props.parentRef.showListView(true, "Customer", this.props.parentRef);
  }
  //   submitForm() {
  //     if (Utils.validateForm("formUser", this)) {
  //       let _that = this;
  //       let _state = _that.state;
  //       _state.loading = true;
  //       _that.setState(_state);
  //       CRUD.postRequest(
  //         CRUD.APIRoutes.Customer_customer,
  //         this.state.formEntity,
  //         function(response) {
  //           ////debugger;
  //           console.log(response);
  //           if (response?.data?.id != null) {
  //             // let url=`customers/?limit=${this.state.limit}&offset=${offset}`;
  //             // _that.props.parentRef.loadGrid(_that.props.parentRef,"customers/");
  //             // _that.props.parentRef.loadGrid(null,_that.props.parentRef);
  //             Utils.showUpsertAlert("Customer", _that.state.formEntity.id > 0);
  //             _that.props.parentRef.loadGrid(_that.props.parentRef, "customers/");
  //             ////debugger;
  //             Utils.showUpsertAlert(
  //               this.props.parentRef.state.paramObj.entityName,
  //               _that?.state?.formEntity.id > 0
  //             );
  //           }

  //           _state.loading = false;
  //           _that.setState(_state);
  //         }
  //       );
  //     }
  //   }

  render() {
    return (
      <Form
        noValidate
        validated={this.state.formValidated}
        id="formUser"
        className="needs-validation"
      >
        {/* 66affe */}
        <div className="row ">
          <div className="col-lg-6 form-group">
            <label style={{ fontSize: "14px" }}>Customer Name:</label>
            <b style={{ fontSize: "16px" }}>
              {"   "}
              {this.props.parentRef.state.paramObj.user.full_name}
            </b>
          </div>
          <div className="col-lg-6 form-group">
            <label style={{ fontSize: "14px" }}>Customer Contact No:</label>
            <b style={{ fontSize: "16px" }}>
              {"   "}
              {this.props.parentRef.state.paramObj.user.contact_num}
            </b>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 form-group">
            <label style={{ fontSize: "14px" }}>Customer Email:</label>
            <b style={{ fontSize: "16px" }}>
              {"   "}
              {this.props.parentRef.state.paramObj.user.email}
            </b>
          </div>
          <div className="col-lg-6 form-group">
            <label style={{ fontSize: "14px" }}>Customer Address:</label>
            <b style={{ fontSize: "16px" }}>
              {"   "}
              {this.props.parentRef.state.paramObj.user.address}
            </b>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 form-group">
            <h2>Remaining Dues:</h2>
            <b style={{ fontSize: "18px", color: "#19c5bd" }}>
              {"Rs.  "}
              {this.props.parentRef.state.paramObj.dues}
            </b>
          </div>
        </div>
        <br />
        <br />

        {/* for implementing data table about the individual profile detail */}

        <h1 style={{ fontWeight: "700", color: "#5baafe" }}>
          Customer Sales Record
        </h1>
        <br />

        <div className="table_responsive01">
          <table
            id="List"
            className="table table-sm table-hover table-striped table-bordered w-70"
          >
            <thead className="bg-custom text-white">
              <tr>
                <th className="text-center">
                  <i className="fa fa-list-ol mr-1"></i> Sold By
                </th>
                {/* <th className="text-center">
                          <i className="fa fa-clipboard-list mr-1"></i> Sold By
                        </th>  */}
                <th className="text-center">
                  <i className="fa fa-calendar-alt mr-1"></i> Commodity
                </th>
                <th className="text-center">
                  <i className="fa fa-calendar mr-1"></i> Date
                </th>

                <th className="text-center">
                  <i className="fa fa-check-circle mr-1"></i> Quantity
                </th>

                <th className="text-center">
                  <i className="fa fa-credit-card mr-1"></i> Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.List != null && this.state.List.length > 0 ? (
                this.state.List.map((item, index) => (
                  <tr key={index} id={`row_${item.id}`}>
                    {/* 1 */}
                    <td align="center">
                      {item?.sold_by?.user?.full_name ?? "N/A"}
                    </td>
                    {/* 2 */}
                    {/* <td align="center">{item?.sold_by?.user?.full_name ?? item?.sold_by ?? "N/A"}</td>  */}
                    {/* 3 */}
                    <td align="center">{item.commodity?.name ?? "N/A"}</td>
                    {/* 4 */}
                    <td align="center">
                      {new Date(item.date).toLocaleDateString()}
                      {/* {item.date} */}
                    </td>
                    {/* 5 */}
                    <td align="center">{item.quantity ?? "N/A"}</td>

                    {/* 6 */}
                    <td align="center"> {"Rs.  " + item.price ?? "N/A"} </td>

                    {/* edit button code */}
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

              {/* <div>
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
                          </div> */}
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
      </Form>
    );
  }
}
