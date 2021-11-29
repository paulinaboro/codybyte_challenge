import React from 'react';
import { IImage } from '../../utils/types';
import './ImageCard.css';

function ImageCard({ id, title, imgSrc, images }: IImage) {
  return (
    <div className="image-card" key={id}>
      <img src={imgSrc} alt={title} />
      <p>{title}</p>
    </div>
  );
}

export default ImageCard;
