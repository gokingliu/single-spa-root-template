import { ResponseUserAuth } from './user';

export interface SingleSpaRootPath {
  rootPath: string;
}

export interface SingleSpaAppProps {
  userAuth: ResponseUserAuth | null | undefined;
}
