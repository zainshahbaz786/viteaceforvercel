import React from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";

export function ErrorPage1() {
  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="d-flex flex-row-fluid flex-column bgi-size-cover bgi-position-center bgi-no-repeat p-10 p-sm-30"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media/error/bg1.jpg")})`
        }}
      >
        <h1
          className="font-size-sm-100 font-weight-boldest text-dark-75 mt-15"
          style={{ fontSize: "150px",  }}
        >
          404
        </h1>

       

        
        <p className="font-size-h3 font-weight-light  text-dark-75 mt-5">
          {/* OOPS! Something went wrong here */}
          Maybe the URL is not correct or the page is no longer available.
        </p>

        {/* <h2 style={{color:"#369afe"}}>
          Maybe the URL is not correct or the page is no longer available.
        </h2> */}
       
      </div>
    </div>
  );
}
