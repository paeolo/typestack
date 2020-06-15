import React, { ComponentProps } from "react";

export type RadioProps = Omit<ComponentProps<'input'>, 'type'>;

export const Radio: React.FC<RadioProps> = props => <input type="radio" {...props} />

Radio.displayName = "Radio";
