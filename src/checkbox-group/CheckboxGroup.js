import React, { Children } from "react";

const checkBoxContext = React.createContext();

function Checkbox() {
    return (
        <checkBoxContext.Consumer>
            {(valueObj) => {
                return <input type="checkbox" name={valueObj.name} onChange={valueObj.onCheck}/>;
            }}
        </checkBoxContext.Consumer>
    );
}

class CheckboxGroup extends React.Component {
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <checkBoxContext.Provider value={{ name: this.props.name, onCheck: this.props.onChange }}>
                {this.props.children(Checkbox)}
            </checkBoxContext.Provider>
        );
    }
}

export { CheckboxGroup, Checkbox };
