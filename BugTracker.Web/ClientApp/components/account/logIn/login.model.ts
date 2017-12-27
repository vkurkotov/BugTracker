import { GeneralModelStateResponse, ModelStateEntry} from "../../common/MvcClasses"

export interface LogInModel {
  Email?: string;
  Password?: string;
  RememberMe?: boolean;
}

export interface LogInResponse extends GeneralModelStateResponse {
  Email?: ModelStateEntry;
  Password?: ModelStateEntry;
  RememberMe?: ModelStateEntry;
}

export interface LogInForm {
  Email?: {
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