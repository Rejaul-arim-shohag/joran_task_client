import React, { Fragment, useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineEdit, AiOutlineLogout, AiOutlineMenuUnfold, AiOutlineUser } from "react-icons/ai";
import { BsHourglass, BsListNested } from "react-icons/bs";
import logo from "../../Assets/images/logo.svg";
import profileImg from "../../Assets/images/user.avif";

import { MdOutlineCancelPresentation } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { getUserDetails, removeSession } from "../../Helper/SessionHelper";
import { LogoutRequest } from "../../ApiRequest/APIRequest";

const MasterLayout = (props) => {

    let contentRef, sideNavRef = useRef();

    const onLogout = () => {
        removeSession()
        LogoutRequest()
    }

    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    };

    return (
        <Fragment>
            <Navbar className="fixed-top px-0 shadow-sm ">
                <Container fluid={true}>
                    <Navbar.Brand >
                        <a className="icon-nav m-0 h5" onClick={MenuBarClickHandler}>
                            <AiOutlineMenuUnfold />
                        </a>
                        <img className="nav-logo mx-2" src={logo} alt="logo" />
                    </Navbar.Brand>

                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav" src={profileImg} alt="" />
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                    <img className="icon-nav-img" src={profileImg} alt="" />
                                    <h6>{getUserDetails()["firstName"]}</h6>
                                    <hr className="user-dropdown-divider  p-0" />
                                </div>
                               
                                <a onClick={onLogout} className="side-bar-item">
                                    <AiOutlineLogout className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <div ref={(div) => { sideNavRef = div }} className="side-nav-open">

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} to="/All" >
                    <BsListNested className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Products</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"} to="/Create" >
                    <AiOutlineEdit className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Create New</span>
                </NavLink>
            </div>

            <div ref={(div) => contentRef = div} className="content">
                {props.children}
            </div>

        </Fragment>
    );
};

export default MasterLayout;