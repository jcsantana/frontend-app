<template>
  <div>
    <!-- Desktop -->
    <div v-if="$q.platform.is.desktop">
      <q-page class="q-pa-xl">
        <div class="row flex flex-center">
          <div class="q-mt-md col-10">
            <q-card class="my-card">
              <div class="row">
                <div class="col">
                  <q-card-section>
                    <q-input
                      @keyup="getListProduct(1)"
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
                  <q-card-section>
                    <q-btn color="grey-10" icon="add" :label="$t('searchProduct.btn_register_product')" />
                  </q-card-section>
                </div>
              </div>
            </q-card>
          </div>

          <div class="q-mt-md col-10">
            <q-table :rows-per-page-options="[10]" hide-pagination :rows="dataProducts" :columns="columns" row-key="id">
              <template v-slot:body="props">
                <q-tr :props="props" @click="clickrow(props.row.id)">
                  <q-td key="id" :props="props">
                    {{ props.row.id }}
                  </q-td>
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>
                  <q-td key="price" :props="props">
                    {{ formatCurrency(props.row.price) }}
                  </q-td>
                  <q-td key="inventory" :props="props">
                    {{ props.row.inventory }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
          <div class="q-mt-md col-10">
            <q-card class="my-card">
              <q-card-section>
                <q-pagination
                  v-if="dataProducts"
                  @click="getListProduct(pagination.current_page)"
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
              <q-card-section> Product </q-card-section>
            </q-card>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useI18n } from 'vue-i18n'
export default {
  name: 'searchPage',

  setup() {
    const { t } = useI18n()
    const searchText = ref('')
    const dataProducts = ref()

    const clickrow = (row) => {
      console.log('clicked on', row)
    }

    const formatCurrency = (val) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
    }
    const pagination = ref()

    const getListProduct = (page) => {
      api
        .get(`/products/?keyword=${searchText.value}&page=${page}`)
        .then((response) => {
          dataProducts.value = response.data.data
          pagination.value = response.data.meta
        })
        .catch((error) => {
          console.log(error)
        })
    }
    onMounted(() => {
      getListProduct(1)
    })
    const columns = [
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

    return {
      dataProducts,
      columns,
      current: ref(3),
      clickrow,
      searchText,
      formatCurrency,
      getListProduct,
      pagination,
    }
  },
}
</script>
<style lang="scss"></style>
