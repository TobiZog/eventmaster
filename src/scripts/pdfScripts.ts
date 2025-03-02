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
  
  exerciseStore.exercises.forEach(exercise => {
    exerciseData.push([
      exercise.exerciseGroup.groupNr + "." + exercise.exerciseNr,
      exercise.exerciseGroup.nameDe,
      exercise.nameDe,
      exercise.solved ? 'Ja' : 'Nein'
    ])
  })

  // Title and image
  doc.setFontSize(48)
  doc.text("EventMaster", midPage, 25, { align: "center" })
  doc.addImage("http://localhost:3000/static/brand/logo.png", "PNG", 82, 36, 48, 48)

  // Data about student
  doc.setFontSize(24)
  doc.text([preferencesStore.studentName, preferencesStore.registrationNumber], midPage, 100, { align: "center" })

  // Progress total
  doc.setFontSize(28)
  doc.text("Hat " + exerciseStore.exercises.reduce((counter, exercise) => {
    if (exercise.solved) {
      counter++
    }

    return counter
  }, 0) + " von " + exerciseStore.exercises.length + " Aufgaben gelöst", midPage, 130, { align: "center" })


  // Progress table
  doc.setFontSize(22)
  autoTable(doc, {
    startY: 140,
    head: [[ "Aufgaben-Nr.", "Aufgabengruppe", "Aufgabe", "Abgeschlossen?"]],
    body: exerciseData
  })


  // Footer
  doc.setFontSize(12)
  doc.text(
    [
      "Grundlagen der IT-Sicherheit", 
      "Fachgebiet Usable Security and Privacy", 
      "Institut für IT-Sicherheit", "Leibniz Universität Hannover"
    ], 
    midPage, pageHeight - 30, { align: "center" }
  )
  doc.text(moment().format("DD.MM.YYYY, HH:mm:ss"), midPage, pageHeight - 8, { align: "center" })


  // Save
  doc.save("eventmaster-exercise-result.pdf")
}