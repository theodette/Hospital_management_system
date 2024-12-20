import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Header from './Header';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminHomepage() {
  const [userAppointment, setUserAppointment] = useState([]);
  const [statusList, setStatusList] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [serviceCounts, setServiceCounts] = useState({});

  useEffect(() => {
    loadAppointment();
  }, []);

  const chartData = {
    labels: Object.keys(serviceCounts),
    datasets: [
      {
        label: 'Number of Appointments',
        data: Object.values(serviceCounts),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Appointments by Service',
      },
    },
  };

  const loadAppointment = async () => {
    try {
      const result = await axios.get('http://localhost:8080/listAppointment');
      setUserAppointment(result.data);

      // Count appointments by service
      const counts = result.data.reduce((acc, appointment) => {
        acc[appointment.service] = (acc[appointment.service] || 0) + 1;
        return acc;
      }, {});
      setServiceCounts(counts);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleClick = (id) => {
    setStatusList((prevStatusList) => ({
      ...prevStatusList,
      [id]: 'Replied',
    }));
  };

  const filteredAppointments = userAppointment.filter((appointment) =>
    appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAppointments.length / pageSize);

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-14 justify-center">
      <Header />

      {/* Summary Section */}
      <div className="w-screen flex">
        <div className="w-1/4 h-56 flex text-3xl flex-col justify-center p-10 bg-gray-300">
          <h1>Total Appointments</h1>
          <h1 className="font-bold">{userAppointment.length}</h1>
        </div>
        <div className="w-1/4 h-56 flex text-3xl flex-col justify-center bg-gray-400">
          <h1 className="text-center">Average Patients/Day</h1>
          <h1 className="font-bold text-center">42</h1>
        </div>
        <div className="w-1/4 h-56 flex text-3xl flex-col justify-center p-10 bg-gray-300">
          <h1>Average Income</h1>
          <h1 className="font-bold text-center">2k-USD</h1>
        </div>
        <div className="w-1/4 h-56 flex text-3xl flex-col justify-center p-10 bg-gray-400">
          <h1 className="text-center">Inquiries</h1>
          <h1 className="text-center font-bold text-white">182</h1>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="p-4">
        <h2 className="text-2xl font-bold">Appointments by Service</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <h1 className="text-[#011936FF] p-5 text-center font-extrabold text-4xl">View appointment queries</h1>

      {/* Search Input */}
      <div className="p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, doctor or service"
          className="border px-4 py-2 rounded-lg w-full"
        />
      </div>

      <div className="relative justify-center m-20 flex flex-col text-gray-200 bg-[#011936FF] shadow-md bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Number</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Name</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Insurance</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Doctor</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Service</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Date</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Time</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Status</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedAppointments.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">No appointments found</td>
              </tr>
            ) : (
              paginatedAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{appointment.id}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{appointment.name}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{appointment.insurance}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{appointment.doctor}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{appointment.service}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{appointment.date}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{appointment.time}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{appointment.status}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      onClick={() => handleClick(appointment.id)}
                      className="px-4 py-2 text-white bg-blue-500 rounded"
                    >
                      {statusList[appointment.id] || "Not Replied"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center py-4">
        <div>
          <select onChange={handlePageSizeChange} value={pageSize} className="border px-4 py-2 rounded-lg">
            {[6, 10, 15].map((size) => (
              <option key={size} value={size}>{size} items per page</option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminHomepage;
