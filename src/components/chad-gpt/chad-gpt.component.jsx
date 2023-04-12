import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";

import ChadImage from './chad2.png'; // Replace this with the actual path to the farmer image


const brands = ["USN", "NPL", "Nutritech"];

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '2rem',
    },
    image: {
      maxWidth: '25%',
      height: 'auto',
    },
    input: {
      width: '80%',
      padding: '1rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'white',
      padding: '0.75rem 1.5rem',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '1rem',
      margin: '1rem',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    answerContainer: {
      width: '80%',
      borderRadius: '4px',
      backgroundColor: '#f1f1f1',
      padding: '1rem',
    },
    introduction: {
      width: '90%',
      textAlign: 'center',
      fontSize: '0.8rem',
      margin: '1rem',
    },
    heading: {
      width: '90%',
      textAlign: 'center',
      fontSize: '1.5rem',
      margin: '1rem',
      fontWeight: 'bold',
    },
    dropdown: {
      width: '50%',
      padding: '1rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '1rem',
      backgroundColor: '#fff',
    },
    emailButton: {
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'white',
      padding: '0.75rem 1.5rem',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '1rem',
      margin: '1rem',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    '@media (max-width: 768px)': {
      image: {
        maxWidth: '50%',
        height: 'auto',
      },
      heading: {
        fontSize: '1.2rem',
        margin: '0.5rem',
      },
      introduction: {
        fontSize: '0.75rem',
        margin: '0.5rem',
      },
      input: {
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
      },
      button: {
        padding: '0.5rem 1rem',
        fontSize: '0.8rem',
        margin: '0.5rem',
      },
      dropdown: {
        padding: '0.5rem',
        marginBottom: '0.5rem',
      },
      emailButton: {
        padding: '0.5rem 1rem',
        fontSize: '0.8rem',
        margin: '0.5rem',
      },
    },
  };

const ChadGPT = () => {
    const [count, setCount] = useState(0);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [brand, setBrand] = useState(brands[0]);
  
    const handleInputChange = (event) => {
      setQuestion(event.target.value);
    };
  
    const handleBrandChange = (event) => {
        setBrand(event.target.value);
      };

    const handleEmailClick = () => {
    const subject = encodeURIComponent("Acquire Chad GPT Page");
    const body = encodeURIComponent(
        "Hello,\n\nI am a brand representative of " + brand + " and I am interested in acquiring the Chad GPT page.\n\nBest regards,"
    );
    window.location.href = "mailto:louwnasteen01@gmail.com?subject=" + subject + "&body=" + body;
    };
  
    const handleSubmit = async () => {
      setIsLoading(true);
      if(count>5){
        setAnswer('Sorry, you have reached the maximum number of questions you can ask. Please sign in to ask more questions.');
        setIsLoading(false);
        return;
      } else{
        setCount(count+1);
      }
      try {
        const response = await axios.post(
          'https://openaiapigateway.azurewebsites.net/api/CompletionAPI',
          {
            prompt: question,
            engine: 'gpt-3.5-turbo-0301',
            max_tokens: 100,
            role_description: 'You are a hilarious gym bro named Chad. You refer to yourself in the third person. You are straight forward and love to make people laugh with your rude and abbrasive nature and touting gym as the solution to all of life problems. You make use of fun decorations in your responses such as swole is the goal, size is the prize and it is gainz o clock. Your product brand of choice is ' + brand,
          },
        );
  
        if (response.data) {
          setAnswer(response.data);
        }
        
      } catch (error) {
        console.error('Error:', error);
        setAnswer('Sorry, there was an error processing your question.');
      }
      setIsLoading(false);
      setQuestion('');
    };
  
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Meet your new gym buddy, Chad GPT!</h1>
        <img src={ChadImage} alt="Ask Chad a question, weakling!" style={styles.image} />
        <p style={styles.introduction}>
          I love to use: 
        </p>
        <select value={brand} onChange={handleBrandChange} style={styles.dropdown}>
          {brands.map((b, index) => (
            <option key={index} value={b}>
              {b}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={question}
          onChange={handleInputChange}
          placeholder="Type your question here..."
          style={styles.input}
        />
        {isLoading ? <p>Loading...</p> :
        <button onClick={handleSubmit} style={styles.button}>
          Ask
        </button>}
        <div style={styles.answerContainer}>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
        <button onClick={handleEmailClick} style={styles.emailButton}>
          Contact for Acquisition
        </button>
      </div>
    );
};

export default ChadGPT;