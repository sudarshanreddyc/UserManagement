// Fetch user data from the API
export const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
  //to check if error message is displayed properly or not
  //throw new Error("Error in fetching user details. Please try again later");
};

// Function to search users by name or email
export const searchUsers = (users, searchQuery) => {
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

// Function to sort users by a specific key ('name' or 'email')
export const sortUsers = (users, sortKey, sortOrder) => {
  if (!sortKey) return users; // No sorting if no key is provided
  return [...users].sort((a, b) => {
    const aValue = a[sortKey].toLowerCase();
    const bValue = b[sortKey].toLowerCase();
    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
};

// Toggle sorting order
export const toggleSortOrder = (currentOrder) => {
  return currentOrder === "asc" ? "desc" : "asc";
};
