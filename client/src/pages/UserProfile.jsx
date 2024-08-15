import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/axiosInstance.js";

const UserProfile = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const userID = localStorage.getItem("userID");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    // Add other fields as needed
  });

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (!storedUserID) {
      alert("Please Authenticate First.");
      // Redirect to login or show an error
      window.location.href = "/login";
      return null; // Prevent further execution of the component
    }

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/user/${userID}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`/updateuser/${userID}`, userData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handleChangeMasterPassword = async (e) => {};

  const handleDelete = async () => {
    const userID = localStorage.getItem("userID");
    try {
      const response = await axiosInstance.delete(`/deleteuser/${userID}`);
      if (response.data.success) {
        toast.success("Account deleted successfully!");
        setOpenDeleteModal(false);
      }

      // Clear user data from local storage and redirect to login page
      localStorage.removeItem("userID");
      localStorage.removeItem("email");

      alert(
        "Your account has been  deleted successfully & you will be redirected to the homepage."
      );
      window.location.href = "/"; // Redirect to home page
    } catch (error) {
      console.log("Error deleting user", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 sm:p-6 md:p-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl my-1">Your</h3>
            <h1 className="text-4xl my-1 font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
              Profile
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 my-3">
            <div>
              <h3 className="py-2 text-xl text-orange-500">
                User Profile Details :
              </h3>
              <label className="block mb-2 text-sm font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Add other input fields as needed */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-orange-800 text-white my-4 py-2 px-4 rounded-md w-full md:w-auto"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* Changing the Master Password */}
          <form
            onSubmit={handleChangeMasterPassword}
            className="space-y-4 border-t border-spacing-4 border-gray-500 my-3"
          >
            <div>
              <h3 className="py-2 text-xl text-orange-500">
                Change Master Password :
              </h3>
            </div>
            <div></div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Old Password:
              </label>
              <input
                type="password"
                name="password"
                // onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                New Password:
              </label>
              <input
                type="password"
                name="password"
                // onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Add other input fields as needed */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-orange-800 text-white my-4 py-2 px-4 rounded-md w-full md:w-auto"
              >
                Change Password
              </button>
            </div>
          </form>

          <div className="flex flex-col border-t border-spacing-4 border-gray-500 items-center justify-center py-2">
            <h2 className="text-xl py-3 sm:text-2xl  text-red-800 font-semibold mb-4 text-center">
              Danger Zone
            </h2>
            <button
              type=""
              className="bg-[#9b1c1c] text-white py-2 px-4 rounded-md  md:w-auto"
              onClick={() => setOpenDeleteModal(true)}
            >
              Delete my account
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={openDeleteModal}
        size="md"
        onClose={() => setOpenDeleteModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center ">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your QuickPass account This action
              will delete all the data & it cannot be undone.
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete()}>
                {"Yes, Delete"}
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserProfile;
