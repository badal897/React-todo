import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LabelImportantSharpIcon from '@material-ui/icons/LabelImportantSharp';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

function TodoItemList(props) {
    const classes = useStyles();
    const {items} = props;

    const removeItemHandler = (index) => {
        props.onRemoveItem(index);
        // props.removeItem(index);
    };

    return (
        <List className={classes.root}>
            {items.map((value, index) => {
                const labelId = `checkbox-list-label-${index}`;
                return (
                    <div key={value._id}>
                    <ListItem dense button>
                        <ListItemIcon>
                            <LabelImportantSharpIcon/>
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.itemname}/>
                        <Button onClick={() => {removeItemHandler(value._id)}}>
                            <HighlightOffIcon/>
                        </Button>
                    </ListItem>
                    <Divider />
                    </div>
                );
            })}
        </List>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        removeItem: (index) => dispatch({type: 'REMOVE_ITEM', index: index})
    }
}

export default connect(null, mapDispatchToProps)(TodoItemList);
