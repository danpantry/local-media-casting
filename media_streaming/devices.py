import pychromecast
import media_streaming.util as util


class Device:
    def __init__(self, cast):
        self.cast = cast
        self.id = cast.uuid

    def to_json(self):
        """
        Converts the Device into a format that can be serialized into json.
        """

        return {
            "name": self.cast.name,
            "id": str(self.cast.uuid)
        }

    def play_media(self, url, media_type):
        self.cast.play_media(url, media_type)


@util.memoize
def list():
    return [Device(cast) for cast in pychromecast.get_chromecasts()]


def find_by_id(id):
    return util.first_default(list())
