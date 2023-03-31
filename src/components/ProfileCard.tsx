import { UserProfile } from '@/interface/user';
import Image from 'next/image';
import Avatar from '/public/avatar-image.jpg';

const ProfileCard = ({ _id, username, email, role }: UserProfile) => {
  return (
    <div className="my-4 flex rounded-lg bg-white shadow-lg">
      <div className="w-1/10">
        <Image src={Avatar} alt={'Avatar Image'} width={150} />
      </div>

      <div className="w-9/10 px-6 py-4">
        <div className="mb-2 text-xl font-bold">{username}</div>
        <p className="text-base text-gray-700">{_id}</p>
        <p className="text-base text-gray-700">{email}</p>
        <p className="text-base text-gray-700">{role}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
