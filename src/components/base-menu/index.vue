<template>
  <nav class="base-menu">
    <template v-for="item in menuConf" :key="item.path">
      <a :class="{ active: curMenu.includes(item.path) }" :href="`/${item.path}`" @click="curMenu = item.path">
        {{ item.name }}
      </a>
    </template>
  </nav>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { menuConf } from './index.config';
import { MenuConfItem } from '@/types';

export default defineComponent({
  name: 'BaseMenu',
  setup() {
    /**
     * 声明响应式状态
     */
    const data = reactive({
      menuConf: menuConf as MenuConfItem[],
      curMenu: location.pathname,
    });

    /**
     * 监听hash变化
     */
    window.onhashchange = () => {
      data.curMenu = location.pathname;
    };

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.base-menu {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 210px;
  height: 100vh;
  padding: 30px 0;
  box-shadow: 3px 0 9px 2px #e6e6e6;
  background-color: #fff;

  a {
    display: flex;
    align-items: center;
    padding: 10px 30px;
    font-size: 18px;
    font-weight: 700;
    color: #2c3e50;
    cursor: pointer;
  }

  .active {
    color: #f16b5f;
    background: rgba(0, 0, 0, 0.05);
  }
}
</style>
