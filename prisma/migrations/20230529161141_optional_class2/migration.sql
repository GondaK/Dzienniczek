-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "StudentID" TEXT NOT NULL PRIMARY KEY,
    "UserID" TEXT NOT NULL,
    "ClassID" TEXT,
    CONSTRAINT "Student_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_ClassID_fkey" FOREIGN KEY ("ClassID") REFERENCES "Class" ("ClassID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("ClassID", "StudentID", "UserID") SELECT "ClassID", "StudentID", "UserID" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_UserID_key" ON "Student"("UserID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
