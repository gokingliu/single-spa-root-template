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
        <el-icon class="is-loading" size="32" color="#0052d9">
          <i-ep-loading />
        </el-icon>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import BaseMenu from './components/base-menu/index.vue';

export default defineComponent({
  name: 'App',
  components: { BaseMenu },
  setup() {
    // 子应用 loading 状态
    const appLoading = inject('$appLoading');

    return { appLoading };
  },
});
</script>

<style lang="scss" scoped>
.root {
  &__aside {
    width: 150px;
    height: 100vh;
  }

  &_main {
    height: 100vh;

    &--loading {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
