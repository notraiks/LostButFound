import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import SubHeader from "../components/common/SubHeader";
import SearchAndFilter from "../components/common/SearchAndFilter";
import Pagination from "../components/common/Pagination";
import ClaimerDetails from "../components/common/ClaimerDetails";
import "./Home.css";

function ClaimRequest() {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statuses, setStatuses] = useState(["Pending", "Approved"]); // Default statuses
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClaimer, setSelectedClaimer] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost/LostButFound/php/routes/claimRequest.php", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          console.error("Unexpected data format:", data);
          setRequests([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching claim requests:", error);
      });
  }, []);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = searchQuery
      ? request.item_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${request.user_first_name} ${request.user_last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true;

    const matchesStatus = selectedStatus
      ? request.status.toLowerCase() === selectedStatus.toLowerCase()
      : true;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const currentRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openClaimerDetails = (request) => {
    const claimerDetails = {
      firstName: request.user_first_name,
      lastName: request.user_last_name,
      email: request.user_email,
      phoneNumber: request.user_phone_number,
      yrCourse: request.user_yr_course,
    };
    setSelectedClaimer(claimerDetails);
    setSelectedRequestId(request.request_id);
    setSelectedItemId(request.item_id);
  };

  const closeClaimerDetails = () => {
    setSelectedClaimer(null);
    setSelectedRequestId(null);
    setSelectedItemId(null);
  };

  return (
    <div>
      <Header />
      <SubHeader />
      <div className="main-content">
        <div className="container">
          <div className="content">
            <div className="header-bar">
              <h2>Claim Requests</h2>
              <SearchAndFilter
                onSearch={setSearchQuery}
                onFilter={setSelectedStatus}
                categories={statuses} // Passing statuses as categories for filtering
              />
            </div>
            <div className="card-grid">
              {currentRequests.length > 0 ? (
                currentRequests.map((request, index) => (
                  <div
                    key={`request-${request.request_id || index}`}
                    className="card"
                    onClick={() => openClaimerDetails(request)}
                  >
                    <div className="card-image">
                      <img
                        src={`http://localhost/LostButFound/${request.item_img}`}
                        alt={request.item_title}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{request.item_title}</h3>
                      <p>
                        <strong>Requested By:</strong>{" "}
                        {`${request.user_first_name} ${request.user_last_name}`}
                      </p>
                      <p>
                        <strong>Request Date:</strong> {request.request_date}
                      </p>
                      <p>
                        <strong>Status:</strong> {request.status}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No claim requests found. Try adjusting your search criteria.</p>
              )}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredRequests.length}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
      {selectedClaimer && (
        <ClaimerDetails
          claimer={selectedClaimer}
          requestId={selectedRequestId}
          itemId={selectedItemId}
          onClose={closeClaimerDetails}
        />
      )}
    </div>
  );
}

export default ClaimRequest;
