#!/usr/bin/env bash

set -e

INPUT_DIR="output"
OUTPUT_DIR="output/production"

# Ensure output base exists
mkdir -p "$OUTPUT_DIR"

# Loop through each voice folder (heart, velvet, light)
for VOICE in heart velvet light; do
  echo "Processing $VOICE..."

  SRC="$INPUT_DIR/$VOICE"
  DEST="$OUTPUT_DIR/$VOICE"

  mkdir -p "$DEST"

  for FILE in "$SRC"/*.mp3; do
    FILENAME=$(basename "$FILE")

    echo "  → $FILENAME"

    ffmpeg -y -i "$FILE" \
      -af "loudnorm,adelay=200|200" \
      -ar 44100 \
      -ac 1 \
      "$DEST/$FILENAME" \
      -loglevel error
  done

done

echo "✨ All files processed into $OUTPUT_DIR"