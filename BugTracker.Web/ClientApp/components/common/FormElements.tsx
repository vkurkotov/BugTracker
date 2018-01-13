import * as React from 'react';
import { ModelStateValue, ModelStateEntry } from "./MvcClasses";

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
                type="checkbox" />
              {this.props.label}
            </label>
          </div>
          <ErrorMessages modelState={this.props.modelState} />
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
            placeholder={this.props.label} />
        </div>
        <ErrorMessages modelState={this.props.modelState}/>
      </div>;
    }
  }

  private getErrorClassName(): string {
    if (this.props.modelState && this.props.modelState.validationState === ModelStateValue.Invalid) {
      return "has-error";
    } if (this.props.modelState && this.props.modelState.validationState === ModelStateValue.Valid) {
      return "has-success";
    } else {
      return "";
    }
  }
}

export const InputText = (props: EditorForProps) => {
  var getErrorClassName = (): string => {
    if (props.modelState && props.modelState.validationState === ModelStateValue.Invalid) {
      return "has-error";
    } else {
      return "";
    }
  }

  return <div className={`form-group ${getErrorClassName()}`}>
           <label htmlFor={props.name} className="col-sm-2 control-label text-right">{props.label}</label>
           <div className="col-sm-10">
             <input className="form-control"
                    id={props.name}
                    value={props.value}
                    name={props.name}
                    onChange={props.onChange}
                    type={props.type || "text"}
                    placeholder={props.label}/>
           </div>
           <ErrorMessages modelState={props.modelState}/>
         </div>;
}

export const InputCheckBox = (props: EditorForProps) => {
  return <div className="form-group">
           <div className="col-sm-offset-2 col-sm-10">
             <div className="checkbox">
               <label>
                 <input value={props.value}
                        name={props.name}
                        onChange={props.onChange}
                        type="checkbox"/>
                 {props.label}
               </label>
             </div>
             <ErrorMessages modelState={props.modelState}/>
           </div>
         </div>;
}

export const ErrorMessages = (props: any) => {
  if (props.modelState &&
    props.modelState.validationState &&
    props.modelState.validationState === ModelStateValue.Invalid &&
    props.modelState.errors) {
    return <div>
             {props.modelState.errors.map((error: ModelError) => <div className="text-danger col-sm-offset-2" key={error.errorMessage}>{error.errorMessage}</div>)}
           </div>;
  } else {
    return <div></div>;
  }
}

export const HorizontalForm = (props: any) => {
  const { handleSubmit, submitLabel, children, ...rest } = props;

  return (
    <form className="form-horizontal" {...rest}>
      {props.children}
      <button type="submit" className="btn btn-primary" onClick={props.handleSubmit}>{props.submitLabel}</button>
    </form >
  );
};

interface EditorForProps {
  label: string;
  value: any;
  name: string;
  type?: string;
  modelState?: ModelStateEntry;
  onChange?: (event: any) => void;
}