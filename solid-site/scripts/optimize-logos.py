#!/usr/bin/env python3
"""Generate optimized web-sized copies of logo and mascot images.

Creates smaller copies with a `-web` suffix alongside the originals.
Originals are left untouched.

Usage: python3 scripts/optimize-logos.py
"""

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is required. Install with: pip install pillow")
    sys.exit(1)

BASE = Path(__file__).resolve().parent.parent / "public" / "images"

RESIZE_TARGETS = [
    ("mtynk-logo-gladziolit.png", "mtynk-logo-gladziolit-web.png", 720),
    ("mtynk-logo-gladziolit-dark.png", "mtynk-logo-gladziolit-dark-web.png", 720),
]


def resize_logo(src_name: str, dst_name: str, target_width: int) -> None:
    src = BASE / src_name
    dst = BASE / dst_name
    if not src.exists():
        print(f"  MISSING: {src}")
        return

    with Image.open(src) as im:
        w, h = im.size
        ratio = target_width / w
        new_h = int(h * ratio)
        resized = im.resize((target_width, new_h), Image.Resampling.LANCZOS)
        resized.save(dst, "PNG", optimize=True)

    orig_kb = src.stat().st_size / 1024
    new_kb = dst.stat().st_size / 1024
    print(f"  {src_name} ({w}x{h}, {orig_kb:.1f} KiB)")
    print(f"    → {dst_name} ({target_width}x{new_h}, {new_kb:.1f} KiB, saved {orig_kb - new_kb:.1f} KiB)")


if __name__ == "__main__":
    print("Generating web-optimized logo copies...")
    for src_name, dst_name, width in RESIZE_TARGETS:
        resize_logo(src_name, dst_name, width)
    print("\nDone! Originals are untouched.")
