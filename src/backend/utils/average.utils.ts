import { Grade } from '@prisma/client'

import { prisma } from '../database'

export const calculateAverageGrade = async (
    user: any,
    SubjectID: any,
    grades: any,
) => {
    // Get all the grades for the current user in the subject

    // Calculate the average grade
    let count = 0
    let sum = 0
    grades.forEach((grade: Grade) => {
        const value = grade.GradeValue
        if (null !== value) {
            count++
            sum += value
        }
    })

    return sum / count
}

// module.exports = calculateAverageGrade
