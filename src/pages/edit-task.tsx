import { NextPage } from 'next';
import Layouts from '@/layouts/Layouts';
import { ITask } from '@/interface/task';
import { useState, useEffect } from 'react';
import { getTaskById } from '@/services/task.services';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
interface TaskPageQuery extends ParsedUrlQuery {
  id: string;
}
const EditPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as TaskPageQuery;
  const [taskData, setTaskData] = useState<ITask>({} as ITask);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTaskById({ id });

      setTaskData(response);
    };
    fetchData();
  }, [id]);

  console.log(taskData);

  return (
    <Layouts>
      <div className="stars"></div>
    </Layouts>
  );
};
export default EditPage;
