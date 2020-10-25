import { debounce } from 'lodash';
import React from 'react';
import './Autocomplete.css';
import { getData } from './getData';
// Don't change any declarations.

class Autocomplete extends React.Component {


    state = {
        suggestion: null,
        isLoading: false,
    }




    getSuggestions = async (query) => {
        this.setState({ isLoading: true });
        const results = await getData(query);
        console.log(results);
        this.setState({ suggestion: results, isLoading: false })
    }

    debounceApi( query , time = 500) {
        const fn = debounce(this.getSuggestions, time);
        fn(query)
    }

    render() {
        return (
        <div className="wrapper">
            <div className={ this.state.isLoading ?  'control' + ' ' + 'is-loading' : 'control' } data-testid="control">
            <input placeholder="search...." 
                    onChange={({target: { value }}) => this.debounceApi(value)}
                    className="input"
                    type="text"  
                    name="autoComplete" 
                    data-testid="auto-complete"/>
            </div>
            {
                (this.state.suggestion && !this.state.isLoading) &&
                    <div className="list">
                        {
                            this.state.suggestion && this.state.suggestion.map((item, index) => {
                                return <a  
                                        onClick={() => props.onSelectItem(item)}
                                        className="list-item" 
                                        key={index}>
                                            {item}
                                        </a>
                            })
                        }
                    </div>

            }
        </div>
        );
    }
}

export { Autocomplete };
