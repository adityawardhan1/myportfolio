# Avatar Image Setup Guide

## Directory Structure

Place your avatar pose images in the following location:

```
portfolio/
└── public/
    └── avatars/
        ├── neutral.png
        ├── waving.png
        ├── thumbs-up.png
        ├── laptop.png
        ├── thinking.png
        ├── celebrating.png
        ├── pointing.png
        ├── phone.png
        ├── confident.png
        └── goodbye.png
```

## Image Specifications

- **Format**: PNG with transparent background
- **Dimensions**: 512x512px recommended (will scale automatically)
- **File size**: Keep under 100KB each for optimal loading
- **Background**: Transparent (remove blue background from source images)

## Extracting Poses from Grid Image

The 9-pose grid image needs to be split into individual files:

### Grid Layout (3x3):
```
Row 1: waving.png    | thumbs-up.png | laptop.png
Row 2: thinking.png  | celebrating.png | pointing.png
Row 3: phone.png     | confident.png  | goodbye.png
```

### Extraction Methods:

**Option 1: Manual (Photoshop/GIMP)**
1. Open the grid image in image editor
2. Use rectangular selection tool
3. Select each pose (approx 340x340px each in 1024x1024 grid)
4. Copy and paste to new file
5. Save as PNG with transparency
6. Repeat for all 9 poses

**Option 2: ImageMagick (Command Line)**
```bash
# Install ImageMagick first
# Then split the 1024x1024 grid into 9 equal parts (342x342 each)

magick grid-image.jpg -crop 3x3@ +repage +adjoin pose-%d.png

# Then rename files according to position:
# pose-0.png -> waving.png
# pose-1.png -> thumbs-up.png
# pose-2.png -> laptop.png
# pose-3.png -> thinking.png
# pose-4.png -> celebrating.png
# pose-5.png -> pointing.png
# pose-6.png -> phone.png
# pose-7.png -> confident.png  
# pose-8.png -> goodbye.png
```

**Option 3: Online Tool**
- Visit: https://www.iloveimg.com/crop-image
- Upload grid image
- Manually crop each pose
- Download as PNG

## Current Status

✅ Avatar images directory created at: `public/avatars/`
⏳ **ACTION REQUIRED**: Extract and place 10 pose images in this directory

The component will work once images are added - it gracefully handles missing images with a loading spinner.
