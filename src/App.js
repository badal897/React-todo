import React from 'react';
import './App.css';
import TodoInput from './TodoInput';
import AppBar from './Appbar';
/* Redux */
import {connect, useSelector} from 'react-redux';
import TodoItemList from './TodoItemsList';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
/* Axios */
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '26ch'
        }
    },
    cardwidth: {
        minWidth: 700
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
}));

function App(props) {
    const classes = useStyles();
    const [value,
        setValue] = React.useState('');
    const [isAdded,
        setIsAdded] = React.useState(true);

    const getItems = () => {
        axios
            .get(`http://localhost:3004/api/items`)
            .then(res => {
                const items = res.data.items;
                props.setItems(items);
            })
    };

    React.useEffect(() => {
        getItems();
    }, []);

    const handleOnChange = (event) => {
        setValue(event.target.value);
    };
    const addItemHandler = (event) => {
        if (value) {
            // props.addItem(value);
            const reqData = {
                "itemname": value
            };
            axios
                .post(`http://localhost:3004/api/addtodo`, reqData)
                .then(res => {
                    setValue('');
                    getItems();
                    // setIsAdded(true);
                });
        }
    };

    const removeItemHandler = (id) => {
        const url = `http://localhost:3004/api/items/${id}`;

        axios
            .delete(url)
            .then(res => {
                getItems();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="App">
            <AppBar/>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <Grid container spacing={8}
                        justify="center">
                        <Grid item xs={8} sm={8} style={{'textAlign': 'center'}}>
                            <TodoInput changeHander={handleOnChange} value={value}/>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            style={{
                            marginTop: '20px'
                        }}>
                            <Button variant="outlined" color="primary" onClick={addItemHandler}>
                                <AddCircleOutlineSharpIcon/>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {(props.items && props.items.length && isAdded)
                                ? <TodoItemList onRemoveItem={removeItemHandler} items={props.items}/>
                                : null
}
                        </Grid>
                    </Grid>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {items: state.items}
}

const mapDispatchToProps = dispatch => {
    return {
        addItem: (value) => dispatch({type: 'ADD_ITEM', value: value}),
        setItems: (items) => dispatch({type: 'SET_ITEMS', value: items})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
