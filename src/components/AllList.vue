<template>
    <n-infinite-scroll style="height: 70vh" :distance="20" @load="handleLoad">
      <div class="flex flex-col gap-3">
        <ListBuet
          v-for="(item, index) in budgets"
          :budgetsItem="item"
          :key="index"
          @clickRecord="emitClickRecord(item)"
          @clickEdit="emitClickEdit"
          @clickDelete="deleteRecord(item.type, item.id)"
        />
      </div>
      <div v-if="loading" class="text">
        Loading...
      </div>
      <div v-if="noMoreData" class="text w-full text-center py-2">
        No More Data
      </div>
    </n-infinite-scroll>
  </template>
  
  <script>
  import ListBuet from './ListBudgetd.vue';
  
  export default {
    props: {
      budgets: {
        type: Array,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },
  
    data() {
      return {
        loading: false,
        page: 0, // Initialize the current page
        size: 5  // Number of items per page
      };
    },
  
    components: {
      ListBuet
    },
  
    computed: {
      noMoreData() {
        return this.budgets.length >= this.total;
      }
    },
  
    methods: {
      // Click record with the record item
      emitClickRecord(item) {
        this.$emit('clickRecord', item);
      },
  
      emitClickEdit() {
        this.$emit('clickEdit');
      },
  
      deleteRecord(type, id) {
        this.$emit('clickDelete', type, id);
      },
  
      async handleLoad() {
        if (this.loading || this.noMoreData) return;
        this.loading = true;
  
        try {
          this.page += 1; // Increment the page number
          const res = await this.$api.listAll(this.page, this.size);
          this.$emit('updateBudgets', res.content); // Emit the new items to parent component
        } catch (error) {
          console.error('Error loading more data:', error);
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  