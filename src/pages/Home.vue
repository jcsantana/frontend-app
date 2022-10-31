<template>
  <div>
    <!-- Desktop -->
    <div v-if="$q.platform.is.desktop">
      <q-page>
        <div v-if="inventoryState" class="row q-pa-xl q-pt-md q-col-gutter-xs text-center">
          <div class="col-6">
            <q-card class="my-card bg-green-7 text-white">
              <q-card-section>
                <div class="text-h6">$ VALOR EM PRODUTOS</div>
                {{ FORMAT_CURRENCY(inventoryState.value_inventory[0].total) }}
              </q-card-section>
            </q-card>
          </div>
          <div class="col-6">
            <q-card class="my-card bg-blue-7 text-white">
              <q-card-section>
                <div class="text-h6">TOTAL DO ESTOQUE</div>
                {{ inventoryState.quantity_inventory[0].total }}
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row q-mt-xl flex flex-center items-center">
          <div class="col-12">
            <div class="container">
              <div class="box">
                <div class="title">
                  <span class="block"></span>
                  <h1>TESTE APP<span></span></h1>
                </div>

                <div class="role">
                  <div class="block"></div>
                  <p>BY JOSE CANDIDO</p>
                </div>
              </div>
            </div>
          </div>

          <div class="q-mt-sm q-gutter-xs col-12 flex flex-center">
            <q-btn color="red-10" label="FACEBOOK" />
            <q-btn color="blue-10" label="INSTAGRAM" />
            <q-btn color="grey-5" label="GITHUB" />
          </div>
        </div>
      </q-page>
    </div>
    <!-- Mobile -->
    <div v-if="$q.platform.is.mobile">
      <q-layout view="lHh lpR fFf">
        <q-header :class="$q.dark.isActive ? 'background-toolbar-dark text-white' : 'background-toolbar-light text-black q-ma-none q-pt-none'">
          <q-toolbar unlevated>
            <q-btn class="bg-grey-10 text-white" dense unelevated icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
            <q-toolbar-title class="text-center"> COSTA CAFÉ </q-toolbar-title>
            <q-avatar size="30px">
              <img src="~assets/logo.png" />
            </q-avatar>
          </q-toolbar>
          <hr :class="$q.dark.isActive ? 'hr--dark' : 'hr--light'" />
        </q-header>
        <q-page-container>
          <q-page>
            <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
              <componentMenu :color="'text-black'" />
            </q-drawer>

            <div class="row q-mt-lg">
              <div class="col-12">
                <div class="container">
                  <div class="box">
                    <div class="title">
                      <span class="block"></span>
                      <h1>TESTE APP<span></span></h1>
                    </div>

                    <div class="role">
                      <div class="block"></div>
                      <p>BY JOSE CANDIDO</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bootom q-mt-sm q-gutter-xs col-12 flex flex-center">
                <q-btn color="red-10" label="FACEBOOK" />
                <q-btn color="blue-10" label="INSTAGRAM" />
                <q-btn color="grey-5" label="GITHUB" />
              </div>
            </div>

            <div v-if="inventoryState" class="row q-ma-xs q-pt-md q-col-gutter-xs text-center">
              <div class="col-6">
                <q-card flat bordered class="my-card">
                  <q-card-section>
                    <div class="text-h6">$ PRODUTOS</div>
                    {{ FORMAT_CURRENCY(inventoryState.value_inventory[0].total) }}
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-6">
                <q-card flat bordered class="my-card">
                  <q-card-section>
                    <div class="text-h6">ESTOQUE</div>
                    {{ inventoryState.quantity_inventory[0].total }}
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-page>
          <q-footer> </q-footer>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>
<script>
import componentMenu from 'src/components/menuComponent/Menu.vue'
import { ref, onMounted, onActivated } from 'vue'
import { api } from 'boot/axios'
export default {
  name: 'homePage',
  components: {
    componentMenu,
  },
  setup() {
    const leftDrawerOpen = ref(false)
    const inventoryState = ref()
    const FORMAT_CURRENCY = (val) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
    }
    const GET_STATE_INVENTORY = () => {
      api
        .get('/inventory/')
        .then((response) => {
          inventoryState.value = response.data
        })
        .catch((error) => {
          Notify.create({
            message: error.data,
            position: 'top',
            color: 'red-10',
          })
        })
    }
    onMounted(() => {
      GET_STATE_INVENTORY()
    })
    onActivated(() => {
      GET_STATE_INVENTORY()
    })
    return {
      FORMAT_CURRENCY,
      inventoryState,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
}
</script>
<style lang="scss">
.nameApp {
  font-size: 50px;
}
@import url('https://fonts.googleapis.com/css?family=Lato:300,400|Poppins:300,400,800&display=swap');

* {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .title {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      height: 50px;

      .block {
        width: 0%;
        height: inherit;
        background: blue;
        position: absolute;
        animation: mainBlock 2s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
        display: flex;
      }

      h1 {
        font-family: 'Poppins';
        color: red;
        font-size: 50px;
        -webkit-animation: mainFadeIn 2s forwards;
        -o-animation: mainFadeIn 2s forwards;
        animation: mainFadeIn 2s forwards;
        animation-delay: 1.6s;
        opacity: 0;
        display: flex;
        align-items: baseline;
        position: relative;

        span {
          width: 0px;
          height: 0px;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;

          background: #ffb510;
          -webkit-animation: load 0.6s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
          animation: popIn 0.8s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
          animation-delay: 2s;
          margin-left: 5px;
          margin-top: -10px;
          position: absolute;
          bottom: 13px;
          right: -12px;
        }
      }
    }

    .role {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      height: 30px;
      margin-top: 1px;
      margin-left: 3px;

      .block {
        width: 0%;
        height: inherit;
        background: #e91e63;
        position: absolute;
        animation: secBlock 2s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
        animation-delay: 2s;
        display: flex;
      }

      p {
        animation: secFadeIn 2s forwards;
        animation-delay: 3.2s;
        opacity: 0;
        font-weight: 400;
        font-family: 'Lato';
        color: red;
        font-size: 20px;
        text-transform: uppercase;
        letter-spacing: 5px;
      }
    }
  }
}

@keyframes mainBlock {
  0% {
    width: 0%;
    left: 0;
  }
  50% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 0;
    left: 100%;
  }
}

@keyframes secBlock {
  0% {
    width: 0%;
    left: 0;
  }
  50% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 0;
    left: 100%;
  }
}

@keyframes mainFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes popIn {
  0% {
    width: 0px;
    height: 0px;
    background: blue;
    border: 0px solid #ddd;
    opacity: 0;
    margin-right: -20px;
    margin-bottom: -5px;
  }
  50% {
    width: 10px;
    height: 10px;
    background: blue;
    opacity: 1;
    bottom: 45px;
    margin-right: -20px;
    margin-bottom: -5px;
  }
  65% {
    width: 7px;
    height: 7px;
    bottom: 0px;
    width: 15px;
    margin-right: -20px;
    margin-bottom: -5px;
  }
  80% {
    width: 10px;
    height: 10px;
    bottom: 20px;
    margin-right: -20px;
    margin-bottom: -5px;
  }
  100% {
    width: 7px;
    height: 7px;
    background: blue;
    border: 0px solid #222;
    bottom: 13px;
    margin-right: -20px;
    margin-bottom: -5px;
  }
}

@keyframes secFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
  }
}

@keyframes icon {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.3) rotate(-02deg);
  }
  100% {
    opacity: 1;
    bottom: 0px;
  }
}
</style>
