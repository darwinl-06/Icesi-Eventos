import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaCalendarAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";


import { AiFillBulb, AiFillFire  } from "react-icons/ai";

const Sidebar = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  return (
      <div className="w-72 bg-blue-900 w-screen h-20 flex flex-row fixed left-0 shadow-lg px-10 items-center z-10">
        <h2 className="text-white font-semibold flex items-center justify-center text-2xl ">
        <FaCalendarCheck className="mr-3" />
        Icesi Eventos
        </h2>
        <div className="flex-grow flex flex-row ml-32 justify-center">
          <ul className="flex flex-row items-center">
              <li>
                  <Link to="/Events" className="flex items-center text-white font-semibold px-5 py-4 text-lg hover:bg-blue-800 transition duration-200 rounded-lg">
                      <AiFillBulb className="mr-3" />
                      Eventos
                  </Link>
              </li>
              <li>
                  <Link to="/MyEvents" className="flex items-center text-white font-semibold px-5 py-4 text-lg hover:bg-blue-800 transition duration-200 rounded-lg">
                    <FaRegStar className="mr-3" />
                    Mis Eventos
                  </Link>
              </li>
          </ul>
        </div>
        <ul className="flex flex-row items-center">

          {user && (
              <li className="relative">
                <div className="flex items-center text-white font-semibold px-5 py-4 text-lg transition duration-200 rounded-lg">
                  <FaUserCircle className="mr-3" />
                  {user.nombre}
                </div>
              </li>
          )}
          <li>
            <div className="mr-4 rounded-lg">
              <Link to="/" className="flex items-center text-white px-5 py-4 hover:bg-blue-700 transition duration-200 text-lg font-semibold rounded-lg">
                <FaSignOutAlt className="mr-2" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
  );
};

export default Sidebar;
