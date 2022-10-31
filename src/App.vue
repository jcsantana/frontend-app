<template>
  <div>
    <!-- Layout Mobile -->
    <q-layout v-if="$q.platform.is.mobile" view="lHh lpR lFf">
      <q-page-container>
        <router-view v-slot="{ Component, route }">
          <transition
            mode="out-in"
            appear
            :enter-active-class="$q.platform.is.mobile ? 'animated fadeInRight' : 'animated fadeIn'"
            :leave-active-class="$q.platform.is.mobile ? 'animated fadeOutRight' : 'animated fadeOut'"
            duration="300"
          >
            <keep-alive exclude="productPage">
              <component :key="route.fullPath" :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </q-page-container>
    </q-layout>
    <!-- Layout Desktop -->
    <q-layout v-if="$q.platform.is.desktop" view="lHh lpR lFf">
      <q-header :class="$q.dark.isActive ? 'bg-dark text-white' : 'background-toolbar-light text-black'">
        <q-toolbar unlevated>
          <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
          <q-toolbar-title>
            <span>DASHBOARD</span>
          </q-toolbar-title>
        </q-toolbar>
        <hr :class="$q.dark.isActive ? 'hr--dark q-ma-none' : 'hr--light q-ma-none'" />
      </q-header>

      <q-drawer bordered show-if-above v-model="leftDrawerOpen" side="left">
        <componentMenu />
      </q-drawer>

      <q-page-container class="">
        <router-view v-slot="{ Component, route }">
          <transition
            mode="out-in"
            :enter-active-class="$q.platform.is.mobile ? 'animated slideInRight' : 'animated fadeIn'"
            :leave-active-class="$q.platform.is.mobile ? 'animated slideOutRight' : 'animated fadeOut'"
            duration="250"
          >
            <keep-alive exclude="productPage">
              <component :key="route.fullPath" :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import componentMenu from 'src/components/menuComponent/Menu.vue'

export default defineComponent({
  name: 'App',
  components: {
    componentMenu,
  },
  setup() {
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
})
</script>
