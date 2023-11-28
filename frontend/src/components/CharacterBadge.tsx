import React from 'react';

const CharacterBadge = ({ name, image, onClick }: { name: string, image: string, onClick: () => void }) => (
    <div className="character" onClick={onClick}>
        <img src={image} alt={name} />
        <p>{name}</p>
    </div>
);

export default CharacterBadge;