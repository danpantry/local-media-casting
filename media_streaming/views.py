from . import db as models


class FilmView:
    def __init__(self, model: models.Film):
        self.model = model

    def render(self, make_url):
        film_id = self.model.id
        thumbs = [
            make_url(film_id, fname) for fname in self.model.thumbnails()
        ]

        return {
            'id': film_id,
            'name': self.model.name,
            'thumbnails': thumbs
        }
