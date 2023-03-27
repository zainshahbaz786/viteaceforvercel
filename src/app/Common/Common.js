import swal from 'sweetalert';
import Swal2 from 'sweetalert2'
import _ from 'lodash'
export const GoogleClientId = "162010967385-q5nrm2go3mlsstp1jro05prvpq5npf2l.apps.googleusercontent.com";
export function updateInputValueInState(stateVariable, event, _that, state, ReactSelectOBJ) {


_that.state.clearButton = true;


  // //debugger;
  if (ReactSelectOBJ != null && ReactSelectOBJ != undefined && ReactSelectOBJ) {
    if (event == undefined) {
      stateVariable[ReactSelectOBJ["NameProp"]] = [];
      _that.state[ReactSelectOBJ["ValidationState"]] = false;
    } else {
      stateVariable[ReactSelectOBJ["NameProp"]] = event.map((obj, index) => {
        return obj.value
      });
      _that.state[ReactSelectOBJ["ValidationState"]] = true;
    }
  } else if (event.target.type == "checkbox") {
    stateVariable[event.target.name] = event.target.checked;
  } else {
    stateVariable[event.target.name] = event.target.value;
  }
  _that.setState(_that.state);
}
export function updateEmailInputValueInState(stateVariable, event, _that, state, ReactSelectOBJ) {
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(event.target.value)) {
    UpdateCustomElementValidation(event, true);
  } else {
    UpdateCustomElementValidation(event, false);
  }
  stateVariable[event.target.name] = event.target.value;
  _that.setState(state);
}
export function showSuccessAlert(msg, type, title) {
  swal({
    title: title,
    text: msg,
    icon: type,
  });
}
export function showSuccessAlertAutoClose(msg, type, title, timer = 3000) {
  swal({
    title: title,
    text: msg,
    icon: type,
    timer: timer,
    buttons: false
  });
}
export function showConfirmation(msg, title, confirmCallback, cancelCallback) {
  Swal2.fire({
    title: title ? title : "Are you sure?",
    text: msg ? msg : "",
    icon: 'warning',
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.value) {
      if (_.isFunction(confirmCallback))
        confirmCallback();
    } else {
      if (_.isFunction(cancelCallback))
        cancelCallback();
    }
  })
}

export function GetCurrentUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}
export function UserIsInRole(role) {
  return GetCurrentUser()?.roles?.includes(role);
}
export function GetCurrentUserAccountID() {
  return GetCurrentUser().userAccountBasicInfo.userAccountID;
}

export function GetBaseUrl() {
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host;
  return baseUrl;
}
export function GetDateTimeString(dateString) {
  var date = new Date(dateString);
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.toLocaleTimeString();
}
export function UpdateCustomElementValidation(event, isValid) {
  if (isValid) {
    event.currentTarget.nextElementSibling.style.display = "";
    event.target.setCustomValidity("");
  } else {
    event.currentTarget.nextElementSibling.style.display = "block";
    event.target.setCustomValidity("Invalid field.");
  }
}

export function prependZeroIfLessThanTen(item) {
  if (item.toString().length === 1) {
    return "0" + item.toString();
  } else {
    return item;
  }
}

export function validateForm(formId, componentRef) {
  componentRef.state.formValidated = true;
  componentRef.setState(componentRef.state);
  return document.getElementById(formId).checkValidity()
}

export function showUpsertAlert(entityName, isUpdate) {
  //debugger;
  if (!isUpdate) {
    showSuccessAlertAutoClose(`${entityName} created successfully.`, 'success', 'Success');
  } else {
    showSuccessAlertAutoClose(`${entityName} updated successfully.`, 'success', 'Success');
  }
}
export function showDeleteAlert(entityName) {
  showSuccessAlertAutoClose(`${entityName} deleted successfully.`, 'success', 'Success');
}
export function removeElementFromArray(arr, propName, value) {

  return arr.filter(function (ele) {
    return ele[propName] != value;
  });
}
export function isNullOrUndefined(value) {
  if (value == undefined || value == "" || value == null && value !== 0) {
    return true;
  }
  return false;
}

export const UserRole = {
  Admin: 1,
  Manager: 2,
  Agent: 3,
  SuperAdmin: 4,
}
