import Image from 'next/image';
import Avatar from '/public/avatar-image.jpg';
import DeleteIcon from '/public/delete-icon.svg';
import EditIcon from '/public/edit-icon.svg';
import { Fragment, useState } from 'react';
import { IComment } from '@/interface/task';
import { deleteComment, editComment } from '@/services/task.services';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/auth';

const Comment = ({ id, taskId, message, author, updatedAt }: IComment) => {
  const { user } = useAuth();
  const [commentMessage, setCommentMessage] = useState<string>(message);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const reviewer = user.username;

  const handleDeleteComment = () => {
    try {
      deleteComment(id, taskId);
      toast.success('Comment deleted successfully');
    } catch (err) {
      toast.error('Failed to delete comment');
    }
  };

  const handleEditComment = () => {
    try {
      editComment(id, taskId, { message: commentMessage });
      toast.success('Comment updated successfully');
      setIsEdit(false);
    } catch (err) {
      toast.error('Failed to update comment');
    }
  };

  return (
    <Fragment>
      <article className="mb-6 rounded-lg bg-white p-6 text-base ">
        <footer className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-3 inline-flex items-center text-xl text-gray-900 ">
              <Image
                src={Avatar}
                alt={'Avatar Image'}
                width={1000}
                className="mr-2 h-6 w-6 rounded-full"
              />
              {author?.username}
            </p>
            <p className="text-sm text-gray-600 ">
              <time title="February 8th, 2022">{updatedAt}</time>
            </p>
          </div>
          {author?.username === reviewer ? (
            <div className="items-end justify-end space-x-3 rounded-lg bg-white p-2 text-center text-sm font-medium focus:outline-none focus:ring-4 ">
              <button type="button" onClick={() => setIsEdit(!isEdit)}>
                <Image src={EditIcon} alt="Edit-Icon" className="h-6 w-6" />
              </button>
              <button type="button" onClick={handleDeleteComment}>
                <Image src={DeleteIcon} alt="Delete-Icon" className="h-6 w-6" />
              </button>
            </div>
          ) : null}
        </footer>
        {isEdit ? (
          <div>
            <textarea
              className="w-full rounded-xl border-2 border-black px-5 py-2 pt-2 text-xl text-gray-700 focus:outline-none focus:ring-0"
              placeholder="Write a comment..."
              required
              value={commentMessage}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setCommentMessage(e.target.value);
              }}
            ></textarea>
            <div className="mt-3 flex items-end justify-end">
              {/* <button onClick={handleEditComment}>Update Comment</button> */}
              <button
                type="button"
                className=" inline-block rounded bg-blue-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                onClick={handleEditComment}
              >
                Updated Button
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xl text-gray-600">{message}</p>
        )}
      </article>
      <hr />
    </Fragment>
  );
};

export default Comment;
