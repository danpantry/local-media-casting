import io
import json
import media_streaming.util as util


class Film:
    def __init__(self, id, blob):
        self.name = blob.get('name')
        self.location = blob.get('location')
        self.id = id

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location
        }

    def open(self):
        # TODO: Ensure that this user cannot access sensitive files lke /etc/passwd on startup
        return (io.open(self.location + "/media.mp4", 'rb'), 'video/mp4')


class DefaultDevice:
    def __init__(self, id, blob):
        self.id = id
        self.device_id = blob.get('device_id')

    def to_json(self):
        return {
            'id': self.id,
            'device_id': self.device_id
        }


def _get_library():
    return json.load(io.open('library.json'))


def _get_table(table_name, clazz):
    rows = _get_library().get(table_name, {})
    return [clazz(id, rows[id]) for id in rows]


def _find_in_table(table_name, clazz, key):
    return util.first(_get_table(table_name, clazz), lambda x: x.id == key)


def list_films():
    return _get_table('films', Film)


def find_film_by_id(key: str):
    return _find_in_table('films', Film, key)


def find_default_device():
    return util.first_default(_get_table('default_devices', DefaultDevice))
