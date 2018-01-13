import { GeneralModelStateResponse, ModelStateEntry } from "../../common/MvcClasses"

export interface RegisterModel {
  UserName?: string;
  Password?: string;
  ConfirmPassword?: string;
}

export interface RegisterResponse extends GeneralModelStateResponse {
  UserName?: ModelStateEntry;
  Password?: ModelStateEntry;
  ConfirmPassword?: ModelStateEntry;
}

export interface RegisterForm {
  UserName?: {
    Value: string;
    ModelState: ModelStateEntry;
  };
  Password?: {
    Value: string;
    ModelState: ModelStateEntry;
  };
  ConfirmPassword?: {
    Value: string;
    ModelState: ModelStateEntry;
  };
  GeneralModelStateEntry?: {
    ModelState: ModelStateEntry
  };
  isLoading?: boolean;
}