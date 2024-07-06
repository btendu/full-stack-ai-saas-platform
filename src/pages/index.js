import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [picked, setPicked] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState();
  const [boards, setBoards] = useState([
    {
      cardName: "Stuff to Try (this is a list)",
      items: [
        { title: "Swipe left or right to see other lists on this board." },
      ],
    },
    {
      cardName: "Try it ( Another Board )",
      items: [
        {
          title:
            "Done with this board? Tap Archive board in the board settings menu to close it.",
        },
        { title: "Tap and hold a card to pick it up and move it. Try it now!" },
        {
          title:
            "Create as many cards as you want, we've got an unlimited supply!",
        },
        { title: "Tap this card to open it and see more details." },
        { title: "Start using Trello!" },
      ],
    },
  ]);

  let rIndex;

  const handleDropped = (recievedElements, index) => {
    //Make changes in the original
    boards.map((item) => {
      if (item.cardName === picked) {
        //Delete the element
        item.items.splice(selectedIndex, 1);
      }
      if (item.cardName === recievedElements.cardName) {
        //Adding the dropped element
        item.items.splice(rIndex, 0, selectedTitle);
        rIndex = 0;
      }
    });
    //Save the changes back in state
    setBoards([...boards]);
  };

  const allowDrag = (event) => {
    event.preventDefault();
  };

  const handleDragStart = (element, index, ele) => {
    //Store the dragged item
    setPicked(element);
    setSelectedIndex(index);
    setSelectedTitle(ele);
  };

  return (
    <div className="bg-cyan-300 min-h-screen">
      <div className="grid grid-cols-4 gap-4 pt-4 pl-7 ">
        {boards?.map((elements, index) => (
          <>
            <div
              id="dropStarting"
              key={index}
              onDrop={() => handleDropped(elements, index)}
              onDragOver={(event) => allowDrag(event)}
              className="flex justify-center items-center flex-col w-5/6 h-fit bg-white rounded-lg pb-6"
            >
              <p className="font-sans text-sm font-medium mt-2 mb-5">
                {elements.cardName}
              </p>
              {elements.items.map((ele, indexKey) => (
                <motion.div
                  animate={{ y: 10 }}
                  transition={{
                    type: "spring",
                    duration: 1,
                    stiffness: 100,
                    damping: 10,
                  }}
                  id="dragStarting"
                  draggable
                  onDragStart={() =>
                    handleDragStart(elements.cardName, indexKey, ele)
                  }
                  key={indexKey}
                  onDrop={() => {
                    rIndex = indexKey;
                  }}
                  className="flex justify-center cursor-pointer  items-center w-11/12 h-auto mb-2 bg-cyan-100 rounded-lg mt-2 font-sans text-sm font-normal break-words pl-4 pr-4 pt-2 pb-2"
                >
                  {ele.title}
                </motion.div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
