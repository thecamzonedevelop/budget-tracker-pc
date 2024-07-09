<template>
  <div class="w-full min-h-screen bg-slate-50 overflow-hidden ">
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
      <!-- show monitor chart -->
      <div class="p-8 bg-white mt-4 flex md:flex-row flex-col relative ">
        <!-- clear -->
        <div @click="showReset = true"
          class="absolute w-8 h-8 flex items-center rounded-md justify-center bg-red-600  right-2 top-2">
          <n-icon size="18" color="#fff">
            <SyncCircleOutline />
          </n-icon>
        </div>
        <div class="md:w-1/3 w-full  h-64 justify-center flex">
          <BaseChart :options="chartOptions" />
        </div>
        <div class="flex-1 " v-show="tabe == 1">
          <div>
            <p class="text-lg font-bold">Total Incomes</p>
            <div class="text-3xl font-bold flex text-green-600">
              <p class="mr-2">$ </p>
              <n-number-animation ref="numberAnimationInstRef" :from="0.00" :to="totalIncome" show-separator
                :precision="2" />
            </div>
            <!-- <p class="text-3xl font-bold">$ 1,000.00</p> -->

            <div class="mt-2 lg:w-1/2 w-full">
              <n-progress type="line" color="#16A34A" :percentage="progressIncome" />
            </div>
          </div>
          <div class="mt-4">
            <p class="text-lg font-bold">Total Expense</p>
            <div class="text-3xl font-bold flex text-red-600">
              <p class="mr-2">$ </p>
              <n-number-animation :from="0.00" :to="totalExpense" show-separator :precision="2" />
            </div>
            <div class="mt-2 lg:w-1/2 w-full ">
              <n-progress type="line" color="#DC2626" :percentage="progressExpense" />
            </div>
          </div>
          <div class="mt-4">
            <p class="text-lg font-bold">Saving</p>
            <div class="text-3xl font-bold flex text-sky-500">
              <p class="mr-2">$ </p>
              <n-number-animation :from="0.00" :to="totalSpend" show-separator :precision="2" />
            </div>
            <div class="mt-2 lg:w-1/2 w-full ">
              <n-progress type="line" color="#0ea5e9" :percentage="progressSave" />
            </div>
          </div>
        </div>
        <div class="flex-1 " v-show="tabe == 2">
          <div>
            <p class="text-lg font-bold">Total Incomes</p>
            <div class="text-3xl font-bold flex text-green-600">
              <p class="mr-2">$ </p>
              <n-number-animation :from="0.00" :to="totalIncome" show-separator :precision="2" />
            </div>
          </div>
          <div class="text-lg font-medium mt-2">
            <p>
              Income from
            </p>
          </div>
          <div class="mt-4 lg:w-1/2 w-full flex-col flex flex-1 gap-2 overflow-y-auto ">
            <div v-if="categoryTotal" v-for="(item, index) in categoryTotal" :key="index"
              class="flex justify-between items-center">
              <p class="text-lg ">{{ item.category.name }}</p>
              <p class="text-lg font-bold text-green-600">+{{ item.total }}</p>
            </div>
          </div>
        </div>
        <div class="flex-1 flex flex-col  " v-show="tabe == 3">
          <div class="">
            <p class="text-lg font-bold">Total Expense</p>
            <div class="text-3xl font-bold flex text-red-600">
              <p class="mr-2">$ </p>
              <n-number-animation :from="0.00" :to="totalExpense" show-separator :precision="2" />
            </div>
          </div>
          <div class="text-lg font-medium mt-2">
            <p>
              Expense on
            </p>
          </div>
          <div class="mt-4 lg:w-1/2 w-full flex-col flex flex-1 gap-2 overflow-y-auto ">
            <div v-if="categoryTotal" v-for="(item, index) in categoryTotal" :key="index"
              class="flex justify-between items-center">
              <p class="text-lg ">{{ item.category.name }}</p>
              <p class="text-lg font-bold text-red-600">-{{ item.total }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- list record -->

      <div class="mt-4 bg-white flex-1 overflow-y-scroll">
        <div class="w-full pt-3 px-8 flex">
          <div class="md:w-80 w-full flex items-center gap-2">
            <n-date-picker v-model:value="range" type="datetimerange" clearable @clear="onClearFilterList"
              @confirm="filterList" />
            <n-icon size="28" color="#0e7a0d">
              <Cash />
            </n-icon>
          </div>
        </div>
        <div class="md:p-8 p-4">
          <AllList :budgets="recoadList" :total="total" @clickRecord="ClickRecord" @updateBudgets="updateBudgets" />
          
        </div>
      </div>
      <!-- button add -->
      <div class="w-full h-16 relative">
        <div class="w-full max-w-[1200px] h-16 bg-white flex justify-center fixed bottom-0">
          <div class="absolute bottom-8 md:right-4">
            <button @click="showDraw = true" :class="tabe == 1 || tabe == 2 ? 'bg-green-600' : 'bg-red-600'"
              class=" text-white p-2 h-16 w-16 rounded-full">Add</button>
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
                <div @click="swichTab(2)" :class="tabe == 1 || tabe == 2 ? 'bg-green-600 text-white' : ''"
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
                <n-input-number :default-value="10" :parse="parseCurrency" :format="formatCurrency"
                  placeholder="Please enter amount" step=100 v-model:value="form.amount" autofocus>
                </n-input-number>

                <n-select v-model:value="form.category" placeholder="select category" :options="categoryList" />
                <n-input-group>
                  <n-date-picker v-model:value="form.date" type="date" clearable />
                </n-input-group>
                <n-input round v-model:value="form.remark" placeholder="Remark status ..." type="textarea" :autosize="{
                  minRows: 3
                }" />
              </div>
              <div class="lg:w-1/2 w-full mt-4">
                <n-button :loading="loadinBtn" @click="createBudget()"
                  :disabled="!form.amount || !form.category || !form.date"
                  :color="tabe == 1 || tabe == 2 ? '#16A34A' : '#DC2626'" class="w-full">
                  Save
                </n-button>
              </div>
            </div>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>

    <n-modal v-model:show="showRecoad">
      <n-card  class=" rounded-xl md:max-w-[600px] sm:max-w-[360px] max-w-[400px] " :title="budgetInfo.categoryName" :bordered="false" size="huge" role="dialog"
        aria-modal="true">
        <template #header-extra>
          <p :class="budgetInfo.type == 'expense' ? 'text-red-500' : 'text-green-500'" class="text-2xl font-semibold">
            {{
              budgetInfo.type == 'expense' ? '- ' : '+ ' }}{{ budgetInfo.amount }}</p>
      
        </template>
        <div>
          <p>
            {{ budgetInfo.remarks }}
            
          </p>
          <span>{{ budgetInfo.date }}</span>
        </div>
        <template #footer>
          <div class="flex gap-1 justify-end">
            <n-button type="error" @click="deleteList()" strong secondary>Delete</n-button>
            <n-button type="warning" strong secondary>Update</n-button>
            <n-button @click="showRecoad = false" type="primary">OK</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>

    <n-modal v-model:show="showReset">
      <n-card  class="max-w-[400px] rounded-xl" :bordered="false" size="huge" role="dialog"
        aria-modal="true">

        <!-- show message for reset budgetking -->
        <div class="w-full flex flex-col items-center gap-2">
          <n-icon size="78" color="#DC2626">
            <AlertCircle />
          </n-icon>
          <p class="text-lg">Are you sure you want to reset this budget?</p>
        </div>
        <template #footer>
          <div class="flex gap-3 items-center  justify-center">
            <n-button @click="showReset = false" type="warning" strong secondary>Cancel</n-button>
            <n-button @click="resetBudge()" type="primary">OK</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>

    <n-drawer v-model:show="showDrawUpdate" height="360" placement="top" resizable>
      <n-drawer-content>
        <div class="max-w-[1200px] mx-auto flex flex-col relative">
          <div class="w-full">
            <div class=" bg-white py-2 px-2 flex items-center justify-center">
              <div class="lg:w-1/2 w-full h-10 bg-slate-100 rounded-[60px] flex justify-between">
                <div @click="swichTab(2)" :class="tabe == 1 || tabe == 2 ? 'bg-green-600 text-white' : ''"
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
                <n-input-number :default-value="10" :parse="parseCurrency" :format="formatCurrency"
                  placeholder="Please enter amount" step=100 v-model:value="form.amount" autofocus>
                </n-input-number>

                <n-select v-model:value="form.category" placeholder="select category" :options="categoryList" />
                <n-input-group>
                  <n-date-picker v-model:value="form.date" type="date" clearable />
                </n-input-group>
                <n-input round v-model:value="form.remark" placeholder="Remark status ..." type="textarea" :autosize="{
                  minRows: 3
                }" />
              </div>
              <div class="lg:w-1/2 w-full mt-4">
                <n-button :loading="loadinBtn" @click="createBudget()"
                  :disabled="!form.amount || !form.category || !form.date"
                  :color="tabe == 1 || tabe == 2 ? '#16A34A' : '#DC2626'" class="w-full">
                  Save
                </n-button>
              </div>
            </div>
          </div>

        </div>
      </n-drawer-content>
    </n-drawer>

  </div>
