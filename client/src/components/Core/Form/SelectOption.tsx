import React, { ComponentProps } from "react";

export type SelectOptionProps = ComponentProps<'option'>;

export const SelectOption: React.FC<SelectOptionProps> = props => <option {...props} />

SelectOption.displayName = "Select.Option";
