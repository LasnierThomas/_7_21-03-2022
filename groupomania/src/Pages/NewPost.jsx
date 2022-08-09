import axios from 'axios';
import { useContext, useState, useRef } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { UserContext } from "../Components/AppContext";
import * as FormData from "form-data";
import "../Styles/NewPost.css";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const user = useContext(UserContext);
  const inputFile = useRef(null);

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

      headers: {
        Authorization: `Bearer ${token}`,
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
    console.debug("imageChange");
    if (e.target.files && e.target.files.length > 0) {
      console.debug("I haz an image");
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <form action="" onSubmit={handlePost} id="post">
      <div className="block-parent">
        <div className="new">
          <h3 className="new-post">Poster votre article</h3>

          <div className="block-img" id="block-img">
            {!selectedImage && (
              <label for="first">
                <FaPlusCircle className="new-btn" id="new-btn" size="30px"></FaPlusCircle>
              </label>
            )}
            <input className="first" type="file" id="first" ref={inputFile} onChange={imageChange}></input>
            {selectedImage && (
              <div
                className="img-post"
                onClick={() => {
                  console.debug("j'ai clické sur mon div");
                  inputFile.current?.click();
                }}
              >
                <img className="img-dl" src={URL.createObjectURL(selectedImage)} alt="" />
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