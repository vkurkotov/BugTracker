import { ModelStateValue } from "../enums/ModelStateValue";

export class ModelStateEntry {
    errors: Array<ModelError>;
    ValidationState: ModelStateValue;
    AttemptedValue: string;

    public constructor() {
        this.ValidationState = ModelStateValue.Unvalidated;
    }
}