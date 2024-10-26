import { CrudRepository, StudentRepository } from "../repository";
import { ENGG_RECORD } from "../models";
import {
  Engg_Record,
  Remedial_Details,
  Remedial_Sem_Details,
  Sem_Details,
  Subject,
} from "../types/engg";
import { Puc_Record } from "../types/puc";

const studentServices = {
  async getPUCDetails(data: string): Promise<Puc_Record | null | undefined> {
    try {
      const response: Promise<Puc_Record | null | undefined> =
        StudentRepository.getPUCDetails(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async getEnggDetails(data: string): Promise<Engg_Record | null | undefined> {
    try {
      const response: Promise<Engg_Record | null | undefined> =
        StudentRepository.getEnggDetails(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getPUCDetailsByBatch(batch: string) {
    try {
      const response = StudentRepository.getPUCDetailsByBatch(batch);
      return response;
    } catch (error) {
      return error;
    }
  },
  async getEnggDetailsByBatch(batch: string) {
    try {
      const response = StudentRepository.getEnggDetailsByBatch(batch);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getRankListByBatch(batch: string) {
    try {
      const response = StudentRepository.getRankListByBatch(batch);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  },
  async updateCredits(ID: string): Promise<void> {
    try {
      // Fetch the student record
      const student: Engg_Record | null | undefined = await this.getEnggDetails(
        ID
      );

      if (!student) {
        throw new Error("Student not found");
      }

      student.OBTAINED_CREDITS = new Array(8).fill(0);
      student.TOTAL_CREDITS = new Array(8).fill(0);
      
      student.ENGG_RECORDS.forEach((sem: Sem_Details) => {
        sem.SUBJECTS.forEach((sub: Subject) => {
          if (sem.SEM >= 1 && sem.SEM <= 8) {
            student.OBTAINED_CREDITS[sem.SEM - 1] += sub.TGRP || 0;
            student.TOTAL_CREDITS[sem.SEM - 1] += sub.CR || 0;
          }
        });
      });

      // Function to calculate SGPA and CGPA
      const calculateSGPACGPA = (
        sem: Remedial_Sem_Details | Remedial_Details | Sem_Details,
        index: number
      ) => {
        // Calculate SGPA
        sem.SGPA =
          student.TOTAL_CREDITS[index] === 0
            ? 0
            : parseFloat(
                (
                  student.OBTAINED_CREDITS[index] / student.TOTAL_CREDITS[index]
                ).toFixed(2)
              );

        // Calculate CGPA
        let obtained = 0;
        let total = 0;
        for (let i = 0; i <= index; i++) {
          obtained += student.OBTAINED_CREDITS[i];
          total += student.TOTAL_CREDITS[i];
        }
        sem.CGPA = total === 0 ? 0 : parseFloat((obtained / total).toFixed(2));
      };

      student.ENGG_RECORDS.forEach((sem: Sem_Details) => {
        if (sem.SEM >= 1 && sem.SEM <= 8) {
          calculateSGPACGPA(sem, sem.SEM - 1);
        }
      });
      student.REMEDIAL_RECORDS.forEach((sem: Remedial_Details) => {
        sem.REMEDIAL_DATES.forEach((Dated_Record: Remedial_Sem_Details) => {
          Dated_Record.SUBJECTS.forEach((sub: Subject) => {
            if (sem.SEM >= 1 && sem.SEM <= 8) {
              student.OBTAINED_CREDITS[sem.SEM - 1] += sub.TGRP || 0;
            }
          });

          calculateSGPACGPA(Dated_Record, sem.SEM - 1);
        });
        if (sem.SEM >= 1 && sem.SEM <= 8) {
          calculateSGPACGPA(sem, sem.SEM - 1);
        }
      });

      await CrudRepository.update(ENGG_RECORD, student);
      // await student.save()
    } catch (error) {
      console.error("Error updating student credits:", error);
    }
  },
};

export default studentServices;
