import { UserProfile } from '@/interface/user';
import Image from 'next/image';
import Avatar from '/public/avatar-image.png';

const ProfileCard = ({ _id, username, email, role }: UserProfile) => {
  return (
    <div className="my-4 py-2 flex relative overflow-hidden items-center justify-center bg-gray-700 rounded-xl border-ani">
      <div className="flex flex-row mx-8 w-full justify-start items-center">
      <div className="w-1/10 relative z-10">
        <Image src={Avatar} alt={'Avatar Image'} width={150} />
      </div>
      <div className="w-9/10 px-6 py-4 relative z-10">
        <div className="mb-2 text-7xl text-transparent font-bold font-outline-01">{username}</div>
        <p className="text-base text-white">{_id}</p>
        <p className="text-base text-white">{email}</p>
        <p className="text-base text-white">{role}</p>
      </div>
      </div>
    </div>
  );
};

export default ProfileCard;
