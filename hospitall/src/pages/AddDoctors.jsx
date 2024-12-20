import React, { useEffect, useState } from "react";
import Header from "./Header";
import api from "./api"; // Import the custom Axios instance

function AddDoctors() {
  const [doctors, setDoctors] = useState({
    id: "",
    dName: "",
    serviceN: "",
  });

  const { id, dName, serviceN } = doctors;

  const [vdoctor, setVdoctor] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null); // New state for editing doctor

  // Handle input change for adding and editing doctors
  const onInputChange = (e) => {
    setDoctors({ ...doctors, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDoctor) {
        // If editing, update the doctor
        await api.put(`/updateDoctor/${editingDoctor.id}`, doctors); // Send PUT request to update doctor
        alert("Doctor updated successfully!");
      } else {
        // If adding, create a new doctor
        await api.post("/saveDoctor", doctors);
        alert("Doctor added successfully!");
      }
      loadDoctors(); // Reload the doctors list after adding or updating
      setDoctors({ id: "", dName: "", serviceN: "" }); // Clear form after submit
      setEditingDoctor(null); // Reset editing state
    } catch (error) {
      console.error("Error saving doctor:", error);
      alert("Failed to add or update doctor. Please try again.");
    }
  };

  // Fetch all doctors on initial load
  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const result = await api.get("/allDoctors");
      setVdoctor(result.data);
    } catch (error) {
      console.error("Error loading doctors:", error);
      alert("Failed to load doctors.");
    }
  };

  // Delete a doctor
  const deletePost = async (id) => {
    try {
      await api.delete(`/deleteDoctor/${id}`);
      setVdoctor(vdoctor.filter((doctor) => doctor.id !== id));
      alert("Doctor deleted successfully!");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor.");
    }
  };
  

  // Populate form with doctor's data for editing
  const onEdit = (doctor) => {
    setDoctors({
      id: doctor.id,
      dName: doctor.dName,
      serviceN: doctor.serviceN,
    });
    setEditingDoctor(doctor); // Set doctor as currently being edited
  };

  const [searchQuery, setSearchQuery] = useState(""); // State for search query

    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredDoctors = vdoctor.filter((doctor) =>
      doctor.dName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.serviceN.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center py-10">
        <section className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 mb-10">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {editingDoctor ? "Edit Doctor" : "Add Doctors"}
          </h1>
          <form action="Post" onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor's Serial Number
              </label>
              <input
                type="text"
                name="id"
                value={id}
                onChange={onInputChange}
                placeholder="Enter Doctor's serial number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={editingDoctor} // Disable id input when editing
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor's Name
              </label>
              <input
                type="text"
                name="dName"
                value={dName}
                onChange={onInputChange}
                placeholder="Enter Doctor's Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Name
              </label>
              <input
                type="text"
                name="serviceN"
                value={serviceN}
                onChange={onInputChange}
                placeholder="Enter Service Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {editingDoctor ? "Update Doctor" : "Add Doctor"}
            </button>
          </form>
        </section>

        {/* Doctors Table */}
        <section className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Doctors and Service List
          </h2>
          <div>
            {/* Search input */}
            <div className="p-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={onSearchChange}
                    placeholder="Search by doctor name or service"
                    className="border px-4 py-2 rounded-lg w-full"
                />
            </div>

            {/* Table */}
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="border border-gray-200 px-4 py-2 text-left">Serial Number</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Doctor Name</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Service</th>
                        <th className="border border-gray-200 px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDoctors.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center py-4">No doctors found</td>
                        </tr>
                    ) : (
                        filteredDoctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td className="p-4 border-b border-blue-gray-50">{doctor.id}</td>
                                <td className="p-4 border-b border-blue-gray-50">{doctor.dName}</td>
                                <td className="p-4 border-b border-blue-gray-50">{doctor.serviceN}</td>
                                <td className="border border-gray-200 px-4 py-2 text-center">
                                    <button
                                        onClick={() => onEdit(doctor)} // Set the doctor for editing
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deletePost(doctor.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </section>
      </div>
    </div>
  );
}

export default AddDoctors;
