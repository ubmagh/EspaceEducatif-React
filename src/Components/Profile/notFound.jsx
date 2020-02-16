import React from "react";
import pic from "./notFound.png";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-100 col-12 mb-5 mt-n3">
      <img
        src={pic}
        alt={"Not Found"}
        className="float-none col-10 d-block mx-auto"
      />
      <div className="d-block w-100 mt-n5 mb-3">
        <div className="col-5 mx-auto">
          <Link to="/">
            {" "}
            <button
              type="button"
              name=""
              id=""
              className="btn btn-dark btn-lg btn-block"
            >
              {" "}
              <i className="fa fa-arrow-circle-left" aria-hidden="true">
                {" "}
              </i>{" "}
              Aller à l'acceuil{" "}
            </button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
