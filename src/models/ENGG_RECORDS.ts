import mongoose, { Document, Schema } from "mongoose";

// Define the Subject interface
interface Subject {
  PNO: number;
  PCODE: string;
  PNAME: string;
  CR: number;
  GR: string;
  GRPTS: number;
  TGRP: number;
  ATTEMPT: string;
}

// Define the SemDetails interface
interface Sem_Details {
  SEM: number;
  SGPA: number;
  CGPA: number;
  TCR: number;
  OBTAINED_CR : number;
  EXAMMY: Date;
  SEM_TOTAL_REMS: number;
  SEM_CURRENT_REMS: number;
  SUBJECTS: Subject[];
}

interface Remedial_Sem_Details{
  EXAMMY: Date;
  SGPA:number;
  CGPA:number;
  SUBJECTS: Subject[];
}

interface Remedial_Details {
  SEM: number;
  SGPA: number;
  CGPA: number;
  TCR: number;
  SEM_TOTAL_REMS: number;
  SEM_CURRENT_REMS: number;
  REMEDIAL_DATES:Remedial_Sem_Details[];
}

//Deifne Current_Remedials
interface Current_Remedials {
  SEM: number;
  PNO: number;
  PCODE: string;
  PNAME: string;
  EXAMMY: Date;
  CR: number;
  GR: string;
  GRPTS: number;
  TGPR: number;
  TCR: number;
  ATTEMPTS: number;
}

// Define the Record interface
interface Engg_Record extends Document {
  REGULATION: string;
  ID: string;
  SNAME: string;
  FNAME: string;
  GRP: string;
  DOB: Date;
  DOJ: Date;
  CONSOLIDATE_CERTIFICATE_NO: string;
  PROVISIONAL_CERTIFICATE_NO: string;
  ORIGINAL_DEGREE_CERTIFICATE_NO: string;
  ISSUED_SEM_CARDS_NUMBER: number;
  TOTAL_REMS: number;
  CURRENT_REMS: number;
  OBTAINED_CREDITS: number[];
  TOTAL_CREDITS: number[];
  ENGG_RECORDS: Sem_Details[];
  REMEDIAL_RECORDS: Remedial_Details[];
  CURRENT_REMEDIALS: Current_Remedials[];
}

// Define the Mongoose schema for Record
const enggRecordSchema: Schema<Engg_Record> = new mongoose.Schema({
  REGULATION: { type: String },
  SNAME: { type: String },
  FNAME: { type: String },
  ID: { type: String, unique: true, required: true },
  GRP: { type: String },
  DOB: { type: Date },
  DOJ: { type: Date },
  CONSOLIDATE_CERTIFICATE_NO: { type: String },
  PROVISIONAL_CERTIFICATE_NO: { type: String },
  ORIGINAL_DEGREE_CERTIFICATE_NO: { type: String },
  ISSUED_SEM_CARDS_NUMBER: { type: Number },
  TOTAL_REMS: { type: Number },
  CURRENT_REMS: { type: Number },
  OBTAINED_CREDITS: { type: [Number] },
  TOTAL_CREDITS: { type: [Number] },
  ENGG_RECORDS: [
    {
      SEM: { type: Number },
      SGPA: { type: Number },
      CGPA: { type: Number },
      TCR: { type: Number },
      OBTAINED_CR:{ type : Number},
      EXAMMY: { type: Date },
      SEM_TOTAL_REMS: { type: Number },
      SEM_CURRENT_REMS: { type: Number },
      SUBJECTS: [
        {
          PNO: { type: Number },
          PCODE: { type: String },
          PNAME: { type: String },
          CR: { type: Number },
          GR: { type: String },
          GRPTS: { type: Number },
          TGRP: { type: Number },
          ATTEMPT: { type: String },
        },
      ],
    },
  ],
  REMEDIAL_RECORDS: [
    {
      SEM: { type: Number },
      SGPA: { type: Number },
      CGPA: { type: Number },
      TCR: { type: Number },
      REMEDIAL_DATES:[
        {
          EXAMMY: { type: Date },
          SGPA:{type:Number},
          CGPA:{type:Number},
          SUBJECTS: [
            {
              PNO: { type: Number },
              PCODE: { type: String },
              PNAME: { type: String },
              EXAMMY: { type: Date },
              CR: { type: Number },
              GR: { type: String },
              GRPTS: { type: Number },
              TGRP: { type: Number },
              ATTEMPT: { type: String },
            },
          ],
        }
      ],
    },
  ],
  CURRENT_REMEDIALS: [
    {
      SEMNO: { type: Number },
      PNO: { type: Number },
      PCODE: { type: String },
      PNAME: { type: String },
      EXAMMY: { type: Date },
      CR: { type: Number },
      GR: { type: String },
      GRPTS: { type: Number },
      TGPR: { type: Number },
      TCR: { type: Number },
      ATTEMPTS: { type: Number },
    },
  ],
});

// Create the Record model
const ENGG_RECORD = mongoose.model<Engg_Record>(
  "ENGG_Record",
  enggRecordSchema
);

export default ENGG_RECORD;
