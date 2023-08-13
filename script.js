const imp = document.getElementById("imp");
const listItemsElement = document.getElementById("listItems");

function getRandomIndex(lists) {
  return Math.floor(Math.random() * lists.length);
}

//shuffle Array Once Per Day Function
function shuffleArrayOncePerDay(array) {
  const currentDate = new Date();
  const day = currentDate.getDate();

  const storedShuffledList = localStorage.getItem("shuffledList");
  let shuffledList;

  if (storedShuffledList) {
    const storedDay = parseInt(localStorage.getItem("shuffledDay"), 10);
    if (storedDay === day) {
      // Use the stored shuffled list for the current day
      shuffledList = JSON.parse(storedShuffledList);
    } else {
      // Shuffle the array and store the shuffled list for the current day
      shuffledList = array.slice();
      for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
      }
      localStorage.setItem("shuffledList", JSON.stringify(shuffledList));
      localStorage.setItem("shuffledDay", day);
    }
  } else {
    // Shuffle the array and store the shuffled list for the current day
    shuffledList = array.slice();
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
    localStorage.setItem("shuffledList", JSON.stringify(shuffledList));
    localStorage.setItem("shuffledDay", day);
  }

  return shuffledList;
}

//Select List By Date Function
function selectListByDate() {
  const lists = [
    {
      list_number: "List 1",
      list_items: [
        { number: 1, name: "Dog" },
        { number: 2, name: "Cat" },
        { number: 3, name: "Duck" },
        { number: 4, name: "Cow" },
        { number: 5, name: "Sheep" },
        { number: 6, name: "Horse" },
        { number: 7, name: "Pig" },
        { number: 8, name: "Lion" },
        { number: 9, name: "Elephant" },
        { number: 10, name: "Monkey" },
      ],
    },
    {
      list_number: "List 2",
      list_items: [
        { number: 1, name: "Oak" },
        { number: 2, name: "Aspen" },
        { number: 3, name: "Willow" },
        { number: 4, name: "Pine" },
        { number: 5, name: "Maple" },
        { number: 6, name: "Birch" },
        { number: 7, name: "Spruce" },
        { number: 8, name: "Cherry" },
        { number: 9, name: "Palm" },
        { number: 10, name: "Apple" },
      ],
    },
    {
      list_number: "List 3",
      list_items: [
        { number: 1, name: "Mary" },
        { number: 2, name: "Tyler" },
        { number: 3, name: "Mark" },
        { number: 4, name: "Clark" },
        { number: 5, name: "Paul" },
        { number: 6, name: "Sam" },
        { number: 7, name: "Nick" },
        { number: 8, name: "Jamie" },
        { number: 9, name: "Bob" },
        { number: 10, name: "Charlie" },
      ],
    },
    {
      list_number: "List 4",
      list_items: [
        { number: 1, name: "Apple" },
        { number: 2, name: "Orange" },
        { number: 3, name: "Banana" },
        { number: 4, name: "Pear" },
        { number: 5, name: "Peach" },
        { number: 6, name: "Blueberry" },
        { number: 7, name: "Strawberry" },
        { number: 8, name: "Tangerine" },
        { number: 9, name: "Mango" },
        { number: 10, name: "Grape" },
      ],
    },
    {
      list_number: "List 5",
      list_items: [
        { number: 1, name: "Triangle" },
        { number: 2, name: "Square" },
        { number: 3, name: "Circle" },
        { number: 4, name: "Pentagon" },
        { number: 5, name: "Hexagon" },
        { number: 6, name: "Trapezoid" },
        { number: 7, name: "Rectangle" },
        { number: 8, name: "Oval" },
        { number: 9, name: "Heart" },
        { number: 10, name: "Star" },
      ],
    },
  ];
  let randomIndex = localStorage.getItem("randomIndex");
  let randomIndexDay = localStorage.getItem("randomIndexDay");

  const currentDate = new Date();
  const day = currentDate.getDate();

  if (!randomIndex || !randomIndexDay || parseInt(randomIndexDay, 10) !== day) {
    randomIndex = getRandomIndex(lists);
    randomIndexDay = day;
    localStorage.setItem("randomIndex", randomIndex);
    localStorage.setItem("randomIndexDay", randomIndexDay);
  } else {
    randomIndex = parseInt(randomIndex, 10);
  }

  const selectedList = [...lists[randomIndex].list_items]; // Make a copy of the selected list items

  const new_selected_list = shuffleArrayOncePerDay(selectedList); // Shuffle the selected list items

  return {
    list_number: lists[randomIndex].list_number,
    list_items: new_selected_list,
  };
}

// Example usage:
const selectedList = selectListByDate();

imp.innerText = `${selectedList.list_number}:`;

selectedList.list_items.map((item) => {
  const listItemElement = document.createElement("p");

  listItemElement.textContent = `${item.number}. ${item.name}`;
  listItemElement.classList.add("list-item");

  listItemsElement.appendChild(listItemElement);
});
