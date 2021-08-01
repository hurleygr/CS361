import React from 'react';
import Button from '@material-ui/core/Button';


class AddStockButton extends React.Component {
    

render() {
    return (
        <div> 
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => this.props.add_function(this.props.symbol, this.props.name)}
            >
            + Add Stock
            </Button>
        </div>)
    }   
}
export default AddStockButton