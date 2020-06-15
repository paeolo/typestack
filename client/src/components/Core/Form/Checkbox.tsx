import React, { ComponentProps } from "react";

export type CheckboxProps = Omit<ComponentProps<'input'>, 'type'>;

export const Checkbox: React.FC<CheckboxProps> = props => <input type="checkbox" {...props} />;

Checkbox.displayName = "Checkbox";
