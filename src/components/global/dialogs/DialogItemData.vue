<template>
  <div v-if="data">
    <div @click.stop="value = true">
      <slot name="button">
        <v-btn
          class="success rounded-0"
          text
          :color="color || 'white'"
          v-if="getNewData"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn text icon :color="color || 'gray'" v-else>
          <v-icon>edit</v-icon>
        </v-btn>
      </slot>
    </div>
    <generic-dialog
      v-model="value"
      :title="title"
      :onConfirm="() => confirm()"
      :onCancel="() => cancel()"
      :confirmText="getNewData ? 'Ajouter' : 'Modifier'"
      cancellable
      hasActivationButton
    >
      <template slot="content">
        <v-form>
          <template v-for="key in getKeys(data)">
            <slot v-if="key !== 'id'" :name="`key-${key}`" :item="data">
              <v-datetime-picker
                v-if="typeof data[key].getTime === 'function'"
                v-model="data[key]"
                :label="keysTranslate ? keysTranslate[key] || key : key"
                :timePickerProps="{ format: '24hr' }"
                clearText="Annuler"
              />

              <v-text-field
                v-else
                :key="key"
                v-model="data[key]"
                :label="keysTranslate ? keysTranslate[key] || key : key"
              />
            </slot>
          </template>
        </v-form>
      </template>
    </generic-dialog>
  </div>
</template>

<script lang="ts">
import { IIdentifiedItem } from "@/interfaces";
import { Component, Prop, Vue } from "vue-property-decorator";

import GenericDialog from "@/components/General/GenericDialog.vue";

@Component({
  components: {
    GenericDialog,
  },
})
export default class DialogItemData<T extends IIdentifiedItem> extends Vue {
  @Prop() public readonly title: string;
  @Prop() public readonly buttonText: string;
  @Prop() public readonly getNewData: () => T;
  @Prop() public readonly onConfirm: (data) => void;
  @Prop() public readonly keysTranslate: Record<string, string>;
  @Prop() public readonly defaultData: T;
  @Prop() public readonly enabledKeys: string[];
  @Prop() public readonly color: string;

  public defaultDataCopy: T | null = null;

  public datePickerOpen: Record<string, boolean> = {};
  public datePickerData: Record<string, Date> = {};

  public value = false;
  public data: T | null = null;

  public getKeys(item) {
    const keys = Object.keys(item);
    if (this.enabledKeys) {
      return keys.filter((x) => this.enabledKeys.includes(x));
    }
    return keys;
  }

  public confirm() {
    if (this.data !== null) {
      this.onConfirm(this.data);
      if (this.getNewData) {
        this.data = this.getNewData();
      }
      this.value = false;
      this.defaultDataCopy = this.data;
    }
  }

  public cancel() {
    if (this.defaultDataCopy) {
      Object.keys(this.defaultDataCopy).forEach((key) => {
        if (this.data && this.defaultDataCopy) {
          this.data[key] = this.defaultDataCopy[key];
        }
      });
    }
    this.value = false;
  }

  public mounted() {
    if (this.getNewData) {
      this.data = this.getNewData();
    }
    if (this.defaultData) {
      this.defaultDataCopy = { ...this.defaultData };
      this.data = this.defaultData;
    }
  }
}
</script>