</template>

<script>
import { FlashOutline, LogoYen, Cash } from "@vicons/ionicons5";
import { GameControllerOutline, GameController, SyncCircleOutline, AlertCircle } from "@vicons/ionicons5";
import BaseChart from '../components/BarChart.vue';
import { useMessage } from "naive-ui";
import AllList from '../components/AllList.vue';
export default {
  name: "HomeView",
  components: {
    BaseChart,
    AllList,
    FlashOutline,
    LogoYen,
    GameControllerOutline,
    GameController,
    Cash,
    SyncCircleOutline,
    AlertCircle
  },
  data() {
    return {
      range: null,
      loadinBtn: false,
      showReset: false,
      showDrawUpdate: false,
      categoryList: [],
      listEpentsCategory: [],
      listIncomeCategory: [],
      categoryTotal: [],
      tabe: 1,
      page: 0,
      total: 0,
      totalIncome: 0,
      totalExpense: 0,
      totalSave: 0,
      amount: 0,
      category: '',
      remark: '',
      timestamp: new Date(),
      posts: [],
      showRecoad: false,
      showDraw: false,
      recoadList: [],
      budgetInfo: {},
      form: {
        amount: 0,
        category: '',
        date: new Date(), // timestamp
        remark: ''
      },
      chartOptions: {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: false
        },
        series: [
          {
            name: 'Income vs Expense',
            type: 'pie',
            radius: ['50%', '90%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
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
            data: [],
          },
        ],
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '$', // Dollar symbol
            textAlign: 'center',
            font: 'bolder 50px Arial',
            fill: '#333' // You can adjust the color, font size, and font family
          }
        }
      },
      message: null,
    };
  },
  computed: {
    totalSpend() {
      return this.totalIncome - this.totalExpense
    },
    progressSave() {
      let value = (this.totalSpend / this.totalIncome) * 100 || 0
      value = value.toFixed(2)
      return value
    },
    // progress income and expense income + expense = 100% 
    progressIncome() {
      let value = (this.totalIncome / (this.totalIncome + this.totalExpense)) * 100 || 0
      value = value.toFixed(2)
      return value
    },
    progressExpense() {
      let value = (this.totalExpense / (this.totalIncome + this.totalExpense)) * 100 || 0
      value = value.toFixed(2)
      return value
    },

  },
  mounted() {

  },
  created() {
    this.getAlltabe();
    this.ListAll();
    this.filterCategory('income');
    this.message = useMessage();
    this.range = [new Date(), new Date()];
    // set title for page
    document.title = "Budget App";
  },
  methods: {
    async deleteList() {
      try {
        // delete recoad by id check type income or expense
        const data = {
          id: this.budgetInfo.id
        }
        const apiCall = (this.budgetInfo.type == 'income') ? this.$api.deleteIncome(data) : this.$api.deleteExpense(data);
        const res = await apiCall;
        this.message.success('Delete success');
      } catch (error) {
        this.message.error('Delete fail');
        console.log(error);
      } finally {
        this.ListAll();
        this.getAlltabe();
        this.showRecoad = false;
      }
    },
    async resetBudge() {
      try {
        const res = await this.$api.resetBudget()
        this.message.success('Reset budget success');
        this.getAlltabe();
        this.ListAll();
        this.showReset = false;
      } catch (error) {
        this.message.error('Reset budget fail');
        console.log(error);
      }
    },
    parseCurrency: (input) => {
      const nums = input.replace(/(,|\$|\s)/g, "").trim();
      if (/^\d+(\.(\d+)?)?$/.test(nums))
        return Number(nums);
      return nums === "" ? null : Number.NaN;
    },
    formatCurrency: (value) => {
      if (value === null)
        return "";
      return `${value.toLocaleString("en-US")} $`;
    },
    createBudget(type) {
      let categoryName = this.categoryList.find((item) => item.value == this.form.category).label;

      const data = {
        amount: this.form.amount,
        categoryID: this.form.category,
        source: categoryName,
        date: this.formatDate(new Date(this.form.date)),
        remarks: this.form.remark
      };

      this.loadinBtn = true;
      const apiCall = (this.tabe === 1 || this.tabe === 2) ? this.$api.addIncome(data) : this.$api.addExpense(data);

      apiCall.then((res) => {
        this.loadinBtn = false;
        this.message.success(`Create ${this.tabe === 1 || this.tabe === 2 ? 'income' : 'expense'} success`);
        this.clearForm();
        this.getAlltabe();
        this.ListAll();
        // get total income and expense
        if (this.tabe == 1) {
          this.ListAll();
        } else if (this.tabe == 2) {
          this.ListAllIncome();
        } else {
          this.ListAllExpense();
        }
        this.showDraw = false;
      }).catch((error) => {
        this.loadinBtn = false;
        this.showDraw = false;
        this.message.error(`Create ${this.tabe === 1 || this.tabe === 2 ? 'income' : 'expense'} fail`);
        console.error('Error:', error.response ? error.response.data : error.message);
      });
    },
    async filterList(page = 0, size = 10) {

      try {
        const [start, end] = this.range;
        // format date  to yyyy-mm-dd
        const startDate = this.formatDate(new Date(start));
        const endDate = this.formatDate(new Date(end));
        console.log("🚀 ~ filterList ~ startDate:", startDate)
        console.log("🚀 ~ filterList ~ endDate:", endDate)
        const res = await this.$api.fitterList(page, size, startDate, endDate);
        if (this.tabe == 1) {
          this.recoadList = res.content;
        } else if (this.tabe == 2) {
          this.recoadList = res.content.filter((item) => item.type == 'income');
        } else {
          this.recoadList = res.content.filter((item) => item.type == 'expense');
        }
      } catch (error) {
        console.log(error);
      }
    },
    onClearFilterList() {
      this.range = [new Date(), new Date()];
      this.ListAll();
      console.log('====================================');
      console.log('onClearFilterList');
      console.log('====================================');
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    clearForm() {
      this.form = {
        amount: 0,
        category: '',
        date: new Date(), // timestamp
        remark: ''
      }
    },
    async filterCategory(type) {
      this.categoryList = [];
      const res = await this.$api.getCategory(type);
      console.log("🚀 ~ filterCategory ~ res:", res)

      res.forEach((item) => {
        this.categoryList.push({
          label: item.name,
          value: item.id
        })
      })
    },
    async getAlltabe() {
      try {
        const res = await this.$api.getall()
        this.totalIncome = res.totalIncome
        this.totalExpense = res.totalExpense
        this.chartOptions.series[0] = {
          color: ['#16A34A', '#DC2626'],
        }
        this.chartOptions.series[0].data = [
          {
            value: this.totalIncome,
            name: 'Income'
          },
          {
            value: this.totalExpense,
            name: 'Expense'
          },
        ]

      } catch (error) {

      }
    },
    async ListAllIncome() {
      try {
        const res = await this.$api.getTotalIncome()
        this.totalIncome = res.total;
        console.log('====================================');
        console.log('Income', res.categoryTotals);
        console.log('====================================');
        this.categoryTotal = res.categoryTotals;
      } catch (error) {
        console.log(error);
      }
    },
    async ListAllExpense() {
      try {
        const res = await this.$api.getTotalExpense()
        this.totalExpense = res.total;
        console.log('====================================');
        console.log('Expense', res.categoryTotals);
        console.log('====================================');
        this.categoryTotal = res.categoryTotals;

      } catch (error) {
        console.log(error);
      }
    },
    async ListAll(page = 0, size = 10) {
      try {
        const res = await this.$api.listAll(page, size);
        this.total = res.totalElements;
        // filter income and expense if tabe is 1 show all income and expense else show income or expense
        if (this.tabe == 1) {
          this.recoadList = res.content;
          console.log("🚀 ~ ListAll ~ this.recoadList: t1", this.recoadList)

        } else if (this.tabe == 2) {
          this.recoadList = res.content.filter((item) => item.type == 'income');
          console.log("🚀 ~ ListAll ~ this.recoadList: t2", this.recoadList)
        } else {
          this.recoadList = res.content.filter((item) => item.type == 'expense');
          console.log("🚀 ~ ListAll ~ this.recoadList: t3", this.recoadList)
        }
      } catch (error) {
        console.log(error);
      }
    },
    updateBudgets(newItems) {
      // check filter income and expense
      if (this.tabe == 1) {
        this.recoadList = [...this.recoadList, ...newItems];
      } else if (this.tabe == 2) {
        this.recoadList = [...this.recoadList, ...newItems.filter((item) => item.type == 'income')];
      } else {
        this.recoadList = [...this.recoadList, ...newItems.filter((item) => item.type == 'expense')];
      }
    },

    ClickRecord(e) {
      this.budgetInfo = e
      this.showRecoad = true
    },
    swichTab(e) {
      this.clearForm();
      this.tabe = e;
      this.$refs.numberAnimationInstRef.value?.play();
      if (e == 1) {
        this.filterCategory('income')
        this.getAlltabe()
        this.ListAll()
      } else if (e == 2) {
        this.filterCategory('income')
        this.ListAll()
        this.ListAllIncome()

      } else {
        this.filterCategory('expense')
        this.ListAll()
        this.ListAllExpense()
        console.log('====================================');
        console.log('Expense');
        console.log('====================================');
  
      }
    }
  },
};
</script>
