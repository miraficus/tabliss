import React from 'react';
import { API } from '../../types';

interface SpotifyData {
  accessToken: string;
}

const SPOTIFY_CLIENT_ID = '62abf7a393e340c2842952f4f4265d96';
const REDIRECT_URI = 'https://bookcatkid.github.io/tabliss-oauth/spotify';

const SpotifySettings: React.FC<API<SpotifyData>> = ({ data, setData }) => {
  const generateCodeVerifier = (length: number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  };

  const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const handleGetToken = async () => {
    // Generate and store PKCE values
    const codeVerifier = generateCodeVerifier(128);
    const codeChallenge = await sha256(codeVerifier);
    
    // Instead of using localStorage, include the code verifier in the state parameter
    const state = btoa(JSON.stringify({
      codeVerifier,
      timestamp: Date.now()
    }));

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    const params = new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      state: state, // Add the state parameter
      scope: 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
    });
    
    window.open(authUrl + '?' + params.toString(), '_blank');
  };

  return (
    <div className="spotify-settings">
      <label>
        Access Token
        <input
          type="password"
          value={data?.accessToken || ''}
          onChange={(e) => setData({ ...data, accessToken: e.target.value })}
          placeholder="Enter your Spotify access token"
        />
      </label>
      <button onClick={handleGetToken}>
        Get New Token
      </button>
      <p className="help-text">
        Click "Get New Token" to authorize with Spotify. Then copy the token from the new tab and paste it here.
      </p>
    </div>
  );
};

export default SpotifySettings;