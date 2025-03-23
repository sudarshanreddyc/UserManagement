import { useEffect, useState } from "react";
import { fetchUsers, searchUsers, sortUsers } from "./User_BusinessLogic";

const User = () => {
  const [users, setUsers] = useState([]); // State to store the Users fetched from API

  const [isDataLoaded, setDataLoaded] = useState(false); // State to decide if loader should be shown or not.

  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user to open the start

  const [searchQuery, setSearchQuery] = useState(""); //State to store the text entered by the user for searching

  const [sortKey, setSortKey] = useState(null); // State to store the sorting key either name or email

  const [sortOrder, setSortOrder] = useState("asc"); //State for sorting asc or desc

  // State to store any error message if the data fetch fails
  const [fetchError, setFetchError] = useState(null); //State to

  // Fetch user data from the API
  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data); // Set the fetched users in the state
        setDataLoaded(true); // Stop displaying the loading message
      })
      .catch(() => {
        setFetchError(
          "There is an error fetching the data. Please try again later."
        );
        setDataLoaded(true); // Stop displaying the loading message
      });
  }, []);

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle sorting
  const handleSort = (key) => {
    setSortKey(key); // Set the sorting key (name or email)
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc")); // Toggle sorting order
  };

  // Filter the users based on the search query and then sort the results
  const filteredUsers = searchUsers(users, searchQuery);
  const sortedUsers = sortUsers(filteredUsers, sortKey, sortOrder);

  return (
    <div className="font-sans p-6">
      {/* Show a loading message while data is being fetched */}
      {!isDataLoaded ? (
        <div className="text-center mt-12 text-gray-600">
          Data is loading. Please wait a moment...
        </div>
      ) : fetchError ? (
        // Show an error message if there is any error
        <div className="text-center mt-12 text-red-600">{fetchError}</div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Users
          </h1>

          {/* Search bar to filter users by name or email */}
          <div className="mb-6 text-center">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 w-full md:w-2/3 border border-gray-300 rounded"
            />
          </div>

          {/* Table to display the list of users */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name{" "}
                    <span className="text-sm font-normal text-gray-500">
                      {sortKey === "name"
                        ? sortOrder === "asc"
                          ? "↓"
                          : "↑"
                        : "⇅"}
                    </span>
                  </th>

                  <th
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort("email")}
                  >
                    Email{" "}
                    <span className="text-sm font-normal text-gray-500">
                      {sortKey === "email"
                        ? sortOrder === "asc"
                          ? "↓"
                          : "↑"
                        : "⇅"}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Display the sorted and filtered list of users */}
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    {/* Name column is clickable to show the popup */}
                    <td
                      className="px-4 py-2 text-left text-blue-600 cursor-pointer underline"
                      onClick={() => setSelectedUser(user)}
                    >
                      {user.name}
                    </td>

                    <td className="px-4 py-2 text-left">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Popup to display selected user details */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">{selectedUser.name}</h2>
            <p className="mb-2">
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {selectedUser.address.street},{" "}
              {selectedUser.address.suite}, {selectedUser.address.city},{" "}
              {selectedUser.address.zipcode}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p className="mb-2">
              <strong>Website:</strong>{" "}
              <a
                href={`http://${selectedUser.website}`}
                className="text-blue-500 underline"
              >
                {selectedUser.website}
              </a>
            </p>
            <p className="mb-2">
              <strong>Company:</strong> {selectedUser.company.name}
            </p>

            {/* Button to close the popup */}
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
