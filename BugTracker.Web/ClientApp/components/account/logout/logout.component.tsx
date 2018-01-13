import * as React from 'react';
import * as $ from "jquery";
import { RouteComponentProps } from "react-router";
import { LoadingPanel } from "../../common/LoadingPanel";

export class LogOut extends React.Component<RouteComponentProps<{}>, {}>{
  componentDidMount() {
    $.ajax({
      type: "POST",
      url: "/Account/LogOut",
      success: (response: any) => {
        if (response.redirect) {
          this.props.history.push(response.redirect);
        } else {
          this.props.history.push("/");
        }
      },
    });
  }

  render() {
    return <div className="h-100p">
             <LoadingPanel isShown={true} text="Loggin out"/>
           </div>;
  }
}