import * as React from "react";

export const LoadingPanel = (props: any) => {
  const { isShown: boolean, ...rest } = props;
  return <div className={props.isShown ? "centeredOverlay" : "hidden"}>
           <span className="glyphicon glyphicon-refresh glyphicon-spin"></span>
           <span>Loading ...</span>
         </div>;
}