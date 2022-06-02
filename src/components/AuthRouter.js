import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginCheck } from '../store/users';

const AuthRouter = () => {
   const dispatch = useDispatch();
   //const { users } = useContext(UserContext);
   const navigate = useNavigate();
   const location = useLocation();
   useEffect(() => {
      loginCheckFunc();
   }, []);
   const loginCheckFunc = async () => {
      const isLogin = await dispatch(loginCheck()).unwrap();
      isLogin ? toGo() : toHome();
   };
   const toHome = () => {
      const from = location.pathname === '/login' || location.pathname === '/join' ? location.pathname : '/login';
      navigate(from);
   };
   const toGo = () => {
      const from = location.pathname || '/';
      navigate(from === '/login' || from === '/join' ? '/' : from);
   };
   // const id = localStorage.getItem('id');
   // const findUser = users.find(data => data.id === Number(id));
   // if (!findUser || !id) {
   //    const from = location.pathname === '/login' || location.pathname === '/join' ? location.pathname : '/login';
   //    navigate(from);
   // } else {
   //    const from = location.pathname || '/';
   //    navigate(from === '/login' || from === '/join' ? '/' : from);
   // }
   return <></>;
};

export default AuthRouter;
