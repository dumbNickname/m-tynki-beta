#!/usr/bin/env python3
"""Generate thumbnail versions of gallery/post images for faster page loads.

Reads gallery.json and posts.json, creates 400px-wide JPEG thumbnails
in public/images/thumbs/ mirroring the original directory structure.

Usage: python3 scripts/generate-thumbs.py
"""

import json
import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is required. Install with: pip install pillow")
    sys.exit(1)

THUMB_WIDTH = 400
THUMB_QUALITY = 70
BASE = Path(__file__).resolve().parent.parent / "public"
SRC_DIR = Path(__file__).resolve().parent.parent / "src"


def to_thumb_path(img_path: str) -> str:
    without_ext = os.path.splitext(img_path)[0]
    if img_path.startswith("images/"):
        return "images/thumbs/" + without_ext[len("images/") :] + ".jpg"
    return "images/thumbs/" + without_ext + ".jpg"


def collect_images() -> set[str]:
    images: set[str] = set()

    with open(SRC_DIR / "data" / "gallery.json") as f:
        images.update(json.load(f))

    with open(SRC_DIR / "data" / "posts.json") as f:
        for post in json.load(f):
            if post.get("thumbnail"):
                images.add(post["thumbnail"])
            for img in post.get("gallery", []):
                images.add(img)

    return images


def generate_thumbnails(images: set[str]) -> None:
    created = 0
    skipped = 0
    errors = 0

    for img_path in sorted(images):
        src = BASE / img_path
        if not src.exists():
            print(f"  MISSING: {src}")
            errors += 1
            continue

        thumb_rel = to_thumb_path(img_path)
        thumb_path = BASE / thumb_rel
        thumb_path.parent.mkdir(parents=True, exist_ok=True)

        if thumb_path.exists() and thumb_path.stat().st_mtime >= src.stat().st_mtime:
            skipped += 1
            continue

        try:
            with Image.open(src) as im:
                im = im.convert("RGB")
                w, h = im.size
                if w <= THUMB_WIDTH:
                    im.save(thumb_path, "JPEG", quality=THUMB_QUALITY, optimize=True)
                else:
                    ratio = THUMB_WIDTH / w
                    new_h = int(h * ratio)
                    resized = im.resize((THUMB_WIDTH, new_h), Image.Resampling.LANCZOS)
                    resized.save(
                        thumb_path, "JPEG", quality=THUMB_QUALITY, optimize=True
                    )
            created += 1
        except Exception as e:
            print(f"  ERROR: {src}: {e}")
            errors += 1

    orig_total = sum((BASE / p).stat().st_size for p in images if (BASE / p).exists())
    thumb_total = sum(
        (BASE / to_thumb_path(p)).stat().st_size
        for p in images
        if (BASE / to_thumb_path(p)).exists()
    )

    print(f"Created: {created}, Skipped: {skipped}, Errors: {errors}")
    print(f"Originals: {orig_total / 1024 / 1024:.1f} MB")
    print(f"Thumbnails: {thumb_total / 1024 / 1024:.1f} MB")
    if orig_total > 0:
        print(f"Savings: {(1 - thumb_total / orig_total) * 100:.0f}%")


if __name__ == "__main__":
    images = collect_images()
    print(f"Processing {len(images)} images...")
    generate_thumbnails(images)
