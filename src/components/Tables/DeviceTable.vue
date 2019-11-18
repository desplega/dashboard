<template>
  <div>
    <md-table v-model="devices" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.info.name }}</md-table-cell>
        <md-table-cell md-label="Number">{{ item.info.number }}</md-table-cell>
        <md-table-cell md-label="Location">
          {{ item.info.location }}
        </md-table-cell>
        <md-table-cell md-label="Updated">
          {{ item.data.updated }}
          <md-icon v-if="item.data.deviceNotSending === '1'" class="warning"
            >warning</md-icon
          >
        </md-table-cell>
        <md-table-cell md-label="Mesh status">
          <md-icon :class="getClass(item.data.mesh)">offline_bolt</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Actions" class="text-right">
          <md-button
            class="md-just-icon md-simple"
            @click="viewDevice(item.info.id)"
          >
            <md-icon>art_track</md-icon>
            <md-tooltip md-direction="bottom">View device</md-tooltip>
          </md-button>
          <md-button
            class="md-just-icon md-simple"
            @click="editDevice(item.info.id)"
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
            {{ this.device.info.number }} device?
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
    getClass: function(mesh) {
      return mesh === "1" ? "mesh-green" : "mesh-red";
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
.md-icon.mesh-green {
  color: green !important;
  padding-left: 50px;
}

.md-icon.mesh-red {
  color: red !important;
  padding-left: 50px;
}

.md-icon.warning {
  color: orange !important;
}
</style>
