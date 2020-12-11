import React from 'react';
import TextField from '@material-ui/core/TextField';

function TodoInput(props) {
    return (
        <div>
            <TextField
                value={props.value}
                id="standard-textarea"
                label="Enter todo here"
                placeholder="Enter todo"
                onChange={props.changeHander}
                multiline/>
        </div>
    );
}

export default TodoInput;
