from flask import Flask, jsonify, request
from flask_cors import CORS
from spotify_api import get_top_tracks

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/top-tracks', methods=['GET'])
def top_tracks():
    time_range = request.args.get('time_range', 'short_term')
    try:
        tracks = get_top_tracks(time_range)
        return jsonify(tracks), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
