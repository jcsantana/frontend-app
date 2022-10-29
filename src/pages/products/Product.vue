<template>
  <div>
    <!-- Desktop -->
    <div v-if="$q.platform.is.desktop">
      <q-page class="row items-center justify-evenly"> Products </q-page>
    </div>
    <!-- Mobile -->
    <div v-if="$q.platform.is.mobile">
      <q-layout view="lHh lpR fFf" :class="$q.dark.isActive ? 'bg-brand' : 'bg-white'">
        <q-header :class="$q.dark.isActive ? ' bg-brand' : ' bg-white'">
          <q-toolbar :class="$q.dark.isActive ? 'bg-brand' : 'bg-white text-black'">
            <q-btn @click="$router.go(-1)" flat round dense icon="arrow_back_ios" />

            <!--  <div class="row">
              <div class="col flex flex-center">
                <span style="font-size: 18px"> MEDICAMENTO </span>
              </div>
            </div> -->
          </q-toolbar>
          <hr style="border: 0; height: 0.9px; background: #d0d0d0" class="q-mt-none" />
        </q-header>
        <q-page-container>
          <q-page>
            <q-card flat class="my-card">
              <q-card-section> Products </q-card-section>
            </q-card>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>
<script>
export default {
  name: 'productPage',

  setup() {
    return {}
  },
}
</script>
<style lang="scss"></style>
