import React from 'react';

const imagePlaceholder = require('assets/images/placeholder.jpg');

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};
