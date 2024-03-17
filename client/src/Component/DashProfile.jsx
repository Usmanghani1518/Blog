import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { updateStart,updateFailure,updateSuccess } from "../redux/user/userSlice.js";
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
  const {error} = useSelector((state)=>state.user)
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setimageFileUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [updateSuccessfully,setupdateSuccessfully] = useState(null)
  const [imageUloading, setimageUloading] = useState(false);

  const[formData,setFormData] = useState({})
  const filePikerRef = useRef();
  const dispatch = useDispatch();
  const inputFileChange = (e) => {
    const image = e.target.files[0];
    if (image.type.startsWith("image/")) {
      setImageFile(image);
      setImageFileUrl(URL.createObjectURL(image));
    } else setUploadError("Allow only image file Less then 2MB");
  };
    const handleChange= (e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
    }
  useEffect(() => {
    if (imageFile) {
      uploadingImage();
    }
    dispatch(updateStart())
  }, [imageFile]);

  const handleSubmit = async(e)=>{
    setupdateSuccessfully(false)
    e.preventDefault()
    
    if (Object.keys(formData) === 0) {
      return
    }
    dispatch(updateStart())
    try {
      dispatch(updateStart());
      if (imageUloading) {
        return
      }
      const res = await fetch(`/api/update/${user._id}`,{
        method:"PUT",
       headers:{
        "Content-Type":"application/json"
       },
       body:JSON.stringify(formData)
      })
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message))
      }else{
      dispatch(updateSuccess(data))
      setFormData({})
      setupdateSuccessfully("Updated Successfully")
      set
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
    }
  }

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
        setimageUloading("wait Image is Uploading....")
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
          setFormData({...formData,avatar: downloadUrl});
          setimageUloading(false)
        });
      }
    );
  };

  return (
    <div className="mx-w-lg mx-auto p-3 w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:w-96 mx-auto gap-3">
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
           onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={user?.email} onChange={handleChange}
        />
        <TextInput type="password" id="password" placeholder="password"  onChange={handleChange}/>
        <Button type="Submit" gradientDuoTone="purpleToBlue" outline disabled={imageUloading}>
          {
            imageUloading?(<><Spinner size={"md"} className=" mr-2"/><span>Uloading Image...</span></>):"Update"
          }
          
        </Button>
      </form>
      <div className="flex justify-between md:w-96 mx-auto">
        <span className="text-red-500 cursor-pointer mt-4">Delete Account</span>
        <span className="text-red-500 cursor-pointer mt-4">Sign Out</span> <br/>
      </div>
      <div className="md:w-96 mx-auto">

      {error && <Alert color={"failure"}>{error}</Alert>}
      {updateSuccessfully && <Alert color={"success"}>{updateSuccessfully}</Alert>}
</div>
      

    </div>
  );
}
