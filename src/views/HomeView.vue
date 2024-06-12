<template>
  <div class="w-full min-h-screen bg-slate-50 ">
    <div class="max-w-[1200px] mx-auto min-h-screen flex flex-col relative">
      <!-- header -->
      <div class="w-full h-20">
        <div class="w-full max-w-[1200px] fixed top-0 z-50 bg-white py-4 px-2 flex items-center justify-center">
          <div class="lg:w-1/2 w-full h-14 bg-slate-100 rounded-[60px] flex justify-between">
            <div @click="swichTab(1)" :class="tabe == 1 ? 'bg-sky-500 text-white' : ''"
              class="flex h-full items-center justify-center flex-1 cursor-pointer  rounded-[50px]  text-lg">
              <p>All</p>
            </div>
            <div @click="swichTab(2)" :class="tabe == 2 ? 'bg-green-600 text-white' : ''"
              class="flex h-full items-center justify-center flex-1 cursor-pointer rounded-[50px] text-lg">
              <p>Incomes</p>
            </div>
            <div @click="swichTab(3)" :class="tabe == 3 ? 'bg-red-600 text-white' : ''"
              class="flex h-full items-center justify-center flex-1 cursor-pointer rounded-[50px] text-lg">
              <p>Expense</p>
            </div>
          </div>
        </div>
      </div>
      <!-- main -->
       <!-- show monitor chart -->
      <div class="p-8 bg-white mt-4 flex md:flex-row flex-col  ">
        <div class="md:w-1/3 w-full  h-64 justify-center flex">
          <BaseChart :options="chartOptions" />
        </div>
        <div class="flex-1 " v-show="tabe == 1">
          <div>
            <p class="text-lg font-bold">Total Incomes</p>
            <div class="text-3xl font-bold flex text-green-600">
              <p class="mr-2">$ </p>
              <n-number-animation ref="numberAnimationInstRef" :from="0.00" :to="504440.07" show-separator
                :precision="2" />
            </div>
            <!-- <p class="text-3xl font-bold">$ 1,000.00</p> -->

            <div class="mt-4 lg:w-1/2 w-full">
              <n-progress type="line" color="#16A34A" :percentage="20" />
            </div>
          </div>
          <div class="mt-8">
            <p class="text-lg font-bold">Total Expense</p>
            <div class="text-3xl font-bold flex text-red-600">
              <p class="mr-2">$ </p>
              <n-number-animation :from="0.00" :to="504440.07" show-separator :precision="2" />
            </div>
            <div class="mt-4 lg:w-1/2 w-full ">
              <n-progress type="line" color="#DC2626" :percentage="70" />
            </div>
          </div>
        </div>
        <div class="flex-1 " v-show="tabe == 2">
          <div>
            <p class="text-lg font-bold">Total Incomes</p>
            <div class="text-3xl font-bold flex text-green-600">
              <p class="mr-2">$ </p>
              <n-number-animation :from="0.00" :to="504440.07" show-separator :precision="2" />
            </div>
            <div class="mt-4 lg:w-1/2 w-full ">
              <div class="flex justify-between">
                <p class="text-lg font-normal">Salary</p>
                <p class="text-lg font-normal">70%</p>
              </div>
              <n-progress type="line" color="#16A34A" :percentage="70" :show-indicator="false" />
            </div>
            <div class="mt-4 lg:w-1/2 w-full ">
              <div class="flex justify-between">
                <p class="text-lg font-normal">Salary</p>
                <p class="text-lg font-normal">70%</p>
              </div>
              <n-progress type="line" color="#16A34A" :percentage="70" :show-indicator="false" />
            </div>
            <div class="mt-4 lg:w-1/2 w-full ">
              <div class="flex justify-between">
                <p class="text-lg font-normal">Salary</p>
                <p class="text-lg font-normal">70%</p>
              </div>
              <n-progress type="line" color="#16A34A" :percentage="70" :show-indicator="false" />
            </div>
          </div>

        </div>
        <div class="flex-1 " v-show="tabe == 3">
          <div class="">
            <p class="text-lg font-bold">Total Expense</p>
            <div class="text-3xl font-bold flex text-red-600">
              <p class="mr-2">$ </p>
              <n-number-animation :from="0.00" :to="504440.07" show-separator :precision="2" />
            </div>
            <div class="mt-4 lg:w-1/2 w-full ">
              <div class="flex justify-between">
                <p class="text-lg font-normal">Salary</p>
                <p class="text-lg font-normal">70%</p>
              </div>
              <n-progress type="line" color="#DC2626" :percentage="70" :show-indicator="false" />
            </div>
            <div class="mt-4 lg:w-1/2 w-full ">
              <div class="flex justify-between">
                <p class="text-lg font-normal">Salary</p>
                <p class="text-lg font-normal">70%</p>
              </div>
              <n-progress type="line" color="#DC2626" :percentage="70" :show-indicator="false" />
            </div>
            <div class="mt-4 lg:w-1/2 w-full ">
              <div class="flex justify-between">
                <p class="text-lg font-normal">Salary</p>
                <p class="text-lg font-normal">70%</p>
              </div>
              <n-progress type="line" color="#DC2626" :percentage="70" :show-indicator="false" />
            </div>
          </div>
        </div>
      </div>
    
       <!-- list record -->
       <div class="mt-4 bg-white flex-1 overflow-y-scroll">
        <div class="md:p-8 p-4">
          <AllList @clickRecord="ClickRecord" />
        </div>
      </div>
      <!-- button add -->
      <div class="w-full h-16 relative">
        <div class="w-full max-w-[1200px] h-16 bg-white flex justify-center fixed bottom-0">
          <div class="absolute bottom-8 md:right-4">
            <button @click="showDraw = true" :class="tabe == 1 || tabe == 2 ? 'bg-green-600':'bg-red-600'" class=" text-white p-2 h-16 w-16 rounded-full">Add</button>
          </div>
        </div>

      </div>
    </div>
    <n-drawer v-model:show="showDraw" height="360" placement="top" resizable>
      <n-drawer-content>
        <div class="max-w-[1200px] mx-auto flex flex-col relative">
          <div class="w-full">
            <div class=" bg-white py-2 px-2 flex items-center justify-center">
              <div class="lg:w-1/2 w-full h-10 bg-slate-100 rounded-[60px] flex justify-between">
                <div @click="swichTab(2)" :class="tabe == 1 || tabe == 2? 'bg-green-600 text-white' : ''"
                  class="flex h-full items-center justify-center flex-1 cursor-pointer rounded-[50px] text-lg">
                  <p>Incomes</p>
                </div>
                <div @click="swichTab(3)" :class="tabe == 3 ? 'bg-red-600 text-white' : ''"
                  class="flex h-full items-center justify-center flex-1 cursor-pointer rounded-[50px] text-lg">
                  <p>Expense</p>
                </div>
              </div>
            </div>
            <div class="w-full flex justify-center mt-2 flex-col items-center ">
              <div class="lg:w-1/2 w-full flex flex-col gap-2">
                <n-input-number :keyboard="{ ArrowUp: false, ArrowDown: false }" autofocus>
                  <template #prefix>
                    <n-icon size="14" color="#000">
                      <LogoYen />
                    </n-icon>
                  </template>
                </n-input-number>

                <n-select v-model="category" :options="optionsData" />
                <n-input-group>
                  <n-date-picker v-model="timestamp" type="date" clearable />
                </n-input-group>
                <n-input round placeholder="Remark status ..." type="textarea" :autosize="{
                  minRows: 3
                }" />
              </div>
              <div class="lg:w-1/2 w-full mt-4">
                <n-button :color="tabe == 1 || tabe == 2? '#16A34A':'#DC2626'" class="w-full">
                  Save
                </n-button>
              </div>
            </div>
          </div>

        </div>
      </n-drawer-content>
    </n-drawer>

    <n-drawer v-model:show="showRecoad" placement="bottom" resizable>
      <n-drawer-content title="Stoner">
        Stoner is a 1965 novel by the American writer John Williams.
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import { FlashOutline, LogoYen } from "@vicons/ionicons5";
import BaseChart from '../components/BarChart.vue';
import AllList from '../components/AllList.vue';

