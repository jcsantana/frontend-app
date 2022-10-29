<template>
  <div>
    <!-- Layout Mobile -->
    <q-layout v-if="$q.platform.is.mobile" view="lHh lpR lFf">
      <q-page-container>
        <router-view v-slot="{ Component, route }">
          <transition
            mode="out-in"
            appear
            :enter-active-class="$q.platform.is.mobile ? 'animated slideInRight' : 'animated fadeIn'"
            :leave-active-class="$q.platform.is.mobile ? 'animated slideOutRight' : 'animated fadeOut'"
            duration="250"
          >
            <keep-alive>
              <component :key="route.fullPath" :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </q-page-container>
    </q-layout>
    <!-- Layout Desktop -->
    <q-layout v-if="$q.platform.is.desktop" view="lHh lpR lFf">
      <q-header elevated class="bg-grey-10 text-white">
        <q-toolbar>
          <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
          <q-toolbar-title>
            <span>DASHBOARD</span>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer class="bg-grey-2" show-if-above v-model="leftDrawerOpen" side="left">
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
            <keep-alive>
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
