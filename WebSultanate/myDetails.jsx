import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpService from "../services/httpService.js";
function MyDetails(props) {
  let { username, bio, location, occupation } = props.person;
  console.log(username);

  return (
    <div className="container">
      UserName:{username}
      <br />
      Bio:{bio}
      <br />
      Location:{location}
      <br />
      Occupation:{occupation}
      <br />
      <Link to={"/registration/Edit"}>
        <button className="btn btn-success ">Edit</button>
      </Link>
    </div>
  );
}
export default MyDetails;
