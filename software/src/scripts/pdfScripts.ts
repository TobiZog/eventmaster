import { useExerciseStore } from "@/stores/exercise.store";
import { usePreferencesStore } from "@/stores/preferences.store";
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import moment from "moment";

export function generateResultsPdf() {
  const preferencesStore = usePreferencesStore()
  const exerciseStore = useExerciseStore()

  const doc = new jsPDF()
  const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
  const midPage = doc.internal.pageSize.getWidth() / 2

  const exerciseData = []
  
  exerciseStore.exerciseGroups.forEach(group => {
    group.exercises.forEach(exercise => {
      exerciseData.push([
        group.groupNr + "." + exercise.exerciseNr,
        group.nameDe,
        exercise.nameDe,
        exercise.solved ? 'Ja' : 'Nein'
      ])
    })
  })

  // Title and image
  doc.setFontSize(48)
  doc.text("EventMaster", midPage, 25, { align: "center" })
  doc.addImage("../../public/logo.png", "PNG", 65, 36, 80, 80)

  // Data about student
  doc.setFontSize(24)
  doc.text([preferencesStore.studentName, preferencesStore.registrationNumber], midPage, 130, { align: "center" })

  // Progress total
  doc.setFontSize(28)
  doc.text("Hat " + exerciseStore.exerciseGroups.reduce((counter, group) => {
    for (let exercise of group.exercises) {
      if (exercise.solved) {
        counter++
      }
    }

    return counter
  }, 0) + " von 10 Aufgaben gelöst.", midPage, 160, { align: "center" })


  // Progress table
  doc.setFontSize(22)
  autoTable(doc, {
    startY: 170,
    head: [[ "Aufgaben-Nr.", "Aufgabengruppe", "Aufgabe", "Abgeschlossen?"]],
    body: exerciseData
  })



  doc.setFontSize(12)
  doc.text(["Grundlagen der IT-Sicherheit", "Fachgebiet Usable Security and Privacy", "Institut für IT-Sicherheit", "Leibniz Universität Hannover"], midPage, pageHeight - 30, { align: "center" })
  doc.text(moment().format("DD.MM.YYYY, HH:mm:ss"), midPage, pageHeight - 8, { align: "center" })

  doc.save("eventmaster-exercise-result.pdf")
}