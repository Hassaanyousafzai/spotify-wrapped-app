import time
import spotipy
from spotipy.oauth2 import SpotifyOAuth

CLIENT_SERVER_ID = "your-api"
CLIENT_SECRET_ID = "your-secret-id"
REDIRECT_ID = "http://127.0.0.1:8080"
SCOPE = "user-top-read"

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=CLIENT_SERVER_ID,
    client_secret=CLIENT_SECRET_ID,
    redirect_uri=REDIRECT_ID,
    scope=SCOPE
))

def get_top_tracks(time_range):
    try:
        top_tracks = sp.current_user_top_tracks(limit=10, time_range=time_range)
        track_list = []

        for track in top_tracks['items']:
            track_list.append({
                "name": track['name'],
                "artist": track['album']['artists'][0]['name'],
                "album": track['album']['name'],
                "spotify_url": track['external_urls']['spotify'],
                "album_cover": track['album']['images'][0]['url']
            })
            time.sleep(0.2)

        return track_list

    except Exception as e:
        return {"error": str(e)}