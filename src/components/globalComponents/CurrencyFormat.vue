<template>
  <q-input ref="inputRef" :rules="[(val) => !!val || $t('productPage.required_input')]" v-model="formattedValue" dense rounded outlined :label="label" />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
import { watch } from 'vue'

export default {
  name: 'QCurrencyInput',
  props: {
    modelValue: null,
    label: String,
    value: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef, formattedValue, setValue } = useCurrencyInput(props.options)
    watch(
      () => props.modelValue,
      (value) => {
        setValue(value)
      }
    )
    return { inputRef, formattedValue }
  },
}
</script>
