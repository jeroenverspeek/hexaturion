```vue
<template>
  <div class="video-gallery">
    <header class="gallery-header">
      <h1>Hexaturion Video Gallery</h1>
      <p>Watch the animations of the LED Hexahedron.</p>
    </header>

    <div class="video-list">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="video-item"
        @click="openVideo(video)"
      >
        <div class="play-button">▶</div>

        <div class="video-details">
          <h3>{{ video.title }}</h3>
          <span>{{ video.size }}</span>
        </div>

        <div class="arrow">›</div>
      </div>
    </div>

    <!-- Video player overlay -->
    <div v-if="selectedVideo" class="video-overlay" @click.self="closeVideo">
      <div class="video-modal">
        <button
          class="close-button"
          aria-label="Close video"
          @click="closeVideo"
        >
          ×
        </button>

        <div class="video-wrapper">
          <iframe
            :src="`https://drive.google.com/file/d/${selectedVideo.id}/preview`"
            width="100%"
            height="100%"
            allow="autoplay; fullscreen"
            allowfullscreen
            frameborder="0"
          >
          </iframe>
        </div>

        <div class="video-modal-info">
          <h2>{{ selectedVideo.title }}</h2>
          <span>{{ selectedVideo.size }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Video {
  title: string;
  id: string;
  size: string;
}

const videos: Video[] = [
  {
    title: "Celestial Bodies: Jupiter",
    id: "12jZdjlQLvf5jy5DRpLzWe_hIguLuOZcw",
    size: "58 MB",
  },
  {
    title: "Cubemap: Forbidden City",
    id: "OJdT4Tdh1CGSh54Fl66vdq2O4f1pnRZl",
    size: "43.1 MB",
  },
  {
    title: "Digital Clock (Realtime World)",
    id: "1_O_8C5F1btuvEDW8TS-zIzGOtIvqxC24",
    size: "61.4 MB",
  },
  {
    title: "Emojis",
    id: "1YRq2j5NtgXcjn-hwmXBmBvkKw6T_mcx6",
    size: "12.5 MB",
  },
  {
    title: "Fireworks",
    id: "1cWmhQfFZwhXBh3axkupWuLeHqN0lHEiQ",
    size: "83.4 MB",
  },
  {
    title: "Hello",
    id: "1BaKKe_RiCXiJIzAi2rqiF3kARFj-kjnc",
    size: "335.8 MB",
  },
  {
    title: "Rotating Globe",
    id: "1e2XqlYYaasvL5V_xy5Emhh1jwqWfL7e6",
    size: "128 MB",
  },
  {
    title: "Rubik's Cube 4x4",
    id: "1pGpAPtWd0DFBK_1RkMpqSzsyiPCe02pL",
    size: "181.3 MB",
  },
  {
    title: "Rubik's Cube 9x9",
    id: "1b5_qe9qlMvDLGwXk9Xsuyw-8PD3UZv8s",
    size: "515 MB",
  },
  {
    title: "Rubik's Sliding Puzzle",
    id: "1h2zFDap3Dl9OdIpaJQjzZ3eV8Fcbd3EL",
    size: "459.5 MB",
  },
  {
    title: "Stock Market Quotes",
    id: "1RlnMkBNmHkizXOPRebCXZdqZIzbf_FSc",
    size: "188.1 MB",
  },
  {
    title: "Trippy Video 2",
    id: "1o8e3U2VorGj_rH5TcOahowjOY_kfk2TG",
    size: "38.7 MB",
  },
  {
    title: "Word Clock (Dutch)",
    id: "1Oc7L3mlL9v5JRDXOYo9tGFsfs2mw-OfU",
    size: "64.3 MB",
  },
];

const selectedVideo = ref<Video | null>(null);

function openVideo(video: Video) {
  selectedVideo.value = video;
}

function closeVideo() {
  selectedVideo.value = null;
}
</script>

<style scoped>
.video-gallery {
  padding: 30px 20px;
  max-width: 900px;
  margin: 0 auto;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
}

.gallery-header {
  text-align: center;
  margin-bottom: 40px;
}

.gallery-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #38bdf8;
}

.gallery-header p {
  color: #94a3b8;
}

/* Video list */

.video-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.video-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 20px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.video-item:hover {
  transform: translateX(4px);
  background-color: #263449;
  border-color: #38bdf8;
}

/* Play button */

.play-button {
  width: 42px;
  height: 42px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #38bdf8;
  color: #0f172a;

  border-radius: 50%;
  font-size: 17px;
  padding-left: 2px;
}

/* Video information */

.video-details {
  flex: 1;
  min-width: 0;
}

.video-details h3 {
  margin: 0 0 5px;
  font-size: 1.05rem;
  font-weight: 500;
  color: #f1f5f9;
}

.video-details span {
  font-size: 0.85rem;
  color: #94a3b8;
}

/* Arrow */

.arrow {
  font-size: 30px;
  color: #64748b;
  transition: color 0.15s ease;
}

.video-item:hover .arrow {
  color: #38bdf8;
}

/* Video overlay */

.video-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px;

  background-color: rgba(0, 0, 0, 0.85);
}

/* Video modal */

.video-modal {
  position: relative;
  width: min(1100px, 100%);
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.video-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000;
}

.video-wrapper iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
}

/* Close button */

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;

  width: 38px;
  height: 38px;

  border: none;
  border-radius: 50%;

  background-color: rgba(0, 0, 0, 0.7);
  color: white;

  font-size: 28px;
  line-height: 1;

  cursor: pointer;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

/* Modal information */

.video-modal-info {
  padding: 15px 20px;
}

.video-modal-info h2 {
  margin: 0 0 5px;
  font-size: 1.2rem;
  color: #f1f5f9;
}

.video-modal-info span {
  font-size: 0.85rem;
  color: #94a3b8;
}

/* Mobile */

@media (max-width: 600px) {
  .video-gallery {
    padding: 20px 12px;
  }

  .gallery-header h1 {
    font-size: 2rem;
  }

  .video-item {
    padding: 13px 14px;
    gap: 12px;
  }

  .play-button {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }

  .video-details h3 {
    font-size: 0.95rem;
  }

  .video-overlay {
    padding: 10px;
  }

  .video-modal-info {
    padding: 12px 15px;
  }
}
</style>
```
