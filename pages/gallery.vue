<template>
  <section class="gallery">
    <header class="gallery-header">
      <h1 class="title">Hexaturion Video Gallery</h1>
      <p class="subtitle">Watch the animations of the LED Hexahedron.</p>
    </header>

    <div class="columns is-multiline">
      <div
        v-for="video in videos"
        :key="video.id"
        class="column is-one-third-desktop is-half-tablet"
      >
        <div class="card video-card" @click="openVideo(video)">
          <div class="card-content has-text-centered">
            <div class="play-button">▶</div>

            <h3 class="title is-5">
              {{ video.title }}
            </h3>

            <p class="has-text-grey">
              {{ video.size }}
            </p>
          </div>
        </div>
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
            allow="autoplay; fullscreen"
            allowfullscreen
            frameborder="0"
          />
        </div>

        <div class="video-modal-info">
          <h2 class="title is-4">
            {{ selectedVideo.title }}
          </h2>

          <p class="has-text-grey">
            {{ selectedVideo.size }}
          </p>
        </div>
      </div>
    </div>
  </section>
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
    id: "1OJdT4Tdh1CGSh54Fl66vdq2O4f1pnRZl",
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
    title: "Rubik's Cube 8x8",
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
.gallery-header {
  text-align: center;
  margin-bottom: 2rem;
}

.video-card {
  height: 100%;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.play-button {
  width: 64px;
  height: 64px;

  margin: 0 auto 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  border: 2px solid #128408;
  color: #128408;
  background: transparent;

  font-size: 24px;

  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.video-card:hover .play-button {
  background-color: #128408;
  color: white;
}

.video-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(0, 0, 0, 0.75);
}

.video-modal {
  position: relative;

  width: min(1100px, 100%);

  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.video-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  height: min(80vh, 900px);

  background: black;
}

.video-wrapper iframe {
  width: auto;
  height: 100%;
  max-width: 100%;

  aspect-ratio: 9 / 16;
}

.video-modal-info {
  padding: 1rem 1.5rem;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;

  z-index: 10;

  width: 40px;
  height: 40px;

  border: none;
  border-radius: 50%;

  background: rgba(0, 0, 0, 0.7);
  color: white;

  font-size: 28px;

  cursor: pointer;
}
</style>
