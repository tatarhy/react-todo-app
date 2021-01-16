import React from "react";
import classNames from "classnames";

const getKey = () => Math.random().toString(32).substring(2);

interface Task {
  key: string;
  text: string;
  done: boolean;
}

function TaskInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = React.useState("");
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit(text);
      setText("");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <input
      type="text"
      className="px-4 py-2 w-full focus:outline-none"
      onKeyDown={(e) => handleKeyDown(e)}
      onChange={(e) => handleChange(e)}
      value={text}
      placeholder="What to do?"
    />
  );
}

function TaskItem({
  item,
  onCheck,
}: {
  item: Task;
  onCheck: (item: Task) => void;
}) {
  return (
    <div className="flex items-center py-3 px-3">
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => onCheck(item)}
      />
      <div className={classNames("ml-3", item.done && "line-through")}>
        {item.text}
      </div>
    </div>
  );
}

const App: React.FC = () => {
  const [items, setItems] = React.useState([
    { key: getKey(), text: "Learn JavaScript", done: false },
    { key: getKey(), text: "Learn React", done: false },
    { key: getKey(), text: "Get some good sleep", done: true },
  ]);
  const handleCheck = (checked: Task) => {
    const newItems = items.map((item) => {
      if (item.key == checked.key) {
        item.done = !item.done;
      }
      return item;
    });
    setItems(newItems);
  };
  const handleSubmit = (text: string) => {
    const newItems = [...items, { key: getKey(), text, done: false }];
    setItems(newItems);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg px-3 py-5">⚛️ React ToDo</div>
      <div className="divide-y devide-gray-400">
        <TaskInput onSubmit={handleSubmit} />
        {items.map((item) => (
          <TaskItem key={item.key} item={item} onCheck={handleCheck} />
        ))}
        <div className="py-3 px-3">{items.length} items</div>
      </div>
    </div>
  );
};

export default App;
