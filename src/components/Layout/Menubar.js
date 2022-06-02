import './Menubar.css';
import { AiFillHome, AiOutlineSearch, AiOutlineShopping, AiOutlineVideoCamera } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

const Menubar = () => {
   const location = useLocation();
   return (
      <div className="Menubar">
         <Row className="MenContainer">
            <Col className="Icon">
               <Link to={'/'}>
                  <AiFillHome size={30} fill={location.pathname === '/' ? 'blue' : 'black'}></AiFillHome>
               </Link>
            </Col>
            <Col className="Icon">
               <Link to={'/serch'}>
                  <AiOutlineSearch
                     size={30}
                     fill={location.pathname === '/search' ? 'blue' : 'black'}></AiOutlineSearch>
               </Link>
            </Col>
            <Col className="Icon">
               <Link to={'/camera'}>
                  <AiOutlineVideoCamera
                     size={30}
                     fill={location.pathname === '/camera' ? 'blue' : 'black'}></AiOutlineVideoCamera>
               </Link>
            </Col>
            <Col className="Icon">
               <Link to={'/shopping'}>
                  <AiOutlineShopping
                     size={30}
                     fill={location.pathname === '/shopping' ? 'blue' : 'black'}></AiOutlineShopping>
               </Link>
            </Col>
            <Col className="Icon">
               <Link to={'/profile'}>
                  <BiUserCircle size={30} fill={location.pathname === '/profile' ? 'blue' : 'black'}></BiUserCircle>
               </Link>
            </Col>
         </Row>
      </div>
   );
};
export default Menubar;

//Link : url을 이동하면서 js만 바꿔주기 위해서 a 대신 link를 사용(a는 강제적으로 페이지 이동)
