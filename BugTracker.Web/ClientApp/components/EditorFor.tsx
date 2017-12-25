import * as React from 'react';
import { ModelStateEntry } from '../MVCClassesPort/ModelStateEntry';
import { ModelStateValue } from "../enums/ModelStateValue";

export class EditorFor extends React.Component<EditorForProps, any>{
    public render() {
        return <div className={`form-group ${this.getErrorClassName()}`}>
                   <label>{this.props.label}</label>
                   <input className="form-control"
                          value={this.props.value}
                          name={this.props.name}
                          onChange={this.props.onChange}
                          type={this.props.type || "text"}/>
                   {EditorFor.renderErrorMessages(this.props.modelState)}
               </div>;
    }

    public static renderErrorMessages(modelState?: ModelStateEntry) {

        if (modelState &&
            modelState.validationState === ModelStateValue.Invalid &&
            modelState.errors) {
            return <div>
                       {modelState.errors.map(error => <div className="text-danger">{error.errorMessage}</div>)}
                   </div>;
        } else {
            return <div></div>;
        }
    }

    private getErrorClassName(): string {
        if (this.props.modelState && this.props.modelState.validationState === ModelStateValue.Invalid) {
            return "has-error";
        } else {
            return "";
        }
    }
}

interface EditorForProps  {
    label: string;
    value: any;
    name: string;
    type?: string;
    modelState?: ModelStateEntry;
    onChange?: (event: any) => void;
}