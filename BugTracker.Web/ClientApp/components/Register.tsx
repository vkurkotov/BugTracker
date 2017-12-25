import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ModelStateEntry } from "../MVCClassesPort/ModelStateEntry";
import { GeneralModelStateResponse } from "../MVCClassesPort/GeneralModelStateResponse";
import { EditorFor } from "./EditorFor";

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
            GeneralModel: {
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
        this.setState(curr as RegisterForm);
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

        fetch("/Account/Register",
                {
                    method: "POST",
                    body: form
                })
            .then(res => res.json() as Promise<RegisterResponse>)
            .then(data => {
                const currentState = this.state;
                currentState.Email.ModelState = data.Email;
                currentState.Password.ModelState = data.Password;
                currentState.ConfirmPassword.ModelState = data.ConfirmPassword;
                currentState.GeneralModel.ModelState = data.GeneralModelStateEntry;
                this.setState(currentState);
            });
    }

    public render() {
        return <div>
                   <h1>Create a new account</h1>
                   <div className="row">
                       <div className="col-md-4">
                           <form method="post" id="register-form">
                               {EditorFor.renderErrorMessages(this.state.GeneralModel.ModelState)}
                               <EditorFor label="Email"
                                          name="Email"
                                          value={this.state.Email.Value}
                                          modelState={this.state.Email.ModelState}
                                          onChange={this.handleInputChange}
                                          type="email"/>
                               <EditorFor label="Password"
                                          name="Password"
                                          value={this.state.Password.Value}
                                          modelState={this.state.Password.ModelState}
                                          onChange={this.handleInputChange}
                                          type="password"/>
                               <EditorFor label="Confirm Password"
                                          name="ConfirmPassword"
                                          value={this.state.ConfirmPassword.Value}
                                          modelState={this.state.ConfirmPassword.ModelState}
                                          onChange={this.handleInputChange}
                                          type="password"/>
                               <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Register</button>
                           </form>
                       </div>
                   </div>
               </div>;
    }
}

interface IRegisterModel {
    Email: string;
    Password: string;
    ConfirmPassword: string;
}

interface RegisterResponse extends GeneralModelStateResponse {
    Email: ModelStateEntry;
    Password: ModelStateEntry;
    ConfirmPassword: ModelStateEntry;
}

interface RegisterForm {
    Email: {
        Value: string;
        ModelState: ModelStateEntry;
    };
    Password: {
        Value: string;
        ModelState: ModelStateEntry;
    };
    ConfirmPassword: {
        Value: string;
        ModelState: ModelStateEntry;
    };
    GeneralModel: {
        ModelState: ModelStateEntry
    };
}