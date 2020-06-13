import classNames from "classnames";
import React from "react";

interface FieldBodyProps {
  className?: string;
}

export const FieldBody: React.FC<FieldBodyProps> = props => {
  return (
    <div
      className={classNames("field-body", props.className)}>
      {props.children}
    </div >
  );
}

FieldBody.displayName = "Field.Body";
