import { useEffect } from 'react';
import './Profile.css';
import { Container } from 'reactstrap';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';
import Posts from '../Posts/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyPost } from '../../store/posts';
import { selectMyFollower, selectMyFollowing } from '../../store/follows';

const Profile = () => {
   const { name, img, id } = useSelector(state => state.users.me);
   const myPosts = useSelector(state => state.posts.myPosts);
   const follower = useSelector(state => state.follows.myFollower);
   const following = useSelector(state => state.follows.myFollowing);
   const dispatch = useDispatch();
   const getMyPost = () => {
      dispatch(selectMyPost());
   };
   const myFollower = () => {
      dispatch(selectMyFollower());
   };
   const myFollowing = () => {
      dispatch(selectMyFollowing());
   };
   useEffect(() => {
      getMyPost();
      myFollower();
      myFollowing();
   }, []);

   return (
      <>
         <ProfileHeader name={name}></ProfileHeader>
         <Container className="ProfileContainer">
            <ProfileBody img={img} follower={follower} following={following} posts={myPosts} name={name}></ProfileBody>
            <Posts posts={myPosts.posts} name={name} img={img} postState={myPosts}></Posts>
         </Container>
      </>
   );
};

export default Profile;
