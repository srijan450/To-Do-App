import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';


function Task({ data, key, index, del, edit }) {
    return (
        <div className="">
            <div className="list p-2 d-flex justify-content-between mb-2"><span className="text">{data}</span>
                <div>
                    <Button variant="contained" style={{ background: 'inherit', color: 'inherit' }} onClick={() => edit(index)}><EditIcon /></Button>
                    <Button variant="contained" style={{ background: 'inherit', color: 'inherit' }} id={key} onClick={() => del(index)}><DeleteOutlineIcon /></Button>
                </div>
            </div>
        </div >
    );
}

export default Task;
