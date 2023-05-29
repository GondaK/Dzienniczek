/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Users_Email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "UserID" TEXT NOT NULL PRIMARY KEY,
    "Email" TEXT NOT NULL,
    "Name" TEXT,
    "Password" TEXT NOT NULL,
    "IsAdmin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Subject" (
    "SubjectID" TEXT NOT NULL PRIMARY KEY,
    "SubjectName" TEXT NOT NULL,
    "TeacherID" TEXT NOT NULL,
    CONSTRAINT "Subject_TeacherID_fkey" FOREIGN KEY ("TeacherID") REFERENCES "Teacher" ("TeacherID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Grade" (
    "GradeId" TEXT NOT NULL PRIMARY KEY,
    "GradeValue" TEXT NOT NULL,
    "SubjectID" TEXT NOT NULL,
    "StudentID" TEXT NOT NULL,
    CONSTRAINT "Grade_SubjectID_fkey" FOREIGN KEY ("SubjectID") REFERENCES "Subject" ("SubjectID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Grade_StudentID_fkey" FOREIGN KEY ("StudentID") REFERENCES "Student" ("StudentID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teacher" (
    "TeacherID" TEXT NOT NULL PRIMARY KEY,
    "UserID" TEXT NOT NULL,
    CONSTRAINT "Teacher_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Teacher" ("TeacherID", "UserID") SELECT "TeacherID", "UserID" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_UserID_key" ON "Teacher"("UserID");
CREATE TABLE "new_Student" (
    "StudentID" TEXT NOT NULL PRIMARY KEY,
    "UserID" TEXT NOT NULL,
    "ClassID" TEXT NOT NULL,
    CONSTRAINT "Student_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_ClassID_fkey" FOREIGN KEY ("ClassID") REFERENCES "Class" ("ClassID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("ClassID", "StudentID", "UserID") SELECT "ClassID", "StudentID", "UserID" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_UserID_key" ON "Student"("UserID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
