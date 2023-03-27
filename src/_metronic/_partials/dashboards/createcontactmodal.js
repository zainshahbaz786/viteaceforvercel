import React from "react";
import * as Utils from "../../../app/Common/Common"
import { Form } from "react-bootstrap";
import * as CRUD from "../../../app/Common/CRUD"
import moment from 'moment';


export default class CreateContactForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        if (props.contactToUpdate == null) {
            this.state = {
                formEntity: { firstName: '', lastName: '', email: '', phoneNumber: '', dOB: '' },
                formValidated: false
            };
        }
        else {
            this.state = {
                formEntity: {
                    active: true,
                    id: props.contactToUpdate.id,
                    firstName: props.contactToUpdate.firstName,
                    lastName: props.contactToUpdate.lastName,
                    email: props.contactToUpdate.email,
                    phoneNumber: props.contactToUpdate.phoneNumber,
                    dOB: moment(props.contactToUpdate.dob).format('YYYY-MM-DD')
                },
                formValidated: false
            };
        }
    }

    componentDidMount() {

    }

    cancelForm() {
        this.props.handleClose();
    }
    submitForm() {
        if (Utils.validateForm('formEntity', this)) {
            let _that = this;
            this.state.formEntity.dOB = moment().format('YYYY-MM-DD');
            CRUD.postRequest(CRUD.SalesPingAPIRoutes.Contact_Upsert, this.state.formEntity, function (response) {
                if (response?.data > 0) {
                    // let list = _that.props.contactList;
                    // list.push(_that.state.formEntity);
                    // _that.props.setContactList(list);
                    _that.props.handleClose();
                    Utils.showUpsertAlert('Contact', _that.state.formEntity.id > 0);
                }
            })
        }
    }

    render() {
        return (
            <Form
                noValidate
                validated={this.state.formValidated}
                id="formEntity" className="needs-validation" noValidate>
                <div className="row">
                    <div className="col-lg-4 form-group">
                        <label className="form-label" >First Name<span className="text-danger"> *</span></label>
                        <input type="text"
                            id="firstName" name="firstName" className="form-control"
                            value={this.state.formEntity.firstName}
                            onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                            required />
                    </div>
                    <div className="col-lg-4 form-group">
                        <label className="form-label" >Last Name<span className="text-danger"> *</span></label>
                        <input type="text"
                            id="lastName" name="lastName" className="form-control"
                            value={this.state.formEntity.lastName}
                            onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                            required />
                    </div>
                    <div className="col-lg-4 form-group">
                        <label className="form-label" >Email<span className="text-danger"> *</span></label>
                        <Form.Control type="email" placeholder="Email" required
                            name="email"
                            value={this.state.formEntity.email}
                            onChange={e => Utils.updateEmailInputValueInState(this.state.formEntity, e, this, this.state)} />
                        <Form.Control.Feedback type="invalid">
                            Please provide valid email
                        </Form.Control.Feedback>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 form-group">
                        <label className="form-label" >Phone Number<span className="text-danger"> *</span></label>
                        <input type="text"
                            id="phoneNumber" name="phoneNumber" className="form-control"
                            value={this.state.formEntity.phoneNumber}
                            onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                            required />
                    </div>
                    {/* <div className="col-lg-4 form-group">
                        <label className="form-label" >Date of Birth<span className="text-danger"> *</span></label>
                        <input type="date"
                            id="dOB" name="dOB" className="form-control"
                            value={this.state.formEntity.dOB}
                            onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                            required />
                    </div> */}
                </div>

                <div className="d-flex justify-content-end mt-8">
                    <button type="button" id="btnCloseUserModal" onClick={() => this.cancelForm()} className="btn btn-sm btn-danger mr-5"> <span className="fa fa-times mr-1"></span> Close</button>
                    <button type="button" id="btnSaveUser" onClick={() => this.submitForm()} className="btn btn-sm btn-success"> <span className="fa fa-save mr-1"></span> Save</button>
                </div>
            </Form>
        )
    }
}