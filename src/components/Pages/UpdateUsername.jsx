import React, { useState } from "react";
import { updateUsername } from "../Api/Api"; // Your API call function

const UpdateUsername = () => {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const [successMessage, setSuccessMessage] = useState(""); // State to hold success message

  const handleUpdateUsername = async (e) => {
    e.preventDefault();

    try {
      const response = await updateUsername(newName); // Call the API to update the username
      setSuccessMessage("Username updated successfully!"); // Set success message
      setError(""); // Clear any previous error
    } catch (err) {
      // If error occurs, log it and set error message
      console.error("Error updating username:", err);
      setError(err.response?.data?.errors?.NewName || "Something went wrong!");
      setSuccessMessage(""); // Clear success message if error occurs
    }
  };

  return (
    <div>
      <h1>Update Username</h1>
      <form onSubmit={handleUpdateUsername}>
        <input
          type="text"
          placeholder="New Username"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <button type="submit">Update Username</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default UpdateUsername;
