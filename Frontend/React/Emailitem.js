import React from 'react';
const EmailItem = ({ email }) => {
  return (
    <li>
      <h2>{email.subject}</h2>
      <p>{email.body}</p>
    </li>
  );
};

export default EmailItem;