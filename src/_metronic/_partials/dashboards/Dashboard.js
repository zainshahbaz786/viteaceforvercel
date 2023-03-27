import React, { memo, useEffect, Form,useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Suspense, lazy } from "react";
import { Link, useHistory } from "react-router-dom";
import './dashboard.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,NavLink,BrowserRouter
} from "react-router-dom";


// import {
//   OverlayTrigger,
//   Tooltip,
//   Modal,
//   Button,
//   ButtonGroup,
//   DropdownButton,
//   Dropdown,
// } from "react-bootstrap";
 import * as CRUD from "../../../app/Common/CRUD";
// import * as Utils from "../../../app/Common/Common";

import JSZip from "jszip";
import CustomerPage from "../../../app/modules/managecustomers/customerpage";
import SalesPage from "../../../app/modules/managesales/salespage";
import { method } from "lodash";
window.JSZip = JSZip;
//const history = useHistory();

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
let name = month[d.getMonth()];





const BASE_URL = "http://3.85.238.214/";


const Dashboard = (props) => {

  // const [mSales, getmSales] = useState([]);
  //const [mTrans, setmTrans] = useState([]);
  const [mCustomers, setmCustomers] = useState([0]);
  const [mSales, setmSales] = useState([0]);
  const [mTrans, setmTrans] = useState([0]);



  useEffect(() => {
    // this.loadUserList();
  }, []);

  
  const fetchDataCust = () => {

    CRUD.getRequest(CRUD.APIRoutes.Monthly_customers, function(response) {
      if (response?.data?.count >= 0) {
        // let _state = _that.state;
        setmCustomers(response.data);
        
      } // Api Exception
      else {
        
      }
    });   
  }

  const fetchDataSale = () => {
    
    CRUD.getRequest(CRUD.APIRoutes.Monthly_sales, function(response) {
      if (response?.data?.count >= 0) {
        //debugger
        setmSales(response.data);
        
      } // Api Exception
      else {
    
      }
    });   
  }

  const fetchDataTrans = () => {
    
    CRUD.getRequest(CRUD.APIRoutes.Monthly_transactions, function(response) {
      if (response?.data?.count >= 0) {
        setmTrans(response.data);
        
      } // Api Exception
      else {
    
      }
    });   
  }

  

  


  

  useEffect(() => {
    fetchDataCust();
    fetchDataSale();
    fetchDataTrans();

  },[])


  return (
    <>





      {/* wrapper div */}
      <div className="row">
        {/* for customers */}
        <div className="col-lg-4 form-group">
    
          {/* <label className="form-label" >Commodity Name:<span className="text-danger">* </span></label> */}
          {/* For Customers */}
          <Card id="dasboardCards">
     
            <Card.Body>
            <i className="fa fa-users fa-3x" aria-hidden="true"></i>
              <h2>Customers</h2>

              {/* <h5 style={{ color: "green" }}>Total Customers:</h5> */}
              <h6 style={{ color: "green" }}>
              
              Customers in {name}:  {mCustomers.count}</h6>
              {/* {mCustomers.length} */}
              <NavLink className="menu-link" to="/customers"  >
              <Button variant="primary" >Visit Customers Page</Button>
              </NavLink>
            </Card.Body>
          </Card>
     
        </div>

        {/* For Sales */}
        <div className="col-lg-4 form-group">
        
          <Card id="dasboardCards">
            
            <Card.Body>
            <i className="fa fa-clipboard-list fa-3x" aria-hidden="true"></i>
              <h2>Sales</h2>

              {/* <h5 style={{ color: "green" }}>Total Sales:</h5> */}

              <h6 style={{ color: "green" }}>Sales in {name}:  {mSales.count}</h6>

              <NavLink className="menu-link" to="/sales">
              <Button variant="primary" >
              Visit Sales Page</Button>
              </NavLink>
            </Card.Body>
          </Card>
          
        </div>

        {/* for transaction */}
        <div className="col-lg-4 form-group">
        
          <Card id="dasboardCards">
            
            <Card.Body>
            
            <i className="fa fa-list-ol mr-1 fa-3x"></i>
              <h2>Transactions</h2>

              {/* <h5 style={{ color: "green" }}>Total transactions:</h5> */}

              <h6 style={{ color: "green" }}>Transactions in {name}:  {mTrans.count}</h6>
              <NavLink className="menu-link" to="/transactions">
              <Button variant="primary">Visit Transactions Page</Button>
              </NavLink>
            </Card.Body>
          </Card>
          
        </div>
      </div>
   
   

    </>
  );
};

export default memo(Dashboard);
