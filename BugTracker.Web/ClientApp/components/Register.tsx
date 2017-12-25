import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ModelStateEntry } from '../MVCClassesPort/ModelStateEntry';
import { GeneralModelStateResponse } from '../MVCClassesPort/GeneralModelStateResponse';
import { ModelStateValue } from "../enums/ModelStateValue";

export class Register extends React.Component<RouteComponentProps<{}>, RegisterForm> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        let defaultState: RegisterForm = {
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
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let curr = this.state as any;

        curr[name].Value = value;
        this.setState(curr as RegisterForm);
    }


    handleSubmit(event: any) {
        event.preventDefault();

        var form = new FormData((document.getElementById('register-form')) as any);

        const model: IRegisterModel = {
            ConfirmPassword: this.state.ConfirmPassword.Value,
            Password: this.state.Password.Value,
            Email: this.state.Email.Value
        };

        fetch("/Account/Register",
                {
                    method: "POST",
                    body: form
                })
            .then(res => res.json() as Promise<RegisterResponse>)
            .then(data => {
                let currentState = this.state;
                currentState.Email.ModelState = data.Email;
                currentState.Password.ModelState = data.Password;
                currentState.ConfirmPassword.ModelState = data.ConfirmPassword;
                currentState.GeneralModel.ModelState = data.GeneralModelStateEntry;
                this.setState(currentState);
            });
    }

    public render() {
        return <div className="row">
                   <div className="col-md-4">
                       <form method="post" id="register-form">
                           <h4>Create a new account.</h4>
                           <hr/>
                           {this.renderErrorMessages(this.state.GeneralModel.ModelState)}
                           <div className="form-group">
                               <label>Email</label>
                               <input className="form-control"
                                      value={this.state.Email.Value}
                                      name="Email"
                                      onChange={this.handleInputChange}
                                      type="email"/>
                               {this.renderErrorMessages(this.state.Email.ModelState)}
                           </div>
                           <div className="form-group">
                               <label>Password</label>
                               <input className="form-control"
                                      value={this.state.Password.Value}
                                      name="Password"
                                      onChange={this.handleInputChange}
                                      type="password" />
                               {this.renderErrorMessages(this.state.Password.ModelState)}
                           </div>
                           <div className="form-group">
                               <label>Confirm Password</label>
                               <input className="form-control"
                                      value={this.state.ConfirmPassword.Value}
                                      name="ConfirmPassword"
                                      onChange={this.handleInputChange}
                                      type="password" />
                               {this.renderErrorMessages(this.state.ConfirmPassword.ModelState)}
                           </div>
                           <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Register</button>
                       </form>
                   </div>
               </div >;
    }

    private renderErrorMessages(modelState: ModelStateEntry) {

        if (modelState &&
            modelState.errors) {
            return <div>
                {modelState.errors.map(error => <div className="text-danger">{error.errorMessage}</div>)}
                   </div>;
        } else {
            return <div></div>;
        }
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