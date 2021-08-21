<template>
  <div v-if="data">
    <div @click.stop="value = true">
      <slot name="button">
        <v-btn class="success" text icon color="white" v-if="getNewData">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn text icon color="gray" v-else>
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
          <template v-for="key in Object.keys(data)">
            <slot v-if="key !== 'id'" :name="`key-${key}`" :item="data">
              <v-text-field
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

  public defaultDataCopy: T | null = null;

  public value = false;
  public data: T | null = null;

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