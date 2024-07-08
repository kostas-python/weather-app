import React from "react"
import { Container } from "react-bootstrap"

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = "d0dc4b3e1bee4a5595a54d59869d2a10"; // Your Client ID
const REDIRECT_URI = 'http://localhost:3000/app/admin/components/spotify';
// const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=d0dc4b3e1bee4a5595a54d59869d2a10&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"; // Your Redirect URI



export default function Login() {
  const handleClick = (event) => {
    console.log('Login button clicked');
    console.log('Event:', event);
    // Add any additional error logging or handling logic here if needed
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL} onClick={handleClick}>
        Login With Spotify
      </a>
    </Container>
  )
}