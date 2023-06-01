/*
  Warnings:

  - Added the required column `GradeName` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Grade" (
    "GradeId" TEXT NOT NULL PRIMARY KEY,
    "GradeValue" TEXT NOT NULL,
    "GradeName" TEXT NOT NULL,
    "SubjectID" TEXT NOT NULL,
    "StudentID" TEXT NOT NULL,
    CONSTRAINT "Grade_SubjectID_fkey" FOREIGN KEY ("SubjectID") REFERENCES "Subject" ("SubjectID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Grade_StudentID_fkey" FOREIGN KEY ("StudentID") REFERENCES "Student" ("StudentID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Grade" ("GradeId", "GradeValue", "StudentID", "SubjectID") SELECT "GradeId", "GradeValue", "StudentID", "SubjectID" FROM "Grade";
DROP TABLE "Grade";
ALTER TABLE "new_Grade" RENAME TO "Grade";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
