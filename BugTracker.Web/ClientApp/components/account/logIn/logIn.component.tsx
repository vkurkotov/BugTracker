import * as React from "react";
import * as $ from "jquery";
import { RouteComponentProps } from "react-router";
import { InputText, InputCheckBox, ErrorMessages, HorizontalForm } from "../../common/FormElements";
import { LoadingPanel } from "../../common/LoadingPanel";
import { LogInForm, LogInModel, LogInResponse } from "./logIn.model";
import { ModelStateEntry } from "../../common/MvcClasses"

export class LogIn extends React.Component<RouteComponentProps<{}>, LogInForm> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const defaultState: LogInForm = {
      UserName: {
        Value: "",
        ModelState: new ModelStateEntry()
      },
      Password: {
        Value: "",
        ModelState: new ModelStateEntry()
      },
      GeneralModelStateEntry: {
        ModelState: new ModelStateEntry()
      },
      RememberMe: {
        Value: false,
        ModelState: new ModelStateEntry()
      },
      isLoading: false
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

    this.setState({ isLoading: true });

    const model: LogInModel = {
      Password: this.state.Password && this.state.Password.Value,
      UserName: this.state.UserName && this.state.UserName.Value,
      RememberMe: this.state.RememberMe && this.state.RememberMe.Value
    };

    $.ajax({
      type: "POST",
      url: "/Account/LogIn",
      data: model,
      success: (response: any) => {
        if (response.redirect) {
          this.props.history.push(response.redirect);
        } else {
          const data = response as LogInResponse;

          if (data != null && data) {
            this.updateModelStateFromResponse(data, "UserName");
            this.updateModelStateFromResponse(data, "Password");
            this.updateModelStateFromResponse(data, "RememberMe");
            this.updateModelStateFromResponse(data, "GeneralModelStateEntry");
          }

          this.setState({ isLoading: false });
        }

      },
    });
  }

  private updateModelStateFromResponse = (response: any, propertyName: string): void => {
    const curr = this.state as any;

    let valueInState = curr[propertyName];
    if (valueInState && valueInState.ModelState && response && response[propertyName]) {
      valueInState.ModelState = response[propertyName];
    }
    this.setState({ [propertyName]: valueInState });
  }

  render() {
    return <div>
             <h1>Log in</h1>
             <div className="row">
               <div className="col-md-7">
                 <HorizontalForm handleSubmit={this.handleSubmit} submitLabel="Log In">
                   <LoadingPanel isShown={this.state.isLoading}/>
                   <ErrorMessages modelState={this.state.GeneralModelStateEntry &&
                     this.state.GeneralModelStateEntry.ModelState}/>
                   <InputText label="User Name"
                              name="UserName"
                              value={this.state.UserName ? this.state.UserName.Value : ""}
                              modelState={this.state.UserName ? this.state.UserName.ModelState : new ModelStateEntry()}
                              onChange={this.handleInputChange}
                              type="text"/>
                   <InputText label="Password"
                              name="Password"
                              value={this.state.Password && this.state.Password.Value}
                              modelState={this.state.Password && this.state.Password.ModelState}
                              onChange={this.handleInputChange}
                              type="Password"/>
                   <InputCheckBox label="Remember me"
                                  name="RememberMe"
                                  value={this.state.RememberMe && this.state.RememberMe.Value}
                                  modelState={this.state.RememberMe && this.state.RememberMe.ModelState}
                                  onChange={this.handleInputChange}
                                  type="checkbox"/>
                 </HorizontalForm>
               </div>
             </div>
           </div>;
  }
}