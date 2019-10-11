<template>
  <div>
    <md-table v-model="devices" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="macAddress">{{
          item.macAddress
        }}</md-table-cell>
        <md-table-cell md-label="Location">{{ item.location }}</md-table-cell>
        <md-table-cell md-label="Updated">{{ item.updated }}</md-table-cell>
        <md-table-cell md-label="Status">
          <md-icon :class="getClass(item.status)">offline_bolt</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Actions" class="text-right">
          <md-button
            class="md-just-icon md-simple"
            @click="viewDevice(item.id)"
          >
            <md-icon>art_track</md-icon>
            <md-tooltip md-direction="bottom">View device</md-tooltip>
          </md-button>
          <md-button
            class="md-just-icon md-simple"
            @click="editDevice(item.id)"
          >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="bottom">Edit device</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple" @click="deleteDevice(item)">
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="bottom">Remove device</md-tooltip>
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
            Are you sure you want to delete the
            {{ this.device.macAddress }} device?
          </p>
        </template>

        <template slot="footer">
          <md-button class="md-simple" @click="alertModalHide"
            >Cancel</md-button
          >
          <md-button class="md-success md-simple" @click="confirmDeleteDevice"
            >Delete</md-button
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
    getClass: function(status) {
      return status == "ok" ? "status-green" : "status-red";
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
      this.$emit("deleteDevice", this.device.id);
      this.alertModal = false;
    },
    alertModalHide: function() {
      this.alertModal = false;
    }
  }
};
</script>

<style lang="css">
.md-icon.status-green {
  color: green !important;
  padding-left: 25px;
}

.md-icon.status-red {
  color: red !important;
  padding-left: 25px;
}
</style>
