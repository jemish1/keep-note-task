window.onload = function () {
  if (
    localStorage.getItem("email") == null &&
    localStorage.getItem("password") == null
  ) {
    window.location.href = "index.html";
  }
};

function logOut() {
  localStorage.removeItem("email");
  localStorage.removeItem("mobile");
  localStorage.removeItem("name");
  localStorage.removeItem("gender");
  localStorage.removeItem("password");
  localStorage.removeItem("date");

  window.location.href = "Login.html";
}

async function fetchWeather() {
  try {
    const fetchWeatherData = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=ahmedabad&appid=afa1525512c874df0df90fc891f41317"
    );

    const result = await fetchWeatherData.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

fetchWeather().then((result) => {
  document.getElementById("temp").innerText =
    "Ahmedabad Temprature: " + (result.main.temp - 273.15).toFixed(2) + " °C";
});

async function fetchImage() {
  // const fetchImg = fetch("https://random.imagecdn.app/250/250");
  const url =
    "https://giphy.p.rapidapi.com/v1/gifs/search?api_key=YrznEelDGEXQcyfyr3Z7XS9jcqXrN1aS&q=funny%20cat";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "09014c2fc0mshbc7a8ce93c32e29p19c61ejsn375ce2354759",
      "X-RapidAPI-Host": "giphy.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

const randomNum = Math.floor(Math.random() * 51);

fetchImage().then((Img) => {
  document.getElementById(
    "img"
  ).innerHTML = `<img src="${Img.data[randomNum].images.original.url}"> </img>`;
});

const ImageInterval = setInterval(() => {
  fetchImage().then((Img) => {
    document.getElementById(
      "img"
    ).innerHTML = `<img src="${Img.data[randomNum].images.original.url}"> </img>`;
  });
}, 120000);

const currTime = setInterval(() => {
  const date = new Date();
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const min = date.getMinutes();
  const second = date.getSeconds();
  document.getElementById("currTime").innerText =
    hour + ":" + min + ":" + second;
}, 1000);

//

let mark = [];
const noteCard = document.querySelector(".notes-card");
function addNote() {
  const note = document.getElementById("note");

  const card = document.createElement("div");
  card.classList.add("card");

  const content = document.createElement("p");
  content.classList.add("content");
  content.append(`${note.value}`);

  card.appendChild(content);

  const iconDiv = document.createElement("div");
  iconDiv.classList.add("icon");

  const editDiv = document.createElement("div");
  editDiv.setAttribute("id", "edit");
  editDiv.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="50"
      height="30"
      viewBox="0 0 24 24"
    >
      <path
        d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"
      ></path>
    </svg>
  `;

  iconDiv.appendChild(editDiv);

  const markDiv = document.createElement("div");
  markDiv.setAttribute("id", "mark");
  markDiv.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="30"
        viewBox="0 0 30 30"
      >
        <path
          d="M14.147,19.267c-0.188,0.188-0.442,0.293-0.707,0.293s-0.52-0.105-0.707-0.293L9.28,15.814 c-0.391-0.391-0.391-1.023,0-1.414c0.391-0.391,1.023-0.391,1.414,0l2.746,2.746L25.674,4.911C25.318,4.364,24.702,4,24,4H6 C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V7.414L14.147,19.267z"
        ></path>
      </svg>
  `;

  iconDiv.appendChild(markDiv);

  const deleteDiv = document.createElement("div");
  deleteDiv.setAttribute("id", "delete");
  deleteDiv.innerHTML = `
        <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="30"
        viewBox="0 0 24 24"
        >
        <path
          d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
        ></path>
        </svg>
  `;

  iconDiv.appendChild(deleteDiv);

  card.appendChild(iconDiv);

  if (note.value != "") {
    noteCard.appendChild(card);
    note.value = "";
  }

  markDiv.addEventListener("click", function () {
    if (card.style.backgroundColor == "lightgray") {
      card.style.backgroundColor = "white";

      const markItem = JSON.parse(localStorage.getItem("mark"));
      for (let i = 0; i < markItem.length; i++) {
        if (content.innerText === markItem[i]) {
          markItem.splice(markItem.indexOf(content.innerText), 1);
        }
      }
      mark = markItem;
    } else {
      card.style.backgroundColor = "lightgray";

      const markItem = JSON.parse(localStorage.getItem("mark"));
      if (markItem) {
        for (let i = 0; i < markItem.length; i++) {
          if (!mark.includes(markItem[i])) {
            mark.push(markItem[i]);
          }
        }
      }
      if (!mark.includes(content.innerText)) {
        mark.push(content.innerText);
      }
    }

    localStorage.setItem("mark", JSON.stringify(mark));

    //
    const taskListC = document.getElementById("taskListC");
    const taskListP = document.getElementById("taskListP");

    taskListC.innerText =
      "Completed Task: " + JSON.parse(localStorage.getItem("mark")).length;
    taskListP.innerText =
      "Pending Task: " +
      Number(
        JSON.parse(localStorage.getItem("tasks")).length -
          JSON.parse(localStorage.getItem("mark")).length
      );
  });

  deleteDiv.addEventListener("click", function () {
    noteCard.removeChild(card);
    const localItem = JSON.parse(localStorage.getItem("tasks"));

    for (let i = 0; i < localItem.length; i++) {
      if (localItem[i] === content.innerText) {
        localItem.splice(i, 1);
      }
    }
    localStorage.setItem("tasks", JSON.stringify(localItem));

    //
    const markItem = JSON.parse(localStorage.getItem("mark"));
    for (let i = 0; i < markItem.length; i++) {
      if (markItem[i] === content.innerText) {
        markItem.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("mark", JSON.stringify(markItem));

    // location.reload();
  });

  editDiv.addEventListener("click", function () {
    if (content.style.display != "none") {
      const textarea = document.createElement("textarea");
      content.style.display = "none";

      const text = content.innerText;

      textarea.classList.add("for-edit");
      textarea.setAttribute("rows", "6");

      textarea.value = text;

      card.prepend(textarea);
    } else {
      const text = document.querySelector(".for-edit").value;

      const localItem = JSON.parse(localStorage.getItem("tasks"));
      for (let i = 0; i < localItem.length; i++) {
        if (localItem[i] === content.innerText) {
          localItem[i] = text;
        }
      }
      localStorage.setItem("tasks", JSON.stringify(localItem));

      //
      const markItem = JSON.parse(localStorage.getItem("mark"));
      for (let i = 0; i < markItem.length; i++) {
        if (markItem[i] === content.innerText) {
          markItem[i] = text;
          break;
        }
      }

      localStorage.setItem("mark", JSON.stringify(markItem));
      //

      content.innerText = text;
      content.style.display = "block";

      card.removeChild(card.getElementsByTagName("textarea")[0]);
    }
  });

  //
  //
  const task = [];

  const taskItem = noteCard.getElementsByClassName("card");

  for (let i = 0; i < taskItem.length; i++) {
    task.push(taskItem[i].firstChild.innerText);
  }

  localStorage.setItem("tasks", JSON.stringify(task));
}

(function loadTaskFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((text) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const content = document.createElement("p");
      content.classList.add("content");
      content.append(`${text}`);

      card.appendChild(content);

      const iconDiv = document.createElement("div");
      iconDiv.classList.add("icon");

      const editDiv = document.createElement("div");
      editDiv.setAttribute("id", "edit");
      editDiv.innerHTML = `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                d="M14.1 5.9L3 17v4h4L18.1 9.9 14.1 5.9zM15.6 4.4L18 2l4 4-2.4 2.4L15.6 4.4z"
              ></path>
            </svg>
  `;

      iconDiv.appendChild(editDiv);

      const markDiv = document.createElement("div");
      markDiv.setAttribute("id", "mark");
      markDiv.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="30"
        viewBox="0 0 30 30"
      >
        <path
          d="M14.147,19.267c-0.188,0.188-0.442,0.293-0.707,0.293s-0.52-0.105-0.707-0.293L9.28,15.814 c-0.391-0.391-0.391-1.023,0-1.414c0.391-0.391,1.023-0.391,1.414,0l2.746,2.746L25.674,4.911C25.318,4.364,24.702,4,24,4H6 C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V7.414L14.147,19.267z"
        ></path>
      </svg>
  `;

      iconDiv.appendChild(markDiv);

      const deleteDiv = document.createElement("div");
      deleteDiv.setAttribute("id", "delete");
      deleteDiv.innerHTML = `
        <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="30"
        viewBox="0 0 24 24"
        >
        <path
          d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
        ></path>
        </svg>
  `;

      iconDiv.appendChild(deleteDiv);

      card.appendChild(iconDiv);
      noteCard.appendChild(card);

      markDiv.addEventListener("click", function () {
        if (card.style.backgroundColor == "lightgray") {
          card.style.backgroundColor = "white";

          const markItem = JSON.parse(localStorage.getItem("mark"));
          for (let i = 0; i < markItem.length; i++) {
            if (content.innerText === markItem[i]) {
              markItem.splice(markItem.indexOf(content.innerText), 1);
            }
          }
          mark = markItem;
        } else {
          card.style.backgroundColor = "lightgray";

          const markItem = JSON.parse(localStorage.getItem("mark"));
          if (markItem) {
            for (let i = 0; i < markItem.length; i++) {
              if (!mark.includes(markItem[i])) {
                mark.push(markItem[i]);
              }
            }
          }
          if (!mark.includes(content.innerText)) {
            mark.push(content.innerText);
          }
        }

        localStorage.setItem("mark", JSON.stringify(mark));

        //
        const taskListC = document.getElementById("taskListC");
        const taskListP = document.getElementById("taskListP");

        taskListC.innerText =
          "Completed Task: " + JSON.parse(localStorage.getItem("mark")).length;
        taskListP.innerText =
          "Pending Task: " +
          Number(
            JSON.parse(localStorage.getItem("tasks")).length -
              JSON.parse(localStorage.getItem("mark")).length
          );
      });

      deleteDiv.addEventListener("click", function () {
        noteCard.removeChild(card);
        const localItem = JSON.parse(localStorage.getItem("tasks"));

        for (let i = 0; i < localItem.length; i++) {
          if (localItem[i] === content.innerText) {
            localItem.splice(i, 1);
          }
        }
        localStorage.setItem("tasks", JSON.stringify(localItem));

        //
        const markItem = JSON.parse(localStorage.getItem("mark"));
        for (let i = 0; i < markItem.length; i++) {
          if (markItem[i] === content.innerText) {
            markItem.splice(i, 1);
            break;
          }
        }
        localStorage.setItem("mark", JSON.stringify(markItem));

        // location.reload();
      });

      editDiv.addEventListener("click", function () {
        if (content.style.display != "none") {
          const textarea = document.createElement("textarea");
          content.style.display = "none";

          const text = content.innerText;

          textarea.classList.add("for-edit");
          textarea.setAttribute("rows", "6");

          textarea.value = text;

          card.prepend(textarea);
        } else {
          const text = document.querySelector(".for-edit").value;

          const localItem = JSON.parse(localStorage.getItem("tasks"));
          for (let i = 0; i < localItem.length; i++) {
            if (localItem[i] === content.innerText) {
              localItem[i] = text;
            }
          }
          localStorage.setItem("tasks", JSON.stringify(localItem));

          //
          const markItem = JSON.parse(localStorage.getItem("mark"));
          for (let i = 0; i < markItem.length; i++) {
            if (markItem[i] === content.innerText) {
              markItem[i] = text;
              break;
            }
          }

          localStorage.setItem("mark", JSON.stringify(markItem));
          //

          content.innerText = text;
          content.style.display = "block";

          card.removeChild(card.getElementsByTagName("textarea")[0]);
        }
      });

      const markItem = JSON.parse(localStorage.getItem("mark"));
      if (markItem) {
        for (let i = 0; i < markItem.length; i++) {
          if (markItem[i] === content.innerText) {
            card.style.backgroundColor = "lightgray";
          }
        }
      }
    });
  }
})();

(function () {
  const taskListC = document.getElementById("taskListC");
  const taskListP = document.getElementById("taskListP");

  taskListC.innerText =
    "Completed Task: " + JSON.parse(localStorage.getItem("mark")).length;
  taskListP.innerText =
    "Pending Task: " +
    Number(
      JSON.parse(localStorage.getItem("tasks")).length -
        JSON.parse(localStorage.getItem("mark")).length
    );
})();
