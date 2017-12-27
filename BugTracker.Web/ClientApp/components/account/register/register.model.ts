import { GeneralModelStateResponse, ModelStateEntry } from "../../common/MvcClasses"

export interface RegisterModel {
  Email?: string;
  Password?: string;
  ConfirmPassword?: string;
}

export interface RegisterResponse extends GeneralModelStateResponse {
  Email?: ModelStateEntry;
  Password?: ModelStateEntry;
  ConfirmPassword?: ModelStateEntry;
}

export interface RegisterForm {
  Email?: {
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