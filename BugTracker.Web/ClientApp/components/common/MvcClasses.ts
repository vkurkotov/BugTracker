export interface ModelError {
  Exception: any;
  errorMessage: string;
}

export interface GeneralModelStateResponse {
  GeneralModelStateEntry: ModelStateEntry;
}

export class ModelStateEntry {
  errors: Array<ModelError>;
  validationState: ModelStateValue;
  AttemptedValue: string;

  public constructor() {
    this.validationState = ModelStateValue.Unvalidated;
  }
}

export enum ModelStateValue {
  Unvalidated = 0,
  Invalid = 1,
  Valid = 2,
  Skipped = 3
}