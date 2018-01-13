import * as React from "react";

export const LoadingPanel = (props: any) => {
  const { isShown: boolean, text: string, ...rest } = props;
  return <div className={props.isShown ? "centeredOverlay" : "hidden"}>
           <span className="glyphicon glyphicon-refresh glyphicon-spin"></span>
           <span>{props.text || "Loading ..."}</span>
         </div>;
}