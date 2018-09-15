import pychromecast
import collections


class Device:
    def __init__(self, cast):
        self.cast = cast

    def to_json(self):
        """
        Converts the Device into a format that can be serialized into json.
        """

        return {
            "name": self.cast.name,
            "id": str(self.cast.uuid)
        }


def list():
    return [Device(cast) for cast in pychromecast.get_chromecasts()]
