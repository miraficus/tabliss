import React, { useEffect, useState } from 'react';
import { API } from '../../types';
import { Icon } from '@iconify/react';
import "./Spotify.sass"

function pad(input: any) {return input}

interface SpotifyData {
  accessToken: string;
}

interface SpotifyTrack {
  item: {
    name: string;
    artists: { name: string; external_urls: { spotify: string } }[];
    album: {
      name: string;
      images: { url: string }[];
      artists: { external_urls: { spotify: string } }[];
    };
    duration_ms: number;
    external_urls: { spotify: string };
  };
  is_playing: boolean;
  progress_ms: number;
}

const Spotify: React.FC<API<SpotifyData>> = ({ data, setData }) => {
  const [nowPlaying, setNowPlaying] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePrevious = async () => {
    try {
      await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${data?.accessToken}`
        }
      });
      setTimeout(fetchCurrentTrack, 100);
    } catch (err) {
      console.error('Failed to skip to previous track:', err);
    }
  };

  const handlePlayPause = async () => {
    try {
      await fetch(`https://api.spotify.com/v1/me/player/${nowPlaying?.is_playing ? 'pause' : 'play'}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${data?.accessToken}`
        }
      });
      setTimeout(fetchCurrentTrack, 100);
    } catch (err) {
      console.error('Failed to toggle playback:', err);
    }
  };

  const handleNext = async () => {
    try {
      await fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${data?.accessToken}`
        }
      });
      setTimeout(fetchCurrentTrack, 100);
    } catch (err) {
      console.error('Failed to skip to next track:', err);
    }
  };

  const fetchCurrentTrack = async () => {
    try {
      if (!data?.accessToken) {
        setError('No access token provided');
        return;
      }

      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${data.accessToken}`
        }
      });

      if (response.status === 204) {
        setError('Currently Not Playing');
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const trackData = await response.json();
      setNowPlaying(trackData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch current track');
    }
  };

  useEffect(() => {
    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 1000);
    return () => clearInterval(interval);
  }, [data?.accessToken]);

  if (!nowPlaying || error) {
    return (
      <div className="nowPlayingCard">
        <div className="nowPlayingImage">
          <img src="./images/albumCover.png" alt="Album" />
        </div>
        <div id="nowPlayingDetails">
          <div className="nowPlayingTitle">
            {error === 'Currently Not Playing' ? 'User is' : 'Failed to'}
          </div>
          <div className="nowPlayingArtist">
            {error === 'Currently Not Playing' ? 'currently Offline' : 'fetch song'}
          </div>
          <div className="nowPlayingTime">00:00 / 00:00</div>
        </div>
        <div className="nowPlayingState">
          <Icon icon={error === 'Currently Not Playing' ? 'hi:outline-status-offline' : 'bi:error-circle'} width={40} />
        </div>
      </div>
    );
  }

  const secondsPlayed = Math.floor(nowPlaying.progress_ms / 1000);
  const minutesPlayed = Math.floor(secondsPlayed / 60);
  const remainingSeconds = secondsPlayed % 60;

  const secondsTotal = Math.floor(nowPlaying.item.duration_ms / 1000);
  const minutesTotal = Math.floor(secondsTotal / 60);
  const remainingTotal = secondsTotal % 60;

  return (
    <a href={nowPlaying.item.external_urls.spotify} style={{ textDecoration: 'none', color: 'black' }}>
      <div className="nowPlayingCard">
        <div className="nowPlayingImage">
          <a href={nowPlaying.item.external_urls.spotify}>
            <img src={nowPlaying.item.album.images[0].url} alt="Album" />
          </a>
        </div>
        <div id="nowPlayingDetails">
          <div className={`nowPlayingTitle ${nowPlaying.item.name.length > 15 ? 'marquee-content' : ''}`}>
            <a href={nowPlaying.item.external_urls.spotify}>{nowPlaying.item.name}</a>
          </div>
          <div className="nowPlayingArtist">
            <a href={nowPlaying.item.album.artists[0].external_urls.spotify}>
              {nowPlaying.item.artists.map(a => a.name).join(', ')}
            </a>
          </div>
          <div className="nowPlayingTime">
            {pad(minutesPlayed)}:{pad(remainingSeconds)} / {pad(minutesTotal)}:{pad(remainingTotal)}
          </div>
        </div>
        <div className="nowPlayingState">
          {nowPlaying.is_playing ? (
            <img alt="soundbar" src="./images/soundbar.gif" title="Now Listening" />
          ) : (
            <Icon icon="ai:outline-pause-circle" width={40} />
          )}
        </div>
      </div>
      <div className="nowPlayingControls">
        <button onClick={handlePrevious} disabled={!nowPlaying}>
          <Icon icon="mdi:skip-previous" width={24} />
        </button>
        <button onClick={handlePlayPause} disabled={!nowPlaying}>
          <Icon icon={nowPlaying?.is_playing ? "mdi:pause" : "mdi:play"} width={24} />
        </button>
        <button onClick={handleNext} disabled={!nowPlaying}>
          <Icon icon="mdi:skip-next" width={24} />
        </button>
      </div>
    </a>
  );
};

export default Spotify;