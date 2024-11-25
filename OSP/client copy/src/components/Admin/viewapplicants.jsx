import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./viewapplicants.css";

const ViewApplicants = () => {
  const { id } = useParams(); // Get scholarship ID from URL
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/scholarship/${id}/applicants` ,  { headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userInfo.token}`,
          }}
        );

        const data = await response.json();
        setApplicants(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [id]);

  const handleViewDetails = (applicantId) => {
    navigate(`/applicant-details/${applicantId}/${id}`);
  };

  return (
    <div className="applicant-list">
      <h1>List of Applicants</h1>
      <table className="applicant-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Applied Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant, index) => (
            <tr key={applicant.id}>
              <td>{index + 1}</td>
              <td>{applicant.id}</td>
              <td>{applicant.student_name}</td>
              <td>{new Date(applicant.applied_date).toLocaleDateString()}</td>
              <td>{new Date(applicant.end_date).toLocaleDateString()}</td>
              <td>
                <div className="status-container">
                  <span
                    className={`status ${
                      applicant.status === "Accepted"
                        ? "status-accepted"
                        : applicant.status === "Rejected"
                        ? "status-rejected"
                        : applicant.status === "In Review"
                        ? "status-in-review"
                        : ""
                    }`}
                  >
                    {applicant.status}
                  </span>
                </div>
              </td>
              <td>
                <button
                  onClick={() => handleViewDetails(applicant.id)}
                  className="view-details-button"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewApplicants;
