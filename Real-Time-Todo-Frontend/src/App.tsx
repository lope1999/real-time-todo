import React from 'react';
import IndexPage from './pages/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const App: React.FC = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} />
      <IndexPage />
    </div>
  );
};

export default App;
