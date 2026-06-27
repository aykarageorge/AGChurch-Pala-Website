#!/bin/bash
# Compress images in photos/ using macOS built-in sips (no install required).
# Resizes to max 1200px on longest side, recompresses to 85% quality.
# Skips already-processed images unless --force is passed.
#
# Usage:
#   ./optimize-images.sh            # process new images only
#   ./optimize-images.sh --force    # reprocess all images
#   ./optimize-images.sh --check    # show sizes without changing files

set -euo pipefail

PHOTOS_DIR="photos"
MAX_DIM=1200   # max width or height in pixels
QUALITY=85     # JPEG quality (0–100); 85 is a good balance of size vs quality

FORCE=false
CHECK=false
[[ "${1:-}" == "--force" ]] && FORCE=true
[[ "${1:-}" == "--check" ]] && CHECK=true

if [[ ! -d "$PHOTOS_DIR" ]]; then
    echo "Error: '$PHOTOS_DIR' directory not found. Run from project root." >&2
    exit 1
fi

count=0
skipped=0
total_saved=0

process_image() {
    local f="$1"
    local marker="${f}.opt"

    if [[ "$CHECK" == true ]]; then
        local size_kb=$(( $(stat -f%z "$f") / 1024 ))
        echo "  ${size_kb}KB  $(basename "$f")"
        return
    fi

    if [[ "$FORCE" == false && -f "$marker" ]]; then
        ((skipped++))
        return
    fi

    local before=$(stat -f%z "$f")

    sips -s format jpeg \
         -s formatOptions $QUALITY \
         --resampleHeightWidthMax $MAX_DIM \
         "$f" --out "$f" > /dev/null 2>&1

    local after=$(stat -f%z "$f")
    local saved=$(( (before - after) / 1024 ))
    total_saved=$(( total_saved + saved ))

    touch "$marker"
    ((count++))
    echo "✓ $(basename "$f")  (${saved}KB saved)"
}

echo "Scanning $PHOTOS_DIR/ ..."
echo ""

shopt -s nullglob nocaseglob
files=("$PHOTOS_DIR"/*.jpg "$PHOTOS_DIR"/*.jpeg)
shopt -u nullglob nocaseglob

if [[ ${#files[@]} -eq 0 ]]; then
    echo "No JPG/JPEG files found in $PHOTOS_DIR/"
    exit 0
fi

if [[ "$CHECK" == true ]]; then
    echo "Current sizes (no files changed):"
    for f in "${files[@]}"; do process_image "$f"; done
    echo ""
    total_kb=$(du -sk "$PHOTOS_DIR" | awk '{print $1}')
    echo "Total photos/ directory: ${total_kb}KB"
    exit 0
fi

for f in "${files[@]}"; do
    process_image "$f"
done

echo ""
echo "Done."
echo "  Processed : $count images  (${total_saved}KB saved)"
echo "  Skipped   : $skipped images (already optimised)"
echo ""
echo "Run with --force to reprocess all, --check to preview sizes."
