import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Utils } from '../utils'
import { Logo } from './Logo'

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
  public render() {
    return <div className='container-fluid black-white-bg'>
     
             {Utils.isAuthenticated() &&
               <div>
                 <div className='row'>
                   <div className='col-sm-3'>
                     <NavMenu/>
                   </div>
                   <div className='col-sm-9'>
                     {this.props.children}
                   </div>
                 </div>
                 <div className="row">
                   <footer className="col-sm-9 col-sm-offset-3">
                     <Logo/>
                   </footer>
                 </div>
               </div>}
             {!Utils.isAuthenticated() &&
        <div>
          <div className="header">
            <h1>BUG TRACKER <sub>powered by QA Start Up</sub></h1>
          </div>
                 {this.props.children}
                 <div className="row">
                   <footer className="col-md-8 col-md-offset-2">
                     <Logo/>
                   </footer>
                 </div>
               </div>
             }
           </div>;
  }
}