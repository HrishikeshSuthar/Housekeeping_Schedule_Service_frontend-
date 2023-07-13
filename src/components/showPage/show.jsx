import axios from "axios";
import React, { useEffect, useState } from "react";
import Config from "../../config";
import moment from "moment";

function Show() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(Config.BASE_URL + "service/all");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   const filterResults = () => {
  //     const filtered = data.filter((item) =>
  //       item.ScheduleType.toLowerCase().includes(searchInput.toLowerCase())
  //     );
  //     setData(filtered);
  //   };

  const filterOptions = [
    { label: "Recurring", value: "Recurring" },
    { label: "One-Time Schedule", value: "One-Time Schedule" },
    { label: "Flexible Schedule", value: "Flexible Schedule" },
  ];

  const filterData = () => {
    if (searchInput === "") {
      setData(data); // Replace `allData` with your original data array
    } else {
      const filtered = data.filter((item) => item.ScheduleType === searchInput); // Replace `option` with the property you want to filter
      setData(filtered);
    }
  };

  useEffect(() => {
    filterData();
  }, [searchInput]);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div>Your Schedules</div>
          <div>
            {/* <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={filterResults}>Search</button> */}
            <select
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            >
              <option value="">All</option>
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="card-body">
          <table
            className="table table-striped"
            style={{
              width: "500px",
              height: "500px",
              borderCollapse: "collapse",
            }}
          >
            <thead style={{ textAlign: "center" }}>
              <th>Schedule Type</th>
              <th>Date</th>
              <th>Hour</th>
              <th>Slot</th>
              <th>Shift</th>
              <th>Time</th>
              <th>Day</th>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {data &&
                data.map((dataObj) => {
                  return (
                    <>
                      <tr>
                        <td>{dataObj.ScheduleType}</td>
                        <td>{moment(dataObj.Date).format("YYYY-MM-DD")}</td>
                        <td>{dataObj.hour}</td>
                        <td>{dataObj.slot}</td>
                        <td>{dataObj.timeslot}</td>
                        <td>{moment(dataObj.time).format("HH:ss a")}</td>
                        <td>{dataObj.day}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Show;
