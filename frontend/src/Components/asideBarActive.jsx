import { MdDashboard } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { BsFilePersonFill } from "react-icons/bs";
import { BsFillCalendarFill } from "react-icons/bs";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdAnalytics } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { IconContext } from "react-icons";

import React, { useState } from "react";

export default function MyAsideBarActive({ act, setAct }) {
  return (
    <aside className={`aside-active ${act ? "active" : ""}`}>
      <ul>
        <li className="list-active">
          <a href="/dashboard">
            <span className="icon-active">
              <MdDashboard />
            </span>
            <span className="title-active">dashboard</span>
          </a>
        </li>
        <li className="list-active">
          <a href="/addpatients">
            <span className="icon-active">
              <HiUserAdd />
            </span>
            <span className="title-active">add patient</span>
          </a>
        </li>
        <li className="list-active">
          <a href="/patients">
            <span className="icon-active">
              <BsFilePersonFill />
            </span>
            <span className="title-active">Tickets Ouverts</span>
          </a>
        </li>
        <li className="list-active">
          <a href="#">
            <span className="icon-active">
              <IoIosSettings />
            </span>
            <span className="title-active">settings</span>
          </a>
        </li>
        <li className="list-active">
          <a href="#">
            <span className="icon-active">
              <FiLogOut />
            </span>
            <span className="title-active">log out</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
