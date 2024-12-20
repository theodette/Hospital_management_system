import React, { useState } from 'react';
import axios from 'axios';

function SendMessage() {
  const [userMessage, setUserMessage] = useState({
    name: "",
    email: "",
    message: ""
  });

  const { name, email, message } = userMessage;

  const onInputChange = (event) => {
    setUserMessage({ ...userMessage, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:8080/message", userMessage);
    alert("Your message was received.");
  };

  return (
    <section className="w-2/3 mb-20 bg-[#011936FF]">
      <div className="py-4 lg:py-8 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-[#079be9] dark:text-white">
          Contact Us
        </h2>
        <p className="mb-4 lg:mb-8 font-light text-center text-gray-400 dark:text-gray-500 sm:text-xl">
          If you got a question or want to send feedback, let us know.
        </p>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="flex justify-center space-x-4 lg:space-x-8">
            <div>
              <input
                type="text"
                name="email"
                value={email}
                onChange={onInputChange}
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                placeholder="Email/Phone Number"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onInputChange}
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={onInputChange}
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a Message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[#e21584] sm:w-fit hover:bg-[#079be9] focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default SendMessage;
