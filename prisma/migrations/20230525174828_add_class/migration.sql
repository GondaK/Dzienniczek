-- CreateTable
CREATE TABLE "Student" (
    "StudentID" TEXT NOT NULL PRIMARY KEY,
    "UserID" TEXT NOT NULL,
    "ClassID" TEXT NOT NULL,
    CONSTRAINT "Student_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_ClassID_fkey" FOREIGN KEY ("ClassID") REFERENCES "Class" ("ClassID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Class" (
    "ClassID" TEXT NOT NULL PRIMARY KEY,
    "ClassName" TEXT NOT NULL,
    "TeacherID" TEXT NOT NULL,
    CONSTRAINT "Class_TeacherID_fkey" FOREIGN KEY ("TeacherID") REFERENCES "Teacher" ("TeacherID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "UserID" TEXT NOT NULL PRIMARY KEY,
    "Email" TEXT NOT NULL,
    "Name" TEXT,
    "Password" TEXT NOT NULL,
    "IsAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Users" ("Email", "Name", "Password", "UserID") SELECT "Email", "Name", "Password", "UserID" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Student_UserID_key" ON "Student"("UserID");
