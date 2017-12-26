import * as React from "react"

export const HorizontalForm = (props: any) => {
  const { handleSubmit, submitLabel, children, ...rest } = props;

  return (
    <form className="form-horizontal" {...rest}>
      {props.children}
      <button type="submit" className="btn btn-primary" onClick={props.handleSubmit}>{props.submitLabel}</button>
    </form >
  );
};