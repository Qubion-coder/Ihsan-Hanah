import sys
from PIL import Image

input_path = "public/ChatGPT Image Oct 1, 2026, 10_30_34 PM.png"
output_path = "public/og-image-optimized.jpg"

try:
    with Image.open(input_path) as img:
        # Convert to RGB if it's RGBA
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        
        # We don't crop, but we can resize to a reasonable width (1200 is standard for OG)
        # keeping the aspect ratio.
        max_width = 1200
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

        img.save(output_path, "JPEG", quality=85, optimize=True)
        print("Successfully optimized image")
except Exception as e:
    print(f"Error: {e}")
