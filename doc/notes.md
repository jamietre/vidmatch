## Notes

Just some experimentation notes

## MediaInfo

mediainfo --full 

Title/Movie Name = Blu Ray name
Duration (multiple entries)

Width
Height

(I think ffprobe will be better)

## ffprobe

ffprobe -show_streams "file.mkv"

Input #0, matroska,webm, from 'Movie.mkv':
  Metadata:
    title           : Movie Disc 1
    CREATION_TIME   : 2017-02-14T05:21:36Z
    ENCODER         : Lavf57.7.2
  Duration: 02:06:50.28, start: 0.000000, bitrate: 10355 kb/s
 Chapter #0:0: start 0.000000, end 717.217000
    Metadata:
      title           : Chapter 1
    Chapter #0:1: start 717.217000, end 1185.101000
    Metadata:
      title           : Chapter 2
    Chapter #0:2: start 1185.101000, end 1689.188000
    Metadata:
      title           : Chapter 3
    Chapter #0:3: start 1689.188000, end 2133.590000
    Metadata:
      title           : Chapter 4
    Chapter #0:4: start 2133.590000, end 2650.398000
    Metadata:
      title           : Chapter 5
    Chapter #0:5: start 2650.398000, end 3141.722000
    Metadata:
      title           : Chapter 6
    Chapter #0:6: start 3141.722000, end 3693.607000
    Metadata:
      title           : Chapter 7
    Chapter #0:7: start 3693.607000, end 4300.213000
    Metadata:
      title           : Chapter 8
    Chapter #0:8: start 4300.213000, end 4839.626000
    Metadata:
      title           : Chapter 9
    Chapter #0:9: start 4839.626000, end 5255.292000
    Metadata:
      title           : Chapter 10
    Chapter #0:10: start 5255.292000, end 5789.617000
    Metadata:
      title           : Chapter 11
    Chapter #0:11: start 5789.617000, end 6274.268000
    Metadata:
      title           : Chapter 12
    Chapter #0:12: start 6274.268000, end 6793.412000
    Metadata:
      title           : Chapter 13
    Chapter #0:13: start 6793.412000, end 7100.552000
    Metadata:
      title           : Chapter 14
    Chapter #0:14: start 7100.552000, end 7610.228000
    Metadata:
      title           : Chapter 15
    Stream #0:0: Video: h264 (High), yuv420p(tv, bt709, progressive), 1920x800 [SAR 1:1 DAR 12:5], 23.98 fps, 23.98 tbr, 1k tbn, 180k tbc (default)
    Stream #0:1(eng): Audio: ac3, 48000 Hz, stereo, fltp, 448 kb/s (default)
    Metadata:
      title           : Stereo
    Stream #0:2(eng): Audio: ac3, 48000 Hz, 5.1(side), fltp, 640 kb/s
    Metadata:
      title           : Surround
    Stream #0:3(eng): Subtitle: hdmv_pgs_subtitle
    Stream #0:4(eng): Subtitle: hdmv_pgs_subtitle
[STREAM]
index=0
codec_name=h264
codec_long_name=H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10
profile=High
codec_type=video
codec_time_base=1001/48000
codec_tag_string=[0][0][0][0]
codec_tag=0x0000
width=1920
height=800
coded_width=1920
coded_height=800
has_b_frames=2
sample_aspect_ratio=1:1
display_aspect_ratio=12:5
pix_fmt=yuv420p
level=40
color_range=tv
color_space=bt709
color_transfer=bt709
color_primaries=bt709
chroma_location=left
field_order=progressive
timecode=N/A
refs=1
is_avc=true
nal_length_size=4
id=N/A
r_frame_rate=24000/1001
avg_frame_rate=24000/1001
time_base=1/1000
start_pts=5
start_time=0.005000
duration_ts=N/A
duration=N/A
bit_rate=N/A
max_bit_rate=N/A
bits_per_raw_sample=8
nb_frames=N/A
nb_read_frames=N/A
nb_read_packets=N/A
DISPOSITION:default=1
DISPOSITION:dub=0
DISPOSITION:original=0
DISPOSITION:comment=0
DISPOSITION:lyrics=0
DISPOSITION:karaoke=0
DISPOSITION:forced=0
DISPOSITION:hearing_impaired=0
DISPOSITION:visual_impaired=0
DISPOSITION:clean_effects=0
DISPOSITION:attached_pic=0
DISPOSITION:timed_thumbnails=0
[/STREAM]

(Other stream info follows for audio streams - we should be fine with this one)

## CROP DETECT

ffmpeg -ss 00:05:00 -t 00:00:20 -i "Star Trek (2009).mkv" -vf "cropdetect=24:16:0" -f null -

[Parsed_cropdetect_0 @ 0000000003252840] x1:0 x2:1919 y1:0 y2:799 w:1920 h:800 x:0 y:0 pts:19950 t:19.950000 crop=1920:800:0:0
[Parsed_cropdetect_0 @ 0000000003252840] x1:0 x2:1919 y1:0 y2:799 w:1920 h:800 x:0 y:0 pts:19991 t:19.991000 crop=1920:800:0:0

## Extract Stills

#### Get frame at 10 mins

 ffmpeg -ss 00:10:00 -i "Star Trek (2009).mkv" -vframes 1 image1.png

sseof doesn't seem to work here - calculate a later time using full time gotten from mediainfo

https://trac.ffmpeg.org/wiki/Create%20a%20thumbnail%20image%20every%20X%20seconds%20of%20the%20video

