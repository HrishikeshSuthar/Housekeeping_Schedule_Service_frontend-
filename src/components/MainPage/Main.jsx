import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCol,
  MDBRow,
  MDBContainer,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import moment from "moment/moment";
import axios from "axios";
import Config from "../../config";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  const [basicActive, setBasicActive] = useState("Recurring");
  const [type, setType] = useState("Recurring");
  const [hour, setHour] = useState("");
  const [startDate, setStartDate] = useState("");
  const [day, setDay] = useState([]);
  const [slot, setSlot] = useState("Daily");
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = async () => {
    try {
      console.log(day);
      if (type === "One-Time Schedule") {
        await axios
          .post(Config.BASE_URL + "service/add", {
            ScheduleType: type,
            Date: startDate,
            hour: hour,
            slot: null,
            timeslot: null,
            day: null,
          })
          .then(() => navigate("/show"));
      } else {
        await axios
          .post(Config.BASE_URL + "service/add", {
            ScheduleType: type,
            Date: startDate,
            hour: hour,
            slot: slot || null,
            timeslot: timeSlot || null,
            day: day,
          })
          .then(() => navigate("/show"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setType(value);
    setBasicActive(value);
  };

  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <button
          className="btn btn-primary mt-2 mb-2"
          onClick={() => navigate("/show")}
        >
          Your Booked Schedule
        </button>
      </div>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <MDBTabs pills className="mb-3">
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("Recurring")}
              active={basicActive === "Recurring"}
            >
              Recurring
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("One-Time Schedule")}
              active={basicActive === "One-Time Schedule"}
            >
              One-Time Schedule
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("Flexible Schedule")}
              active={basicActive === "Flexible Schedule"}
            >
              Flexible Schedule
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
      </div>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <MDBTabsContent>
          <MDBTabsPane show={basicActive === "Recurring"}>
            <div>
              <MDBContainer>
                <MDBRow>
                  <MDBCol size="md">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setHour(e.target.value)}
                    >
                      <option value={"0"} selected>
                        Select Hour:-
                      </option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                      <option value="5">Five</option>
                      <option value="6">Six</option>
                    </select>
                  </MDBCol>
                  <MDBCol size="md">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setSlot(e.target.value)}
                    >
                      <option selected value={"Daily"}>
                        Daily
                      </option>
                      <option value={"Weekly"}>Weekly</option>
                    </select>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
            <div style={{ marginTop: "15px" }}>
              <MDBContainer>
                <MDBRow>
                  <label className="form-label">Start Date:-</label>
                  <input
                    className="form-control"
                    type="datetime-local"
                    onChange={(e) =>
                      setStartDate(
                        moment(e.target.value).format("YYYY/MM/DD, h:mm:ss a")
                      )
                    }
                  />
                </MDBRow>
              </MDBContainer>
              <div className="mt-3">
                <form>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Time Slot</th>
                        <th scope="col">
                          <b>Monday</b>
                        </th>
                        <th scope="col">
                          <b>Tuesday</b>
                        </th>
                        <th scope="col">
                          <b>Wednesday</b>
                        </th>
                        <th scope="col">
                          <b>Thursday</b>
                        </th>
                        <th scope="col">
                          <b>Friday</b>
                        </th>
                        <th scope="col">
                          <b>Saturday</b>
                        </th>
                        <th scope="col">
                          <b>Sunday</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Morning</th>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            id="flexCheckDefault"
                            value="option1"
                            checked={selectedOption === "option1"}
                            onChange={handleCheckboxChange}
                            onClick={() => {
                              setDay("Monday");
                              setTimeSlot("Morning");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option2"
                            id="flexCheckDefault"
                            checked={selectedOption === "option2"}
                            onChange={handleCheckboxChange}
                            onClick={() => {
                              setDay("Tuesday");
                              setTimeSlot("Morning");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option3"
                            id="flexCheckDefault"
                            checked={selectedOption === "option3"}
                            onChange={handleCheckboxChange}
                            onClick={() => {
                              setDay("Wednesday");
                              setTimeSlot("Morning");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            id="flexCheckDefault"
                            value="option4"
                            checked={selectedOption === "option4"}
                            onChange={handleCheckboxChange}
                            onClick={() => {
                              setDay("Thursday");
                              setTimeSlot("Morning");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option5"
                            checked={selectedOption === "option5"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Friday");
                              setTimeSlot("Morning");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option6"
                            checked={selectedOption === "option6"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Saturday");
                              setTimeSlot("Morning");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option7"
                            checked={selectedOption === "option7"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Sunday");
                              setTimeSlot("Morning");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">After-noon</th>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option8"
                            checked={selectedOption === "option8"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Monday");
                              setTimeSlot("After-noon");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option9"
                            checked={selectedOption === "option9"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Tuesday");
                              setTimeSlot("After-noon");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option10"
                            checked={selectedOption === "option10"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Wednesday");
                              setTimeSlot("After-noon");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option11"
                            checked={selectedOption === "option11"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Thursday");
                              setTimeSlot("After-noon");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option12"
                            checked={selectedOption === "option12"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Friday");
                              setTimeSlot("After-noon");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option13"
                            checked={selectedOption === "option13"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Saturday");
                              setTimeSlot("After-noon");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option14"
                            checked={selectedOption === "option14"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Sunday");
                              setTimeSlot("After-noon");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Evening</th>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option15"
                            checked={selectedOption === "option15"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Monday");
                              setTimeSlot("Evening");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option16"
                            checked={selectedOption === "option16"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Tuesday");
                              setTimeSlot("Evening");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option17"
                            checked={selectedOption === "option17"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Wednesday");
                              setTimeSlot("Evening");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option18"
                            checked={selectedOption === "option18"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Thursday");
                              setTimeSlot("Evening");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option19"
                            checked={selectedOption === "option19"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Friday");
                              setTimeSlot("Evening");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option20"
                            checked={selectedOption === "option20"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Saturday");
                              setTimeSlot("Evening");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option21"
                            checked={selectedOption === "option21"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Sunday");
                              setTimeSlot("Evening");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Night</th>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option22"
                            checked={selectedOption === "option22"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Monday");
                              setTimeSlot("Night");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option23"
                            checked={selectedOption === "option23"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Tuesday");
                              setTimeSlot("Night");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option24"
                            checked={selectedOption === "option24"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Wednesday");
                              setTimeSlot("Night");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option25"
                            checked={selectedOption === "option25"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Thursday");
                              setTimeSlot("Night");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option26"
                            checked={selectedOption === "option26"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Friday");
                              setTimeSlot("Night");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option27"
                            checked={selectedOption === "option27"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Saturday");
                              setTimeSlot("Night");
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            value="option28"
                            checked={selectedOption === "option28"}
                            onChange={handleCheckboxChange}
                            id="flexCheckDefault"
                            onClick={() => {
                              setDay("Sunday");
                              setTimeSlot("Night");
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
            <div>
              <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Next
              </button>
            </div>
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === "One-Time Schedule"}>
            <div>
              <MDBContainer>
                <MDBRow>
                  <MDBCol size="md">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setHour(e.target.value)}
                    >
                      <option value={"0"} selected>
                        Select Hour:-
                      </option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                      <option value="5">Five</option>
                      <option value="6">Six</option>
                    </select>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
            <div style={{ marginTop: "15px" }}>
              <MDBContainer>
                <MDBRow>
                  <label className="form-label">Start Date:-</label>
                  <input
                    className="form-control"
                    type="datetime-local"
                    onChange={(e) =>
                      setStartDate(
                        moment(e.target.value).format("YYYY/MM/DD, h:mm:ss a")
                      )
                    }
                  />
                </MDBRow>
              </MDBContainer>
            </div>
            <div>
              <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Next
              </button>
            </div>
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === "Flexible Schedule"}>
            <div>
              <MDBContainer>
                <MDBRow>
                  <MDBCol size="md">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setHour(e.target.value)}
                    >
                      <option value={"0"} selected>
                        Select Hour:-
                      </option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                      <option value="5">Five</option>
                      <option value="6">Six</option>
                    </select>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
            <div style={{ marginTop: "15px" }}>
              <MDBContainer>
                <MDBRow>
                  <label className="form-label">Start Date:-</label>
                  <input
                    className="form-control"
                    type="datetime-local"
                    onChange={(e) =>
                      setStartDate(
                        moment(e.target.value).format("YYYY/MM/DD, h:mm:ss a")
                      )
                    }
                  />
                </MDBRow>
              </MDBContainer>
              <div className="mt-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Time Slot</th>
                      <th scope="col">
                        <b>Monday</b>
                      </th>
                      <th scope="col">
                        <b>Tuesday</b>
                      </th>
                      <th scope="col">
                        <b>Wednesday</b>
                      </th>
                      <th scope="col">
                        <b>Thursday</b>
                      </th>
                      <th scope="col">
                        <b>Friday</b>
                      </th>
                      <th scope="col">
                        <b>Saturday</b>
                      </th>
                      <th scope="col">
                        <b>Sunday</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Morning</th>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Morning:Monday"]);
                            // setTimeSlot("Morning");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Morning:Tuesday"]);
                            // setTimeSlot("Morning");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Morning:Wednesday"]);
                            // setTimeSlot("Morning");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Morning:Thursday"]);
                            // setTimeSlot("Morning");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Morning:Friday"]);
                            // setTimeSlot("Morning");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Morning:Saturday"]);
                            // setTimeSlot("Morning");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Morning:Sunday"]);
                            // setTimeSlot("Morning");
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">After-noon</th>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "After-noon:Monday"]);
                            // setTimeSlot("After-noon");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "After-noon:Tuesday"]);
                            // setTimeSlot("After-noon");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "After-noon:Wednesday"]);
                            // setTimeSlot("After-noon");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "After-noon:Thursday"]);
                            // setTimeSlot("After-noon");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "After-noon:Friday"]);
                            // setTimeSlot("After-noon");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "After-noon:Saturday"]);
                            // setTimeSlot("After-noon");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "After-noon:Sunday"]);
                            // setTimeSlot("After-noon");
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Evening</th>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Evening:Monday"]);
                            // setTimeSlot("Evening");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Evening:Tuesday"]);
                            // setTimeSlot("Evening");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Evening:Wednesday"]);
                            // setTimeSlot("Evening");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Evening:Thursday"]);
                            // setTimeSlot("Evening");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Evening:Friday"]);
                            // setTimeSlot("Evening");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Evening:Saturday"]);
                            // setTimeSlot("Evening");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Evening:Sunday"]);
                            // setTimeSlot("Evening");
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Night</th>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Night:Monday"]);
                            // setTimeSlot("Night");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Night:Tuesday"]);
                            // setTimeSlot("Night");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Night:Wednesday"]);
                            // setTimeSlot("Night");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Night:Thursday"]);
                            // setTimeSlot("Night");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Night:Friday"]);
                            // setTimeSlot("Night");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Night:Saturday"]);
                            // setTimeSlot("Night");
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                          id="flexCheckDefault"
                          onClick={() => {
                            setDay([...day, "Night:Sunday"]);
                            // setTimeSlot("Night");
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Next
              </button>
            </div>
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
    </>
  );
}
