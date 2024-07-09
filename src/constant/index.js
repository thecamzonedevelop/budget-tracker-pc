
const all = {
    expense: 500,
    income: 1000,
}

const income = {
    income: 1000,
    category: [
        { name: 'Salary', amount: 1000 }
    ]
}

const expense = {
    expense: 500,
    category: [
        { name: 'Food', amount: 100 },
        { name: 'Transport', amount: 200 },
        { name: 'Entertainment', amount: 200 }
    ]
}

const dataList = [
    {
        id: 1,
        title: 'Food',
        category: 'Food',
        icon: '🥮',
        amount: 100,
        type: 'expense'
    },
    {
        id: 2,
        title: 'Transport',
        category: 'Transport',
        icon: '🚕',
        amount: 200,
        type: 'expense'
    },
    {
        id: 3,
        title: 'Entertainment',
        category: 'Entertainment',
        icon: '🎮',
        amount: 200,
        type: 'expense'
    },
    {
        id: 4,
        title: 'Salary',
        category: 'Salary',
        icon: '💰',
        amount: 1000,
        type: 'income'
    }
]

const category = [
    {
        id: 1,
        title: 'Food',
        icon: '🥮',
        type: 'expense',
        amount: 100
    },
    {
        id: 2,
        title: 'Transport',
        icon: '🚕',
        type: 'expense'
    },
    {
        id: 3,
        title: 'Entertainment',
        icon: '🎮',
        type: 'expense'
    },
    {
        id: 4,
        title: 'Salary',
        icon: '💰',
        type: 'income'
    },
    {
        id: 5,
        title: 'Investment',
        icon: '📈',
        type: 'income'
    },
    {
        id: 6,
        title: 'Other',
        icon: '💸',
        type: 'income'
    },
    {
        id: 7,
        title: 'Other',
        icon: '💸',
        type: 'expense'
    },
    {
        id: 8,
        title: 'Investment',
        icon: '📈',
        type: 'expense'
    }
]

export {
    all,
    income,
    expense,
    dataList,
    category
}