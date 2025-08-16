#!/bin/bash

# Image Optimization Script for AG Church Pala Website
# This script creates thumbnails and optimizes images for faster loading

echo "Starting image optimization..."

# Create thumbnails directory if it doesn't exist
mkdir -p photos/thumbnails
mkdir -p assets/thumbnails

# Function to create thumbnails and optimize images
optimize_images() {
    local source_dir=$1
    local thumb_dir=$2
    
    echo "Processing images in $source_dir..."
    
    for ext in jpg jpeg png JPG JPEG PNG; do
        for image in "$source_dir"/*.$ext; do
            [ -f "$image" ] || continue
            filename=$(basename "$image")
            name="${filename%.*}"
            file_ext="${filename##*.}"
            
            # Create thumbnail (150x150) for gallery previews
            if command -v sips >/dev/null 2>&1; then
                sips -Z 150 "$image" --out "$thumb_dir/${name}_thumb.${file_ext}" 2>/dev/null
                echo "Created thumbnail: $thumb_dir/${name}_thumb.${file_ext}"
                
                # Optimize original image (max 800px width)
                sips -Z 800 "$image" --setProperty formatOptions 75 2>/dev/null
                echo "Optimized: $image"
            elif command -v convert >/dev/null 2>&1; then
                # ImageMagick alternative
                convert "$image" -resize 150x150^ -gravity center -extent 150x150 -quality 75 "$thumb_dir/${name}_thumb.${file_ext}" 2>/dev/null
                convert "$image" -resize 800x800> -quality 75 "$image" 2>/dev/null
                echo "Processed with ImageMagick: $image"
            else
                echo "Neither sips nor ImageMagick found. Please install one of them."
                return 1
            fi
        done
    done
}

# Optimize photos directory
optimize_images "photos" "photos/thumbnails"

# Optimize assets directory (but don't create thumbnails for UI assets)
echo "Optimizing assets..."
for ext in jpg jpeg png JPG JPEG PNG; do
    for image in assets/*.$ext; do
        [ -f "$image" ] || continue
        if command -v sips >/dev/null 2>&1; then
            sips -Z 400 "$image" --setProperty formatOptions 80 2>/dev/null
            echo "Optimized asset: $image"
        elif command -v convert >/dev/null 2>&1; then
            convert "$image" -resize 400x400> -quality 80 "$image" 2>/dev/null
            echo "Optimized asset with ImageMagick: $image"
        fi
    done
done

echo "Image optimization completed!"
echo "Thumbnails created in photos/thumbnails/"
echo "Original images have been optimized for web use."