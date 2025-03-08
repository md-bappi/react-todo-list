import { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Home = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (!data) return [];
    return data;
  });
  const [editIndex, setEditIndex] = useState(null);

  const inputRef = useRef(null);

  const handleInputTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    if (editIndex !== null) {
      const updateTask = todos.map((value, i) =>
        i === editIndex ? task : value
      );
      setTodos(updateTask);
      setTask("");
      inputRef.current.blur();
      setEditIndex(null);
    } else {
      const finalTask = [...todos, task];
      setTodos(finalTask);
      setTask("");
      inputRef.current.blur();
    }
  };

  const handleEditData = (index) => {
    // task state change
    setTask(todos[index]);
    // editing index set
    setEditIndex(index);
  };

  const handleDeleteData = (id) => {
    const filterData = todos.filter((_, index) => {
      return index !== id;
    });
    setTodos(filterData);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [task]);

  return (
    <div className="Home md:w-2/6 lg:w-2/6">
      <h1 className=" text-center text-2xl font-bold tracking-wider mb-5">
        Todo List
      </h1>
      <form
        onSubmit={handleInputTask}
        className=" flex justify-between items-center border border-indigo-600 rounded-xs"
      >
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          ref={inputRef}
          placeholder="What is the task today?"
          className="  text-xs p-2 outline-none md:w-8/12 lg:w-9/12 placeholder:text-xs"
        />
        <button
          type="submit"
          className=" text-xs bg-indigo-600 py-2 px-3 font-semibold"
        >
          Add Task
        </button>
      </form>

      <ul className=" tasks flex flex-col gap-2 py-3">
        {todos.map((taskItem, index) => (
          <li
            key={index}
            className=" flex justify-between items-center bg-indigo-600 px-2 py-1 rounded-xs"
          >
            {taskItem}
            <div className=" flex gap-2">
              <span
                onClick={() => handleEditData(index)}
                className=" hover:cursor-pointer hover:duration-150 hover:text-yellow-500"
              >
                <FaEdit />
              </span>
              <span
                onClick={() => handleDeleteData(index)}
                className=" hover:cursor-pointer hover:duration-150 hover:text-red-400"
              >
                <MdDeleteOutline />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
