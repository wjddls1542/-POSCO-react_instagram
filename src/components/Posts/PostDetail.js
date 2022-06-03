import { Button, Container, Modal } from 'reactstrap';

import { useContext } from 'react';
import './PostDetail.css';
import { useSelector } from 'react-redux';

const PostDetail = ({ isOpen, clickPost, closeModal, onClickDelete, user }) => {
   const myId = Number(useSelector(state => state.users.myId));
   return (
      <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
         <div className="profileBoardModalHeader">
            <Button close onClick={closeModal}></Button>{' '}
            <div>
               {user.name}
               <strong>게시글</strong>
            </div>
            {user.id === myId ? (
               <Button color="danger" outline onClick={() => onClickDelete(clickPost?.id)}>
                  삭제하기
               </Button>
            ) : (
               <div></div>
            )}
         </div>
         <Container>
            <div className="profileBoardBody">
               <div className="profileBoardBodyHeader">
                  <div className="profileBoardBodyHeaderImgBox">
                     <img className="profileBoardBodyHeaderImg" src={user.img} alt="userImg"></img>
                  </div>
                  {user.name}
               </div>
               <img className="profileBoardBodyImg" src={clickPost?.img} alt="postimg"></img>
               <p>{clickPost?.content}</p>
            </div>
         </Container>
      </Modal>
   );
};
export default PostDetail;
