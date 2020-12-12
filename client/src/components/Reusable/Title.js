import React from 'react';

const styles = {
  fontSize: '3rem',
  textAlign: 'center',
  color: 'var(--mainDark)',
  padding: '2rem 0',
};

export default function Title({ title }) {
  return (
    <header style={styles} className="title">
      <h1 className="text-title">{title}</h1>
    </header>
  );
}
