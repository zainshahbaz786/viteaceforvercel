import React from "react";
import * as Utils from "../../Common/Common"
import { Form } from "react-bootstrap";
// import * as CRUD from "../../Common/CRUD"


export default class CreateUserForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        if (props.parentRef.state.paramObj) {
            props.parentRef.state.paramObj.fk_InstanceId = props.parentRef.state.paramObj.fk_InstanceId ?? '';
            props.parentRef.state.paramObj.fk_GenderId = props.parentRef.state.paramObj.fk_GenderId ?? '';
            props.parentRef.state.paramObj.fk_ManagerId = props.parentRef.state.paramObj.fk_ManagerId ?? '';
            props.parentRef.state.paramObj.lastName = props.parentRef.state.paramObj.lastName ?? '';
        }
        this.state = {
            formEntity: props.parentRef.state.paramObj ?? {
                fk_ManagerId: '', fk_InstanceId: '', firstName: '',
                lastName: '', email: '', active: true, isGoogleUser: false,
                fk_GenderId: '', fk_RoleId: Utils.UserRole.Manager, mobile: ''
            },
            formValidated: false
        };

    }

    componentDidMount() {

    }

    cancelForm() {
        this.props.parentRef.showListView(true, 'Users', this.props.parentRef);
    }
    submitForm() {
        if (Utils.validateForm('formUser', this)) {
            let _that = this;
            this.state.formEntity.fk_ManagerId = this.state.formEntity.fk_ManagerId == "" ? null : this.state.formEntity.fk_ManagerId;
            this.state.formEntity.fk_GenderId = this.state.formEntity.fk_GenderId == "" ? null : this.state.formEntity.fk_GenderId;
            this.state.formEntity.fk_InstanceId = this.state.formEntity.fk_InstanceId == "" ? null : this.state.formEntity.fk_InstanceId;
            
            // CRUD.postRequest(CRUD.SalesPingAPIRoutes.User_Upsert, this.state.formEntity, function (response) {
            //     if (response?.data > 0) {
            //         _that.props.parentRef.loadGrid(_that.props.parentRef);
            //         Utils.showUpsertAlert('User', _that.state.formEntity.id > 0);
            //     }
            // })
        }
    }

    render() {
        return (
            <Form
                noValidate
                validated={this.state.formValidated}
                id="formUser" className="needs-validation" noValidate>
                <div className="row">
                    <div className="col-lg-4 form-group">
                        <label className="form-label" >First Name<span className="text-danger"> *</span></label>
                        <input type="text"
                            id="firstName" name="firstName" className="form-control form-control-sm fs-md"
                            value={this.state.formEntity.firstName}
                            onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                            required />
                    </div>
                    <div className="col-lg-4 form-group">
                        <label className="form-label" >Last Name<span className="text-danger"> *</span></label>
                        <input type="text"
                            id="lastName" name="lastName" className="form-control form-control-sm fs-md"
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
                    {/* <div className="col-lg-4 form-group">
                        <label className="form-label" >User Role<span className="text-danger"> *</span></label>
                        <select className="form-control form-control-sm form-select fs-md" id="fk_RoleId"
                            value={this.state.formEntity.fk_RoleId}
                            onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                            name="fk_RoleId" required>
                            <option value="">-- Please select --</option>
                            <option value={Utils.UserRole.Agent}>Agent</option>
                            <option value={Utils.UserRole.Manager}>Manager</option>
                            {Utils.UserIsInRole(Utils.UserRole.SuperAdmin) && <option value={Utils.UserRole.Admin}>Admin</option>}
                        </select>
                    </div> */}
                    <div className="col-lg-4 form-group">
                        <label className="form-label" >Gender</label>
                        <select className="form-control form-control-sm fs-md"
                            value={this.state.formEntity.fk_GenderId}
                            onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                            id="fk_GenderId" name="fk_GenderId">
                            <option value="">-- Please select --</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Other</option>
                        </select>
                    </div>
                    <div className="col-lg-4 form-group">
                        <label className="form-label" >Mobile Number</label>
                        <input type="text" className="form-control form-control-sm fs-md"
                            value={this.state.formEntity.mobile ?? ''}
                            onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                            id="Mobile" name="mobile" im-insert="true" />
                    </div>
                </div>
                <div className="row">
                    {(Utils.UserIsInRole(Utils.UserRole.SuperAdmin) && (this.state.formEntity.fk_RoleId == Utils.UserRole.Manager || this.state.formEntity.fk_RoleId == Utils.UserRole.Admin)) && <div className="col-lg-4 form-group">
                        <label className="form-label" >Customer <span className="text-danger"> *</span></label>
                        <select required className="form-control form-control-sm fs-md"
                            value={this.state.formEntity.fk_InstanceId}
                            onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                            id="fk_InstanceId" name="fk_InstanceId">
                            <option value="">-- Please select --</option>
                            {this.props.parentRef.state.InstanceList.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>}

                    {((Utils.UserIsInRole(Utils.UserRole.SuperAdmin) || Utils.UserIsInRole(Utils.UserRole.Admin)) && this.state.formEntity.fk_RoleId == Utils.UserRole.Agent) && <div className="col-lg-4 form-group">
                        <label className="form-label" >Manager <span className="text-danger"> *</span></label>
                        <select required className="form-control form-control-sm fs-md"
                            value={this.state.formEntity.fk_ManagerId}
                            onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                            id="fk_ManagerId" name="fk_ManagerId">
                            <option value="">-- Please select --</option>
                            {this.props.parentRef.state.ManagerList.map((item, index) => (
                                <option key={index} value={item.id}>{item.firstName + ' ' + item.lastName}</option>
                            ))}
                        </select>
                    </div>}

                    {/* <div className="col-lg-4 my-auto">
                        <div className="form-group mb-0 w-25">
                            <label className="checkbox" >
                                <input
                                    name="active"
                                    type="checkbox"
                                    checked={this.state.formEntity.active}
                                    onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                                />
                                <span className="mr-3" />
                                    Active
                            </label>
                        </div>
                    </div> */}
                    <div className="col-lg-4 my-auto">
                        <div className="form-group mb-0 w-50">
                            {/* <label className="checkbox" >
                                <input
                                    name="isGoogleUser"
                                    type="checkbox"
                                    checked={this.state.formEntity.isGoogleUser}
                                    onChange={e => Utils.updateInputValueInState(this.state.formEntity, e, this, this.state)}
                                />
                                <span className="mr-3" />
                                    Is Google User
                            </label> */}
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-10">
                    <button type="button" id="btnCloseUserModal" onClick={() => this.cancelForm()} className="btn btn-sm btn-danger mr-5"> <span className="fa fa-times"></span> Close</button>
                    <button type="button" id="btnSaveUser" onClick={() => this.submitForm()} className="btn btn-sm btn-success"> <span className="fa fa-save"></span> Save</button>
                </div>
            </Form>
        )
    }
}