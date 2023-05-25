-- CreateTable
CREATE TABLE "Users" (
    "UserID" TEXT NOT NULL PRIMARY KEY,
    "Email" TEXT NOT NULL,
    "Name" TEXT,
    "Password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Teacher" (
    "TeacherID" TEXT NOT NULL PRIMARY KEY,
    "UserID" TEXT NOT NULL,
    CONSTRAINT "Teacher_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_UserID_key" ON "Teacher"("UserID");
