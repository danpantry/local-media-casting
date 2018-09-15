This is an example media folder. It contains metadata about a given media entry. The reason we are using a folder is because we aren't storing thumbnails in a database :-)

## Layout (version 1)

    media/
      00000000-0000-0000-0000-000000000000/   the id of the film
        .folderversion                        a text file that indicates what 'version' the folder is.
                                              this is used just in case i end up changing the layout
                                              and have to be able to migrate older layouts

        media.mp4                             the film itself
        thumbs/                               thumbnail folder
          01.png
          02.png
          03.png
          04.png
          ...

