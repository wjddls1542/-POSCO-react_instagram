import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Posts from '../Posts/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { selectOtherPost, selectPostsByKey } from '../../store/posts';
import { selectUserByKey } from '../../store/users';

const Search = () => {
   const dispatch = useDispatch();
   const me = useSelector(state => state.users.me);
   const id = useSelector(state => state.users.myId);
   const otherPosts = useSelector(state => state.posts.otherPosts);
   const posts = useSelector(state => state.posts.posts);
   useEffect(() => {
      dispatch(selectOtherPost());
      setSearchPost(otherPosts);
   }, []);

   const [searchPost, setSearchPost] = useState(otherPosts);
   const [searchKey, setSearchKey] = useState();

   const onSubmitSearch = async e => {
      e.preventDefault();
      const findUserId = await dispatch(selectUserByKey(searchKey)).unwrap();
      await dispatch(selectPostsByKey({ searchKey, userId: findUserId }));
   };
   return (
      <div>
         <SearchBar searchKey={searchKey} setSearchKey={setSearchKey} onSubmitSearch={onSubmitSearch}></SearchBar>
         <Posts posts={otherPosts.posts} postState={otherPosts}></Posts>
      </div>
   );
};
export default Search;
