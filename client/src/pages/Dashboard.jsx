import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardNav from "../components/DashboardNav";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/axiosInstance.js";

const Dashboard = () => {
  const userID = localStorage.getItem("userID");
  const [passwords, setPasswords] = useState([]); //for fetching passwords
  const [accountName, setAccountName] = useState([]);
  const [userName, setUserName] = useState([]);
  const [password, setPassword] = useState([]); //adding new password
  const [url, setUrl] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [passwordToDelete, setPasswordToDelete] = useState(null);
  const [noPasswords, setNoPasswords] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // Initialize with empty string

  // console.log("userID: ", userID);

  const fetchPasswords = async () => {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      alert("Please Authenticate to Access Data.");
      // Redirect to login or show an error
      window.location.href = "/login";
      return null; // Prevent further execution of the component
    }
    try {
      const response = await axiosInstance.get(`/passwords?userID=${userID}`);
      setPasswords(response.data.passwords);
      if (response.data.passwords.length === 0) {
        setNoPasswords(true);
      }
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, [userID]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPasswords = passwords.filter((password) =>
    password.accountName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPassword = async () => {
    //add password req logic here
    try {
      console.log(userID);

      const newPassword = {
        accountName,
        userName,
        password,
        url,
        category,
        userID,
      };
      await axiosInstance.post("/passwords", newPassword);
      setOpenAddModal(false);
      setPassword("");
      setAccountName("");
      setUserName("");
      setUrl("");
      setCategory("");
      setNoPasswords(false); // Reset the noPasswords state when a new password is added
      setPasswords([...passwords, newPassword]); // Add the new password to the passwords state
      // console.log("Password added successfully.");
      toast.success("Password added successfully!"); // Show a success toast notification

      fetchPasswords();
    } catch (error) {
      console.log("Error adding password:", error);
    }
  };

  const handleEdit = async () => {
    //edit req logic here
    console.log("selectedPassword:", selectedPassword);
    console.log("selectedPassword._id:", selectedPassword?._id);

    if (!selectedPassword || !selectedPassword._id) {
      console.error("Selected password or its ID is missing.");
      return;
    }
    try {
      const updatedPassword = {
        accountName,
        userName,
        password,
        url,
        category,
      };
      await axiosInstance.patch(
        `/passwords/${selectedPassword._id}`,
        updatedPassword
      );
      setOpenEditModal(false);
      setPasswords(
        passwords.map((p) =>
          p._id === selectedPassword._id
            ? { ...updatedPassword, _id: selectedPassword._id }
            : p
        )
      );
      toast.success("Password updated successfully!");

      // Reset the form inputs after successful update
      setAccountName("");
      setUserName("");
      setPassword("");
      setUrl("");
      setCategory("");

      fetchPasswords();
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleDelete = async () => {
    //delete req logic here
    if (!passwordToDelete) return; // Guard clause if no ID is set
    try {
      // Make DELETE request to the backend API
      await axiosInstance.delete(`/passwords/${passwordToDelete}`);

      // Update the passwords state by filtering out the deleted password
      setPasswords((prevPasswords) =>
        prevPasswords.filter((password) => password._id !== passwordToDelete)
      );

      // Close the delete confirmation modal
      setOpenDeleteModal(false);
      setPasswordToDelete(null); // Reset the password ID

      toast.success("Password deleted successfully.");

      fetchPasswords();
    } catch (error) {
      console.error("Error deleting password: ", error);
    }
  };

  const openEditPasswordModal = (password) => {
    setSelectedPassword(password);
    setAccountName(password.accountName);
    setUserName(password.userName);
    setPassword(password.password);
    setUrl(password.url);
    setCategory(password.category);
    setOpenEditModal(true);
  };

  return (
    <>
      <DashboardNav searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-5">
          <div className="ml-5 mb-10 md:mb-0 flex-grow text-center md:text-left">
            <h3 className="text-xl sm:text-2xl my-1 mt-5">Welcome to your</h3>
            <h1 className="lg:text-6xl text-4xl sm:text-5xl my-1 font-bold bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide mb-5">
              Dashboard
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Here are the passwords you've saved in your{" "}
              <span className="text-red-500">QuickPass</span> account.
            </p>
          </div>
          <div className="flex justify-center md:justify-end items-center w-full md:w-auto">
            <button
              className="my-5 md:my-0 bg-gradient-to-r from-orange-500 to-orange-800 text-white h-min py-2 px-4 rounded-md"
              title="Add password"
              onClick={() => setOpenAddModal(true)}
            >
              Add Password
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {/* No passwords message */}
          {noPasswords && (
            <div className="flex flex-col items-center justify-center col-span-full py-10">
              <HiOutlineExclamationCircle size={64} className="text-red-500" />
              <h2 className="text-2xl sm:text-3xl font-bold my-5 text-center">
                No saved passwords yet.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center">
                Use the "Add Password" button to create new entries.
              </p>
            </div>
          )}

          {/* Password cards */}
          {filteredPasswords.map((password, index) => (
            <div
              key={password._id || index}
              className="bg-gray-800 border bg-opacity-50 border-slate-950 shadow-lg rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 m-3"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold pb-4 text-center">
                {password.accountName}
              </h2>
              <p className="py-1 text-sm sm:text-base">
                <strong>Username:&nbsp;</strong> {password.userName}
              </p>
              <p className="py-1 text-sm sm:text-base">
                <strong>Password:&nbsp;</strong> {password.password}
              </p>
              <p className="py-1 text-sm sm:text-base">
                <strong>Category: &nbsp;</strong> {password.category}
              </p>
              <div className="py-1 text-sm sm:text-base">
                <a
                  href={password.url}
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {password.url}
                </a>
              </div>
              <div className="flex flex-col sm:flex-row justify-between pt-4 font-semibold">
                <button
                  onClick={() => {
                    setPasswordToDelete(password._id); // Set the ID for deletion
                    setOpenDeleteModal(true); // Open the delete modal
                  }}
                  className="bg-gradient-to-r from-orange-500 to-orange-800 text-white py-2 px-4 rounded-md mb-2 sm:mb-0 sm:mr-2"
                  title="Delete password"
                >
                  Delete
                </button>
                <button
                  onClick={() => openEditPasswordModal(password)}
                  className="bg-gradient-to-r from-orange-500 to-orange-800 text-white py-2 px-4 rounded-md"
                  title="Edit password"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Password modal */}
      <Modal
        show={openAddModal}
        size="md"
        onClose={() => setOpenAddModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add New Password
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="accountName" value="Account Name" />
              </div>
              <TextInput
                id="accountName"
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="userName" value="Username" />
              </div>
              <TextInput
                id="userName"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="url" value="URL" />
              </div>
              <TextInput
                id="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category" value="Category" />
              </div>
              <TextInput
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </div>

            <div className="w-full items-center">
              <Button onClick={() => handleAddPassword()}>Add Password</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit password modal */}
      <Modal
        show={openEditModal}
        size="md"
        onClose={() => {
          setOpenEditModal(false);
          setAccountName("");
          setUserName("");
          setPassword("");
          setUrl("");
          setCategory("");
        }}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit Password
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="editAccountName" value="Account Name" />
              </div>
              <TextInput
                id="editAccountName"
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
                placeholder="Enter account name"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="editUserName" value="Username" />
              </div>
              <TextInput
                id="editUserName"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="editPassword" value="Password" />
              </div>
              <TextInput
                id="editPassword"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="editUrl" value="URL" />
              </div>
              <TextInput
                id="editUrl"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="Enter URL"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="editCategory" value="Category" />
              </div>
              <TextInput
                id="editCategory"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Enter category"
                required
              />
            </div>
            <div className="w-full flex justify-end">
              <Button onClick={handleEdit}>Save</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete password confirmation modal */}
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
              Are you sure you want to delete this password? This action cannot
              be undone.
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

export default Dashboard;
