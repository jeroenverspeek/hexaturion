<script setup lang="ts">
/**
 A picture of the device the GUI talks to: the cube, or the panel on its
 stand - as its catalog says what it is, or, for one that has not said so
 yet, as it is called in the list of devices.
*/
const { catalog } = useCatalog();
const { active } = useDevices();
const { t } = useLanguage();

const kind = computed<"cube" | "panel">(() =>
  catalog.value?.device?.kind ?? (/panel|paneel|square|tetragon/i.test(`${active.value.id} ${active.value.label}`) ? "panel" : "cube"),
);
const pictures = {
  cube: "/gallery/cube_rubikscube_pattern.jpg",
  panel: "/gallery/led-tetragon_on_stand.png",
};
</script>

<template>
  <figure class="device-picture">
    <img :src="pictures[kind]" :alt="t(`device.picture.${kind}`)" />
  </figure>
</template>

<style scoped lang="scss">
.device-picture {
  display: flex;
  justify-content: center;
}

.device-picture img {
  max-height: 22rem;
  max-width: 100%;
  object-fit: contain;
  border-radius: 6px;
}
</style>
