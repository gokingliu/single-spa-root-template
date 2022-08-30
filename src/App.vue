<template>
  <section class="root">
    <!--侧边栏-->
    <aside class="root__aside">
      <BaseMenu />
    </aside>

    <!--内容区域 (子应用挂载点)-->
    <main id="app-viewport" class="root__main">
      <!--子应用 loading 状态-->
      <div v-if="appLoading" class="root__main--loading">
        <!--loading svg icon-->
        <i class="icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" :d="svgPathD" />
          </svg>
        </i>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import BaseMenu from './components/base-menu/index.vue';

export default defineComponent({
  name: 'App',
  components: { BaseMenu },
  setup() {
    // 子应用 loading 状态
    const appLoading = inject('$appLoading');
    // svg path 属性
    const svgPathD = ref(
      'M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 ' +
        '32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 ' +
        '32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 ' +
        '0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 ' +
        '45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 ' +
        '0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 ' +
        '0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 ' +
        '32 0 0 1 45.248 0z',
    );

    return { appLoading, svgPathD };
  },
});
</script>

<style lang="scss" scoped>
.root {
  display: flex;

  &__aside {
    width: 210px;
    height: 100vh;
  }

  &__main {
    height: 100vh;
    flex: auto;

    &--loading {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      .icon {
        width: 32px;
        height: 32px;
        color: #f16b5f;
        animation: rotating 2s linear infinite;
      }

      @keyframes rotating {
        0% {
          transform: rotate(0);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