export default {
  name: 'HomeView',
  components: {
    BaseChart,
    AllList,
    FlashOutline,
    LogoYen
  },
  data() {
    return {
      tabe: 1,
      category: '',
      timestamp: new Date(),
      posts: [],
      showRecoad: false,
      showDraw: false,
      chartOptions: {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: false
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['50%', '90%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: 'Income' },
              { value: 735, name: 'Expense' },
            ],
          },
        ],
      },
      optionsData: [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0',
          disabled: true
        },
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: "You Won't See",
          value: 'song3',
          disabled: true
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourself',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7',
          disabled: true
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: "I'm looking through you",
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
      ]
    };
  },
  methods: {
    ClickRecord() {
      this.showRecoad = true
    },
    swichTab(e) {
      this.tabe = e
      this.$refs.numberAnimationInstRef.value?.play();
      if (e == 1) {
        this.chartOptions.series[0].data = [
          { value: 1048, name: 'Income' },
          { value: 735, name: 'Expense' },
        ]
      } else if (e == 2) {
        this.chartOptions.series[0].data = [
          { value: 1048, name: 'Salary' },
          { value: 735, name: 'Bonus' },
          { value: 735, name: 'OT' },
          { value: 735, name: 'Part time' }
        ]
      } else {
        this.chartOptions.series[0].data = [
          { value: 1048, name: 'Income' },
          { value: 735, name: 'Expense' },
        ]
      }
    }
  },
}
</script>
