/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
// import { UserRole, GetCurrentUser } from "../../../../../app/Common/Common";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  // let currentUserRole = GetCurrentUser()?.roles[0];
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/* end of dashboard list item  */}
        <li
          className={`menu-item ${getMenuItemActive("/customers", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/customers">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
              />
            </span>
            <span className="menu-text">Customers</span>
          </NavLink>
        </li>
        {/* end of users list item */}
        <li
          className={`menu-item ${getMenuItemActive("/commodities", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/commodities">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")} />
            </span>
            <span className="menu-text">Commodities</span>
          </NavLink>
        </li>
        {/* end of commodities list item */}
        <li
          className={`menu-item ${getMenuItemActive("/sales", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/sales">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Stairs.svg")} />
            </span>
            <span className="menu-text">Sales</span>
          </NavLink>
        </li>


        <li
          className={`menu-item ${getMenuItemActive("/transactions", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/transactions">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Commode1.svg")} />
            </span>
            <span className="menu-text">Transactions</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
}
