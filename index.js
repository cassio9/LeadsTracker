let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

//pull data from LocalStorage and Render.
let getLeads = JSON.parse(localStorage.getItem("myLeads"));
if (getLeads) {
  myLeads = getLeads;
  render(myLeads);
}

//Add Object input to LocalStorage with "id", Render and clear input value.
inputBtn.addEventListener("click", function () {
  const id = "" + new Date().getTime();
  const idPut = String(id).slice(-6);
  myLeads.push({ url: `https://${inputEl.value}/`, id: idPut });
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  inputEl.value = "";
  render(myLeads);
  location.reload();
});

//render
function render(myLeads) {
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    listItems += 
        `
        <li id="${myLeads[i].id}">
            <a target='_blank' href='${myLeads[i].url}'>${myLeads[i].url.slice(0,70)}</a>
            <div>
                <button id="${myLeads[i].id}" class="button-55">Delete</button>
            </div>
        </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

//delete All button
deleteBtn.addEventListener("dblclick", function () {
  localStorage.removeItem("myLeads");
  myLeads = "";
  render(myLeads);
  location.reload();
});

// add current tab to myLeads and render
tabBtn.addEventListener("click", function () {
  const id = "" + new Date().getTime();
  const idPut = String(id).slice(-6);
  let queryOptions = { active: true, currentWindow: true };
  chrome.tabs.query(queryOptions, function (tab) {
    myLeads.push({ url: tab[0].url, id: idPut });
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    inputEl.value = "";
    render(myLeads);
    location.reload();
  });
});

//create Nodelist with elements that contain class .button-55
let btn = document.querySelectorAll(".button-55");

// addEventListener to every elem from Nodelist, and delete is by id.
for (let i = 0; i < btn.length; i++)
  btn[i].addEventListener("click", function () {
    const idToDelete = document.getElementById(this.id);
    myLeads = myLeads.filter((elem) =>
      elem.id === idToDelete.id ? false : true
    );
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    location.reload();
  });
