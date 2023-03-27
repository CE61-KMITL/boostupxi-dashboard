import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Loading, PreviewTask } from '@/components';

function Task() {
  const [taskDataById, setTaskDataById] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  const getTaskById = async () => {
    if (id) {
      const token: string | null = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const res = await axios.get(`/api/tasks/${id}`);
          setTaskDataById(res.data);
          setIsLoading(false);
        } catch (error: Error | any) {
          setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    getTaskById();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <PreviewTask
          _id={taskDataById._id}
          title={taskDataById.title}
          description={taskDataById.description}
          author={taskDataById.author}
          level={taskDataById.level}
          tags={taskDataById.tags}
          files={taskDataById.files}
          hint={taskDataById.hint}
          status={taskDataById.status}
          testcases={taskDataById.testcases}
        />
      )}
    </>
  );
}

export default Task;
