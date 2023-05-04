import { render } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { cleanup } from '@testing-library/react';

describe('Component CurrencyForm', () => {
  it('should run action callback with proper data on form submit', () => {
    //test cases

    const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
    ];
    for (let test of testCases){
  
    // render component
    const action = jest.fn();
      render(<CurrencyForm action={action} />);
    const submitButton = screen.getByText('Convert');
  
    // find fields elems
    const amountField = screen.getByTestId('amount');
    const fromField = screen.getByTestId('from-select');
    const toField = screen.getByTestId('to-select'); 
    // set test values to fields

    userEvent.type(amountField, test.amount);
    userEvent.selectOptions(fromField, test.from);
    userEvent.selectOptions(toField, test.to);
  
    // simulate user click on "convert" button
    userEvent.click(submitButton);
  
    // check if action callback was called once and with proper argument
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith( {amount: parseInt(test.amount), from: test.from, to: test.to} );
    
    // unmount component
    cleanup();
    }
  });
});

