import { backupColors, questionColors } from "@/constants/color.constant"
import { IReport } from "@/service/quiz/quiz.dto"
import { ArcElement, Chart, LineElement, PointElement, PolarAreaController, RadialLinearScale } from "chart.js"
import jsPDF from "jspdf"

export const PdfUtil = {
    generatePDF: (
        reportData: IReport,
        reportTitle: string,
        reportDesc: string,
        sendReportToMail: (file: Blob) => void,
        isMail: boolean = false
    ) => {
        const prepareData = reportData?.quizAnswers.map((item) => {
            const colors = item.answers.map((item, idx) => {
                return questionColors.find((it) => it.id === item.questionId)?.color || backupColors[idx]
            })

            return {
                title: item.sectionTitle,
                sectionId: item.sectionId,
                // label: item.answers.map((item) => item.question, 110),
                label: [...item.answers.map((item) => item.question), ""],
                data: [...item.answers.map((item) => Number(item.answer)), 7],
                colors: [...colors, "rgba(255, 255, 255, 0)"],
            }
        })

        const doc = new jsPDF()
        const pageWidth = doc.internal.pageSize.width
        const margin = 10
        let yPosition = 115

        doc.setFont("helvetica", "bold")
        doc.setFontSize(22)
        doc.text(reportData?.quizName || "", 10, 20)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(12)
        reportData?.coupon && doc.text("Coupon: " + reportData?.coupon, 100, 20)

        doc.setFontSize(16)
        doc.setTextColor("#2563EB")
        doc.text(reportTitle, 10, 45)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(11)
        doc.setTextColor("#374151")

        const textWidth = pageWidth - 2 * margin

        // Split the text into lines that fit within the width
        const lines = doc.splitTextToSize(reportDesc, textWidth)
        doc.text(lines, margin, 60)

        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.setTextColor("#2563EB")
        doc.text("About You", 10, 100)
        // const question = doc.splitTextToSize(`${index + 1}. ${item.question}`, textWidth)
        doc.setFontSize(13)
        doc.setFont("helvetica", "bold")
        doc.setTextColor("#18191C")
        doc.text("Your use the following items to help you hear:", margin, yPosition)
        reportData?.additional?.map((item, index) => {
            // const question = doc.splitTextToSize(`${index + 1}. ${item.question}`, textWidth)
            // Title

            // Content
            yPosition += index === 1 ? 10 : 6
            doc.setFontSize(11)
            doc.setFont("helvetica", "normal")
            doc.setTextColor("#374151")
            doc.text(`\u2022`, 15, yPosition)
            item.question !==
            "Which of the following hearing devices do you use to help your hearing? Select all that apply"
                ? doc.text(
                      doc.splitTextToSize(item.question.concat(" - ", item.answer.join(", ")), textWidth),
                      margin + 10,
                      yPosition
                  )
                : doc.text(doc.splitTextToSize(item.answer.join(", "), textWidth), margin + 10, yPosition)

            // yPosition += 2 // Add spacing for the next item's title
        })

        // doc.addPage()
        doc.setTextColor("#2563EB")

        prepareData?.forEach((chartData, index) => {
            doc.addPage()

            // Create a canvas for each chart
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

            // Set canvas size
            const scale = 0.7
            canvas.width = 550 * scale
            canvas.height = 550 * scale
            ctx?.scale(scale, scale)

            // Generate the chart
            Chart.register(PolarAreaController, RadialLinearScale, PointElement, LineElement, ArcElement)
            new Chart(ctx, {
                type: "polarArea",
                data: {
                    labels: chartData.label,
                    datasets: [
                        {
                            data: chartData.data,
                            backgroundColor: chartData.colors,
                            borderColor: "transparent",
                        },
                    ],
                },
                options: {
                    responsive: false,
                    animation: false,
                    scales: {
                        r: {
                            ticks: {
                                stepSize: 1,
                                // count: 7,
                            },
                            grid: {
                                circular: true,
                            },
                            angleLines: {
                                display: true,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                            // position: "bottom",
                            // align: "start",
                            // labels: {
                            //     boxWidth: 20, // Set box width
                            //     padding: 10, // Set padding
                            //     color: "#000000",

                            //     font: {
                            //         weight: "normal",
                            //         size: 14,
                            //         lineHeight: 1.5,
                            //     },
                            // },
                        },
                    },
                },
            })

            // Convert the chart to an image
            const chartImage = canvas.toDataURL("image/png", 0.5)

            // Add the chart title
            doc.setFontSize(16)
            doc.setTextColor("#2563EB")
            doc.setFont("helvetica", "bold")
            // doc.splitTextToSize(`${index + 1}. ${item.question}`, textWidth)
            doc.text(doc.splitTextToSize(`Chart ${index + 1}: ${chartData.title}`, textWidth), margin, 20)

            doc.setFontSize(12)
            doc.setTextColor("#000000")
            doc.setFont("helvetica", "normal")
            chartData.sectionId === "01JHGFDE3GJCZBYF606HP5V61Q"
                ? doc.text(`1 = Uncomfortable`, margin, 35)
                : chartData.sectionId === "01JHHQWWEQ9F9Q5CGTMMAKGQYP"
                ? doc.text(`1 = Dislike`, margin, 35)
                : doc.text(`1 = Impossible`, margin, 35)

            chartData.sectionId === "01JHGFDE3GJCZBYF606HP5V61Q"
                ? doc.text(`7 = Comfortable`, margin, 40)
                : chartData.sectionId === "01JHHQWWEQ9F9Q5CGTMMAKGQYP"
                ? doc.text(`7 = Like`, margin, 40)
                : doc.text(`7 = Easy`, margin, 40)

            // Add the chart image to the PDF
            doc.addImage(chartImage, "PNG", 50, 30, 100, 100)

            let labelYPosition = 140
            chartData.label.map((item, index) => {
                const value = chartData?.colors[index]?.match(/\d+(\.\d+)?/g)?.map(Number) as number[]
                // const value = colors[index].match(/\d+(\.\d+)?/g)?.map(Number) as number[]
                const [r, g, b] = value

                const splitText = doc.splitTextToSize(item, textWidth - 5)

                doc.setFontSize(10)
                doc.setFont("helvetica", "normal")
                doc.setTextColor("#374151")
                doc.saveGraphicsState()
                doc.setGState(doc.GState({ opacity: 0.5 }))
                doc.setFillColor(r, g, b)
                doc.rect(margin, labelYPosition - 2, 7, 3, "F")
                doc.restoreGraphicsState()

                doc.text(splitText, margin + 10, labelYPosition)

                // Increment labelYposition for the next item
                labelYPosition += splitText.length * 6 // Space after the current item
            })
        })

        // =========================================================================>>
        // Generate the PDF as a blob URL
        // const pdfBlobUrl = URL.createObjectURL(doc.output("blob"))
        // Add the PDF to an iframe
        // const iframe = document.getElementById("pdfPreview")
        // iframe.src = pdfBlobUrl

        if (isMail) {
            const pdfBlob = doc.output("blob")
            sendReportToMail(pdfBlob)
        } else {
            // Save or download the PDF
            doc.save("report-hl.pdf")
        }
    },
}
