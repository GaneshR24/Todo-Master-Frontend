import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToDo from "../components/ToDo";
import {
  addToDo,
  getAllToDo,
  updateToDo,
  deleteToDo,
} from "../utils/HandleApi";
import "../style/home.css";
import { MdLogout } from "react-icons/md";

const Home = () => {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const user = JSON.parse(localStorage.getItem("todomaster-user_info"));
  const navigate = useNavigate();

  return (
    <>
      <div className="layout">
        <div className="header d-flex justify-content-between align-items-center">
          <div>
            <h1 className="logo">TodoMaster</h1>
          </div>
          <div className="header-user">
            <div>{user?.name}</div>
            <MdLogout
              className="header-logout"
              onClick={() => {
                localStorage.removeItem("todomaster-user_info");
                navigate("/login");
              }}
            />
          </div>
        </div>

        <div className="content">
          <div className="container">
            <div className="top">
              <input
                type="text"
                placeholder="Add ToDos..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <div
                className="add"
                onClick={
                  isUpdating
                    ? () =>
                        updateToDo(
                          toDoId,
                          text,
                          setToDo,
                          setText,
                          setIsUpdating
                        )
                    : () => addToDo(text, setText, setToDo)
                }
              >
                {isUpdating ? "Update" : "Add"}
              </div>
            </div>

            <div className="list">
              {toDo.map((item) => (
                <ToDo
                  key={item._id}
                  text={item.text}
                  updateMode={() => updateMode(item._id, item.text)}
                  deleteToDo={() => deleteToDo(item._id, setToDo)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
