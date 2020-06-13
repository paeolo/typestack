import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { FieldBody } from "./FieldBody";
import { FieldLabel } from "./FieldLabel";

export const FieldTypes = {
  alignments: ["centered", "right"] as const,
  kinds: ["addons", "group"] as const,
};

export type FieldProps = {
  align?: typeof FieldTypes["alignments"][number];
  expanded?: boolean;
  horizontal?: boolean;
  kind?: typeof FieldTypes["kinds"][number];
  multiline?: boolean;
  narrow?: boolean;
  className?: string;
};

const FieldComponent: React.FC<FieldProps> = props => {

  let k: string | undefined;
  if (props.kind === "addons") {
    k = "has-addons";
  } else if (props.kind === "group") {
    k = "is-grouped";
  }

  return (
    <div className={classNames("field", props.className,
      {
        [`${k}`]: k,
        [`${k}-${props.align}`]: k !== undefined && props.align !== undefined,
        [`${k}-multiline`]: k === "is-grouped" && props.multiline === true,
        "is-expanded": props.expanded,
        "is-horizontal": props.horizontal,
        "is-narrow": props.narrow,
      },
    )}>
      {props.children}
    </div>
  );
}

export const Field = Object.assign(
  FieldComponent,
  {
    Body: FieldBody,
    Label: FieldLabel,
  },
);

Field.displayName = "Field";
Field.propTypes = {
  align: PropTypes.oneOf(FieldTypes['alignments']),
  expanded: PropTypes.bool,
  horizontal: PropTypes.bool,
  kind: PropTypes.oneOf(FieldTypes['kinds']),
  multiline: PropTypes.bool,
  narrow: PropTypes.bool,
};
