import './ProfileHeader.css';
import { GoDiffAdded } from 'react-icons/go';
import { AiOutlineMenu } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from 'reactstrap';
import { logout } from '../../store/users';

const ProfileHeader = ({ name }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const onClickLogout = () => {
      dispatch(logout());
      navigate('/login');
   };
   return (
      <div className="ProfileHeaderBox">
         <div>
            <h2>{name}</h2>
         </div>
         <div>
            <Button outline>
               <GoDiffAdded size={30}></GoDiffAdded>
            </Button>
            <Button outline onClick={onClickLogout}>
               <AiOutlineMenu size={30}></AiOutlineMenu>
            </Button>
         </div>
      </div>
   );
};
export default ProfileHeader;
