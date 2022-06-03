// import AuthRouter from './AuthRouter';

import { useDispatch, useSelector } from 'react-redux';
import { selectMyFollower } from '../store/follows';
import { useEffect } from 'react';
import { Card, Container, Spinner } from 'reactstrap';
import { selectPostMain } from '../store/posts';
import PostsAdd from './Posts/PostsAdd';
import './Posts/PostDetail.css';
import './Main.css';
const Main = () => {
   const mainPosts = useSelector(state => state.posts.mainPosts);
   console.log(mainPosts);
   const dispatch = useDispatch();
   const followOtherPost = async () => {
      await dispatch(selectMyFollower());
      await dispatch(selectPostMain());
   };
   useEffect(() => {
      followOtherPost();
   }, []);
   return (
      <div>
         <MainHeader></MainHeader>
         <Container>
            {mainPosts.loading ? (
               <Spinner>Loading...</Spinner>
            ) : (
               mainPosts.posts.map(post => <MainCard key={post.id} post={post}></MainCard>)
            )}
         </Container>
      </div>
   );
};
const MainHeader = () => {
   return (
      <div className="mainHeader">
         <div className="mainImgBox">
            <img
               className="mainLogo"
               src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"></img>
         </div>
         <PostsAdd></PostsAdd>
      </div>
   );
};

const MainCard = ({ post }) => {
   return (
      <Card className="mainCard">
         <div className="profileBoardBodyHeader">
            <div className="profileBoardBodyHeaderImgBox">
               <img className="profileBoardBodyHeaderImg" src={post.userImg} alt="userImg"></img>
            </div>
            {post.userName}
         </div>
         <img className="profileBoardBodyImg" src={post?.img} alt="postimg"></img>
         <p>{post?.Content}</p>
      </Card>
   );
};

export const getPostMain = async (posts, follows, users) => {
   try {
      const filterPostMain = await posts.filter(({ userId }) => follows.every(({ following }) => userId !== following));
      const joinPostMain = await filterPostMain.map(post => {
         const user = users.find(user => user.id === post.userId);
         return { ...post, userName: user.name, userImg: user.img };
      });
      return joinPostMain;
   } catch (error) {
      throw error;
   }
};

export default Main;
