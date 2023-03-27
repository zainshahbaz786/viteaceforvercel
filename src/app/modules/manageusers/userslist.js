import React from "react";
// var $  = require( 'jquery' );
import JQUERY from "jquery";
import { Animated } from "react-animated-css";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import CreateUserForm from "./createuserform";
import * as CRUD from "../../Common/CRUD";
import * as Utils from "../../Common/Common";
// import { isNull } from "lodash";
let dataTable;
export default class UsersList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showUsersList: true,
      entityName: "Customer",
      heading: "Customer",
      paramObj: {},
      List: [],
      InstanceList: [],
      ManagerList: [],
      isLoading: true,
      showCreateBtn: true,
      loadingStatus: { status: true, message: "Loading ..." },
    };
  }

  componentDidMount() {
    this.loadGrid();
    this.loadLookups();
  }

  showListView(flag, heading, that) {
    that = that ?? this;
    let _state = that.state;
    _state.showUsersList = flag;
    _state.heading = heading;
    that.setState(_state, function() {
      if (flag) {
        //that.initializeDT();
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

  loadGrid(_that) {
    _that = _that ?? this;
    let _state = _that.state;
    _state.List = [];
    _state.isLoading = true;
    _state.loadingStatus = {
      status: true,
      message: "Loading ...",
    };
    setTimeout(() => {
      _state.isLoading = false;
      _state.loadingStatus = { status: true, message: "" };
      _state.showUsersList = true;
      _state.showCreateBtn = true;
      _that.setState(_state, function() {
        // _that.initializeDT();
      });
    }, 1000);

    // CRUD.getRequest(CRUD.SalesPingAPIRoutes.User_GetAll, function(response) {
    //   if (response?.data?.success && response.data.result.length > 0) {
    //     let _state = _that.state;
    //     _state.List = response.data.result;
    //     _state.isLoading = false;
    //     _state.loadingStatus = { status: true, message: "" };
    //     _state.showUsersList = true;
    //     _state.showCreateBtn = true;
    //     _that.setState(_state, function() {
    //       _that.initializeDT();
    //     });
    //   } // Api Exception
    //   else {
    //     let _state = _that.state;
    //     _state.List = [];
    //     _state.isLoading = false;
    //     _state.loadingStatus = { status: false, message: "" };
    //     _that.setState(_state);
    //   }
    // });
  }

  loadLookups(_that) {
    _that = _that ?? this;
    if (Utils.UserIsInRole(Utils.UserRole.SuperAdmin)) {
      _that.loadCustomer(_that);
      _that.loadManager(_that);
    }
  }

  loadCustomer(_that) {
    let _state = _that.state;
    _state.showCreateBtn = false;
    _that.setState(_state);
    // CRUD.getRequest(CRUD.SalesPingAPIRoutes.Customer_GetAllLookup, function(
    //   response
    // ) {
    //   if (response?.data?.success && response.data.result.length > 0) {
    //     let _state = _that.state;
    //     _state.InstanceList = response.data.result;
    //     _state.showCreateBtn = true;
    //     _that.setState(_state);
    //   } // Api Exception
    //   else {
    //     Utils.showSuccessAlertAutoClose(
    //       "Unable to load data. Please contact support.",
    //       "error"
    //     );
    //   }
    // });
  }

  loadManager(_that) {
    let url = CRUD.SalesPingAPIRoutes.User_GetAllManager;
    // CRUD.getRequest(url, function(response) {
    //   if (response?.data?.success && response.data.result.length > 0) {
    //     let _state = _that.state;
    //     _state.ManagerList = response.data.result;
    //     _state.showCreateBtn = true;
    //     _that.setState(_state);
    //   } // Api Exception
    //   else {
    //     Utils.showSuccessAlertAutoClose(
    //       "Unable to load data. Please contact support.",
    //       "error"
    //     );
    //   }
    // });
  }

  edit(user) {
    let _state = this.state;
    _state.ManagerList = _state.List.filter((obj) => {
      return (
        (user == undefined || obj.id != user.id) &&
        obj.fk_RoleId == Utils.UserRole.Manager
      );     
    });
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
        CRUD.deleteRequest(CRUD.SalesPingAPIRoutes.User_Delete, id, function(
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
    return (
      <div className="card card-custom">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label font-weight-bolder text-dark">
              {this.state.heading}
            </h3>
          </div>
          <div className="card-toolbar">
            {this.state.showUsersList && this.state.showCreateBtn && (
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
        <div className="card-body">
          {this.state.isLoading && this.state.showUsersList
            ? "Loading ..."
            : this.state.showUsersList && (
                <Animated
                  animationIn="bounceInLeft"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  <table
                    id="List"
                    className="table table-sm table-hover table-striped table-bordered w-100"
                  >
                    <thead className="bg-custom text-white">
                      <tr>
                        <th data-priority="1">
                          <i className="fa fa-user mr-1"></i> Name
                        </th>
                        <th>
                          <i className="fa fa-envelope mr-1"></i> Email
                        </th>
                        <th>
                          <i className="fa fa-circle-alt mr-1"></i> Mobile
                        </th>
                        <th>
                          <i className="fa fa-mobile-alt mr-1"></i> Address
                        </th>

                        {/* <th className="text-center">
                          <i className="fa fa-user-plus mr-1"></i> Role
                        </th> */}
                        {/* {Utils.UserIsInRole(Utils.UserRole.SuperAdmin) && (
                          <th className="text-center">
                            <i className="fa fa-user-plus mr-1"></i> Customer
                          </th>
                        )} */}
                        {/* <th className="text-center">
                          <i className="fa fa-calendar-alt mr-1"></i> Created
                          Date
                        </th>
                        <th className="text-center">
                          <i className="fa fa-check-circle mr-1"></i> Active
                        </th>
                        <th data-priority="2" className="text-center">
                          <i className="fa fa-bolt mr-1"></i> Action
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.List != null && this.state.List.length > 0 ? (
                        this.state.List.map((item, index) => (
                          <tr key={index} id={`row_${item.id}`}>
                            <td>
                              {item.firstName + " " + (item.lastName ?? "")}
                            </td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            {/* <td align="center">
                              <span className={`badge badge-success min-w-5`}>
                                {item.roleName}
                              </span>
                            </td> */}
                            {Utils.UserIsInRole(Utils.UserRole.SuperAdmin) && (
                              <td>{item.instanceName}</td>
                            )}
                            <td align="center">
                              {new Date(item.createdOn).toLocaleDateString()}
                            </td>
                            <td align="center">
                              <div className="custom-control custom-switch">
                                <input
                                  disabled={
                                    item.fk_RoleId == Utils.UserRole.SuperAdmin
                                  }
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
                                  disabled={
                                    item.fk_RoleId == Utils.UserRole.SuperAdmin
                                  }
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
                                <Button
                                  disabled={
                                    item.fk_RoleId == Utils.UserRole.SuperAdmin
                                  }
                                  onClick={() => this.delete(item.id)}
                                  className="btn btn-xs btn-icon btn-outline-danger ml-3"
                                >
                                  <i className="fa fa-trash-alt"></i>
                                </Button>
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
                </Animated>
              )}

          {!this.state.showUsersList && (
            <Animated
              animationIn="bounceInLeft"
              animationOut="fadeOut"
              isVisible={true}
            >
              <CreateUserForm parentRef={this} />
            </Animated>
          )}
        </div>
      </div>
    );
  }
}
