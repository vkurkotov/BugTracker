import { GeneralModelStateResponse, ModelStateEntry} from "../../common/MvcClasses"

export interface LogInModel {
  UserName?: string;
  Password?: string;
  RememberMe?: boolean;
}

export interface LogInResponse extends GeneralModelStateResponse {
  UserName?: ModelStateEntry;
  Password?: ModelStateEntry;
  RememberMe?: ModelStateEntry;
}

export interface LogInForm {
  UserName?: {
    Value: string;
    ModelState: ModelStateEntry;
  };
  Password?: {
    Value: string;
    ModelState: ModelStateEntry;
  };
  RememberMe?: {
    Value: boolean;
    ModelState: ModelStateEntry;
  };
  GeneralModelStateEntry?: {
    ModelState: ModelStateEntry
  };
  isLoading?: boolean;
}