const edit = document.querySelector(".madLibsEdit");
const preview = document.querySelector(".madLibsPreview");

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
        newInput.setAttribute("id", i);
        newInput.setAttribute("type", "text");
        par.appendChild(newInput);
        newInput.addEventListener("input", () => {
          const value = newInput.value;
          const previewElement = document.querySelector(`#preview-${i}`);
          if (previewElement.tagName === "INPUT") {
            previewElement.setAttribute("value", value);
          } else {
            const newSpan = document.createElement("span");
            newSpan.setAttribute("id", `preview-${i}`);
            newSpan.setAttribute("class", previewElement.getAttribute("class"));
            newSpan.textContent = value;
            previewElement.parentNode.replaceChild(newSpan, previewElement);
          }
        });
      } else {
        const sp = document.createElement("span");
        sp.setAttribute("id", `preview-${i}`);
        sp.setAttribute("class", `madLibsPreview-${processedStory[i].post}`);
        sp.innerHTML = processedStory[i].word;
        par.appendChild(sp);
        par.appendChild(document.createTextNode(" "));
      }
    }
  });

const par2 = document.createElement("p");
preview.appendChild(par2);

const newPreview = () => {
  return fetch("./story.txt").then((response) => response.text());
};

newPreview().then(parseStory).then((previewStory) => {
  for (let i = 0; i < previewStory.length; i++) {
    if (previewStory[i].post == "noun" || previewStory[i].post == "verb" || previewStory[i].post == "adjective") {
      const newInput = document.createElement("input");
      newInput.setAttribute("id", `preview-${i}`);
      newInput.setAttribute("class", `madLibsPreview-${previewStory[i].post}`);
      newInput.setAttribute("type", "text");
      par2.appendChild(newInput);
      newInput.addEventListener("input", () => {
        const value = newInput.value;
        const editElement = document.querySelector(`#${i}`);
        if (editElement.tagName === "INPUT") {
          editElement.setAttribute("value", value);
          newSpan.appendChild(document.createTextNode(" "));
        } else {
          const newSpan = document.createElement("span");
          newSpan.setAttribute("id", i);
          newSpan.setAttribute("class", editElement.getAttribute("class"));
          newSpan.textContent = value;
          editElement.parentNode.replaceChild(newSpan, editElement);
          newSpan.appendChild(document.createTextNode(" "));
        }
      });
    } else {
      const sp = document.createElement("span");
      sp.setAttribute("id", i);
      sp.setAttribute("class", `madLibsEdit-${previewStory[i].post}`);
      sp.innerHTML = previewStory[i].word;
      par2.appendChild(sp);
      par2.appendChild(document.createTextNode(" "));
    }
  }
});
   
