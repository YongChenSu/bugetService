import BudgetService from './budgetService';
import BudgetRepo from './budgetRepo';

jest.mock('./budgetRepo');

describe('BudgetService', () => {
    let budgetService;
    let mockBudgets;

    beforeEach(() => {
        mockBudgets = [
            { yearMonth: '202301', amount: 3100 },
            { yearMonth: '202302', amount: 2800 },
            { yearMonth: '202303', amount: 3100 },
        ];

        BudgetRepo.mockImplementation(() => {
            return {
                getAll: () => mockBudgets,
            };
        });

        budgetService = new BudgetService();
        budgetService.getAllBudgets();
    });

    test('should return 0 if start date is after end date', () => {
        const result = budgetService.query('2023-03-10', '2023-03-01');
        expect(result).toBe(0);
    });

    test('should calculate budget for the same month', () => {
        const result = budgetService.query('2023-01-10', '2023-01-20');
        expect(result).toBeCloseTo(1000, 0);
    });

    test('should calculate budget across multiple months', () => {
        const result = budgetService.query('2023-01-20', '2023-03-10');
        expect(result).toBeCloseTo(3100, 0);
    });
});