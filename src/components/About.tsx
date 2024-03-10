import React from 'react';
import { Link } from 'react-router-dom';


interface AboutProps {
 title: string;
}



const About: React.FC<AboutProps> = ({title}) => {
  return (
    <div className="container">
      <div className="about-content">
        <h2>{title}</h2>
        <p>
          Movie Search App is a React application that allows users to explore a vast collection of movies, providing information such as titles, genres, release dates, and ratings.
        </p>
        <div className="about-features">
          <h2>Features Implemented:</h2>
          <ul>
            <li><Link to="/">Home </Link>Page with search functionality to explore movies.</li>
            <li><Link to="/about">About </Link> Page providing information about the project.</li>
            <li><Link to="/movies">Movies </Link> Page listing all available movies with search and filter features.</li>
            <li>Movie Details Page displaying detailed information about a selected movie.</li>
          </ul>
        </div>
        <div className='learning'>
          <h2>Learning Outcomes:</h2>
          <p>
            While developing the Movie Search App, We've gained valuable skills and knowledge, including:
          </p>
          <h3>TypeScript Integration:</h3>
          <p>Successfully integrated TypeScript into the React project, enhancing code readability, maintainability, and type safety.</p>

          <h3>API Integration:</h3>
          <p>Learned to integrate with external APIs to fetch movie data, enabling dynamic content generation.</p>

          <h3>React.js Proficiency:</h3>
          <p>Enhanced proficiency in React.js, creating interactive user interfaces for seamless navigation and interaction.</p>

          <h3>State Management:</h3>
          <p>Implemented effective state management techniques to handle data across components and ensure consistency in user experience.</p>

          <h3>Search and Filter Functionality:</h3>
          <p>Implemented search and filter functionality, allowing users to easily discover movies based on their preferences.</p>

          <h3>Error Handling:</h3>
          <p>Developed error handling mechanisms to gracefully handle API errors and provide users with informative feedback.</p>

          <h3>Code Organization:</h3>
          <p>Structured the project for maintainability and scalability, organizing components and files for efficient development.</p>

          <h3>Version Control (Git):</h3>
          <p>Utilized Git for version control, enabling collaboration and maintaining a history of project changes.</p>

          <h3>Documentation Practices:</h3>
          <p>Emphasized clear and concise documentation to aid in understanding and maintaining the codebase.</p>

          <h3>User Experience Optimization:</h3>
          <p>Focused on enhancing user experience through intuitive design and smooth interaction flows.</p>

          <h3>Continuous Learning:</h3>
          <p>Cultivated a mindset of continuous learning, staying updated with React.js best practices and emerging technologies.</p>
        </div>
      </div>
    </div>
  );
};

export default About;

