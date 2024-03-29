<template>
  <div>
    <md-table v-model="devices" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell :md-label="$t('table-name')">{{
          item.info.name
        }}</md-table-cell>
        <md-table-cell :md-label="$t('table-number')">{{
          item.info.number
        }}</md-table-cell>
        <md-table-cell :md-label="$t('table-location')">
          {{ item.info.location }}
        </md-table-cell>
        <md-table-cell :md-label="$t('table-updated')">
          {{ item.data.updated }}
          <md-icon v-if="item.data.deviceNotSending === '1'" class="warning"
            >warning</md-icon
          >
        </md-table-cell>
        <md-table-cell :md-label="$t('table-harp-status')">
          <md-icon
            v-if="item.data.harp === '1'"
            :class="getClass(item.data.harp)"
            >check_circle</md-icon
          >
          <md-icon v-else :class="getClass(item.data.harp)">cancel</md-icon>
        </md-table-cell>
        <md-table-cell :md-label="$t('table-actions')" class="text-right">
          <md-button
            class="md-just-icon md-simple"
            @click="viewDevice(item.info.id)"
          >
            <md-icon>art_track</md-icon>
            <md-tooltip md-direction="bottom">{{
              $t("table-action-view-device")
            }}</md-tooltip>
          </md-button>
          <md-button
            class="md-just-icon md-simple"
            @click="editDevice(item.info.id)"
          >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="bottom">{{
              $t("table-action-edit-device")
            }}</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple" @click="deleteDevice(item)">
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="bottom">{{
              $t("table-action-remove-device")
            }}</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <div class="small-alert-modal">
      <modal v-if="alertModal" @close="alertModalHide">
        <template slot="header">
          <md-button
            class="md-simple md-just-icon md-round modal-default-button"
            @click="alertModalHide"
          >
            <md-icon>clear</md-icon>
          </md-button>
        </template>

        <template slot="body">
          <p>
            {{ $t("table-delete-confirm-1") }}
            {{ this.device.info.number }} {{ $t("table-delete-confirm-2") }}
          </p>
        </template>

        <template slot="footer">
          <md-button class="md-simple" @click="alertModalHide">{{
            $t("table-delete-confirm-cancel")
          }}</md-button>
          <md-button
            class="md-success md-simple"
            @click="confirmDeleteDevice"
            >{{ $t("table-delete-confirm-delete") }}</md-button
          >
        </template>
      </modal>
    </div>
  </div>
</template>

<script>
import { Modal } from "@/components";

export default {
  components: {
    Modal
  },
  name: "device-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    devices: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      alertModal: false,
      device: null
    };
  },
  methods: {
    getClass: function(harp) {
      return harp === "1" ? "harp-green" : "harp-red";
    },
    viewDevice: function(id) {
      this.$router.push({ name: "View Device", params: { id } });
    },
    editDevice: function(id) {
      this.$router.push({ name: "Edit Device", params: { id } });
    },
    deleteDevice: function(item) {
      this.alertModal = true;
      this.device = item; // To show the user the ID of the device to be deleted
    },
    confirmDeleteDevice: function() {
      this.$emit("deleteDevice", this.device.info.id);
      this.alertModal = false;
    },
    alertModalHide: function() {
      this.alertModal = false;
    }
  }
};
</script>

<style lang="css">
.md-icon.harp-green {
  color: green !important;
  padding-left: 50px;
}

.md-icon.harp-red {
  color: red !important;
  padding-left: 50px;
}

.md-icon.warning {
  color: orange !important;
}
</style>
