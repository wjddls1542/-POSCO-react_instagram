import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
   const navigate = useNavigate();
   const isLogin = useSelector(state => state.users.isLogin);
   useEffect(() => {
      if (!isLogin) {
         navigate('/login');
      } else {
         navigate('/');
      }
   }, []);
   return <></>;
};
export default Page404;
