import os
import time
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
import pyaudio
import wave
import re


# Spotify API credentials
SPOTIPY_CLIENT_ID = '85f01c1f4e05443aa557cd553c9d5c34'
SPOTIPY_CLIENT_SECRET = '09afa138aff048359d0eda1b0b5f4c7b'
SPOTIPY_REDIRECT_URI = 'http://localhost:8888/callback'
NUM_FILES = 1
DURATION = 5
SAMPLE_RATE = 48000

# Spotify API authentication
sp = Spotify(auth_manager=SpotifyOAuth(client_id=SPOTIPY_CLIENT_ID, client_secret=SPOTIPY_CLIENT_SECRET,
             redirect_uri=SPOTIPY_REDIRECT_URI, scope='user-library-read user-read-playback-state user-modify-playback-state'))

output_dir = os.path.join('recordings', 'JAZZ')
os.makedirs(output_dir, exist_ok=True)


def wait_for_playback():
    retries = 3
    retry_delay = 5

    for _ in range(retries):
        try:
            playback_state = sp.current_playback()
            while playback_state is None or not playback_state['is_playing']:
                time.sleep(1)
                playback_state = sp.current_playback()
            return
        except Exception as e:
            print(f"Error getting playback state: {e}")
            time.sleep(retry_delay)

    print("Exceeded maximum number of retries. Exiting.")


def sanitize_filename(filename):
    return re.sub(r'[<>:"/\\|?*!]', '_', filename)


def seek_track_and_handle_errors(track_duration_ms):
    try:
        half_duration = track_duration_ms // 2
        sp.seek_track(position_ms=half_duration)
    except Exception as e:
        print(f"Error seeking track: {e}")


def wait_for_playback():
    playback_state = sp.current_playback()
    while playback_state is None or not playback_state['is_playing']:
        time.sleep(1)
        playback_state = sp.current_playback()


def play_and_record_playlist(playlist_id, num_files=NUM_FILES):

    playlist_tracks = sp.playlist_tracks(playlist_id)['items']

    file_count = 0

    for track in playlist_tracks:
        if file_count >= num_files:
            break

        track_id = track['track']['id']
        track_name = track['track']['name']
        print(f'Playing: {track_name}')

        # Start playback
        sp.start_playback(uris=[f'spotify:track:{track_id}'])
        wait_for_playback()

        # Fast forward to halfway point
        track_duration_ms = sp.current_playback()['item']['duration_ms']

        seek_track_and_handle_errors(track_duration_ms)

        audio = pyaudio.PyAudio()
        stream = audio.open(format=pyaudio.paInt16, channels=1,
                            rate=SAMPLE_RATE, input=True, frames_per_buffer=1024)
        frames = []
        start_time = time.time()

        try:
            while time.time() - start_time < DURATION:
                data = stream.read(1024)
                frames.append(data)

            print(f'Recording saved: {track_name}')
        except Exception as e:
            print(f"Error converting recording to AudioSegment: {e}")

        file_count += 1

        stream.stop_stream()
        stream.close()
        audio.terminate()
        sanitized_track_name = sanitize_filename(track_name)
        sound_file = wave.open(os.path.join(
            output_dir, f'recording_{sanitized_track_name}.wav'), 'wb')
        sound_file.setnchannels(1)
        sound_file.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
        sound_file.setframerate(SAMPLE_RATE)
        sound_file.writeframes(b''.join(frames))


if __name__ == "__main__":
    playlist_id = '37i9dQZF1DXbITWG1ZJKYt'
    try:
        play_and_record_playlist(playlist_id)
    except Exception as e:
        print(f"An error occurred: {e}")
    # https://open.spotify.com/playlist/37i9dQZF1DX2sQHbtx0sdt?si=392e09cabf144379
    # tutaj id to 37i9dQZF1DX2sQHbtx0sdt nie patrzcie na to cos po si
