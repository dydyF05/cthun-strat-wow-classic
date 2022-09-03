import { LogParams } from '../types/log.d';

const log = (params: LogParams): void => {
  console.groupCollapsed(params.message);
  console.log('params', params);
  console.groupEnd();
};

export default log;
