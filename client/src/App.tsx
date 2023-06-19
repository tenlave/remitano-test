import React, { lazy } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import { SocketProvider } from './shared/contexts';
import Loadable from './features/layout/components/loadable.component';

const Layout = Loadable(
  lazy(() => import('./features/layout/components/layout.component')),
);

function App() {
  return (
    <div data-testid="App" className="App">
      <ToastContainer />

      <BrowserRouter>
        <RecoilRoot>
          <SocketProvider>
            <Layout></Layout>
          </SocketProvider>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
