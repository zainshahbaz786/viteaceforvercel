/* eslint-disable */
import React, { memo, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip, Modal, Button, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import { SalesTargets } from "./salestargets";
import * as CRUD from "../../../app/Common/CRUD";
import * as Utils from "../../../app/Common/Common";
import JQUERY from 'jquery';
import moment from 'moment';
let dataTable;
import JSZip from 'jszip';
window.JSZip = JSZip;


const SuperAdminDashboard = (props) => {
  const [agentList, setAgentList] = React.useState([{ id: 0, fullName: '-- All --' }]);
  const [agentId, setAgentId] = useState(0);
  const [fromDate, setFromDate] = useState(moment().format('YYYY-MM-DD'));
  const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
  const [agentLogList, setAgentLogList] = React.useState([]);
  const [callStat, setCallStat] = React.useState({
    totalKeyword: 0,
    totalAgent: 0,
    markedKeyword: 0,
    totalCalls: 0,
    unMarkedKeyword: 0,
    percentage: 0
  });
  const UpdateCallStat = (data) => {
    // //debugger
    setCallStat({
      totalKeyword: data?.map(item => item.totalKeyword).reduce((prev, next) => prev + next) ?? 0,
      markedKeyword: data?.map(item => item.markedKeywordCount).reduce((prev, next) => prev + next) ?? 0,
      totalCalls: data?.length ?? 0,
      unMarkedKeyword: data?.map(item => item.unMarkedKeywordCount).reduce((prev, next) => prev + next) ?? 0,
      percentage: 0,
    });
    // setLanguage(e.currentTarget.value);
  }
  const onClickSearch = () => {
    if (Utils.isNullOrUndefined(fromDate) || Utils.isNullOrUndefined(toDate)) {
      Utils.showSuccessAlertAutoClose('Please select valid To Date & From Date.', 'warning');
      return;
    }
    if (fromDate > toDate) {
      Utils.showSuccessAlertAutoClose('From Date should be less than To Date.', 'warning');
      setFromDate('');
      return;
    }
    // setLanguage(e.currentTarget.value);
    CRUD.postRequest(CRUD.SalesPingAPIRoutes.PhoneCall_GetPhoneCallLog, { agentId, fromDate, toDate }, function (response) {
      if (dataTable != null && dataTable != undefined) {
        dataTable.destroy();
      }
      if (response?.data?.success && response.data.result.length > 0) {
        setAgentLogList(response.data.result);
        UpdateCallStat(response.data.result);
      }
      else if (response?.data?.success == false) // Api Exception
      {
        Utils.showSuccessAlertAutoClose('Unable to load data. Please contact support.', 'error');
      } else {
        setAgentLogList([]);
        UpdateCallStat();
      }
      initializeDT();
    });
  }
  const initializeDT = () => {
    dataTable = JQUERY('#List').DataTable({
      responsive: true,
      dom: 'Bfrtip',
      buttons: [
        'excelHtml5',
      ],
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 }
      ]
    });
  }
  useEffect(() => {

    CRUD.postRequest(CRUD.SalesPingAPIRoutes.User_GetSystemSpecificUsers, { roleId: Utils.UserRole.Agent }, function (response) {
      if (response?.data?.success && response.data.result.length > 0) {
        response.data.result.unshift({ id: 0, fullName: '-- All --' })
        setAgentList(response.data.result);
      }
      else if (response?.data?.success == false) // Api Exception
      {
        Utils.showSuccessAlertAutoClose('Unable to load data. Please contact support.', 'error');
      }
    });
    onClickSearch();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-8 mb-5 mb-lg-0">
          <div className="card card-custom card-stretch">
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label">Call Logs</h3>
              </div>
            </div>
            <div className="card-body pt-4">

              <div className="row">
                <div className="col-lg-3 form-group">
                  <label className="form-label" >Agent</label>
                  <select
                    className={`form-control form-control-sm fs-md`}
                    onChange={(e) => setAgentId(e.currentTarget.value)}
                    value={agentId}
                  >
                    {agentList.map((agent, idx) => {
                      return (
                        <option
                          key={idx}
                          value={agent.id}
                        >
                          {agent.fullName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-lg-4 form-group">
                  <label className="form-label" >From Date</label>
                  <input type="date"
                    id="fromDate" className="form-control form-control-sm fs-md"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.currentTarget.value)}
                    required />
                </div>
                <div className="col-lg-4 form-group">
                  <label className="form-label" >To Date</label>
                  <input id="toDate" className="form-control form-control-sm fs-md" type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.currentTarget.value)}
                    required />
                </div>
                <div className="col-1">
                  <OverlayTrigger placement='top' overlay={<Tooltip> Search </Tooltip>}>
                    <a onClick={() => onClickSearch()}
                      className="btn btn-sm btn-icon bg-light-primary btn-hover-primary mt-8 rounded-circle show-on-hover-parent">
                      <i className="fa fa-search text-primary"></i>
                    </a>
                  </OverlayTrigger>
                </div>
              </div>
              <hr />
              <table id="List" className="table table-sm table-hover table-striped table-bordered w-100">
                <thead className="bg-custom text-white">
                  <tr>
                    <th><i className="fa fa-circle-alt mr-1 text-center"></i> Phone No.</th>
                    <th ><i className="fa fa-calendar-alt mr-1"></i> Call Date Time</th>
                    <th><i className="fa fa-clock mr-1 text-center"></i> Duration</th>
                    <th><i className="fa fa-thumbs-up mr-1 text-center"></i> Feedback Positive?</th>
                    <th><i className="fa fa-pencil mr-1 text-center"></i> Total Words</th>
                    <th ><i className="fa fa-pencil mr-1 text-center"></i> Marked Words</th>
                    <th><i className="fa fa-pencil mr-1 text-center"></i> Unmarked Words</th>
                  </tr>
                </thead>
                <tbody>
                  {agentLogList.map((log, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{log.phoneNumber}</td>
                        <td className="text-center">{moment(log.createdOn).format("YYYY-MM-DD HH:mm:ss")}</td>
                        <td className="text-center">{log.durationTime ?? ''}</td>
                        <td className="text-center">{log.isThumbsUp ? 'Yes' : 'No'}</td>
                        <td className="text-center">
                          <span className="badge badge-primary">
                            {log.totalKeyword}
                          </span>
                        </td>
                        <td className="text-center">{
                          log.markedWord
                          // <OverlayTrigger placement='top' overlay={<Tooltip> {log.markedWord} </Tooltip>}>
                          //   <span className="badge badge-success">
                          //     {log.markedKeywordCount}
                          //   </span>
                          // </OverlayTrigger>
                        }
                        </td>
                        <td className="text-center">{
                          log.unMarkedWord
                          // <OverlayTrigger placement='top' overlay={<Tooltip> {log.unMarkedWord} </Tooltip>}>
                          //   <span className="badge badge-danger">
                          //     {log.unMarkedKeywordCount}
                          //   </span>
                          // </OverlayTrigger>
                        }</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <SalesTargets className="card-stretch" callStats={callStat} />
        </div>
      </div>
    </div >
  )
}

export default memo(SuperAdminDashboard)
