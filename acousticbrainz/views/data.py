from flask import Blueprint, request, Response, render_template, redirect
from acousticbrainz.data import load_low_level, load_high_level, submit_low_level_data, get_summary_data
from werkzeug.exceptions import BadRequest
from urllib import quote_plus
from musicbrainzngs.musicbrainz import ResponseError
import musicbrainzngs
import json

data_bp = Blueprint('data', __name__)


@data_bp.route("/api")
def api():
    return redirect("/data")


@data_bp.route("/data")
def data():
    return render_template("data/data.html")


@data_bp.route("/<uuid:mbid>/low-level", methods=["POST"])
def submit_low_level(mbid):
    """Endpoint for submitting low-level information to AcousticBrainz."""
    raw_data = request.get_data()
    try:
        data = json.loads(raw_data)
    except ValueError, e:
        raise BadRequest("Cannot parse JSON document: %s" % e)

    submit_low_level_data(mbid, data)
    return ""


@data_bp.route("/<uuid:mbid>/low-level/view", methods=["GET"])
def view_low_level(mbid):
    data = json.dumps(json.loads(load_low_level(mbid)), indent=4, sort_keys=True)
    return render_template("data/json-display.html", mbid=mbid, data=data,
                           title="Low-level JSON for %s" % mbid)


@data_bp.route("/<uuid:mbid>/low-level", methods=["GET"])
def get_low_level(mbid):
    """Endpoint for fetching low-level information to AcousticBrainz."""
    return Response(load_low_level(mbid), content_type='application/json')


@data_bp.route("/<uuid:mbid>/high-level/view", methods=["GET"])
def view_high_level(mbid):
    data = json.dumps(json.loads(load_high_level(mbid)), indent=4, sort_keys=True)
    return render_template("data/json-display.html", mbid=mbid, data=data,
                           title="High-level JSON for %s" % mbid)


@data_bp.route("/<uuid:mbid>/high-level", methods=["GET"])
def get_high_level(mbid):
    """Endpoint for fetching high-level information to AcousticBrainz."""
    return Response(load_high_level(mbid), content_type='application/json')


@data_bp.route("/<uuid:mbid>", methods=["GET"])
def summary(mbid):
    lowlevel, highlevel, genres, moods, other = get_summary_data(mbid)

    info = _get_track_info(mbid, lowlevel['metadata'])

    # Tomahawk player stuff
    if not ('artist' in lowlevel['metadata']['tags'] and 'title' in lowlevel['metadata']['tags']):
        tomahawk_url = None
    else:
        tomahawk_url = "http://toma.hk/embed.php?artist={artist}&title={title}".format(
            artist=quote_plus(info['artist'].encode("UTF-8")),
            title=quote_plus(info['title'].encode("UTF-8")))

    return render_template("data/summary.html", lowlevel=lowlevel, highlevel=highlevel,
                           genres=genres, moods=moods, other=other, mbid=mbid,
                           info=info, tomahawk_url=tomahawk_url)


def _get_track_info(mbid, metadata):
    info = {}

    # Getting good metadata from MusicBrainz
    try:
        good_metadata = musicbrainzngs.get_recording_by_id(
            mbid, includes=['artists', 'releases', 'media'])['recording']
    except ResponseError:
        good_metadata = None

    if good_metadata:
        info['title'] = good_metadata['title']
        info['artist_id'] = good_metadata['artist-credit'][0]['artist']['id']
        info['artist'] = good_metadata['artist-credit-phrase']
        info['release_id'] = good_metadata['release-list'][0]['id']
        info['release'] = good_metadata['release-list'][0]['title']
        info['track_id'] = good_metadata['release-list'][0]['medium-list'][0]['track-list'][0]['id']
        info['track_number'] = \
            '%s / %s' % (good_metadata['release-list'][0]['medium-list'][0]['track-list'][0]['number'],
                         good_metadata['release-list'][0]['medium-list'][0]['track-count'])

    else:
        info['title'] = metadata['tags']['title'][0]
        info['artist_id'] = metadata['tags']['musicbrainz_artistid'][0]
        info['artist'] = metadata['tags']['artist'][0]
        info['release_id'] = metadata['tags']['musicbrainz_albumid'][0]
        info['release'] = metadata['tags']['album'][0]
        info['track_id'] = metadata['tags']['musicbrainz_releasetrackid'][0] if \
            'musicbrainz_releasetrackid' in metadata['tags'] else None

        if 'tracktotal' in metadata['tags']:
            info['track_number'] = '%s / %s' % (metadata['tags']['tracknumber'][0],
                                                metadata['tags']['tracktotal'][0])
        else:
            info['track_number'] = metadata['tags']['tracknumber'][0]

    info['length'] = metadata['audio_properties']['length_formatted']

    return info
