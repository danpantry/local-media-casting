import io
import json

def list_films():
    library = json.load(io.open('library.json'))
    films = library['films'] or {}
    return [{'id': id, **films[id]} for id in films]


def find_film_by_id(id: str):
    return None
