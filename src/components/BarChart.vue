<!-- src/components/BaseChart.vue -->
<template>
    <div ref="chart" :style="{ width: '100%', height: '100%' }"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'BaseChart',
    props: {
      options: {
        type: Object,
        required: true,
      }
    },
    mounted() {
      this.initChart();
    },
    watch: {
      options: {
        handler(newOptions) {
          if (this.chart) {
            this.chart.setOption(newOptions);
          }
        },
        deep: true,
      },
    },
    beforeUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$refs.chart);
        this.chart.setOption(this.options);
      }
    },
    data() {
      return {
        chart: null,
      };
    }
  }
  </script>
  
  <style scoped>
  /* Add any specific styles you need for your chart */
  </style>
  