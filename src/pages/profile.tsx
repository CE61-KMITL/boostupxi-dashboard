import { NextPage } from 'next';
import TaskList from '../constants/task';
import { UserProfile } from '@/interface/user';
import ProfileCard from '../components/ProfileCard';
import Layouts from '@/layouts/Layouts';

const ProfilePage: NextPage = () => {
  //const [profileData, setProfileData] = {};

  //   const getProfile = async () => {};

  //=====================MOCK DATA MUST BE CHANGE=======================
  //     const token: string | null = localStorage.getItem('token');
  //     if (token) {
  //         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //         await axios.get('http://localhost:5000/profile').then((res) => {
  //             setProfileData(res.data);
  //         });
  //     }
  // };
  //=====================MOCK DATA MUST BE CHANGE=======================

  // setProfileData({
  //     _id: "string",
  //     username: "string",
  //     email: "string",
  //     role: "string",
  //     tasks: [
  //         TaskForm
  //     ],
  // });
  // };
  // useEffect(() => {
  //     getProfile();
  //   }, []);

  const profileData: UserProfile = {
    _id: 'This is my identity',
    username: 'My Username',
    email: 'Email',
    role: 'My role',
    tasks: [TaskList[1]],
  };

  return (
    <Layouts>
      <ProfileCard {...profileData} />
    </Layouts>
  );
};
export default ProfilePage;
