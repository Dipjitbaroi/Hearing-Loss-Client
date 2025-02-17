import { EnvConfig } from "@/config/env.config"
import { IQuizSubmitDto } from "@/service/quiz/quiz.dto"
import MyButton from "@/view/components/common/form/my-button"
import MySpacer from "@/view/components/common/my-spacer"
import PageWrapper from "@/view/components/layout/page-wrapper"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/view/components/ui/accordion"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ButtonGroup from "../../components/quiz/button-group"
import ProgressBar from "../../components/quiz/progress-bar" // Import ProgressBar
import SingleSelectButtonGroup from "../../components/quiz/single-select-button-group"
import SliderGroup from "../../components/quiz/slider-group"
import { useQuizController } from "./quiz.controller"

const QuizPage = () => {
    const [isScrolled, setScrolled] = useState(false)
    const [sections, setSections] = useState<{ id: string; label: string; completed: boolean }[]>([])
    const [missingIds, setMissingIds] = useState<string[]>([])
    const [skippedSection, setSkippedSection] = useState<string[]>([])
    const [aboutYou1, setAboutYou1] = useState<{ question: string; answer: string[] }>({
        question: "Which of the following hearing devices do you use to help your hearing? Select all that apply",
        answer: [],
    })
    const [aboutYou2, setAboutYou2] = useState<{ question: string; answer: string[] }[]>([])
    const [answers, setAnswers] = useState<{ questionId: string; answer: string | null }[]>([])

    const { quizData, submitQuiz, isSubmitting } = useQuizController()

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prev) => {
            const existing = prev.find((item) => item.questionId === questionId)
            if (existing) {
                return prev.map((item) => (item.questionId === questionId ? { ...item, answer } : item))
            } else {
                return [...prev, { questionId, answer }]
            }
        })
    }

    const allQuestionsIds =
        quizData?.quizSection.flatMap((section) =>
            section.subSection.flatMap((subSection) => subSection.questions.map((question) => question.id))
        ) || []

    useEffect(() => {
        const formattedSections =
            quizData?.quizSection.map((section) => ({
                id: section.id,
                label: section.title,
                completed: false,
            })) || []
        const newArray = [{ id: "aboutYou", label: "About You", completed: false }, ...formattedSections]

        setSections(newArray)
    }, [quizData])

    // FOR CHECK PROGRESS
    const sectionsQuestions = quizData?.quizSection?.map((section) => ({
        sectionId: section.id,
        questionIds: section.subSection.flatMap((sub) => sub.questions.map((question) => question.id)),
    }))
    useEffect(() => {
        const allIdsExist = sectionsQuestions?.map((section) => {
            const allIdsExist = section.questionIds.every((id) =>
                answers.some((answer) => answer.questionId === id)
            )
            return { sectionId: section.sectionId, allIdsExist }
        })
        allIdsExist?.forEach((item) => {
            if (item.allIdsExist) {
                setSections((prev) => {
                    return prev.map((section) => {
                        if (section.id === item.sectionId) {
                            return { ...section, completed: true }
                        } else {
                            return section
                        }
                    })
                })
            } else {
                setSections((prev) => {
                    return prev.map((section) => {
                        if (section.id === item.sectionId) {
                            return { ...section, completed: false }
                        } else {
                            return section
                        }
                    })
                })
            }
        })
    }, [answers])

    const handleSubmit = async () => {
        // const ids = allQuestionsIds.filter((id) => !answers.some((answer) => answer.questionId === id))
        // setMissingIds(ids)
        const existingIds = new Set(answers.map((item) => item.questionId))

        // Filter `allQuestionsIds` to exclude IDs already in the state
        const newAnswers = allQuestionsIds
            .filter((id) => !existingIds.has(id.toString()))
            .map((id) => ({
                questionId: id.toString(),
                answer: "1",
            }))
        setAnswers((prevAnswers) => [...prevAnswers, ...newAnswers])
        const finalAnswers = [...answers, ...newAnswers]

        if (aboutYou1.answer.length === 0 || aboutYou2.length === 0) {
            toast.error("About you is required!")
        } else {
            const quizAnswers = {
                quizId: EnvConfig.HEARING_LOSS_QUIZ_ID,
                additional: [aboutYou1, ...aboutYou2.filter((item) => item.answer[0] !== "")],
                answers: finalAnswers.filter((item) => item.answer !== "0"),
            }

            submitQuiz(quizAnswers as IQuizSubmitDto)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <PageWrapper>
            <div className="container py-5 md:py-16">
                <h1 className="text-xl md:text-4xl font-medium mb-6 text-center md:text-left">
                    Quiz to generate your hearing loss profile
                </h1>
                <p className="text-xs md:text-sm mb-6 text-center md:text-left">
                    This quiz is anonymous. You are not asked to identify who you are at any point.
                </p>
                <h4 className="text-base md:text-2xl font-semibold mb-2 md:mb-4 text-center md:text-left">
                    Section Progress
                </h4>
                {/* Progress Bar */}
                {isScrolled ? (
                    <div className="container mb-6 fixed top-20 w-full left-1/2 transform -translate-x-1/2 bg-white z-10">
                        <ProgressBar sections={sections} />
                    </div>
                ) : (
                    <div className="mb-6">
                        <ProgressBar sections={sections} />
                    </div>
                )}

                <MySpacer className="h-4 md:h-10" />

                <div>
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-gray-100 rounded-2xl mb-4"
                        defaultValue="about-you"
                    >
                        <AccordionItem value="about-you">
                            <AccordionTrigger className="p-5">
                                <div className="w-full flex justify-between">
                                    <h2 className="text-sm md:text-xl  font-semibold text-left">About You</h2>
                                    <p className="my-auto text-sm text-[#374151] flex items-center gap-1 whitespace-nowrap">
                                        {/* <span className="hidden md:block">Total question</span> 5 */}
                                    </p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-5">
                                <div className="mx-auto">
                                    <div className="bg-white shadow-md rounded-2xl p-6 mt-4">
                                        {/* About You Section */}
                                        <p className="mb-6 font-medium ">1. {aboutYou1.question}</p>
                                        <hr />
                                        <div className="pt-6">
                                            <ButtonGroup
                                                options={[
                                                    "Hearing aids in both ears",
                                                    "Hearing aids in one ear",
                                                    "Bone anchored hearing aid (BAHA)",
                                                    "Cochlear implant (CI)",
                                                    "Middle ear implant (MEI)",
                                                    "Auditory brainstem implant (ABI)",
                                                    "None of the above",
                                                ]}
                                                name="hearing-devices"
                                                value={aboutYou1.answer}
                                                onChange={(value) => {
                                                    setAboutYou1((prev) => ({
                                                        ...prev,
                                                        answer: [...value],
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-white shadow-md rounded-2xl p-6 mt-4">
                                        {/* Other Assistance Section */}
                                        <div className="space-y-6">
                                            <div>
                                                <p className="mb-6 font-medium ">
                                                    2. What other assistance do you use?
                                                </p>
                                                <hr />
                                                <div className="pt-6">
                                                    <div className="space-y-4">
                                                        {[
                                                            "Remote listening device (microphone, FM system, or something else)",
                                                            "Lip Reading",
                                                            "Assistive device for phone or video call",
                                                            "Others",
                                                        ].map((question, index) => (
                                                            <div key={index}>
                                                                <p className="text-sm font-semibold  mb-4">
                                                                    {question}
                                                                </p>
                                                                <SingleSelectButtonGroup
                                                                    options={[
                                                                        "Always",
                                                                        "Mostly",
                                                                        "Sometimes",
                                                                        "Never",
                                                                    ]}
                                                                    name={`assistance-${index}`}
                                                                    value={
                                                                        aboutYou2.find(
                                                                            (item) => item.question === question
                                                                        )?.answer[0]
                                                                    }
                                                                    onChange={(value) => {
                                                                        setAboutYou2((prev) => {
                                                                            const existing = prev.find(
                                                                                (item) =>
                                                                                    item.question === question
                                                                            )
                                                                            if (existing) {
                                                                                return prev.map((item) =>
                                                                                    item.question === question
                                                                                        ? {
                                                                                              ...item,
                                                                                              answer: [value],
                                                                                          }
                                                                                        : item
                                                                                )
                                                                            } else {
                                                                                return [
                                                                                    ...prev,
                                                                                    {
                                                                                        question: question,
                                                                                        answer: [value],
                                                                                    },
                                                                                ]
                                                                            }
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div>
                    {quizData?.quizSection?.map((item, sectionIdx) => {
                        // all question ids under each section
                        const sectionIds = item?.subSection.flatMap((subSection) =>
                            subSection.questions.map((question) => question.id)
                        )

                        const excludeIds = answers.map((item) => item.questionId)
                        const filteredIds = sectionIds.filter((id) => excludeIds.includes(id))

                        return (
                            <Accordion
                                key={item.id}
                                type="single"
                                collapsible
                                className="bg-gray-100 rounded-2xl mb-4"
                            >
                                <AccordionItem key={item.id} value={`section-${item.id}`}>
                                    <AccordionTrigger className="p-5">
                                        <div className="w-full h-full flex justify-between">
                                            <h2 className="text-sm md:text-xl font-semibold text-left">
                                                {item?.title}
                                            </h2>
                                            <div>
                                                <p className="my-auto text-sm text-[#374151] flex items-center gap-1 whitespace-nowrap">
                                                    <span className="hidden md:block">Completed</span>
                                                    {filteredIds.length}/{sectionIds.length || 0}
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent className="px-5 pb-5">
                                        <div className="flex justify-end pb-5">
                                            <div className="flex items-center">
                                                <input
                                                    name={`skip-${item.id}`}
                                                    id={`skip-${item.id}`}
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSkippedSection((prev) => [...prev, item.id])
                                                            setAnswers((prev) => [
                                                                ...prev.filter(
                                                                    (item) => !sectionIds.includes(item.questionId)
                                                                ),
                                                                ...sectionIds.map((id) => ({
                                                                    questionId: id,
                                                                    answer: "0",
                                                                })),
                                                            ])
                                                            setMissingIds((prev) =>
                                                                prev.filter((id) => !sectionIds.includes(id))
                                                            )
                                                        } else {
                                                            setSkippedSection((prev) =>
                                                                prev.filter((it) => it !== item.id)
                                                            )
                                                            setAnswers((prev) =>
                                                                prev.filter(
                                                                    (item) => !sectionIds.includes(item.questionId)
                                                                )
                                                            )
                                                        }
                                                    }}
                                                    className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-500"
                                                />
                                                <label
                                                    htmlFor={`skip-${item.id}`}
                                                    className="ml-1 text-sm font-medium text-gray-900 hover:cursor-pointer whitespace-nowrap"
                                                >
                                                    Skip this section
                                                </label>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-xs md:text-sm my-4">
                                            {item?.description}
                                        </p>

                                        <div className="mx-auto">
                                            {item?.subSection?.map((subSectionItem) => {
                                                // const subSectionQuestionIds = subSectionItem?.questions.flatMap(
                                                //     (question) => question.id
                                                // )

                                                return (
                                                    <div
                                                        key={subSectionItem.id}
                                                        className="bg-white shadow-md rounded-2xl p-6 mt-4"
                                                    >
                                                        <div className="md:flex items-center justify-between">
                                                            <h3 className="font-bold mb-2 md:mb-6">
                                                                {subSectionItem?.title}
                                                            </h3>
                                                            {/* <div className="flex items-center">
                                                                <input
                                                                    name={`skip-${subSectionItem.id}`}
                                                                    id={`skip-${subSectionItem.id}`}
                                                                    type="checkbox"
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            setSkippedSection((prev) => [
                                                                                ...prev,
                                                                                subSectionItem.id,
                                                                            ])
                                                                            setAnswers((prev) => [
                                                                                ...prev,
                                                                                ...subSectionItem.questions.map(
                                                                                    (question) => ({
                                                                                        questionId: question.id,
                                                                                        answer: "0",
                                                                                    })
                                                                                ),
                                                                            ])
                                                                            setMissingIds((prev) =>
                                                                                prev.filter(
                                                                                    (id) =>
                                                                                        !subSectionQuestionIds.includes(
                                                                                            id
                                                                                        )
                                                                                )
                                                                            )
                                                                        } else {
                                                                            setSkippedSection((prev) =>
                                                                                prev.filter(
                                                                                    (item) =>
                                                                                        item !== subSectionItem.id
                                                                                )
                                                                            )
                                                                            setAnswers((prev) =>
                                                                                prev.filter(
                                                                                    (item) =>
                                                                                        !subSectionQuestionIds.includes(
                                                                                            item.questionId
                                                                                        )
                                                                                )
                                                                            )
                                                                        }
                                                                    }}
                                                                    className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`skip-${subSectionItem.id}`}
                                                                    className="ml-1 text-sm font-medium text-gray-900 hover:cursor-pointer whitespace-nowrap"
                                                                >
                                                                    Skip this section
                                                                </label>
                                                            </div> */}
                                                        </div>

                                                        {subSectionItem?.questions?.map((question, idx) => {
                                                            return (
                                                                <div key={question?.id || idx}>
                                                                    <SliderGroup
                                                                        endPoint={7} // Update based on your logic
                                                                        label={
                                                                            question?.question ||
                                                                            "Question text not found"
                                                                        }
                                                                        id={question.id}
                                                                        value={
                                                                            answers.find(
                                                                                (item) =>
                                                                                    item.questionId === question.id
                                                                            )?.answer as string
                                                                        }
                                                                        onChange={(value) => {
                                                                            handleAnswerChange(question.id, value)
                                                                            setMissingIds(
                                                                                missingIds.filter(
                                                                                    (id) => id !== question.id
                                                                                )
                                                                            )
                                                                        }}
                                                                        disabled={skippedSection.includes(
                                                                            subSectionItem.sectionId
                                                                        )}
                                                                        isSocialSpaces={
                                                                            sectionIdx === 1 ? true : false
                                                                        }
                                                                        isReview={sectionIdx === 5 ? true : false}
                                                                    />
                                                                    <div className="flex justify-between items-center">
                                                                        {missingIds.includes(question.id) && (
                                                                            <p className="text-sm font-bold text-red-500">
                                                                                required
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )
                    })}
                </div>

                <div className="flex justify-center">
                    <button
                        // type="button"
                        title="Submit Your Quiz Button"
                        type="submit"
                    >
                        <MyButton
                            onClick={() => {
                                handleSubmit()
                            }}
                            loading={isSubmitting}
                            endIcon={<ArrowUpRight size={18} />}
                            size={"lg"}
                        >
                            Submit Your Quiz
                        </MyButton>
                    </button>
                </div>
            </div>
        </PageWrapper>
    )
}

export default QuizPage
