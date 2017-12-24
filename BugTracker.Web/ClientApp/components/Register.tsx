import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Register extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);

        this.state = {
            Email: "",
            Password: "",
            ConfirmPassword: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }



    handleSubmit(event: any) {
        event.preventDefault();

        var form = new FormData((document.getElementById('register-form')) as any);

        const model: IRegisterModel = {
            ConfirmPassword: this.state.ConfirmPassword,
            Password: this.state.Password,
            Email: this.state.Email
        };

        fetch("/Account/Register",
                {
                    method: "POST",
                    body: form
                })
            .then(res => res.json())
            .then(data => { alert(JSON.stringify(data)) });


        //let data = new FormData();
        //data.append("json", JSON.stringify(model));

        //fetch("/Account/Register",
        //        {
        //            method: "POST",
        //            body: model
        //        })
        //    .then(res => res.json())
        //    .then(data => { alert(JSON.stringify(data)) });

    }

    public render() {
        return <div className="row">
                   <div className="col-md-4">
                       <form method="post" id="register-form">
                           <h4>Create a new account.</h4>
                           <hr/>
                           <div asp-validation-summary="All" className="text-danger"></div>
                           <div className="form-group">
                               <label>Email</label>
                               <input className="form-control"
                                      value={this.state.Email}
                                      name="Email"
                                      onChange={this.handleInputChange}
                                      type="email" />
                               <span className="text-danger"></span>
                           </div>
                           <div className="form-group">
                               <label>Password</label>
                               <input className="form-control"
                                      value={this.state.Password}
                                      name="Password"
                                      onChange={this.handleInputChange}
                                      type="password"  />
                               <span asp-validation-for="Password" className="text-danger"></span>
                           </div>
                           <div className="form-group">
                               <label>Confirm Password</label>
                               <input className="form-control"
                                      value={this.state.ConfirmPassword}
                                      name="ConfirmPassword"
                                      onChange={this.handleInputChange}
                                      type="password" />
                               <span asp-validation-for="ConfirmPassword" className="text-danger"></span>
                           </div>
                           <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Register</button>
                       </form>
                   </div>
               </div >;
    }
}

interface IRegisterModel {
    Email: string;
    Password: string;
    ConfirmPassword: string;
}