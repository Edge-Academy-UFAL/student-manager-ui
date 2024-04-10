import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
const taskCardDescription = `Create a React component named TaskCard that represents a card containing information about a feature's accessibility. The card includes an accordion section with a trigger question and a corresponding answer.\n\nThe card should have a border, padding of 5 units, and rounded corners for a visually appealing design.\n\nInside the card, there is a flex container with items aligned between each other. On one side, there is an accordion section, and on the other side, there is a button.\n\nThe accordion section (<Accordion>) has a single collapsible item (<AccordionItem>) with a trigger (<AccordionTrigger>) displaying the question: "Is it accessible?" The answer is hidden by default but revealed when the user clicks on the trigger.\n\nThe answer (<AccordionContent>) should state: "Yes. It adheres to the WAI-ARIA design pattern."\n\nOn the opposite side of the card, there is a button with the text "Confirmar." The button has a border, and its background color changes on hover to provide a visual indication.\n\nThe overall goal of this task is to create a visually pleasing and accessible card that displays information about the accessibility of a feature, allowing users to confirm their understanding by clicking the "Confirmar" button.`

const TaskCard = () => {
  return (
    <div className="flex justify-between border p-3 rounded-lg relative">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="font-bold">Task 1</AccordionTrigger>
          <AccordionContent className="mt-2 max-w-[90%]">
            {taskCardDescription}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="absolute right-5 top-6 ">
        <button className="border hover:bg-accent px-3 py-1 rounded-lg">
          Confirmar
        </button>
      </div>
    </div>
  )
}

export default TaskCard
