<template>
  <div>
    <md-table v-model="devices" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Location">{{ item.location }}</md-table-cell>
        <md-table-cell md-label="Updated">{{ item.updated }}</md-table-cell>
        <md-table-cell md-label="Status">
          <md-icon :class="getClass(item)">offline_bolt</md-icon>
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
      devices: [
        {
          id: 190915080614,
          name: "Rusc 1",
          location: "Olot bosc",
          updated: "24/09/2019 09:12:24",
          status: "ok"
        },
        {
          id: 190915080733,
          name: "Rusc 2",
          location: "Olot bosc",
          updated: "24/09/2019 09:12:24",
          status: "ok"
        },
        {
          id: 190915080848,
          name: "Rusc 3",
          location: "Olot esplanada",
          updated: "24/09/2019 09:12:24",
          status: "fail"
        },
        {
          id: 190915080621,
          name: "Rusc nou",
          location: "Olot esplanada",
          updated: "24/09/2019 09:12:24",
          status: "ok"
        }
      ],
      alertModal: false,
      device: null
    };
  },
  methods: {
    getClass: function(item) {
      return item.status == "ok" ? "status-green" : "status-red";
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
