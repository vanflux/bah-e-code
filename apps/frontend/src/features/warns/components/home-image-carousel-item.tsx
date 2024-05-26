import { Link } from 'react-router-dom';
import React from 'react';

export interface Props {
  extLink: string;
  imgLink: string;
}

export const HomeImageCarouselItem = ({ extLink, imgLink }: Props) => {
  return (
    <Link to={extLink} className="flex flex-col border-gray-300 shadow-system rounded-xl w-full h-full">
      <img className="flex-1 overflow-hidden rounded-t-xl bg-cover" src={imgLink} />
    </Link>
  );
};
