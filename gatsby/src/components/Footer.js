import React from 'react';

export default function Footer() {
  return (
    <footer>
      <p className="center">
        &copy; Slice Masters Inc. {new Date().getFullYear()}
      </p>
    </footer>
  );
}
