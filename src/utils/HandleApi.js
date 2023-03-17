import axios from "axios";
import { message } from "antd";

const baseUrl = "https://todomaster-app.onrender.com/api/todo";
const user = JSON.parse(localStorage.getItem("todomaster-user_info"));

const getAllToDo = (setToDo) => {
  axios.post(baseUrl, { userid: user._id }).then(({ data }) => {
    console.log(data);
    setToDo(data);
  });
};

const addToDo = (text, setText, setToDo) => {
  axios
    .post(`${baseUrl}/save`, { text, userid: user._id })
    .then((data) => {
      console.log(data);
      setText("");
      getAllToDo(setToDo);
      message.success("New Todo added successfully");
    })
    .catch((err) => console.log(err));
};

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
  axios
    .put(`${baseUrl}/update`, { _id: toDoId, text, userid: user._id })
    .then((data) => {
      setText("");
      setIsUpdating(false);
      getAllToDo(setToDo);
      message.success("Todo updated successfully");
    })
    .catch((err) => console.log(err));
};

const deleteToDo = (id, setToDo) => {
  axios
    .post(`${baseUrl}/delete`, {
      _id: id,
    })
    .then((data) => {
      console.log(data);
      getAllToDo(setToDo);
      message.success("Todo deleted successfully");
    })
    .catch((err) => console.log(err));
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
