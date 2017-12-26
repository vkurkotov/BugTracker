import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ModelStateEntry } from "../../MVCClassesPort/ModelStateEntry";
import { GeneralModelStateResponse } from "../../MVCClassesPort/GeneralModelStateResponse";
import { EditorFor } from "../Forms/EditorFor";
import { HorizontalForm } from "../Forms/HorizontalForm";

export class LogIn extends React.Component<RouteComponentProps<{}>, LogInForm> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const defaultState: LogInForm = {
      Email: {
        Value: "",
        ModelState: new ModelStateEntry()
      },
      Password: {
        Value: "",
        ModelState: new ModelStateEntry()
      },
      GeneralModel: {
        ModelState: new ModelStateEntry()
      },
      RememberMe: {
        Value: false,
        ModelState: new ModelStateEntry()
      }
    };

    this.state = defaultState;
  }

  handleInputChange(event: any) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    const curr = this.state as any;

    curr[name].Value = value;
    curr[name].ModelState = new ModelStateEntry();
    this.setState(curr as LogInForm);
  }


  handleSubmit(event: any) {
    event.preventDefault();

    const form = new FormData((document.getElementById("register-form")) as any);

    /*
    const model: IRegisterModel = {
        ConfirmPassword: this.state.ConfirmPassword.Value,
        Password: this.state.Password.Value,
        Email: this.state.Email.Value
    };
    */

    fetch("/Account/LogIn",
        {
          method: "POST",
          body: form
        })
      .then(res => res.json() as Promise<LogInResponse>)
      .then(data => {
        const currentState = this.state;
        currentState.Email.ModelState = data.Email;
        currentState.Password.ModelState = data.Password;
        currentState.RememberMe.ModelState = data.RememberMe;
        currentState.GeneralModel.ModelState = data.GeneralModelStateEntry;
        this.setState(currentState);
      });
  }

  render() {
    return <div>
             <h1>Log in</h1>
             <div className="row">
               <div className="col-md-7">
                 <HorizontalForm handleSubmit={this.handleSubmit} submitLabel="Log In" id="register-form">
                   {EditorFor.renderErrorMessages(this.state.GeneralModel.ModelState)}
                   <EditorFor label="Email"
                              name="Email"
                              value={this.state.Email.Value}
                              modelState={this.state.Email.ModelState}
                              onChange={this.handleInputChange}
                              type="Email"/>
                   <EditorFor label="Password"
                              name="Password"
                              value={this.state.Password.Value}
                              modelState={this.state.Password.ModelState}
                              onChange={this.handleInputChange}
                              type="Password"/>
                   <EditorFor label="Remember me"
                              name="RememberMe"
                              value={this.state.RememberMe.Value}
                              modelState={this.state.RememberMe.ModelState}
                              onChange={this.handleInputChange}
                              type="checkbox"/>
                 </HorizontalForm>
               </div>
             </div>
           </div>;
  }
}

interface LogInModel {
    Email: string;
    Password: string;
    RememberMe: boolean;
}

interface LogInResponse extends GeneralModelStateResponse {
    Email: ModelStateEntry;
    Password: ModelStateEntry;
    RememberMe: ModelStateEntry;
}

interface LogInForm {
    Email: {
        Value: string;
        ModelState: ModelStateEntry;
    };
    Password: {
        Value: string;
        ModelState: ModelStateEntry;
    };
    RememberMe: {
        Value: boolean;
        ModelState: ModelStateEntry;
    };
    GeneralModel: {
        ModelState: ModelStateEntry
    };
}