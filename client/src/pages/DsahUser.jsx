import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { PiWarningBold } from "react-icons/pi";
import noData from "../assets/search.jpg"
export default function DsahUser() {
  const [showerror, setShowError] = useState(null);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [deletionId, setDeletionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userId = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/get-user/${userId._id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        setShowError(data.message);
      }
      if (res.ok) {
        setUsers(data.users);

        if (data.totalUser > data.users.length) {
          setShowMore(true);
        }
      }
    })();
  }, []);
  const handleDelete = async () => {
    const res = await fetch(`/api/delete-user/${userId._id}/${deletionId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const updatedUser = users.filter((data) => data._id !== deletionId);
      setUsers(updatedUser);
      setShowModal(false);
    }
  };
  const handleShowMore = async () => {
    const startIndex = users.length;
    const res = await fetch(
      `/api/get-user/${userId._id}/?startIndex=${startIndex}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      setShowError(data.message);
      console.log(showerror);
    }
    if (res.ok) {
      setUsers([...users, ...data.users]);
      if (data.users.length < 9) {
        setShowMore(false);
      }
    }
  };
  console.log("lenght" +users.length);
  return (
    <>
      {users.length > 0 ?(<div className=" overflow-x-scroll scrollbar md:mx-auto my-4">
        <Table hoverable className="">
          <Table.Head>
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>Avatar</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <img className="h-12 w-12 rounded-full bg-gray-500" src={user.avatar} />
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  {user.isAdmin ? (
                    <FaCheck className=" text-green-400" />
                  ) : (
                    <ImCross className=" text-red-600" />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setDeletionId(user._id);
                      setShowModal(true);
                    }}
                    className=" text-red-500 font-semibold cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {showMore && (
          <button
            onClick={handleShowMore}
            className="w-full mx-auto text-teal-400"
          >
            Show More
          </button>
        )}

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size={"md"}
        >
          <Modal.Header />
          <Modal.Body>
            <div>
              <PiWarningBold className=" text-yellow-200 text-5xl w-full self-center" />
              <p className="text-gray-500 text-center py-3">
                You Confirm to Delete this Post
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={handleDelete} color="failure">
                  Delete
                </Button>
                <Button onClick={() => setShowModal(false)}>Cancel</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>):(
    <>
        <div className='text-8xl self-center mx-auto top-0'><img className='object-cover max-h-screen' src={noData} alt="" /></div>
    </>)}
    </>
  );
}
