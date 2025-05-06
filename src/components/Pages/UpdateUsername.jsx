import React, { useState } from "react";
import { updateUsername } from "../Api/Api"; 

const UpdateUsername = () => {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleUpdateUsername = async (e) => {
    e.preventDefault();

    try {
      const response = await updateUsername(newName); 
      setSuccessMessage("Username updated successfully!"); 
      setError(""); 
    } catch (err) {
     
      console.error("Error updating username:", err);
      setError(err.response?.data?.errors?.NewName || "Something went wrong!");
      setSuccessMessage(""); 
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
