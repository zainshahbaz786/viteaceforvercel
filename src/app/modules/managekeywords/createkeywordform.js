import React from "react";
import * as Utils from "../../Common/Common";
import { Form } from "react-bootstrap";
import * as CRUD from "../../Common/CRUD";

export default class CreateKeywordForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      formEntity: props.parentRef.state.paramObj ?? { name: "" },
      formValidated: false,
      loading: false,
    };
  }

  componentDidMount() {}

  cancelForm() {
    this.props.parentRef.showListView(
      true,
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
      CRUD.postRequest(
        CRUD.APIRoutes.Commodity_commodities,
        this.state.formEntity,
        function(response) {
          console.log(" response is: "+ response)
          // //debugger;
          if (response?.data?.id != null) {
            _that.props.parentRef.loadGrid(_that.props.parentRef,"commodities/");
            Utils.showUpsertAlert(
             " Commodity",
              false
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
        id="formEntity"
        className="needs-validation"
      >
        <div className="row " id="container">
          <div className="col-lg-4 form-group">
            <label className="form-label">
              Name<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control form-control-sm fs-md"
              value={this.state.formEntity.name}
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

{/* for taking date input */}
{/* <div className=" col-lg-4  form-group"> */}
  

<label className="form-label" >Date <span className="text-danger"> *</span>  </label>
{/* input form */}
<input type="date"
id="keywordText" name="keywordText" className="form-control form-control-sm fs-md"
value={this.state.formEntity.date}
placeholder={this.state.formEntity.date}
onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
required />
{/* </div> */}
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
