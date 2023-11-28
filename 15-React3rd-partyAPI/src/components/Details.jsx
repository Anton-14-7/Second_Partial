import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import './Details.css';

function Details({ match }) {
  const { episode } = match.params;
  const [film, setFilm] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/films/${episode}`);
        const data = await response.json();
        setFilm(data);

        const commentsResponse = await fetch(`http://localhost:5000/api/comments/${episode}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching film details:', error);
      }
    };

    fetchData();
  }, [episode]);

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
    <div className="additional-details">
      <h2>{film.title}</h2>
      <p>{film.release_date}</p>
      <p>{film.opening_crawl}</p>

      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
          </div>
        )};

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