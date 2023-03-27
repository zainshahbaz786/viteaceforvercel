import React from "react";
import * as Utils from "../../Common/Common";
import { Form } from "react-bootstrap";
import * as CRUD from "../../Common/CRUD";
import moment from "moment";

export default class CreateCustomerForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    var paramObject = {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      dob: "",
      country_code: "",
      contact_num: "",
    };
    if (props.parentRef.state.paramObj?.id != undefined) {
      // //debugger;
      // paramObject.name=props.parentRef.state.paramObj.first_name;
    }
    this.state = {
      // formEntity: paramObject,
      formValidated: false,
      entityName: "Customer",
      formEntity: props.parentRef.state.paramObj ?? { first_name: "" },
      loading: false,
    };
  }

  componentDidMount() {
    // document.getElementById('expiryDate').min = moment().format('YYYY-MM-DD');
    // this.setState({});
  }

  cancelForm() {
    this.props.parentRef.showListView(true, "Customers", this.props.parentRef);
  }
  submitForm() {
    if (Utils.validateForm("formUser", this)) {
      let _that = this;
      let _state = _that.state;
      _state.loading = true;
      _that.setState(_state);
      CRUD.postRequest(
        CRUD.APIRoutes.Customer_customer,
        this.state.formEntity,
        function(response) {
          ////debugger;
          console.log(response);
          if (response?.data?.id != null) {
            // let url=`customers/?limit=${this.state.limit}&offset=${offset}`;
            // _that.props.parentRef.loadGrid(_that.props.parentRef,"customers/");
            // _that.props.parentRef.loadGrid(null,_that.props.parentRef);
            Utils.showUpsertAlert("Customer", _that.state.formEntity.id > 0);
            _that.props.parentRef.loadGrid(_that.props.parentRef, "customers/");
            ////debugger;
            Utils.showUpsertAlert(
              this.props.parentRef.state.paramObj.entityName,
              _that?.state?.formEntity.id > 0
            );
          }

          _state.loading = false;
          _that.setState(_state);
        }
      );
    }
  }

  render() {
    return (
      <Form
        noValidate
        validated={this.state.formValidated}
        id="formUser"
        className="needs-validation"
      >
        <div className="row">
          {/* ----1 ----*/}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              First Name<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="form-control form-control-sm fs-md"
              value={this.state.formEntity.first_name || ""}
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
          {/* ----2---- */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Last Name<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="form-control form-control-sm fs-md"
              value={this.state.formEntity.last_name || ""}
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
          {/* ---3--- */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Email<span className="text-danger"> *</span>
            </label>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              id="email"
              name="email"
              value={this.state.formEntity.email || ""}
              onChange={(e) =>
                Utils.updateEmailInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide valid email
            </Form.Control.Feedback>
          </div>
          {/* ----4---- */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Phone<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm fs-md"
              required
              value={this.state.formEntity.contact_num || ""}
              onChange={(e) =>
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                )
              }
              id="contact_num"
              name="contact_num"
              im-insert="true"
            />
          </div>

          {/* password  */}
          {/* <div className="col-lg-4 form-group">
                        <label className="form-label" >Password<span className="text-danger"> *</span></label>
                        <input type="text" className="form-control form-control-sm fs-md"
                            required
                            value={this.state.formEntity.password  || ''}
                            onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                            id="password" name="password"  im-insert="true" />
                    </div> */}

          {/* Address */}
          {/* ----5----- */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Address<span className="text-danger">* </span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm fs-md"
              value={this.state.formEntity.address || ""}
              onChange={(e) =>
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                )
              }
              id="address"
              name="address"
              im-insert="true"
            />
          </div>

          {/* ----6----- */}
          {/* country code */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Country Code<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm fs-md"
              required
              placeholder="Not more then 4 characters"
              value={this.state.formEntity.country_code || ""}
              onChange={(e) =>
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                )
              }
              id="country_code"
              name="country_code"
              im-insert="true"
            />
          </div>
        </div>
        <div className="row">
          {/* ----7---- */}
          <div className="col-lg-4 form-group">
            <label className="form-label">
              {" "}
              Date of Birth<span className="text-danger"> </span>
            </label>
            <input
              type="date"
              className="form-control form-control-sm fs-md"
              value={this.state.formEntity.dob || ""}
              onChange={(e) =>
                Utils.updateInputValueInState(
                  this.state.formEntity,
                  e,
                  this,
                  this.state
                )
              }
              id="dob"
              name="dob"
              im-insert="true"
            />
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
