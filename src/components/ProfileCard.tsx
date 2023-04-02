import { UserProfile } from '@/interface/user';
import Image from 'next/image';
import Avatar from '/public/avatar-image.png';

const ProfileCard = ({ _id, username, email, role }: UserProfile) => {
  return (
    <div className="border-ani relative my-4 flex items-center justify-center overflow-hidden rounded-xl bg-gray-700 py-2">
      <div className="mx-8 flex w-full flex-row items-center justify-start">
        <div className="w-1/10 relative z-10">
          <Image src={Avatar} alt={'Avatar Image'} width={150} />
        </div>
        <div className="w-9/10 relative z-10 px-6 py-4">
          <div className="font-outline-01 mb-2 text-7xl font-bold text-transparent">
            {username}
          </div>
          <p className="text-base text-white">{_id}</p>
          <p className="text-base text-white">{email}</p>
          <p className="text-base text-white">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
