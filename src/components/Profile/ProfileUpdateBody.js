import { Input, InputGroup, InputGroupText } from 'reactstrap';

const ProfileUpdateBody = ({ onChangeFile, onChangeName, form }) => {
   return (
      <div className="profileUpdateForm">
         <Input type="file" hidden accept="image/*" id="imgUpload" onChange={e => onChangeFile(e)}></Input>
         <label htmlFor="imgUpload">
            <div className="profileImgBox">
               <img className="profileImg" src={form.img} alt="myProfileImg"></img>
            </div>
         </label>

         <InputGroup>
            <InputGroupText>이름</InputGroupText>
            <Input type="text" value={form.name} onChange={e => onChangeName(e)}></Input>
         </InputGroup>
      </div>
   );
};
export default ProfileUpdateBody;
