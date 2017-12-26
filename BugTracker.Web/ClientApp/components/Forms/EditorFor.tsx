import * as React from 'react';
import { ModelStateEntry } from '../../MVCClassesPort/ModelStateEntry';
import { ModelStateValue } from "../../enums/ModelStateValue";

export class EditorFor extends React.Component<EditorForProps, any> {
  public render() {
    if (this.props.type && this.props.type === "checkbox") {
      return <div className="form-group">
               <div className="col-sm-offset-2 col-sm-10">
                 <div className="checkbox">
                   <label>
                     <input value={this.props.value}
                            name={this.props.name}
                            onChange={this.props.onChange}
                            type="checkbox"/>
                     {this.props.label}
                   </label>
                 </div>
                 {EditorFor.renderErrorMessages(this.props.modelState)}
               </div>
             </div>;
    } else {
      return <div className={`form-group ${this.getErrorClassName()}`}>
               <label htmlFor={this.props.name} className="col-sm-2 control-label text-right">{this.props.label}</label>
               <div className="col-sm-10">
                 <input className="form-control"
                        id={this.props.name}
                        value={this.props.value}
                        name={this.props.name}
                        onChange={this.props.onChange}
                        type={this.props.type || "text"}
                        placeholder={this.props.label}/>
               </div>
               {EditorFor.renderErrorMessages(this.props.modelState)}
             </div>;
    }
  }

  public static renderErrorMessages(modelState?: ModelStateEntry) {

    if (modelState &&
      modelState.validationState === ModelStateValue.Invalid &&
      modelState.errors) {
      return <div>
               {modelState.errors.map(error => <div className="text-danger col-sm-offset-2" key={error.errorMessage}>{error.errorMessage}</div>)}
             </div>;
    } else {
      return <div></div>;
    }
  }

  private getErrorClassName(): string {
    if (this.props.modelState && this.props.modelState.validationState === ModelStateValue.Invalid) {
      return "has-error";
    } if (this.props.modelState && this.props.modelState.validationState === ModelStateValue.Valid) {
      return "has-success";
    }else {
      return "";
    }
  }
}

interface EditorForProps {
  label: string;
  value: any;
  name: string;
  type?: string;
  modelState?: ModelStateEntry;
  onChange?: (event: any) => void;
}