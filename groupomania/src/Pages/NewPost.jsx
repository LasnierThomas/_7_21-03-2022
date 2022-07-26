import axios from 'axios';
import { useContext, useState } from 'react';
import { FaFirstAid, FaPlusCircle } from "react-icons/fa";
import { UserContext } from "../Components/AppContext";
import * as FormData from "form-data";
import "../Styles/NewPost.css";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const user = useContext(UserContext);

  const handlePost = (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title.error");
    const descriptionError = document.querySelector(".description.error");
    const token = user.token;
    const payload = JSON.stringify({
      title,
      description,
    });
    const file = new FormData();
    file.append("json", payload);
    file.append("image", selectedImage);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/articles`,
      withCredentials: true,
      data: file,
      // file: selectedImage,
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data'
      },
    })
      .then((res) => {
        if (res.data.errors) {
          titleError.innerHTML = res.data.errors.title;
          descriptionError.innerHTML = res.data.errors.description;
        } else {
          window.location = "/article";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // document.querySelector("#new-btn").onclick = function () {
  //   if (window.getComputedStyle(document.querySelector("#block-img")).display == "none") {
  //     document.querySelector("#block-img").style.display = "block";
  //   } else {
  //     document.querySelector("#block-img").style.display = "none";
  //   }
  // };

  return (
    <form action="" onSubmit={handlePost} id="post">
      <div className="block-parent">
        <div className="new">
          <h3 className="new-post">Poster votre article</h3>
          <div className="block-img" id="block-img">
            <label for="first">
              <FaPlusCircle className="new-btn" id="new-btn" type="file" size="30px"></FaPlusCircle>
            </label>
            <input className="first" type="file" id="first" onChange={imageChange}></input>
            {selectedImage && (
              <div className="img-post">
                <img src={URL.createObjectURL(selectedImage)} alt="image" />
              </div>
            )}
          </div>
          <div className="new-title">
            <label htmlFor="title">Titre</label>
            <input className="inputTxt" type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>
          <textarea className="new-description" type="text" name="new-description" id="new-description" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
          <input className="button-push" type="submit" value="Poster" />
        </div>
      </div>
    </form>
  );
};

export default NewPost;