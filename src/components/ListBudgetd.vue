<template>
    <div 
    :class="budgetsItem.type=='expense'?'bg-red-50':'bg-green-50'"
    class="w-full p-4 flex justify-between rounded-md" @click="emitClickRecord">
        <div class="flex gap-3 w-full">
            <!-- <div class="h-16 w-16 bg-white rounded-lg flex items-center justify-center text-xl">
                💼
            </div> -->
            <div class="flex-1">
                <div class="flex justify-between items-center w-full">
                    <p class="text-xl font-medium">
                        {{budgetsItem.categoryName}}
                    </p>
                    <p class="text-xl font-medium "
                        :class="budgetsItem.type=='expense'?'text-red-500':'text-green-500'"
                    >
                        {{ budgetsItem.type=='expense'?'- ':'+ '  }}{{ budgetsItem.amount}}$
                    </p>
                </div>
                <!-- <div class="w-full mt-2 text-end">
                    <p>40%</p>
                    <div>
                        <n-progress
                        :color="budgetsItem.type=='expense'?'#DC2626':'#16A34A'"
                        type="line" :percentage="40" :show-indicator="false" />
                    </div>
                </div> -->
            </div>
        </div>

        <!-- <div class="md:flex justify-end items-center gap-2 hidden ">
            <n-button strong secondary circle type="error" @click="emitClickDelete">
                <template #icon>
                    <n-icon size="16">
                        <TrashOutline />
                    </n-icon>
                </template>
            </n-button>
            <n-button strong secondary circle type="warning" @click="emitClickEdit">
                <template #icon>
                    <n-icon size="16">
                        <CreateOutline />
                    </n-icon>
                </template>
            </n-button>
            <n-button strong secondary circle type="info" @click="emitClickRecord">
                <template #icon>
                    <n-icon size="16">
                        <EyeOutline />
                    </n-icon>
                </template>
            </n-button>
        </div> -->

    </div>
</template>
<script>
import { GameControllerOutline, GameController, EyeOutline,TrashOutline,CreateOutline } from '@vicons/ionicons5'
export default {
    name: "ListBudget",
    props: {
        budgetsItem: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            budgets: [],
        };
    },
    components: {
        GameControllerOutline,
        GameController,
        EyeOutline,
        TrashOutline,
        CreateOutline
    },
    methods: {
        emitClickRecord() {
            this.$emit('clickRecord')
        },
        emitClickEdit() {
            this.$emit('clickEdit')
        },
        emitClickDelete() {
            this.$emit('clickDelete')
        }
        
    },

}
</script>
