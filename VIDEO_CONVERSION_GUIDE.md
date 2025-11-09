# Video Conversion Guide for Web Playback

## Issue
Your video is trying to download instead of playing inline. This is because the video codec may not be web-compatible.

## Solution: Convert Video to Web-Compatible Format

### Option 1: Online Converter (Easiest)
1. Go to https://www.freeconvert.com/video-compressor
2. Upload your `landing-page.mp4`
3. Choose these settings:
   - **Codec**: H.264
   - **Format**: MP4
   - **Quality**: High (or compress to ~50MB for faster loading)
   - **Resolution**: 1920x1080 (or keep original)
4. Download the converted file
5. Replace `public/landing-page.mp4` with the new file

### Option 2: Using HandBrake (Best Quality)
1. Download HandBrake: https://handbrake.fr/downloads.php
2. Open HandBrake and load your video
3. Use preset: "Web" → "Gmail Large 3 Minutes 720p30"
4. Adjust settings:
   - Video Codec: H.264 (x264)
   - Framerate: Same as source
   - Quality: RF 22-24 (lower = better quality)
5. Save to `public/landing-page.mp4`

### Option 3: Using FFmpeg (Command Line)
If you install FFmpeg, run this command:

```powershell
ffmpeg -i "public\landing-page.mp4" -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k -movflags +faststart "public\landing-page-converted.mp4"
```

Then rename the converted file to `landing-page.mp4`

## Web-Compatible Video Requirements:
- **Codec**: H.264 (most compatible)
- **Container**: MP4
- **Audio**: AAC
- **Max Size**: 50-100MB recommended
- **Resolution**: 1920x1080 or 1280x720

## After Conversion:
1. Replace the video file in `/public` folder
2. Clear browser cache (Ctrl + Shift + R)
3. Refresh your localhost:3000

The video should now play inline instead of downloading!
