import { UserContext } from '../../store/UserContext';
import { useContext } from 'react';
import './Profile.css';
import { Container } from 'reactstrap';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';
import { PostContext } from '../../store/PostContext';
import { FollowContext } from '../../store/FollowContext';
import ProfileBoard from './ProfileBoard';

const Profile = () => {
   const { users } = useContext(UserContext);
   const id = Number(localStorage.getItem('id'));
   const getUser = () => {
      return users.find(user => id === user.id);
   };

   const { name, img } = getUser();
   const { posts, deletePost } = useContext(PostContext);
   const { follows } = useContext(FollowContext);
   const myPosts = () => {
      return posts.filter(post => post.userId === id);
   };
   const myFollower = () => {
      return follows.filter(follow => follow.following === id);
   };
   const myFollowing = () => {
      return follows.filter(follow => follow.follower === id);
   };
   console.log([posts, myPosts()]);
   return (
      <>
         <ProfileHeader name={name}></ProfileHeader>
         <Container className="ProfileContainer">
            <ProfileBody img={img} follower={myFollower()} following={myFollowing()} posts={myPosts()}></ProfileBody>
            <ProfileBoard posts={myPosts()} name={name} img={img} deletePost={deletePost}></ProfileBoard>
         </Container>
      </>
   );
};

export default Profile;