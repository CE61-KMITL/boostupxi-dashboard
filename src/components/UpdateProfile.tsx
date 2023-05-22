import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { getProfile, updateUser } from '@/services/user.services';
import { toast } from 'react-hot-toast';
import { IUpdateUser } from '@/interface/user';
import { useAuth } from '@/contexts/auth';

interface Props {
  handleCloseModal: () => void;
  username: string;
  email: string;
  role: string;
  _id: string;
}

const UpdateProfile = ({
  username,
  email,
  role,
  _id: id,
  handleCloseModal,
}: Props) => {
  const [user, setUser] = useState({
    username: username,
    email: email,
    role: role,
    password: '',
    confirmPassword: '',
  });

  const { setUser: setUserContext } = useAuth();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.password === user.confirmPassword) {
      const userData: IUpdateUser = {
        username: user.username,
        password: user.password,
      };

      if (user.password === '' && user.confirmPassword === '') {
        userData.password = undefined;
      }

      await updateUser(id, userData);

      const updatedUser = await getProfile();
      setUserContext(updatedUser);
    } else {
      toast.error('Password does not match.');
    }
  };

  return (
    <Fragment>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70">
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-3xl rounded-xl bg-white p-12">
            <button onClick={handleCloseModal}>Close</button>
            <h1>Update Profile</h1>
            <form className="w-full" onSubmit={onSubmit}>
              <div className="">
                <div className="">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setUser({ ...user, username: e.target.value });
                    }}
                  />
                </div>
                <div className="">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    disabled
                  />
                </div>
              </div>
              <div>
                <div className="">
                  <label htmlFor="role">Role</label>
                  <input type="text" name="role" value={user.role} disabled />
                </div>
              </div>
              <div>
                <div className="">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setUser({ ...user, confirmPassword: e.target.value });
                    }}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <button type="submit">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
