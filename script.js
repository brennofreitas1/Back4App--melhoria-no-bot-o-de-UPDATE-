const taskUrl = "https://parseapi.back4app.com/classes/Task";
const headers = {
    "X-Parse-Application-Id": "RkjwBkfNZRERi3k4FVjojkTgLLe6CbbTPbW4qrQo",
    "X-Parse-REST-API-Key": "wmn69SVNaLq6UoW177InOj1tnXUsy2fkfvtHagdu",
};

const renderizaLista = (lista, atv) => {
    lista.innerHTML = "";
    atv.forEach((atv) => {
        const inputCheck = document.createElement("input");
        inputCheck.onclick = () => updateTask(atv);
        inputCheck.type = "checkbox";
        inputCheck.checked = atv.done;

        const itemText = document.createTextNode(
            `${atv.description} `
        );

        const buttonDelete = document.createElement("button");
        buttonDelete.innerHTML = "X";
        buttonDelete.onclick = () => deleteTask(atv.objectId);


        const listItem = document.createElement("li");
        listItem.className = atv.done ? "realizada" : "";
        listItem.className = atv.done ? "realizada" : "";

        listItem.appendChild(inputCheck);
        listItem.appendChild(itemText);
        listItem.appendChild(buttonDelete);
        lista.appendChild(listItem);
    });
};


const getTasks = () => {
    fetch(taskUrl, { headers: headers })
        .then((res) => res.json())
        .then((data) => {
            renderizaLista(lista, data.results);
        });
};

const handleBtAddClick = () => {
    const description = inputDescricao.value;
    if (!description) {
        alert("[ERRO]Falta de dados!");
        return;
    }
    btAdd.disabled = true;
    fetch(taskUrl, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: description }),
    })
        .then((res) => res.json())
        .then((data) => {
            getTasks();
            btAdd.disabled = false;
            inputDescricao.value = "";
            inputDescricao.focus();
            console.log("data", data);
        })
        .catch((err) => {
            btAdd.disabled = false;
            console.log(err);
        });
};

const deleteTask = (id) => {
  fetch(`${taskUrl}/${id}`, {
      method: "DELETE",
      headers: headers,
  })
      .then((res) => res.json())
      .then((data) => {
          getTasks();
          console.log("data", data);
      })
      .catch((err) => {
          console.log(err);
      });
};

const updateTask = (task) => {
    fetch(`${taskUrl}/${task.objectId}`, {
        method: "PUT",
        headers: headers,
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: !task.done }),
    })
        .then((res) => res.json())
        .then((data) => {
            getTasks();
            console.log("data", data);
        })
        .catch((err) => {
            console.log(err);
        });
};
getTasks();
btAdd.onclick = handleBtAddClick;