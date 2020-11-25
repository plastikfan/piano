
import React, { FunctionComponent } from "react"
import clsx from "clsx"

import { NoteType } from "../../domain/note"

interface KeyProps {
  type: NoteType
  label: string
  disabled?: boolean
}

export const Key: FunctionComponent<KeyProps> = (props) => {
  const { type, label, ...rest } = props
  return (
    <button
      className={clsx(`key key--${type}`)}
      type="button"
      {...rest}
    >
      {label}
    </button>
  )
}

// pg219
// alternative definition of Key function component
// export const Key = ({ type, label, ...rest }: KeyProps) => /*...*/
//
// clsx: creates classnames dynamically
// clsx examples (https://www.npmjs.com/package/clsx):
//
// Strings (variadic)
// clsx('foo', true && 'bar', 'baz'); //=> 'foo bar baz'
//
// Objects
// clsx({ foo: true, bar: false, baz: isTrue() }); // => 'foo baz'
//
// In the case above we're applying key key--${type}, where type is NoteType
//  which can be either "natural" | "flat" | "sharp".
// using clsx, we can dynamically create class names from a variable
//
// in ./Key/styles.css we have: .key--sharp, .key--flat 
// which means clsx(`key key--${type}`) translates to .key--sharp, .key--flat
// via the value of ${type}
//
