import { Button, Container } from 'reactstrap';
import './Login.css';

const Login = () => {
   return (
      <div className="LoginPage">
         <div className="Box">
            <div className="imgBox">
               <img
                  src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                  alt="Logo"></img>
            </div>
            <div className="LoginBox">
               <input type="text" placeholder="ID"></input>
               <input type="password" placeholder="Password"></input>
               <Button>로그인</Button>
            </div>
         </div>
         <Container className="bg-light border">
            <Row style={{ padding: '1em', textAlign: 'center' }}>
               <p>
                  계정이 없으신가요? <a href="join">가입하기</a>
               </p>
            </Row>
         </Container>
      </div>
   );
};
export default Login;
