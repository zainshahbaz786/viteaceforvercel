import React from "react";
// var $  = require( 'jquery' );
import JQUERY from "jquery";
import { Animated } from "react-animated-css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import CreateKeywordForm from "./createkeywordform";
import * as CRUD from "../../Common/CRUD";
import * as Utils from "../../Common/Common";
import { isNull } from "lodash";
import App from "../../../_metronic/_partials/Pagination/App";
import ReactPaginate from "react-paginate";

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
export default class KeyWordList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showUsersList: true,
      entityName: "Commodity",
      heading: "Commodities",
      paramObj: {},
      List: [],
      isdataLoading: false,
      isLoading: true,
      // for pagination
      offset: 0,
      count: 0,
      limit: 20,
      getMoreUrl: "",
      currentPage: 0,
      startingPoint: 1,
      loadingStatus: { status: true, message: "Loading ..." },
    };
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.limit;
    let url = `commodities/?limit=${this.state.limit}&offset=${offset}`;
    this.loadGrid(null, url, selectedPage);
  };

  componentDidMount() {
    this.loadGrid(null, CRUD.APIRoutes.Commodity_commodities);
  }

  showListView(flag, heading, that) {
    that = that ?? this;
    let _state = that.state;
    _state.showUsersList = flag;
    _state.heading = heading;
    that.setState(_state, function() {
      if (flag) {
        //  that.initializeDT();
      }
    });
  }

  initializeDT() {
    dataTable = JQUERY("#List").DataTable({
      responsive: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 },
      ],
    });
  }

  loadGrid(_that, url, selectedPage = 0) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.List = [];
    _state.isLoading = true;
    _state.isdataLoading = true;
    _state.loadingStatus = {
      status: true,
      message: "Loading ...",
    };
    CRUD.getRequest(url, function(response) {
      if (response?.data?.results?.length > 0) {
        let _state = _that.state;
        _state.List = response.data.results;
        _state.isdataLoading = false;
        _state.offset = selectedPage;
        _state.isLoading = false;
        _state.pageCount = Math.ceil(response?.data.count / _state.limit);
        _state.count = response?.data.count;

        _state.isLoading = false;
        _state.loadingStatus = { status: true, message: "" };
        _state.showUsersList = true;
        _that.setState(_state, function() {});
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

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadGrid();
      }
    );
  };

  edit(user) {
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
                  this.showListView(!this.state.showUsersList, "Commodities")
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
                  {isdataLoading ? (
                    <Spinner />
                  ) : (
                    <div>
                      <table
                        id="List"
                        className="table table-sm table-hover table-striped table-bordered w-100"
                      >
                        <thead className="bg-custom text-white">
                          <tr>
                            {/* <th>
                          <i className="fa fa-list-ol mr-1"></i> No.
                        </th> */}
                            <th>
                              <i className="fa fa-clipboard-list mr-1"></i> Name
                            </th>
                            <th className="text-center">
                              <i className="fa fa-calendar-alt mr-1"></i>{" "}
                              Created Date
                            </th>
                            {/* <th className="text-center">
                          <i className="fa fa-check-circle mr-1"></i> Active
                        </th>
                        <th className="text-center">
                          <i className="fa fa-bolt mr-1"></i> Action
                        </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.List != null &&
                          this.state.List.length > 0 ? (
                            this.state.List.map((item, index) => (
                              <tr key={index} id={`row_${item.id}`}>
                                {/* <td>{item.id}</td> */}
                                <td>{item.name}</td>
                                <td align="center">
                                  {new Date(item.created).toLocaleDateString()}
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
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
                    </div>
                  )}
                </Animated>
              )}

          {!this.state.showUsersList && (
            <Animated
              animationIn="bounceInLeft"
              animationOut="fadeOut"
              isVisible={true}
            >
              {/* form for creating new commodity */}
              <CreateKeywordForm parentRef={this} />
            </Animated>
          )}
        </div>

        {/* ggggg */}
      </div>
    );
  }
}
