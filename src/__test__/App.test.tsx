import React, {ReactNode} from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, screen, renderHook, act, waitFor } from '@testing-library/react';
import { Provider,useSelector } from 'react-redux';

import {store} from '../redux/store';
import useFetch from '../hooks/useFetch';
import App from '../App';




const url = 'https://restcountries.com/v3.1/all'

interface Props{
  children: ReactNode
}

const wrapper = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
const getControlledPromise= () => {
  let defferedPromise:any
  const promise:any = new Promise((resolve, reject) => {
    defferedPromise = {resolve, reject}
  })
  return {promise, defferedPromise}
}


test('renders loading component', () => {
  render(
    < BrowserRouter>
      <Provider store={store}>

    <App /> 
      </Provider> 
    </BrowserRouter>
  );

  

  const loader = screen.getByTestId('loader')

  const res = renderHook(useFetch, {
    initialProps: url,
    wrapper 
    
  }) 

  
  expect(loader).toBeInTheDocument()
 
}); 

it('should fetch data based on the url passed on to it', async () => {
  global.fetch = jest.fn()

  act(() =>
    renderHook(useFetch, {
      initialProps: url,
      wrapper, 
    }) 
  );

  expect(global.fetch).toHaveBeenCalledWith(url)
  expect(global.fetch).toHaveBeenCalledTimes(1)
})

// describe("while fetching", () => { 
//   it("handles loading state correctly", async () => {
//     const { defferedPromise, promise } = getControlledPromise()
//     global.fetch = jest.fn(() => promise)
//     const { result, rerender } = renderHook(() => useFetch(url), {
//       wrapper
//     })
// defferedPromise.resolve()
// expect(result.current.loading).toBe(true)
//     await waitFor(() => {
//       rerender()

//     })
   
//     await waitFor(() => {
    
      
//       expect(result.current.loading).toBe(false)
//     })

//   })
// })