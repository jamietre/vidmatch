## vidmatch

A tool to catalog and fingerprint videos, and relevant metadata, so that unknown videos can be ID'd against the catalog.

## how

It (will) use the following logic to fingerprint a video:

1. Figure out the video should be cropped, and crop if so
2. Take a still image from a frame approximately 5 minutes in and 15 minutes from the end (or some logic based on video length)
3. Store metadata that could be used to help match such as Name, length, aspect ratio

To match it will do the following:

1. Fingerprint the video being tested
2. Grab all database entries within some range of duration to the video being tested (5 seconds?)
3. Filter by matching aspect ratio
4. If a single entry exists, and title matches, then choose it (optionally validate with image matching??)
5. For all possible matches compare video snapshots using (perhaps) `node-resemble-js`
6. Choose best match

This can all be done with ffmpeg and node-resemble. Seems easy right?

## status

It's a figment of my imagination. Have written no code yet. I've but I'm filled with confidence that it will work.
