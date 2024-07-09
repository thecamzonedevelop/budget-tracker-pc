import requst from "./requst";

export default {
    getall(param){
        return requst("/budget/total-money", "get", param);
    },
    listAll(page,size){
        return requst(`/budget/report?page=${page||0}&size=${size||5}`, "get");
    },
    getCategory(param){
        return requst(`/categories?type=${param}`, "get");
    },
    getAllIncome(page,size){
        return requst(`/incomes?page=${page||0}&size=${size||5}`, "get");
    },
    getAllExpense(page,size){
        return requst(`/expenses?page=${page||0}&size=${size||5}`, "get");
    },
    getTotalIncome(){
        return requst(`/incomes/total`, "get");
    },
    getTotalExpense(){
        return requst(`/expenses/total`, "get");
    },
    addIncome(param){
        return requst("/incomes", "post", param);
    },
    addExpense(param){
        return requst("/expenses", "post", param);
    },
    deleteIncome(param){
        return requst("/incomes/delete", "post",param);
    },
    deleteExpense(param){
        return requst(`/expenses/delete`, "post",param);
    },
    updateIncome(param){
        return requst(`/incomes/update`, "post", param);
    },
    updateExpense(param){
        return requst(`/expenses/update`, "post", param);
    },
    fitterList(page,size,startDate, endDate){
        return requst(`/budget/budgetreport?page=${page||0}&size=${size||5}&start=${startDate}&end=${endDate}`, "get");
    },
    resetBudget(param){
        return requst(`/budget/reset`, "post", param);
    }
}