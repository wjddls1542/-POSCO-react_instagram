// import './App.css';
// import { Button } from 'reactstrap';
// import { Route, Routes } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BootstrapLogin from './components/Login/BootstrapLogin';
import Page404 from './components/Page404';
import Main from './components/Main';
import Join from './components/Join/Join';
import Layout from './components/Layout/Layout';
import Profile from './components/Profile/Profile';

import Search from './components/Search/Search';
function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout></Layout>}>
               <Route index path="/" element={<Main></Main>}></Route>
               <Route path="shopping" element={<Main></Main>}></Route>
               <Route path="search" element={<Search></Search>}></Route>
               <Route path="profile" element={<Profile></Profile>}></Route>
            </Route>
            <Route index path="/login" element={<BootstrapLogin></BootstrapLogin>}></Route>
            <Route index path="/*" element={<Page404></Page404>}></Route>
            <Route index path="/join" element={<Join></Join>}></Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
