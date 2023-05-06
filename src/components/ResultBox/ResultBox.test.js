import ResultBox from "./ResultBox";
import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {
    it('should render withour crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />)
    })
    it('should render proper info about conversion when PLN -> USD”', ()=>{  
        const testCases = [
            { amount: 100, usd: 28.57 },
            { amount: 20, usd: 5.71 },
            { amount: 209, usd: 59.71}
          ];
          for(const test of testCases){
            render(<ResultBox from="PLN" to="USD" amount={test.amount}/> )
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`PLN ${test.amount}.00 = $${test.usd}`);
            cleanup();
          }
    });
    it('should render proper info about conversion when PLN -> PLN”', ()=>{  
        const testCases = [
            { amount: 100},
            { amount: 20},
            { amount: 209}
          ];
          for(const test of testCases){
            render(<ResultBox from="PLN" to="PLN" amount={test.amount}/> )
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`PLN ${test.amount}.00 = PLN ${test.amount}.00`);
            cleanup();
          }
    });
    it('should render proper info about conversion, when amount below 0 show invalid number”', ()=>{  
        const testCases = [
            { amount: -100},
            { amount: -20},
            { amount: -209}
          ];
          for(const test of testCases){
            render(<ResultBox from="PLN" to="PLN" amount={test.amount}/> )
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`Invalid number`);
            cleanup();
          }
    });
});