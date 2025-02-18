import BudgetRepo from "./budgetRepo";
import dayjs from 'dayjs';

class BudgetService {
	constructor() {
		this.budgets = [];
		this.budgetRepo =  new BudgetRepo();
	}


	query(startDate, endDate) {
		const start = dayjs(startDate);
		const end = dayjs(endDate);

		const durationDays = dayjs(end).diff(start, 'day');

		if (start.millisecond() > end.millisecond()) {
			return 0;
		}

		if (durationDays === 0) {
			const yearMonth = start.format('YYYYMM');
			const daysInMonth = start.daysInMonth();
			const budget = this.budgets.find((budget) => budget.yearMonth === yearMonth);
			return budget.amount / daysInMonth;
		}

		// 當月
		if (start.format('YYYYMM') === end.format('YYYYMM')) {
			const yearMonth = start.format('YYYYMM');
			const daysInMonth = start.daysInMonth();
			const budget = this.budgets.find((budget) => budget.yearMonth === yearMonth);
			return budget.amount / daysInMonth * durationDays;
		}

		// 跨月
		if (start.format('YYYYMM') !== end.format('YYYYMM')) {
			let totalAmount = 0;
			let current = start;

			while (current.isBefore(end) || current.isSame(end, 'month')) {
				const yearMonth = current.format('YYYYMM');
				const daysInMonth = current.daysInMonth();
				const budget = this.budgets.find((budget) => budget.yearMonth === yearMonth);

				if (budget) {
					if (current.isSame(start, 'month')) {
						// Calculate for the first month
						const days = daysInMonth - start.date() + 1;
						totalAmount += (budget.amount / daysInMonth) * days;
					} else if (current.isSame(end, 'month')) {
						// Calculate for the last month
						const days = end.date();
						totalAmount += (budget.amount / daysInMonth) * days;
					} else {
						// Calculate for full months in between
						totalAmount += budget.amount;
					}
				}

				current = current.add(1, 'month').startOf('month');
			}

			return totalAmount;
		}
	}

	getAllBudgets() {
		this.budgets = this.budgetRepo.getAll();
	}
}

export default BudgetService;
