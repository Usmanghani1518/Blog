import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import {useSelector} from "react-redux"
export default function update() {
  const [image, setImage] = useState(null);
  const [loadingImage, setloadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [errorImage, setErrorImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [errorUpdate, seterrorUpdate] = useState(null);
  const navigate = useNavigate();
  const {postId} = useParams()
  const user = useSelector((state)=>state.user.currentUser);

  useEffect(() => {
    const fetchpost = async () => {
      const res = await fetch(`/api/post/getpost/${user}?postId=${postId}`);
      const data = await res.json();
      if (!res.ok) {
        seterrorUpdate(data.message)
      }
      if (res.ok) {
        setFormData(data.post[0]);
      }
    };
    fetchpost();
  }, [postId]);
  
  const uploadImage = async () => {
    if (!image) {
      setErrorImage("There is no image to upload kindly select it First ");
      return;
    }
    setloadingImage(true);
    setErrorImage(false);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress.toFixed(2));
      },
      (error) => {
        console.log("There is an error in uploading image ");
        setErrorImage("There is an error  in uploading the Image");
        setloadingImage(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          setFormData({ ...formData, postImg: url });
          setloadingImage(false);
          setErrorImage(false);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      seterrorUpdate(null);
      const res = await fetch(`/api/post/update-post/${user._id}/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        seterrorUpdate(data.message);
        return;
      }
      if (res.ok) {
        console.log("i am successfull");
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      console.log(error);
      seterrorUpdate(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a new post
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TextInput
            type="text"
            placeholder="Title of must reui"
            className="flex-1"
            required
            onChange={(e) =>
                setFormData({ ...formData, tittle: e.target.value })
            }
            value={formData.tittle || ""}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || ""}
          >
            <option value="uncategorized">Select and Option</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React.Js">React.js</option>
            <option value="Next.Js">Next.js</option>
          </Select>
        </div>
        <div className="flex flex-row gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
          <Button
            type="button"
            onClick={uploadImage}
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            {loadingImage ? (
              <>
                <Spinner value="uploading image" size={"lg"} />
              </>
            ) : (
              "Update Image"
            )}{" "}
          </Button>
        </div>
        {errorImage && (
          <Alert color={"failure"} value={errorImage}>
            {errorImage}
          </Alert>
        )}
        {formData.postImg && (
          <img
            className="w-full h-72 object-cover"
            src={formData.postImg}
            alt="uploaded img"
          />
        )} 
        <ReactQuill
          theme="snow"
          placeholder="Write your  blog here..."
          className="h-72 mb-12"
          required
          onChange={(value) =>{ setFormData(prevData=>({ ...prevData, content: value }))}}
          value={formData.content}
          />
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          onClick={handleSubmit}
        >
          Update Post
        </Button>
      </form>
      {errorUpdate && <Alert color={"failure"}>{errorUpdate}</Alert>}
    </div>
  );
}
