import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export default function DashProfile() {

  const user = useSelector((state) => state.user.currentUser);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setimageFileUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const filePikerRef = useRef();
  console.log(imageFileUrl, imageFileUploadProgress);
  console.log(uploadError);

  const inputFileChange = (e) => {
    const image = e.target.files[0];
    if (image.type.startsWith("image/")) {
      setImageFile(image);
      setImageFileUrl(URL.createObjectURL(image));
    } else setUploadError("Allow only image file Less then 2MB");
  };


  useEffect(() => {
    if (imageFile) {
      uploadingImage();
      console.log(imageFileUrl);
    }
  }, [imageFile]);


  const uploadingImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage,  fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setUploadError("Failed to Upload Image Must be less than 2MB"+error);
        setImageFile(null);
        setimageFileUploadProgress(null)
        setImageFileUrl(null)

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
        });
      }
    );
  };

  return (
    <div className="mx-w-lg mx-auto p-3 w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col md:w-96 mx-auto gap-3">
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
           {imageFileUploadProgress && <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5} styles={{root:{
            width:"100%",
            height:"100%",
            position:"absolute",
            top:0,
            left:0
           },
           path:{
            stroke:`rgba(62,152,199,${imageFileUploadProgress/100})`
           }
           }} />}
          <img
            src={imageFileUrl || user.avatar}
            alt="user"
            className= {`rounded-full h-full w-full object-cover  border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress <100 && "opacity-60"} `}
          />
        </div>
        {
            uploadError && <Alert color={"failure"} >{uploadError}</Alert>
        }
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={user?.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={user?.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between md:w-96 mx-auto">
        <span className="text-red-500 cursor-pointer mt-4">Delete Account</span>
        <span className="text-red-500 cursor-pointer mt-4">Sign Out</span>
      </div>
    </div>
  );
}
