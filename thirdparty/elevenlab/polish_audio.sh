#!/usr/bin/env bash

set -e

INPUT_DIR="output/raw"
OUTPUT_DIR="output/processed"

TARGET_DURATION="1.0"
INTRO_DELAY="0.2"
MIN_ORIGINAL_DURATION="0.8"

if [[ -t 1 ]]; then
    GREEN="\033[0;32m"
    YELLOW="\033[1;33m"
    RESET="\033[0m"
else
    GREEN=""
    YELLOW=""
    RESET=""
fi

mkdir -p "$OUTPUT_DIR"

for VOICE in heart velvet light; do
  echo "Processing $VOICE..."

  SRC="$INPUT_DIR/$VOICE"
  DEST="$OUTPUT_DIR/$VOICE"

  mkdir -p "$DEST"

  for FILE in "$SRC"/*.mp3; do
    FILENAME=$(basename "$FILE")

    ORIGINAL_DURATION=$(ffprobe -v error \
      -show_entries format=duration \
      -of default=noprint_wrappers=1:nokey=1 \
      "$FILE")

    if awk "BEGIN {exit !($ORIGINAL_DURATION < $TARGET_DURATION)}"; then
      ADD_TIME=$(awk "BEGIN {printf \"%.3f\", $TARGET_DURATION - $ORIGINAL_DURATION}")

      echo -e "${YELLOW}  → $FILENAME changed${RESET}"
      echo "     original: ${ORIGINAL_DURATION}s | silence added after audio: ${ADD_TIME}s | final: ${TARGET_DURATION}s"

      ffmpeg -y -i "$FILE" \
        -af "loudnorm,apad,atrim=0:${TARGET_DURATION}" \
        -ar 44100 \
        -ac 1 \
        "$DEST/$FILENAME" \
        -loglevel error
    else
      echo -e "${GREEN}  → $FILENAME unchanged${RESET}"
      echo "     original: ${ORIGINAL_DURATION}s | silence added after audio: 0.000s | final: ${ORIGINAL_DURATION}s"

      ffmpeg -y -i "$FILE" \
        -af "loudnorm" \
        -ar 44100 \
        -ac 1 \
        "$DEST/$FILENAME" \
        -loglevel error
    fi
  done
done

echo "✨ All files processed into $OUTPUT_DIR"