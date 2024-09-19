import React from 'react';
import EmailItem from './EmailItem';

const EmailList = () => {
  const emails = []; // placeholder for email data

  return (
    <ul>
      {emails.map((email) => (
        <EmailItem key={email.id} email={email} />
      ))}
    </ul>
  );
};

export default EmailList;