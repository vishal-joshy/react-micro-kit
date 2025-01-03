import React from 'react';

type Props = {
  text: string;
};

export const Button = (props: Props): React.JSX.Element => {
  return <button>{props.text}</button>;
};
