import React, {useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faCalendarDays, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import logo from "./static/img.png"

const header = (props) =>
{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <a className="navbar-brand" href="#"> <img
                src={logo}
                alt="Logo"
                style={{ maxHeight: '45px' }}
            /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/calls"> <FontAwesomeIcon icon={faCalendarDays} /> Повици</a>
                    </li>

                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen}
                            onClick={handleDropdownToggle}
                        >
                            <FontAwesomeIcon icon={faCalendarDays} /> Проекти
                        </a>
                        <div
                            className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`}
                            aria-labelledby="navbarDropdown"
                        >
                            <a className="dropdown-item" href="/">
                                Национални проекти
                            </a>
                            <a className="dropdown-item" href="/internationalprojects">
                               Интернационални проекти
                            </a>

                        </div>
                    </li>

                </ul>



                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#"> <FontAwesomeIcon icon={faRightToBracket} style={{color: "#ffffff",}} /> login</a>
                    </li>



                </ul>


                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>

    );
}

export  default header;