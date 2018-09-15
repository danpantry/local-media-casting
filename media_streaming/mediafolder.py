import io
import os


class MediaFolderVersion1:
    def __init__(self, location):
        self.location = location

    def thumbnails(self):
        return os.listdir(self.location + '/thumbs')

    def media_file(self):
        # TODO: Ensure that this user cannot access sensitive files lke /etc/passwd on startup
        return (io.open(self.location + '/media.mp4', 'rb'), 'video/mp4')

    def open_thumbnail(self, fname):
        # TODO: Ensure that this user cannot access sensitive files lke /etc/passwd on startup
        # also ensure this is a png
        stream = io.open(self.location + '/thumbs/' + fname, 'rb')
        return (stream, 'image/png')


class UnknownFolderVersionError(Exception):
    def __init__(self, location, version):
        self.location = location
        self.version = version


def open(location):
    with io.open(location + '/.folderversion', 'r') as fd:
        v = fd.read(1)
        if v == '1':
            return MediaFolderVersion1(location)

        raise UnknownFolderVersionError(location, v)
