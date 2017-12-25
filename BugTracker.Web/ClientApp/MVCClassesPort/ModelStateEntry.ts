import { ModelStateValue } from "../enums/ModelStateValue";

export class ModelStateEntry {
    errors: Array<ModelError>;
    validationState: ModelStateValue;
    AttemptedValue: string;

    public constructor() {
        this.validationState = ModelStateValue.Unvalidated;
    }
}