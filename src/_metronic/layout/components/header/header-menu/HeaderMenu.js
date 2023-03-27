/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";

export function HeaderMenu({ layoutProps }) {
    const location = useLocation();
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/dashboard')}`}>
                <NavLink className="menu-link" to="/dashboard">
                    <span className="menu-text">Dashboard</span>
                    {/* {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)} */}
                </NavLink>
            </li>
            {/*end::1 Level*/}
             {/*Classic submenu*/}
            {/*begin::1 Level*/}
            <li
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/google-material')}`}>
                <NavLink className="menu-link menu-toggle" to="/google-material">
                    <span className="menu-text">Classe Rooms</span>
                    <i className="menu-arrow"></i>
                </NavLink>
                <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                    <ul className="menu-subnav">
                        {/*begin::2 Level*/}
                        <li className={`menu-item ${getMenuItemActive('/classrooms')}`}>
                            <NavLink className="menu-link" to="/classrooms">
                                <span className="menu-text">Classes</span>
                            </NavLink>
                        </li>
                        <li className={`menu-item ${getMenuItemActive('/my-page')}`}>
                            <NavLink className="menu-link" to="/my-page">
                                <span className="menu-text">Students</span>
                            </NavLink>
                        </li>
                        <li className={`menu-item ${getMenuItemActive('/my-page2')}`}>
                            <NavLink className="menu-link" to="/my-page2">
                                <span className="menu-text">Assignments</span>
                            </NavLink>
                        </li>
                        <li className={`menu-item ${getMenuItemActive('/my-page3')}`}>
                            <NavLink className="menu-link" to="/my-page3">
                                <span className="menu-text">Reports</span>
                            </NavLink>
                        </li>
                        {/*end::2 Level*/}
                    </ul>
                </div>
            </li>
            {/*end::1 Level*/}
        </ul>
        {/*end::Header Nav*/}
    </div>;
}
