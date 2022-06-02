import { Alert, Button, Col, Container, Form, Input, Row } from 'reactstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import AuthRouter from '../AuthRouter';
import './Login.css';
import { useDispatch } from 'react-redux';
import { login } from '../../store/users';

const BootstrapLogin = () => {
   const dispatch = useDispatch();
   const [isFail, setIsFail] = useState(false);
   const [user, setUser] = useState({
      id: '',
      password: '',
   });
   const onChangeHandler = e => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };
   const navigate = useNavigate();

   const onSubmitLogin = async e => {
      e.preventDefault();
      dispatch(login({ user }));
      const { isLogin } = await dispatch(login(user)).unwrap();
      if (isLogin) {
         //로그인 후 로직
         //localStorage.setItem('id', findUser.id);
         navigate('/');
      } else {
         setIsFail(true);
         setTimeout(() => closeAlert(), 3000);
      }
   };
   const closeAlert = () => {
      setIsFail(false);
   };
   return (
      <div className="LoginPage">
         <Container className="bg-light border">
            <Row style={{ rowGap: '1em', padding: '3em' }}>
               <Col xl={12}>
                  <img
                     src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                     alt="Logo"></img>
               </Col>
               <Col xl={12}>
                  <Form onSubmit={onSubmitLogin} className="LoginForm">
                     {isFail ? (
                        <Alert color="warning" toggle={() => closeAlert()}>
                           아이디 또는 비밀번호가틀렸습니다.
                        </Alert>
                     ) : null}
                     <Input type="text" placeholder="ID" name="id" onChange={e => onChangeHandler(e)}></Input>
                     <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={e => onChangeHandler(e)}></Input>
                     <Button type={'submit'} color="primary" block>
                        로그인
                     </Button>
                  </Form>
               </Col>
            </Row>
         </Container>
         <Container className="big-light border">
            <Row style={{ padding: '1em', textAlign: 'center' }}>
               <p>
                  계정이 없으신가요? <a href="/join">가입하기</a>
               </p>
            </Row>
         </Container>
         <AuthRouter></AuthRouter>
      </div>
   );
};
export default BootstrapLogin;
