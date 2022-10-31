<template>
  <div>
    <!-- Mobile -->
    <div v-if="$q.platform.is.mobile">
      <q-layout view="lHh lpR lFf">
        <q-footer :class="$q.dark.isActive ? 'background-toolbar-dark text-white' : 'background-toolbar-light text-black'">
          <q-toolbar>
            <q-pagination
              v-if="dataProducts"
              @click="GET_LIST_PRODUCTS(pagination.current_page)"
              v-model="pagination.current_page"
              :max="pagination.last_page"
              direction-links
              flat
              :color="$q.dark.isActive ? 'white' : 'black'"
              active-color="red-10"
            />
          </q-toolbar>
        </q-footer>

        <q-header
          :class="$q.dark.isActive ? 'background-toolbar-dark text-white' : 'background-toolbar-light text-black q-ma-none q-pt-none'"
        >
          <q-toolbar unlevated>
            <q-btn @click="$router.go(-1)" flat round dense icon="arrow_back_ios" />
            <q-toolbar-title style="font-size: 19px; text-align: center; padding-right: 1em" class="title q-pl-none"
              >PESQUISAR PRODUTOS</q-toolbar-title
            >
          </q-toolbar>
          <hr :class="$q.dark.isActive ? 'hr--dark' : 'hr--light'" />
          <q-input @keyup="GET_LIST_PRODUCTS(1)" v-model="searchText" dense rounded outlined class="q-pa-md">
            <template v-slot:append> <q-icon name="search" /> </template
          ></q-input>
        </q-header>

        <q-page-container>
          <q-page>
            <q-list separator>
              <q-linear-progress v-show="loading" size="1px" indeterminate />

              <q-item :to="{ name: 'product-id', params: { id: n.id } }" v-for="n in dataProducts" v-bind:key="n" clickable v-ripple>
                <q-item-section>
                  <q-item-label>{{ n.name }}</q-item-label>
                  <q-item-label class="text-weight-medium" caption lines="2">{{ n.description }}</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label class="text-weight-medium" caption>Preço</q-item-label>
                  <q-item-label class="text-red-10 text-weight-medium" caption>{{ FORMAT_CURRENCY(n.price) }}</q-item-label>
                </q-item-section>
              </q-item>

              <hr class="hr--dark" />
            </q-list>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
    <!-- Desktop -->
    <div v-if="$q.platform.is.desktop">
      <q-page class="q-pa-xl">
        <div class="row flex flex-center">
          <div class="q-mt-md col-10">
            <q-card flat class="my-card coisa">
              <div class="row">
                <div class="col column inline">
                  <q-card-section>
                    <q-input
                      @keyup="GET_LIST_PRODUCTS(1)"
                      :label="$t('searchProduct.input_search_product')"
                      dense
                      rounded
                      outlined
                      v-model="searchText"
                    >
                      <template v-slot:append>
                        <q-avatar>
                          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
                        </q-avatar>
                      </template>
                    </q-input>
                  </q-card-section>
                </div>
                <div class="col-2 flex justify-end">
                  <q-btn v-ripple:white to="/product" flat stack>
                    <q-icon style="color: white; background-color: black" v-ripple:white class="coisa" size="md" name="add" />
                    <span class="button-tag">PRODUTOS</span></q-btn
                  >
                </div>
              </div>
            </q-card>
          </div>

          <div class="q-mt-md col-10">
            <q-table
              flat
              class="coisa"
              :loading="loading"
              :rows-per-page-options="[20]"
              hide-pagination
              :rows="dataProducts"
              :columns="tableColumns"
              row-key="id"
            >
              <template v-slot:body="props">
                <q-tr :props="props" @click="REDIRECT_PRODUCT(props.row.id)">
                  <q-td key="id" :props="props">
                    {{ props.row.id }}
                  </q-td>
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>
                  <q-td key="price" :props="props">
                    {{ FORMAT_CURRENCY(props.row.price) }}
                  </q-td>
                  <q-td key="inventory" :props="props">
                    {{ props.row.inventory }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
          <div class="q-mt-md col-10">
            <q-card flat class="my-card coisa">
              <q-card-section>
                <q-pagination
                  v-if="dataProducts"
                  @click="GET_LIST_PRODUCTS(pagination.current_page)"
                  v-model="pagination.current_page"
                  :max="pagination.last_page"
                  direction-links
                  flat
                  color="grey-10"
                  active-color="red-10"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onActivated } from 'vue'
import { api } from 'boot/axios'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
export default {
  name: 'searchPage',

  setup() {
    /* Variables */
    const { t } = useI18n()
    const router = useRouter()
    const searchText = ref('')
    const dataProducts = ref()
    const loading = ref(false)
    const pagination = ref()
    /* Function */
    const REDIRECT_PRODUCT = (row) => {
      router.push({ name: 'product-id', params: { id: row } })
    }
    const FORMAT_CURRENCY = (val) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
    }
    const GET_LIST_PRODUCTS = (page) => {
      loading.value = true
      api
        .get(`/products/?keyword=${searchText.value}&page=${page}`)
        .then((response) => {
          dataProducts.value = response.data.data
          pagination.value = response.data.meta
          loading.value = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
    onMounted(() => {
      GET_LIST_PRODUCTS(1)
    })
    onActivated(() => {
      GET_LIST_PRODUCTS(1)
    })

    /* Table columns preset */
    const tableColumns = [
      { name: 'id', label: t('searchProduct.id'), field: 'id', align: 'left' },
      {
        name: 'name',
        required: true,
        label: t('searchProduct.name'),
        align: 'left',
        field: (row) => row.name,

        sortable: true,
      },
      { name: 'price', label: t('searchProduct.price'), align: 'left', field: 'price', sortable: true },
      { name: 'inventory', label: t('searchProduct.inventory'), field: 'inventory', sortable: true },
    ]
    /* return */
    return {
      REDIRECT_PRODUCT,
      FORMAT_CURRENCY,
      GET_LIST_PRODUCTS,
      loading,
      dataProducts,
      tableColumns,
      current: ref(3),
      searchText,
      pagination,
    }
  },
}
</script>
<style lang="scss" scoped>
.coisa {
  --border-width: 1px;
  border-radius: 10px;
  position: relative;

  &::after {
    position: absolute;
    content: '';
    top: calc(-1 * var(--border-width));
    left: calc(-1 * var(--border-width));
    z-index: -1;
    width: calc(100% + var(--border-width) * 2);
    height: calc(100% + var(--border-width) * 2);
    background: linear-gradient(
      60deg,
      hsl(224, 85%, 66%),
      hsl(269, 85%, 66%),
      hsl(314, 85%, 66%),
      hsl(359, 85%, 66%),
      hsl(44, 85%, 66%),
      hsl(89, 85%, 66%),
      hsl(134, 85%, 66%),
      hsl(179, 85%, 66%)
    );
    background-size: 300% 300%;
    background-position: 0 50%;
    border-radius: calc(10 * var(--border-width));
    animation: moveGradient 4s alternate infinite;
  }
}

@keyframes moveGradient {
  50% {
    background-position: 100% 50%;
  }
}

.avatar-container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  background: white;
  background-size: cover;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-container::after {
  position: absolute;
  width: 94%;
  height: 94%;
  border-radius: 50%;

  background-size: cover;
  background-repeat: no-repeat;
  content: '';
  top: 3%;
  left: 3%;
}
</style>
