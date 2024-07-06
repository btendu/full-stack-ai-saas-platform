import { useState } from "react";

export default function Home() {
  const [boards, setBoards] = useState(
    [
      {
        cardName: "Stuff to Try (this is a list)",
        items: [
          { title: "Swipe left or right to see other lists on this board." }
        ],
      },
      {
        cardName: "Try it ( Another Board )",
        items: [
          { title: "Done with this board? Tap Archive board in the board settings menu to close it." },
          { title: "Tap and hold a card to pick it up and move it. Try it now!" },
          { title: "Create as many cards as you want, we've got an unlimited supply!" },
          { title: "Tap this card to open it and see more details." },
          { title: "Start using Trello!" }
        ],
      }]
  );

  return (
    <div className="bg-cyan-400 min-h-screen">
      <div className="grid grid-cols-4 gap-4 pt-4 pl-7">
        {boards.map(element =>
          <div
            className="flex justify-center items-center flex-col w-5/6 h-fit bg-white rounded-lg">
            {element.cardName}
          </div>
        )}
      </div>
    </div>
  );
}