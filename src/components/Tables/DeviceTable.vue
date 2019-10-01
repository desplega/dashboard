<template>
  <div>
    <md-table v-model="devices" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
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
            Are you sure you want to delete the {{ this.device.id }} device?
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
import DeviceService from "@/services/DeviceService.js";

export default {
  components: {
    Modal
  },
  name: "device-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      devices: [],
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
      this.device = item;
    },
    confirmDeleteDevice: function() {
      this.alertModal = false;
      //TODO: add functionality to delete/unregister the device
      for (var i = 0; i < this.devices.length; i++) {
        if (this.devices[i].id === this.device.id) {
          this.devices.splice(i, 1);
          break;
        }
      }
    },
    alertModalHide: function() {
      this.alertModal = false;
    }
  },
  created() {
    DeviceService.get().then(response => {
      this.devices = [];
      for (var i = 0, len = response.data.length; i < len; i++) {
        let device = {};
        device.id = response.data[i].macAddress;
        device.name = response.data[i].name;
        device.location = "Not specified";
        let date = response.data[i].updatedAt;
        device.updated = date.substr(0, 10) + " " + date.substr(11, 8);
        device.status = "ok"; // Otherwise "fail"
        this.devices.push(device);
      }
    });
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
