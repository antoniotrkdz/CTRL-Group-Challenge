-- Exported from QuickDBD: https://www.quickdatatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/schema/KgUr_DC3z0q4nQshiD3UFw
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

CREATE TABLE "Patient" (
    "PatientID" int  NOT NULL ,
    "Name" varchar(50)  NOT NULL ,
    "PathDay" date  NOT NULL ,
    "CurrMedication" varchar(100)  NOT NULL ,
    CONSTRAINT "pk_Patient" PRIMARY KEY (
        "PatientID"
    )
)

GO

CREATE TABLE "History" (
    "HistoryID" int  NOT NULL ,
    "PatientID" int  NOT NULL ,
    "Medications" varchar(1000)  NOT NULL ,
    "StartDay" date  NOT NULL ,
    "EndDay" date  NULL ,
    CONSTRAINT "pk_History" PRIMARY KEY (
        "HistoryID"
    )
)

GO

CREATE TABLE "EveningCHK" (
    "CheckID" int  NOT NULL ,
    "PatientID" int  NOT NULL ,
    "Date" date  NOT NULL ,
    "Wellbeing" int  NOT NULL ,
    "MedTaken" bool  NOT NULL ,
    "MoodScore" int  NOT NULL ,
    "SideEffects" varchar(250)  NOT NULL ,
    "OtherSE" varchar(100)  NOT NULL ,
    CONSTRAINT "pk_EveningCHK" PRIMARY KEY (
        "CheckID"
    )
)

GO

CREATE TABLE "MemoryCHK" (
    "MemoryID" int  NOT NULL ,
    "PatientID" int  NOT NULL ,
    "Date" date  NOT NULL ,
    "MemScore" int  NOT NULL ,
    "HealthScore" int  NOT NULL ,
    CONSTRAINT "pk_MemoryCHK" PRIMARY KEY (
        "MemoryID"
    )
)

GO

ALTER TABLE "History" ADD CONSTRAINT "fk_History_PatientID" FOREIGN KEY("PatientID")
REFERENCES "Patient" ("PatientID")
GO

ALTER TABLE "EveningCHK" ADD CONSTRAINT "fk_EveningCHK_PatientID" FOREIGN KEY("PatientID")
REFERENCES "Patient" ("PatientID")
GO

ALTER TABLE "MemoryCHK" ADD CONSTRAINT "fk_MemoryCHK_PatientID" FOREIGN KEY("PatientID")
REFERENCES "Patient" ("PatientID")
GO

