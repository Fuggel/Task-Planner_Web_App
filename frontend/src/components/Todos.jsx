import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/auth-context";
import "../scss/components/_todos.scss";

const Todos = () => {
  const [text, setText] = useState("");
  const [updateText, setUpdateText] = useState(text);
  const [todos, setTodos] = useState([]);
  const [countTodos, setCountTodos] = useState(null);
  const { userId, token } = useContext(AuthContext);

  useEffect(() => {
    setCountTodos(todos.length);
  }, [todos.length]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, [todos, token]);

  const createTodo = (e) => {
    e.preventDefault();

    if (!text) return;

    axios
      .post(
        "http://localhost:5000/todos",
        {
          text,
          id: userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => setText(""))
      .catch((err) => console.log(err));
  };

  const editTodo = (id) => {
    if (updateText.length < 1) return;

    axios
      .put(
        `http://localhost:5000/todos/${id}`,
        { text: updateText },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch((err) => console.log(err));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={createTodo} className="input-container">
        <input
          type="text"
          placeholder="Add New"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>

      {todos.length > 0 && (
        <p className="remaining-todos">Remaining ToDo's: {countTodos}</p>
      )}

      <>
        {todos.map((todo) => (
          <div key={todo._id} className="todo-item">
            <p
              contentEditable={true}
              suppressContentEditableWarning={true}
              value={updateText}
              onInput={(e) => setUpdateText(e.currentTarget.textContent)}
            >
              {todo.text}
            </p>
            <div className="btn-container">
              <button onClick={() => editTodo(todo._id)}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className="cta" onClick={() => deleteTodo(todo._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
        {!todos.length && <p className="no-todos">No ToDo's addet yet.</p>}
      </>
    </>
  );
};

export default Todos;
