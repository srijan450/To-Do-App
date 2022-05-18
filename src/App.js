import React, { useState } from 'react';
import icon from './images/icon.png';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Task from './components/Task';
import EditIcon from '@material-ui/icons/Edit';

function App() {
    const [val, setval] = useState('');
    const [data, setdata] = useState([]);
    const [oper, setoper] = useState({ editable: false, id: '' });

    const del = (e) => {
        setdata((pre) => {
            return pre.filter((val) => val.ID !== e);
        })
    }
    const add = () => {
        setdata((pre) => {
            if (val !== '' && !oper.editable) {
                console.log('uahsu');
                return [...pre, { data: val, ID: new Date().getTime().toString() }]
            }
            else if (oper.editable) {
                setdata((pre) => {
                    pre.filter((val) => val.ID === oper.id)[0].data = val;
                    return pre;
                });
                setoper(() => {
                    return { editable: false, id: '' }
                })
            }
        })
        setval('');
    }
    
    const edit = (e) => {
        let newEditItem = data.find((elem) => {
            return elem.ID === e;
        })
        console.log(newEditItem);
        setoper(() => {
            return { editable: true, id: e }
        })
        setval(newEditItem.data)
    }
    return (

        <div className="main-div p-1">
            <div className="img mb-3"><img src={icon} alt="" /></div>
            <p className="text-center mb-3" style={{ color: '#E0E0E0' }}>Add Your List Here ✌️ </p>
            <div className="input-group mb-3">
                <span className="input-group-text" style={{ background: '#ffffff' }} id="basic-addon1">🔥</span>
                <input type="text" value={val} className="form-control text-center" onChange={(e) => setval(e.target.value)} placeholder="Add item..." aria-label="add" aria-describedby="basic-addon1" />
                <Button variant="contained" style={{ background: '#27a3a4', color: '#fff' }} onClick={add}>
                    {oper.editable ? <EditIcon /> : <AddIcon />}
                </Button>
            </div>
            {data.length ? <h3 className="text-light text-center my-1">Tasks</h3> : <h3 className="text-light text-center">Add Tasks</h3>}
            <div className=" overflow-auto height my-1">
                {
                    data.map((val, ind) => {
                        return <Task key={ind} index={val.ID} data={val.data} del={del} edit={edit} />
                    })
                }
            </div>
            {data.length > 1 ? <div className="text-center">
                <Button variant="contained" className="btn efff" onClick={() => setdata([])}>Remove All</Button>
            </div> : ''
            }
        </div>
    )
}

export default App
