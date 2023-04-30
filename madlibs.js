const edit = document.querySelector(".madLibsEdit");

function parseStory(rawStory) {
  const testVerb = /\[v\][.,;:!?]?(\n|$)/;
  const testNoun = /\[n\][.,;:!?]?(\r\n|$)/;
  const testAdj = /\[a\][.,;:!?]?(\n|$)/;

  const comma = /[.,;:!?""]?$/;
  const newArr = [];

  const name = rawStory.split(" ");

  for (let i = 0; i < name.length; i++) {
    if (testVerb.test(name[i])) {
      newArr.push({ word: name[i].replace(testVerb, ""), post: "verb" });
    } else if (testNoun.test(name[i])) {
      newArr.push({ word: name[i].replace(testNoun, ""), post: "noun" });
    } else if (testAdj.test(name[i])) {
      newArr.push({ word: name[i].replace(testAdj, ""), post: "adjective" });
    } else if (comma.test(name[i])) {
      newArr.push({ word: name[i] });
    } else {
      newArr.push({ word: name[i] });
    }
  }
  return newArr;
}

const par = document.createElement("p");
edit.appendChild(par);

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    for (let i = 0; i < processedStory.length; i++) {
      if (processedStory[i].post == "noun" || processedStory[i].post == "verb" || processedStory[i].post == "adjective") {
        const newInput = document.createElement("input");
        par.appendChild(newInput);
        newInput.setAttribute("id", i);
        newInput.addEventListener("input", () => {
          const value = newInput.value;
          const previewSpan = document.querySelector(`#preview-${i}`);
          if (previewSpan) {
            previewSpan.textContent = value;
          } else {
            const newSpan = document.createElement("span");
            newSpan.setAttribute("id", `preview-${i}`);
            newSpan.textContent = value;
            par2.appendChild(newSpan);
          }
        });
      } else {
        const sp = document.createElement("span");
        par.appendChild(sp);
        sp.innerHTML = processedStory[i].word;
        par.appendChild(document.createTextNode(" "));
      }
    }
  });

const preview = document.querySelector(".madLibsPreview");
const par2 = document.createElement("p");
preview.appendChild(par2);

const newPreview = () => {
  return fetch("./story.txt").then((response) => response.text());
};

newPreview().then(parseStory).then((previewStory) => {
  for (let i = 0; i < previewStory.length; i++) {
    if (previewStory[i].post == "noun" || previewStory[i].post == "verb" || previewStory[i].post == "adjective") {
      const newSpan = document.createElement("span");
      newSpan.setAttribute("id", `preview-${i}`);
      par2.appendChild(newSpan);
      par2.appendChild(document.createTextNode(" "));
    } else {
      const sp = document.createElement("span");
      par2.appendChild(sp);
      sp.innerHTML = previewStory[i].word;
      par2.appendChild(document.createTextNode(" "));
    }
  }
});
