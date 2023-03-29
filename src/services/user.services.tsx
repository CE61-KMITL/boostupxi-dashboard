import axios from 'axios';

import { ParsedUrlQuery } from 'querystring';

interface TaskPageQuery extends ParsedUrlQuery {
  id: string;
}
