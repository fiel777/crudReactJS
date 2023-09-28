import { useEffect, useState } from "react";

function App() {
  const [post, setPosts] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
  });

  const [postsArray, setPostsArray] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPosts((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = (e) => {
    e.preventDefault();

    if (editingPostId !== null) {
      const updatedPostsArray = postsArray.map((item) =>
        item.id === editingPostId ? { ...post, id: editingPostId } : item
      );
      setPostsArray(updatedPostsArray);
      setEditingPostId(null);
    } else {
      const newPost = { ...post, id: Date.now() };
      setPostsArray((prev) => [...prev, newPost]);
    }

    setPosts({
      firstname: "",
      middlename: "",
      lastname: "",
    });

    console.log(postsArray);
  };

  const editPost = (id) => {
    // Find the post to edit based on its ID
    const postToEdit = postsArray.find((item) => item.id === id);

    if (postToEdit) {
      // Set the post values in the form for editing
      setPosts({ ...postToEdit });
      setEditingPostId(id);
    }
    console.log(postToEdit)
  };

  const deletePost = (id) => {
    const deleteItem = postsArray.find((post) => post.id === id);

    if (deleteItem !== -1) {
      postsArray.splice(deleteItem, 1);
      setPostsArray([...postsArray]);
    }
  };

  return (
    <>
      <div className="bg-slate-700 h-[45vh] font-primary flex items-center justify-center flex-col  ">
        <div className="w-full max-w-screen-lg m-auto  ">
          <div className="mx-4 flex flex-col items-center gap-4 font-normal text-sm">
            <input
              name="firstname"
              type="text"
              value={post.firstname}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full p-4 outline-none"
            ></input>
            <input
              type="text"
              name="middlename"
              value={post.middlename}
              onChange={handleChange}
              placeholder="Enter your middle name"
              className="w-full p-4 outline-none"
            ></input>
            <input
              type="text"
              name="lastname"
              value={post.lastname}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full p-4 outline-none"
            ></input>
          </div>
          <div className="pt-6 ml-4">
            <button
              onClick={createPost}
              className={`py-[0.3rem] px-6 text-black tracking-widest bg-white rounded-sm uppercase text-sm font-medium hover:scale-105 transition-all`}
            >
              {editingPostId !== null ? "Edit" : "Submit"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-screen-lg m-auto">
        <div className="my-20">
          <div className={`w-full p-4 bg-slate-100 shadow-sm h-[50vh] overflow-y-auto`}>
            {postsArray.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2  shadow p-4 my-4 ${editingPostId !==null  ? "bg-slate-500 text-white" : "bg-white"} `}
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-sm font-light">
                    FirstName: {item.firstname}
                  </h1>
                  <button
                    onClick={() => editPost(item.id)}
                    className="py-2 px-12 tracking-widest bg-orange-600 rounded-sm uppercase text-white text-sm font-medium hover:scale-105 transition-all"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-sm font-light">
                    Middle Name: {item.middlename}
                  </h1>
                  <button
                    onClick={() => deletePost(item.id)}
                    className="py-2 px-12 tracking-widest bg-red-600 rounded-sm uppercase text-white text-sm font-medium hover:scale-105 transition-all"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-sm font-light py-2">
                    Lastname: {item.lastname}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
