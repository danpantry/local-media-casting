import io
import json


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


def _get_films():
    films = json.load(io.open('library.json')).get('films', {})
    return [Film(id, films[id]) for id in films]


def list_films():
    return _get_films()


def find_film_by_id(id: str):
    return [film for film in _get_films() if film.id == id][0]
