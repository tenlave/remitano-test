import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import Layout from './features/layout/components/layout.component';

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <BrowserRouter>
        <RecoilRoot>
          <Layout></Layout>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
