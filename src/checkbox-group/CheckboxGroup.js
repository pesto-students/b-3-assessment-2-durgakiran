import React, { Children } from "react";

const checkBoxContext = React.createContext();

function Checkbox({value}) {
    return (
        <checkBoxContext.Consumer>
            {(valueObj) => {
                return <input type="checkbox" 
                            name={valueObj.name} 
                            value={value}
                            checked={valueObj.checked.includes(value)}
                            onChange={valueObj.onChange} />;
            }}
        </checkBoxContext.Consumer>
    );
}

class CheckboxGroup extends React.Component {



    state = {
        checked: [],
    }


    componentDidMount() {
        console.log(this.props);
        this.setState({
            checked: this.props.value
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { ...prevState, checked: nextProps.value }
    }

    handleChange = (event) => {
        const { target: { value, checked } } = event;
        console.log({[value]: checked});

        let newChecked = [...this.state.checked]

        if(!newChecked.includes(value)) {
            newChecked.push(value);
        } else {
            newChecked = newChecked.filter((ele) => ele!==value );
        }

        this.setState((prevState) => {
            return {
                ...prevState,
                checked: newChecked
            }
        }, () => {
            this.props.onChange(newChecked);
        })
    }

    render() {
        return (
            <checkBoxContext.Provider 
                value={{ 
                name: this.props.name,
                checked: this.state.checked, 
                onChange: this.handleChange }} >
                {this.props.children(Checkbox)}
            </checkBoxContext.Provider>
        );
    }
}

export { CheckboxGroup, Checkbox };
