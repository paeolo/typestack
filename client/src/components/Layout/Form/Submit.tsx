import React from 'react'
import { Button, Field, Control } from "@components/Core"

interface SubmitProps {
  loading?: boolean;
  error?: boolean;
}

export const Submit = (props: SubmitProps) => {

  return (
    <Field kind="group" align="right">
      <Control>
        <Button
          color={props.error ? "danger" : "light"}
          state={props.loading ? "loading" : "active"}
          type="submit">
          Submit
      </Button>
      </Control>
    </Field>
  )
}
