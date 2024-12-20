import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import Thanky from './Thanky';
import SendMessage from './SendMessage';

function AddAppointment() {
    const [userAppointment, setUserAppointment] = useState({
        name: "",
        insurance: "",
        doctor: "",
        service: "",
        date: "",
        time: ""
    });

    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [filteredDoctors, setFilteredDoctors] = useState([]); // State for filtered doctors
    const navigate = useNavigate();

    const { name, insurance, doctor, service, date, time } = userAppointment;

    const doctorRefs = useRef({}); // To keep track of each doctor's ref

    const onInputChange = (e) => {
        setUserAppointment({ ...userAppointment, [e.target.name]: e.target.value });
    };

    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterDoctors = (query) => {
        if (!query) return doctors; // If there's no search query, show all doctors
        return doctors.filter(doctor =>
            doctor.dName.toLowerCase().includes(query.toLowerCase()) ||
            doctor.serviceN.toLowerCase().includes(query.toLowerCase())
        );
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!name || !insurance || !doctor || !service || !date || !time) {
            alert("All fields must be filled out.");
            return;
        }

        const formattedTime = time.includes(":") ? `${time}:00` : time;

        const appointmentData = { ...userAppointment, time: formattedTime };

        try {
            console.log("Submitting appointment data:", appointmentData);
            await api.post("/saveAppointment", appointmentData);
            alert("Your appointment has been booked.");
            navigate("/thanky");
        } catch (error) {
            console.error("Error saving appointment:", error.response?.data || error.message);
            alert("Failed to book the appointment.");
        }
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get("/allDoctors");
                setDoctors(response.data);
                setFilteredDoctors(response.data); // Set the initial filtered doctors
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        // Filter doctors whenever search query changes
        setFilteredDoctors(filterDoctors(searchQuery));

        // Scroll to the first matching doctor if there's any search result
        if (searchQuery && filteredDoctors.length > 0) {
            const firstDoctor = doctorRefs.current[filteredDoctors[0].id];
            if (firstDoctor) {
                // Scroll to the doctor without hiding other content
                firstDoctor.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [searchQuery, doctors]);

    return (
        <div className="grid w-screen items-center justify-center">
            <nav className='bg-[#030A47] flex justify-between'>
                <h1 className='text-white p-8 pl-24 font-bold text-lg'>Home</h1>
                <input
                    type="text"
                    placeholder='Search doctors and services'
                    className='rounded-lg mr-24 mt-8 h-7 w-96'
                    value={searchQuery}
                    onChange={onSearchChange} // Handle search input change
                />
            </nav>

            <div className='w-screen h-1/2 flex flex-col justify-center'>
                <h1 className='text-center p-20 font-extrabold text-[#030A47] text-5xl'>Welcome to Bingbang Hospital</h1>
                <p className='text-center'>Your life matters, if you don't feel well, reach out to us. We give you exclusive care and bring your life back to normal.</p>
            </div>

            <div className=''>
                <h1 className='text-2xl text-center text-[#030A47] pt-20  font-bold'>Doctors</h1>
                <div className='flex justify-evenly w-screen space-x-14 p-14'>
                    {filteredDoctors.map((doctor) => (
                        <div 
                            className='border w-2/5 h-auto shadow-black rounded-3xl' 
                            key={doctor.id} 
                            ref={(el) => doctorRefs.current[doctor.id] = el} // Add ref to each doctor element
                        >
                            <img className='w-96 h-96' src="./12 (2).jpeg" alt="" />
                            <h1 className='font-bold text-[#030A47] text-4xl text-center uppercase'>{doctor.dName}</h1>
                            <p className='text-center p-5 font-light text-lg'>{doctor.serviceN} doctor at Bingbang Hospital</p>
                        </div>
                    ))}
                </div>

                <div className='p-10'>
                    <h1 className='text-2xl text-center text-[#030A47] p-20 font-bold'>Service Provided</h1>
                    <div className='flex space-x-10 justify-center'>
                        <div className='w-1/2 flex justify-end'>
                            <img className='w-full h-96' src="./dd.jpeg" alt="" />
                        </div>
                        <div className='w-1/2'>
                            {filteredDoctors.map((doctor) => (
                                <ol className='border w-2/5 h-auto shadow-black rounded-3xl' key={doctor.id}>
                                    <li className='font-bold text-[#030A47] text-4xl text-center uppercase'>{doctor.serviceN}</li>
                                </ol>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-20 bg-[#030A47] grid justify-self-center'>
                <h1 className='text-3xl text-center font-bold text-white'>Book an Appointment</h1>
                <form className='p-10 grid grid-cols-2 space-x-5 space-y-5' onSubmit={onSubmit}>
                    <input
                        className='h-8 w-auto rounded-xl'
                        name='name'
                        value={name}
                        onChange={onInputChange}
                        type="text"
                        placeholder='Name'
                    />
                    <input
                        className='h-8 w-auto rounded-xl'
                        name='insurance'
                        value={insurance}
                        onChange={onInputChange}
                        type="text"
                        placeholder='Insurance Type'
                    />
                    <select
                        className='h-8 w-auto rounded-xl'
                        name="doctor"
                        value={doctor}
                        onChange={onInputChange}
                    >
                        <option value="">Select a Doctor</option>
                        {filteredDoctors.map((doc) => (
                            <option key={doc.id} value={doc.dName}>{doc.dName}</option>
                        ))}
                    </select>

                    <select
                        className='h-8 w-auto rounded-xl'
                        name="service"
                        value={service}
                        onChange={onInputChange}
                    >
                        <option value="">Select a Service</option>
                        {filteredDoctors.map((doc) => (
                            <option key={`${doc.id}-service`} value={doc.serviceN}>{doc.serviceN}</option>
                        ))}
                    </select>

                    <input
                        className='h-8 w-auto rounded-xl'
                        name='date'
                        type="date"
                        value={date}
                        onChange={onInputChange}
                    />
                    <input
                        className='h-8 w-auto rounded-xl'
                        type="time"
                        name='time'
                        value={time}
                        onChange={onInputChange}
                    />
                    <button
                        type="submit"
                        className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[#e21584] sm:w-fit hover:bg-[#079be9] focus:ring-4 focus:outline-none focus:ring-primary-300"
                    >
                        Submit Appointment
                    </button>
                </form>
            </div>

            <div className='flex justify-center p-20'>
            <SendMessage />
            </div>
        </div>
    );
}

export default AddAppointment;
