<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Location">{{ item.location }}</md-table-cell>
        <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
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
          status: "OK"
        },
        {
          id: 190915080733,
          name: "Rusc 2",
          location: "Olot bosc",
          status: "OK"
        },
        {
          id: 190915080848,
          name: "Rusc 3",
          location: "Olot esplanada",
          status: "OK"
        },
        {
          id: 190915080621,
          name: "Rusc nou",
          location: "Olot esplanada",
          status: "OK"
        }
      ]
    };
  }
};
</script>
