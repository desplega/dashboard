<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Location">{{ item.location }}</md-table-cell>
        <md-table-cell md-label="Updated">{{ item.updated }}</md-table-cell>
        <md-table-cell md-label="Status">
          <md-icon :class="getClass(item)">offline_bolt</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Actions" class="text-right">
          <md-button class="md-just-icon md-simple">
            <md-icon>view_compact</md-icon>
            <md-tooltip md-direction="bottom">View device</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple">
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="bottom">Remove device</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      users: [
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
      ]
    };
  },
  methods: {
    getClass: function(item) {
      return item.status == "ok" ? "status-green" : "status-red";
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
