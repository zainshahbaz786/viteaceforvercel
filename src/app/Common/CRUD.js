import * as Utils from "../Common/Common";

const axios = require("axios");

export const BASE_URL = "http://3.85.238.214/";
// export const BASE_URL = "http://localhost:57821/api/";

export const SalesPingAPIRoutes = {
  //---------Phone Call------
  PhoneCall_GetPhoneCallLog: "PhoneCall/GetPhoneCallLog",
  PhoneCall_UpdatePhoneCallReview: "PhoneCall/UpdatePhoneCallReview",
  //---------User------
  User_GetAll: "User/GetAllUser",
  User_Upsert: "User/UpsertUser",
  User_Delete: "User/DeleteUser",
  User_GetAllManager: "User/GetAllManager",
  User_GetSystemSpecificUsers: "User/GetSystemSpecificUsers",

  //---------Keyword------
  Keyword_GetAll: "Keyword/GetAllKeyword",
  Keyword_GetKeywordByManagerId: "Keyword/GetKeywordByManagerId",
  Keyword_Upsert: "Keyword/UpsertKeyword",
  Keyword_Delete: "Keyword/DeleteKeyword",
  Keyword_GetAgentKeywords: "Keyword/GetAgentKeywords",
  Keyword_UpdateCallKeyword: "Keyword/UpdateCallKeyword",
  Keyword_InsertCallKeyword: "Keyword/InsertCallKeyword",
  Keyword_UpdatePhoneCallAtEndCall: "Keyword/UpdatePhoneCallAtEndCall",
  //---------Contact------
  Contact_GetAll: "Contact/GetAllContact",
  Contact_GetContactByAgentId: "Contact/GetContactByAgentId",
  Contact_Upsert: "Contact/UpsertContact",
  Contact_Delete: "Contact/DeleteContact",
  Contact_AddPhoneCall: "Contact/AddPhoneCall",
  //---------Customer------
  Customer_GetAll: "Instance/GetAllInstance",
  Customer_GetAllLookup: "Instance/GetAllInstance",
  Customer_Upsert: "Instance/UpsertInstance",
  Customer_Delete: "Instance/DeleteInstance",
};

export const APIRoutes = {
  //---------Commodities------
  Commodity_commodities: "commodities/",
  //Transaction_transaction: "transactions/",
  Sales_sales: "sales/",
  filtered_sales_byDate: "sales/",
  filtered_sales_byId: "sales/",
  Customer_customer: "customers/",
  AllCustomers_customers: "customers/&hitsPerPage=1000",
  Sales_transactions: "transactions/",
  Transactions_transactions: "transactions/",
  Staff_staff: "storestaffs/",

  Monthly_sales: "/monthly-sales/",
  Monthly_customers: "/monthly-customers/",
  Monthly_transactions: "/monthly-transactions/",
};

export function getRequest(url, callBack) {
  //debugger;
  return axios
    .get(BASE_URL + url)
    .then((data) => {
      callBack(data);
    })
    .catch(function(err) {
      if (err.status == 401) {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
      } else if (err.status == 500) {
        Utils.showSuccessAlert(
          "An unexpected error has occured. Please contact system support.",
          "error",
          "Error"
        );
        callBack(false);
      } else {
        callBack(false);
      }
    });
}

export function getRequest_byCustomer(url, customerId, callBack) {
  return axios
    .get(BASE_URL + url, {
      params: {
        customer: customerId,
      },
    })
    .then((data) => {
      //debugger;
      //console.log(startDate, endDate);
      callBack(data);
    })
    .catch(function(err) {
      if (err.status == 401) {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
      } else if (err.status == 500) {
        Utils.showSuccessAlert(
          "An unexpected error has occured. Please contact system support.",
          "error",
          "Error"
        );
        callBack(false);
      } else {
        callBack(false);
      }
    });
}
export function getRequest_byParams(url, startDate, endDate, callBack) {
  return axios
    .get(BASE_URL + url, {
      params: {
        date__gte: startDate,
        date__lte: endDate,
      },
    })
    .then((data) => {
      //debugger;
      console.log(startDate, endDate);
      callBack(data);
    })
    .catch(function(err) {
      if (err.status == 401) {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
      } else if (err.status == 500) {
        Utils.showSuccessAlert(
          "An unexpected error has occured. Please contact system support.",
          "error",
          "Error"
        );
        callBack(false);
      } else {
        callBack(false);
      }
    });
}

export function getRequestById(url, id) {
  return axios.get(BASE_URL + url + "?id=" + id);
}

export function postRequest(url, requestParameters, callBack) {
  return axios
    .post(BASE_URL + url, requestParameters)
    .then((data) => {
      callBack(data);
    })
    .catch(function(err) {
      ////debugger;
      if (err.status == 401) {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
      } else if (err.status == 500) {
        Utils.showSuccessAlert(
          "An unexpected error has occured. Please contact support.",
          "error",
          "Error"
        );
      } else if (err.status == 406) {
        Utils.showSuccessAlert(err.data.Message, "error", "Error");
      } else if (err.status == 400) {
        Utils.showSuccessAlert(err.data.error, "error", "Error");
        callBack(err);
      }
      // else {
      //   Utils.showSuccessAlert(err.data?.Message, "error", "Error");
      //   callBack(err);
      // }
    });
}
export function postFileRequest(url, requestParameters, callBack) {
  return axios
    .post(BASE_URL + url, requestParameters, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data) => {
      callBack(data);
    })
    .catch(function(err) {
      ////debugger;
      if (err.status === 401) {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
      } else if (err.status === 500) {
        Utils.showSuccessAlert(
          "An unexpected error has occured. Please contact support.",
          "error",
          "Error"
        );
      } else if (err.status === 406) {
        Utils.showSuccessAlert(err.data.Message, "error", "Error");
      } else if (err.status === 400) {
        Utils.showSuccessAlert(err.data.error, "error", "Error");
        callBack(err);
      }
      // else {
      //   Utils.showSuccessAlert(err.data?.Message, "error", "Error");
      //   callBack(err);
      // }
    });
}

export function deleteRequest(url, id, callBack) {
  return axios
    .delete(BASE_URL + url + "?id=" + id)
    .then((data) => {
      callBack(data);
    })
    .catch(function(err) {
      if (err.status == 401) {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
      } else if (err.status == 500) {
        Utils.showSuccessAlert(
          "An unexpected error has occured. Please contact support.",
          "error",
          "Error"
        );
      } else if (err.status == 406) {
        Utils.showSuccessAlert(err.data.Message, "error", "Error");
      } else {
        callBack(false);
      }
    });
}

export function putRequest(url, requestParameters, callback) {
  if (requestParameters) {
    return axios.put(BASE_URL + url, requestParameters).then((data) => {
      callback(data);
    });
  } else {
    return axios.put(BASE_URL + url);
  }
}

export function putFileRequest(url, requestParameters, callBack) {
  return axios
    .put(BASE_URL + url, requestParameters, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data) => {
      callBack(data);
    })
    .catch(function(err) {
      ////debugger;
      if (err.status === 401) {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
      } else if (err.status === 500) {
        Utils.showSuccessAlert(
          "An unexpected error has occured. Please contact support.",
          "error",
          "Error"
        );
      } else if (err.status === 406) {
        Utils.showSuccessAlert(err.data.Message, "error", "Error");
      } else if (err.status === 400) {
        Utils.showSuccessAlert(err.data.error, "error", "Error");
        callBack(err);
      }
      // else {
      //   Utils.showSuccessAlert(err.data?.Message, "error", "Error");
      //   callBack(err);
      // }
    });
}
