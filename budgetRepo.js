class BudgetRepo {
	constructor() {
		this.budgets = [
			{ yearMonth: '202411', amount: 2000 },
			{ yearMonth: '202412', amount: 3000 },
			{ yearMonth: '202501', amount: 4000 },
		]
	}

	getAll() {
		return this.budgets;
	}
}

export default BudgetRepo;

