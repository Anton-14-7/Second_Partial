import React from 'react';
import Comment from './Comment';
import './Details.css';

function Details({ movie, onCommentSubmit, comments }) {
  const [logoHovered, setLogoHovered] = React.useState(false);

  return (
    <div className="additional-details">
      <img
        src={logoHovered ? `./images/${movie.best_character.affiliation}.png` : `./images/${movie.best_character.image}`}
        alt={movie.best_character.name}
        className="character-image"
        onMouseOver={() => setLogoHovered(true)}
        onMouseOut={() => setLogoHovered(false)}
      />
      <div className="character-details">
        <h6 className={getAffiliationColor(movie.best_character.affiliation)}>
          {movie.best_character.name}
        </h6>
        <p>{movie.best_character.bio}</p>
        <Comment onCommentSubmit={onCommentSubmit} />
        {comments.length > 0 && (
          <div className="comments-section">
            <h6>Comments:</h6>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>
                  <strong>{comment.username}:</strong> {comment.comment}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;


function getAffiliationColor(affiliation) {
  switch (affiliation) {
    case 'Jedi':
    case 'Rebel':
      return 'blue-text';
    case 'Empire':
    case 'Sith':
      return 'red-text';
    default:
      return '';
  }
}