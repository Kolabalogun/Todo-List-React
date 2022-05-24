import React from "react";
import Alert from "./Alert";
import List from "./List";
import "./Style.css";

const Home = () => {
  const [input, inputF] = React.useState("");
  const [data, dataF] = React.useState([]);
  const [isEditing, isEditingF] = React.useState(false);
  const [editID, editIDF] = React.useState(null);
  const [alert, alertF] = React.useState({ show: false, msg: "", type: "" });

  // ALERT /

  const showAlert = (show = false, msg = "", type = "") => {
    alertF({ show, msg, type });
  };

  function handleChange(e) {
    inputF(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      showAlert(true, "Please Enter Value", "danger");
    } else if (input && isEditing) {
      dataF(
        data.map((D) => {
          if (D.id === editID) {
            return { ...D, title: input };
          }
          return D;
        })
      );

      editIDF(null);
      isEditingF(false);
      inputF("");
      showAlert(true, "Value Changed", "success");
    } else {
      showAlert(true, "Item Added", "success");

      const newitem = { id: new Date().getTime().toString(), title: input };

      dataF((prev) => {
        return [...prev, newitem];
      });
      inputF("");
    }
  }
  function handleClear(params) {
    showAlert(true, "Empty List", "danger");
    dataF([]);
    inputF("");
    isEditingF(false);
  }

  function onEdit(id) {
    const specificItem = data.find((D) => D.id === id);
    isEditingF(true);
    editIDF(id);
    inputF(specificItem.title);
  }

  function onDelete(id) {
    showAlert(true, "Item Removed", "danger");
    const newData = data.filter((D) => D.id !== id);
    dataF(newData);
  }

  console.log(data);

  const dataElement = data.map((D, index) => (
    <List
      key={index}
      id={D.id}
      name={D.title}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ));

  return (
    <div className="main">
      {/* <h1>Todo</h1> */}
      <div className="line"></div>

      {alert.show && <Alert {...alert} removeAlert={showAlert} data={data} />}

      <form onSubmit={handleSubmit} className="details">
        <div className="inputdiv">
          <input
            type="text"
            name="input"
            placeholder="Input text here"
            value={input}
            onChange={handleChange}
          />
          <button>{isEditing ? "Edit" : "Add"}</button>
        </div>

        {data.length > 0 ? (
          <div className="">
            <div className="lists">{dataElement}</div>

            <button onClick={handleClear}>Clear All</button>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Home;
