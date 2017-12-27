import * as React from "react";
import * as $ from "jquery";
import { RouteComponentProps } from "react-router";
import { InputText, ErrorMessages, HorizontalForm } from "../../common/FormElements";
import { RegisterForm, RegisterResponse, RegisterModel } from "./register.model"
import { ModelStateEntry } from "../../common/MvcClasses"

export class Register extends React.Component<RouteComponentProps<{}>, RegisterForm> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    const defaultState: RegisterForm = {
      Email: {
        Value: "",
        ModelState: new ModelStateEntry()
      },
      ConfirmPassword: {
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
    this.setState(curr as RegisterForm);
  }


  handleSubmit(event: any) {
    event.preventDefault();

    const model: RegisterModel = {
      ConfirmPassword: this.state.ConfirmPassword && this.state.ConfirmPassword.Value,
      Password: this.state.Password && this.state.Password.Value,
      Email: this.state.Email && this.state.Email.Value
    };

    $.ajax({
      type: "POST",
      url: "/Account/Register",
      data: model,
      success: (response: any) => {
        if (response.redirect) {
          this.props.history.push(response.redirect);
        } else {
          const data = response as RegisterResponse;

          if (data != null && data) {
            this.updateModelStateFromResponse(data, "Email");
            this.updateModelStateFromResponse(data, "Password");
            this.updateModelStateFromResponse(data, "ConfirmPassword");
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

  public render() {
    return <div>
             <h1>Create a new account</h1>
             <div className="row">
               <div className="col-md-7">
                 <HorizontalForm handleSubmit={this.handleSubmit} submitLabel="Register">
                   <ErrorMessages modelState={this.state.GeneralModelStateEntry && this.state.GeneralModelStateEntry.ModelState}/>
                   <InputText label="Email"
                              name="Email"
                              value={this.state.Email && this.state.Email.Value}
                              modelState={this.state.Email ? this.state.Email.ModelState : new ModelStateEntry()}
                              onChange={this.handleInputChange}
                              type="email"/>
                   <InputText label="Password"
                              name="Password"
                              value={this.state.Password && this.state.Password.Value}
                              modelState={this.state.Password && this.state.Password.ModelState}
                              onChange={this.handleInputChange}
                              type="password"/>
                   <InputText label="Confirm Password"
                              name="ConfirmPassword"
                              value={this.state.ConfirmPassword && this.state.ConfirmPassword.Value}
                              modelState={this.state.ConfirmPassword && this.state.ConfirmPassword.ModelState}
                              onChange={this.handleInputChange}
                              type="password"/>
                 </HorizontalForm>
               </div>
             </div>
           </div>;
  }
}