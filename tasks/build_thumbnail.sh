#!/bin/bash
# Builds thumbnails for specified media.

# read 1/600 as 'capture one frame in every 600'
MEDIA_ID=$1
if [ -z $MEDIA_ID ];
then
    echo "usage: $0 media-uuid"
    exit 1
fi

LOCATION=media/$1/
if [ -f "media.mp4"];
then
    echo "this folder doesn't contain a media.mp4 file!"
    exit 1
fi

pushd $LOCATION
mkdir -p thumbs/
ffmpeg -i media.mp4 \
    -r 1/600 \
    -vf scale=-1:120 \
    -vcodec png \
    thumbs/%002d.png
popd
