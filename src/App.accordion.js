import { useState } from "react";
import "./index.accordion.css";

const faqs = [
    {
        title: "Where are these chairs assembled?",
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
    },
    {
        title: "How long do I have to return my chair?",
        text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
    },
    {
        title: "Do you ship to countries outside the EU?",
        text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
    },
];

export default function AppAccordion() {
    return (
        <div>
            <Accordion data={faqs}/>
        </div>
    );
}

function Accordion({data}) {
    const [currentOpen, setCurrentOpen] = useState(null);

    return (
        <ul className="accordion">
            {data.map((faq, idx) => (
                <AccordionItem
                    currentOpen={currentOpen}
                    onOpen={setCurrentOpen}
                    key={idx}
                    faq={faq}
                    index={idx + 1}
                >{faq.text}</AccordionItem>
            ))}
        </ul>
    );
}

function AccordionItem({ faq, index, onOpen, currentOpen, children }) {
    const currIndex = index - 1;
    const isOpen = currIndex === currentOpen;
    function handleToggle() {
        onOpen(isOpen ? null : currIndex);
    }

    return (
        <li className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
            <span className="number">{index < 9 ? `0${index}` : index}</span>
            <div className="title text">{faq.title}</div>
            <span className="icon">{isOpen ? "-" : "+"}</span>
            {isOpen && <div className="content-box">{children}</div>}
        </li>
    );
}
