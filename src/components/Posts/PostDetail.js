import { Button, Container, Modal } from 'reactstrap';
import './PostDetail.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFollow, insertFollowing, selectMyFollowingOne } from '../../store/follows';

const PostDetail = ({ isOpen, clickPost, closeModal, onClickDelete, user }) => {
   const myId = Number(useSelector(state => state.users.myId));
   const dispatch = useDispatch();
   const [isMyFollowing, setIsMyFollowing] = useState(false);
   const postFollowData = () => {
      dispatch(selectMyFollowingOne(user.id))
         .unwrap()
         .then(res => {
            console.log(res);
            setIsMyFollowing(res);
         });
   };
   useEffect(() => {
      postFollowData();
   }, [user]);
   const unFollow = async () => {
      await dispatch(deleteFollow(user.id));
      await postFollowData();
   };

   const follow = async () => {
      await dispatch(insertFollowing(user.id));
      await postFollowData();
   };

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
                  {user.id === myId ? (
                     <></>
                  ) : !isMyFollowing ? (
                     <Button onClick={follow} outline>
                        팔로우
                     </Button>
                  ) : (
                     <Button onClick={unFollow} outline>
                        언팔로우
                     </Button>
                  )}
               </div>
               <img className="profileBoardBodyImg" src={clickPost?.img} alt="postimg"></img>
               <p>{clickPost?.content}</p>
            </div>
         </Container>
      </Modal>
   );
};
export default PostDetail;
