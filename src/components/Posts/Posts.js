import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Button, Container, Input, Modal, Spinner } from 'reactstrap';
import { selectUserById } from '../../store/users';
import { GoDiffAdded } from 'react-icons/go';
import './Posts.css';
import '../Profile/ProfileBody.css';
import { deletePost, insertPosts, selectMyPost, selectOtherPost } from '../../store/posts';
import PostDetail from './PostDetail';

const Posts = ({ postState, posts }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [clickPost, setClickPost] = useState();
   const [postUser, setPostUser] = useState();
   const dispatch = useDispatch();
   const location = useLocation();

   const openModal = post => {
      dispatch(selectUserById(post.userId))
         .unwrap()
         .then(result => {
            setPostUser(result);
         })
         .finally(() => {
            setClickPost(post);
            setIsOpen(true);
         });
   };
   const closeModal = () => {
      setClickPost();
      setIsOpen(false);
   };
   const onClickDelete = postId => {
      // deletePost(postId);
      dispatch(deletePost(postId));
      dispatch(location.pathname === '/profile' ? selectMyPost() : selectOtherPost());
      setIsOpen(false);
      // closeModal();
   };

   return (
      <div className="Posts">
         {postState?.loading ? (
            <Spinner>Loading...</Spinner>
         ) : (
            posts?.map(post => (
               <div className="PostsImgBox" onClick={() => openModal(post)} key={post.id}>
                  <img className="PostsImg" key={post.id} src={post.img} alt={post.content}></img>
               </div>
            ))
         )}
         {clickPost ? (
            <PostDetail
               // name={name}
               // img={img}
               isOpen={isOpen}
               clickPost={clickPost}
               closeModal={closeModal}
               onClickDelete={onClickDelete}
               user={postUser}></PostDetail>
         ) : null}
      </div>
   );
};

export default Posts;
