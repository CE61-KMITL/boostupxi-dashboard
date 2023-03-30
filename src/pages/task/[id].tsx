import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loading, PreviewTask } from '@/components';
import { getTaskById } from '@/services/task.services';
import { ParsedUrlQuery } from 'querystring';

interface TaskPageQuery extends ParsedUrlQuery {
  id: string;
}

function Task() {
  const [taskDataById, setTaskDataById] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query as TaskPageQuery;

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const response = await getTaskById({ id });
        setTaskDataById(response);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchDataById();
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
          solution_code={taskDataById.solution_code}
        />
      )}
    </>
  );
}

export default Task;
