<template>
    <div class="w-full p-4 flex justify-between bg-green-50 rounded-md" @click="emitClickRecord">
        <div class="flex gap-3 w-full md:w-1/2">
            <div class="h-16 w-16 bg-white rounded-lg flex items-center justify-center text-xl">
                💼
            </div>
            <div class="flex-1">
                <div class="flex justify-between items-center w-full">
                    <p class="text-xl font-medium">Salary</p>
                    <p class="text-xl font-medium text-green-600">+1,200$</p>
                </div>
                <div class="w-full mt-2 text-end">
                    <p>40%</p>
                    <div>
                        <n-progress type="line" :percentage="40" :show-indicator="false" />
                    </div>
                </div>
            </div>
        </div>

        <div class="md:flex justify-end items-center gap-2 hidden ">
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
        </div>

    </div>
</template>
<script>
import { GameControllerOutline, GameController, EyeOutline,TrashOutline,CreateOutline } from '@vicons/ionicons5'
export default {
    name: "ListBudget",
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
