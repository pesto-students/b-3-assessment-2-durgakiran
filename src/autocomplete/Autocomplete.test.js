import { Autocomplete } from './Autocomplete';
import  React from 'react';
import ReactDOM from 'react-dom';

import { cleanup, fireEvent, render } from '@testing-library/react';

describe('autocomplete', () => {
    afterEach(cleanup);

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Autocomplete />, div);
    });

    // test('should match snapshot', () => {
    //     const { asFragment } = render(<Autocomplete />);
    //     expect(asFragment(<Autocomplete />)).toMatchSnapshot();
    // });

    test('should render a div element with class name control', () => { 
        const { getByTestId } = render(<Autocomplete />);
        expect(getByTestId('control')).toHaveClass('control');
    });

    test('should render input element inside a div element with class control', () => { });

    test('should call debounce function on every keypress in the input', () => {
        const debounceApi = jest.fn(); 
        const { getByTestId } = render(<Autocomplete debounceApi={debounceApi}/>);
        
        const inputBox = getByTestId('auto-complete');
        fireEvent.change(inputBox, { target: { value: 'q' } });

        expect(debounceApi).toHaveBeenCalledTimes(1);
    });

})
