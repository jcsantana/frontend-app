<template>
  <div>
    <!-- Desktop -->
    <div v-if="$q.platform.is.desktop">
      <q-page class="q-pa-xl">
        <q-inner-loading :showing="!loadingData" label="Carregando dados aguarde" label-class="text-blue-10" label-style="font-size: 1.1em" />
        <div v-if="loadingData" class="row flex flex-center">
          <div class="q-mt-md col-8">
            <q-card square class="my-card q-pa-md">
              <q-banner inline-actions class="text-white bg-red-10 q-mb-md">
                {{ $t('productPage.title') }}
                <template v-slot:action>
                  <q-btn @click="CREATE_OR_UPDATE_PRODUCT()" flat color="white" :label="$t('productPage.btn_create_or_update')" />
                  <q-btn @click="DELETE_PRODUCT()" v-show="editOrCreate" flat color="white" :label="$t('productPage.btn_delete')" />
                </template>
              </q-banner>
              <div class="row">
                <div class="col-12">
                  <div class="row q-col-gutter-xs">
                    <div class="col-12 col-md-6">
                      <q-input
                        dense
                        rounded
                        outlined
                        ref="inputRef"
                        v-model="product.name"
                        :label="$t('productPage.name')"
                        :rules="[(val) => !!val || $t('productPage.required_input')]"
                      />
                    </div>
                    <div class="col-12 col-md-3">
                      <CurrencyComponent :label="$t('productPage.price')" v-model="product.price" :options="{ currency: 'BRL' }" />
                    </div>
                    <div class="col-12 col-md-3">
                      <q-input
                        dense
                        rounded
                        outlined
                        ref="inputRef"
                        v-model="product.inventory"
                        :label="$t('productPage.inventory')"
                        :rules="[(val) => !!val || $t('productPage.required_input')]"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <q-input
                        dense
                        rounded
                        outlined
                        ref="inputRef"
                        v-model="product.description"
                        :label="$t('productPage.description')"
                        :rules="[(val) => !!val || $t('productPage.required_input')]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </div>
    <!-- Mobile -->
    <div v-if="$q.platform.is.mobile">
      <q-layout view="lHh lpR fFf">
        <q-header :class="$q.dark.isActive ? 'background-toolbar-dark text-white' : 'background-toolbar-light text-black'">
          <q-toolbar>
            <q-btn @click="this.$router.go(-1)" flat round dense icon="arrow_back_ios" />
            <q-toolbar-title style="font-size: 19px; text-align: center; padding-right: 1em" class="title q-pl-none">{{ $t('productPage.title') }}</q-toolbar-title>
            <q-btn to="/" flat round dense icon="home" />
          </q-toolbar>
          <hr :class="$q.dark.isActive ? 'hr--dark' : 'hr--light'" />
        </q-header>

        <q-page-container>
          <q-page class="q-pa-sm">
            <q-inner-loading :showing="!loadingData" label="Carregando dados aguarde" label-class="text-blue-10" label-style="font-size: 1.1em" />
            <div v-if="loadingData" class="row flex flex-center q-mt-sm">
              <div class="row">
                <div class="col-12">
                  <div class="row q-col-gutter-xs">
                    <div class="col-12 col-md-6">
                      <q-input
                        dense
                        rounded
                        outlined
                        ref="inputRef"
                        v-model="product.name"
                        :label="$t('productPage.name')"
                        :rules="[(val) => !!val || $t('productPage.required_input')]"
                      />
                    </div>
                    <div class="col-12 col-md-3">
                      <CurrencyComponent :label="$t('productPage.price')" v-model="product.price" :options="{ currency: 'BRL' }" />
                    </div>
                    <div class="col-12 col-md-3">
                      <q-input
                        dense
                        rounded
                        outlined
                        ref="inputRef"
                        v-model="product.inventory"
                        :label="$t('productPage.inventory')"
                        :rules="[(val) => !!val || $t('productPage.required_input')]"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <q-input
                        dense
                        rounded
                        outlined
                        ref="inputRef"
                        v-model="product.description"
                        :label="$t('productPage.description')"
                        :rules="[(val) => !!val || $t('productPage.required_input')]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr :class="$q.dark.isActive ? 'hr--dark' : 'hr--light'" />
            <div class="row q-col-gutter-xs q-mt-xs">
              <div class="col">
                <q-btn class="full-width" @click="CREATE_OR_UPDATE_PRODUCT()" color="green-7" :label="$t('productPage.btn_create_or_update')" />
              </div>
              <div v-show="editOrCreate" class="col">
                <q-btn class="full-width" @click="DELETE_PRODUCT()" color="red-8" :label="$t('productPage.btn_delete')" />
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'

import { onMounted, toRefs, ref, reactive } from 'vue'
import { Notify, useQuasar } from 'quasar'
import { api } from 'boot/axios'
export default {
  name: 'productPage',

  setup() {
    const route = useRoute()
    const router = useRouter()
    const $q = useQuasar()
    const editOrCreate = ref(route.params.id)
    const loadingData = ref()
    const data = reactive({
      product: {
        name: '',
        price: 0,
        inventory: '',
        description: '',
      },
    })

    const CREATE_OR_UPDATE_PRODUCT = () => {
      if ((data.product.name.length <= 0) | (data.product.price.length <= 0) | (data.product.inventory.length <= 0) | (data.product.description.length <= 0)) {
        Notify.create({
          message: 'Campos importantes em branco',
          position: 'bottom',
          color: 'red-10',
        })
      } else {
        if (editOrCreate.value) {
          api
            .put(`/products/${route.params.id}`, data.product)
            .then((response) => {
              Notify.create({
                message: response.data,
                position: 'bottom',
                color: 'green-10',
              })
            })
            .catch((error) => {
              Notify.create({
                message: error.data,
                position: 'bottom',
                color: 'red-10',
              })
            })
        } else {
          api
            .post('/products/', data.product)
            .then((response) => {
              Notify.create({
                message: response.data,
                position: 'bottom',
                color: 'green-10',
              })
            })
            .catch((error) => {
              Notify.create({
                message: error.data,
                position: 'bottom',
                color: 'red-10',
              })
            })
        }
      }
    }
    const DELETE_PRODUCT = () => {
      $q.dialog({
        title: 'ALERTA!',
        message: 'Voc?? deseja realmente deletar esse produto?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        api
          .delete(`/products/${editOrCreate.value}`)
          .then((response) => {
            Notify.create({
              message: response.data + ', voc?? sera redirecionando',
              position: 'bottom',
              color: 'red-10',
            })
            router.push({ name: 'search-products' })
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
    const GET_PRODUCT = () => {
      loadingData.value = false
      api
        .get(`/products/${editOrCreate.value}`)
        .then((response) => {
          data.product = response.data[0]
          loadingData.value = true
        })
        .catch((error) => {
          console.log(error)
        })
    }
    onMounted(() => {
      if (editOrCreate.value) {
        GET_PRODUCT()
      } else {
        loadingData.value = true
        console.log('Create')
      }
    })
    return {
      CREATE_OR_UPDATE_PRODUCT,
      DELETE_PRODUCT,
      price: ref(),
      model: ref(),
      editOrCreate,
      ...toRefs(data),
      loadingData,
    }
  },
}
</script>
<style lang="scss"></style>
