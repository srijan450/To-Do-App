import React, { useState } from "react";
import icon from "./images/icon.png";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Task from "./components/Task";
import EditIcon from "@material-ui/icons/Edit";
import { useEffect } from "react";

function App() {
  const [val, setval] = useState("");
  const [data, setdata] = useState([]);
  const [oper, setoper] = useState({ editable: false, id: "" });

  const fetchAndShow = () => {
    const ldata = localStorage.getItem("data");
    if (ldata == null) {
      setdata([
        { data: "Create Your First Task Now", ID: "1683630412282", ini: true },
        { data: "All New Design", ID: "1683630427753", ini: true },
        { data: "Ultimate User Friendly UI", ID: "1683630453208", ini: true },
      ]);
    } else {
      const ldata = JSON.parse(localStorage.getItem("data"));
      setdata(ldata);
    }
  };
  useEffect(() => {
    fetchAndShow();
  }, []);

  const del = (e) => {
    setdata((pre) => {
      const ret = pre.filter((val) => val.ID !== e);
      if (ret.length !== 0)
        localStorage.setItem(
          "data",
          JSON.stringify(ret.filter((item) => !item.ini))
        );
      else {
        localStorage.removeItem("data");
      }
      return ret;
    });
  };
  const add = () => {
    if (val.slice() !== "") {
      setdata((pre) => {
        if (val !== "" && !oper.editable) {
          const newData = { data: val, ID: new Date().getTime().toString() };
          localStorage.setItem(
            "data",
            JSON.stringify([...data.filter((itm) => !itm.ini), newData])
          );
          return [...pre, newData];
        } else if (oper.editable) {
          setdata((pre) => {
            const item = pre.filter((val) => val.ID === oper.id)[0];
            item.data = val;
            item.ini = false;
            localStorage.setItem(
              "data",
              JSON.stringify(pre.filter((itm) => !itm.ini))
            );
            return pre;
          });
          setoper(() => {
            return { editable: false, id: "" };
          });
        }
      });

      setval("");
    }
  };

  const edit = (e) => {
    let newEditItem = data.find((elem) => {
      return elem.ID === e;
    });
    setoper(() => {
      return { editable: true, id: e };
    });
    setval(newEditItem.data);
  };
  return (
    <div className="main-div p-1">
      <div className="img mb-3">
        <img src={icon} alt="" />
      </div>
      <p className="text-center mb-3" style={{ color: "#E0E0E0" }}>
        Add Your List Here ✌️{" "}
      </p>
      <div className="input-group mb-3">
        <span
          className="input-group-text"
          style={{ background: "#ffffff" }}
          id="basic-addon1"
        >
          🔥
        </span>
        <input
          type="text"
          value={val}
          className="form-control text-center"
          onChange={(e) => setval(e.target.value)}
          placeholder="Add item..."
          aria-label="add"
          aria-describedby="basic-addon1"
        />
        <Button
          variant="contained"
          style={{ background: "#27a3a4", color: "#fff" }}
          onClick={add}
        >
          {oper.editable ? <EditIcon /> : <AddIcon />}
        </Button>
      </div>
      {data.length ? (
        <h3 className="text-light text-center my-1">Tasks</h3>
      ) : (
        <h3 className="text-light text-center">Add Tasks</h3>
      )}
      <div className=" overflow-auto height my-1">
        {data &&
          data.map((val, ind) => {
            return (
              <Task
                key={ind}
                index={val.ID}
                data={val.data}
                del={del}
                edit={edit}
              />
            );
          })}
      </div>
      {data.length > 1 ? (
        <div className="text-center">
          <Button
            variant="contained"
            className="btn efff"
            onClick={() => {
              setdata([]);
              localStorage.removeItem("data");
            }}
          >
            Remove All
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
