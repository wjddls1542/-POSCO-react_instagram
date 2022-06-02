import { useState } from 'react';
import './ProfileBoard.css';
import ProfileBoardDetail from './ProfileBoardDetail';

const ProfileBoard = ({ posts, name, img, deletePost }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [clickPost, setClickPost] = useState();
   const openModal = post => {
      setClickPost(post);
      setIsOpen(true);
   };
   const closeModal = () => {
      setClickPost();
      setIsOpen(false);
   };
   const onClickDelete = postId => {
      deletePost(postId);
      closeModal();
   };
   console.log(name);
   return (
      <div className="profileBoard">
         {posts?.map(post => (
            <div className="profileBoardImgBox" onClick={() => openModal(post)} key={post.id}>
               <img className="profileBoardImg" key={post.id} src={post.img} alt={post.content}></img>
            </div>
         ))}
         <ProfileBoardDetail
            name={name}
            img={img}
            isOpen={isOpen}
            clickPost={clickPost}
            closeModal={closeModal}
            onClickDelete={onClickDelete}></ProfileBoardDetail>
      </div>
   );
};

export default ProfileBoard;
