import { Alert, Button, Modal, Spinner, TextInput } from "flowbite-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccessfully,
  signOutFailure
} from "../redux/user/userSlice.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const user = useSelector((state) => state.user.currentUser);
  const { error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setimageFileUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [updateSuccessfully, setupdateSuccessfully] = useState(null);
  const [imageUloading, setimageUloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePikerRef = useRef();
  const dispatch = useDispatch();
  const handleSignOut = useUserSignOut()
  const inputFileChange = (e) => {
    const image = e.target.files[0];
    if (image.type.startsWith("image/")) {
      setImageFile(image);
      setImageFileUrl(URL.createObjectURL(image));
    } else setUploadError("Allow only image file Less then 2MB");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    if (imageFile) {
      uploadingImage();
    }
    dispatch(updateStart());
  }, [imageFile]);

  const handleSubmit = async (e) => {
    setupdateSuccessfully(false);
    e.preventDefault();

    if (Object.keys(formData) == 0) {
      return;
    }
    dispatch(updateStart());
    try {
      dispatch(updateStart());
      if (imageUloading) {
        return;
      }
      const res = await fetch(`/api/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setFormData({});
        setupdateSuccessfully("Updated Successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const uploadingImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageFileUploadProgress(progress.toFixed(0));
        setimageUloading("wait Image is Uploading....");
      },
      (error) => {
        setUploadError("Failed to Upload Image Must be less than 2MB" + error);
        setImageFile(null);
        setimageFileUploadProgress(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setFormData({ ...formData, avatar: downloadUrl });
          setimageUloading(false);
        });
      }
    );
  };

  const handleDelete = async () => {
    dispatch(deleteUserStart());
    setShowModal(false);
    try {
      const res = await fetch(`api/delete/${user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
  return (
    <div className="mx-w-lg mx-auto p-3 w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:w-96 mx-auto gap-3"
      >
        <input
          type="file"
          accept="image/*"
          name=""
          id=""
          onChange={inputFileChange}
          ref={filePikerRef}
          hidden
        />

        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePikerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || user.avatar}
            alt="user"
            className={`rounded-full h-full w-full object-cover  border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            } `}
          />
        </div>
        {uploadError && <Alert color={"failure"}>{uploadError}</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={user?.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={user?.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button
          type="Submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={imageUloading}
        >
          {imageUloading ? (
            <>
              <Spinner size={"md"} className=" mr-2" />
              <span>Uloading Image...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
      <div className="flex justify-evenly md:w-96 mx-auto">
        <span
          onClick={() => setShowModal(true)}
          className="text-red-500 cursor-pointer mt-4"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-500 cursor-pointer mt-4">Sign Out</span>{" "}
        <br />
      </div>
      <div className="md:w-96 mx-auto">
        {error && <Alert color={"failure"}>{error}</Alert>}
        {updateSuccessfully && (
          <Alert color={"success"}>{updateSuccessfully}</Alert>
        )}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size={"md"}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <AiOutlineExclamationCircle className=" h-14 w-14 text-gray-400 dark:text-gray-200 mx-auto mb-4 " />
            <h3 className="mb-5 text-lg text-gray-400 dark:text-gray-200">
              Are you Sure to Delete your Account ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes I'm sure!
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}


export const useUserSignOut = ()=>{
  const dispatch = useDispatch();
  const handleSignOut = async ()=>{

    dispatch(deleteUserStart())
    const  res = await fetch("/api/signout",{
      method:"POST"
    });
    const data = await res.json();
    if (!res.ok) {
      dispatch(signOutFailure(data.message))
      
    }
    else{
      dispatch(signOutSuccessfully())
    }
    
  }
  return handleSignOut;
}
  
