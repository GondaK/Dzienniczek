import { Grade } from '@prisma/client'
import { calculateAverageGrade } from '../src/backend/utils/average.utils'

describe('calculateAverageGrade', () => {
    test('calculates the average grade correctly', async () => {
        // Set up test data
        const user = { UserID: 123 }
        const subjectID = 456
        const grades: Grade[] = [
            {
                GradeValue: 5,
                StudentID: '123',
                SubjectID: '456',
                GradeId: '789',
                GradeName: 'Test',
            },
            {
                GradeValue: 4,
                StudentID: '123',
                SubjectID: '456',
                GradeId: '127',
                GradeName: 'Test12',
            },
            {
                GradeValue: 3,
                StudentID: '123',
                SubjectID: '456',
                GradeId: '343',
                GradeName: 'Test2',
            },
        ]

        // Call the function
        const averageGrade = await calculateAverageGrade(
            user,
            subjectID,
            grades,
        )

        // Check the result
        expect(averageGrade).toBeCloseTo(4) // Assuming the average grade is 80
    })
})
