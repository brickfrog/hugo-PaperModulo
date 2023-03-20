import * as params from "@params";

var fuse; // holds our search engine
var resList = document.getElementById("searchResults");
var sInput = document.getElementById("searchInput");
var first,
  last,
  current_elem = null;
var resultsAvailable = false;

// load our search index
window.onload = function () {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        if (data) {
          // fuse.js options; check fuse.js website for details
          var options = {
            distance: 100,
            threshold: 0.4,
            ignoreLocation: true,
            keys: ["title", "permalink", "summary", "content"],
          };
          if (params.fuseOpts) {
            options = {
              isCaseSensitive: params.fuseOpts.iscasesensitive
                ? params.fuseOpts.iscasesensitive
                : false,
              includeScore: params.fuseOpts.includescore
                ? params.fuseOpts.includescore
                : true,
              includeMatches: params.fuseOpts.includematches
                ? params.fuseOpts.includematches
                : true,
              minMatchCharLength: params.fuseOpts.minmatchcharlength
                ? params.fuseOpts.minmatchcharlength
                : 2,
              shouldSort: params.fuseOpts.shouldsort
                ? params.fuseOpts.shouldsort
                : true,
              findAllMatches: params.fuseOpts.findallmatches
                ? params.fuseOpts.findallmatches
                : false,
              keys: params.fuseOpts.keys
                ? params.fuseOpts.keys
                : ["title", "permalink", "summary", "content"],
              location: params.fuseOpts.location ? params.fuseOpts.location : 0,
              threshold: params.fuseOpts.threshold
                ? params.fuseOpts.threshold
                : 0.4,
              distance: params.fuseOpts.distance
                ? params.fuseOpts.distance
                : 100,
              ignoreLocation: params.fuseOpts.ignorelocation
                ? params.fuseOpts.ignorelocation
                : false,
            };
          }
          fuse = new Fuse(data, options); // build the index from the json file
        }
      } else {
        console.log(xhr.responseText);
      }
    }
  };
  xhr.open("GET", "../index.json");
  xhr.send();
};

function activeToggle(ae) {
  document.querySelectorAll(".focus").forEach(function (element) {
    // rm focus class
    element.classList.remove("focus");
  });
  if (ae) {
    ae.focus();
    document.activeElement = current_elem = ae;
    ae.parentElement.classList.add("focus");
  } else {
    document.activeElement.parentElement.classList.add("focus");
  }
}

function reset() {
  resultsAvailable = false;
  resList.innerHTML = sInput.value = ""; // clear inputbox and searchResults
  sInput.focus(); // shift focus to input box
}

// execute search as each character is typed
sInput.onkeyup = function (e) {
  // run a search query (for "term") every time a letter is typed
  // in the search box
  if (fuse) {
    const results = fuse.search(this.value.trim()); // the actual query being run using fuse.js
    if (results.length !== 0) {
      // build our html if result exists
      let resultSet = ""; // our results bucket

      for (let item in results) {

        let highlightedSummary = '';
        
        for (let match in results[item].matches) {
          let match_indexes = results[item].matches[match].indices;

          console.log(match_indexes)
      
          switch (results[item].matches[match].key) {
              case 'title':
                summary = "Title: " + results[item].item.title;
                offset = 7;
                break;
              case 'summary':
                summary = "Summary: " + results[item].item.summary;
                offset = 9;
                break;
              case 'content':
                summary = "Content: " + results[item].item.content;
                offset = 9;
                break;
              default:
                break;
          }
      
          let startIndex = 0;
          let lastIndex = 0;
          let endIndex = 0;
      
          for (let i = 0; i < match_indexes.length; i++) {
              startIndex = match_indexes[i][0] + offset;
              endIndex = match_indexes[i][1] + offset + 1;
      
              highlightedSummary += summary.substring(lastIndex, startIndex);
              highlightedSummary += '<mark>' + summary.substring(startIndex, endIndex) + '</mark>';
              lastIndex = endIndex;
              break;
          }
      
          highlightedSummary += summary.substring(lastIndex);
          highlightedSummary = highlightedSummary.substring(startIndex - 150, endIndex + 150);

          console.log(startIndex)
          console.log(highlightedSummary)
          break;
      }
      

        resultSet +=
          `<li class="post-entry"><header class="entry-header">${
            results[item].item.title
          }&nbsp;<p class="entry-content search">[${Math.round(
            (1 - results[item].score) * 100
          )}%]</p>&nbsp;»</header>
          <div class="entry-content">${highlightedSummary}</div>
          ` +
          `<a href="${results[item].item.permalink}" aria-label="${results[item].item.title}"></a></li>`;
      }

      resList.innerHTML = resultSet;
      resultsAvailable = true;
      first = resList.firstChild;
      last = resList.lastChild;
    } else {
      resultsAvailable = false;
      resList.innerHTML = "";
    }
  }
};

sInput.addEventListener("search", function (e) {
  // clicked on x
  if (!this.value) reset();
});

// kb bindings
document.onkeydown = function (e) {
  let key = e.key;
  var ae = document.activeElement;

  let inbox = document.getElementById("searchbox").contains(ae);

  if (ae === sInput) {
    var elements = document.getElementsByClassName("focus");
    while (elements.length > 0) {
      elements[0].classList.remove("focus");
    }
  } else if (current_elem) ae = current_elem;

  if (key === "Escape") {
    reset();
  } else if (!resultsAvailable || !inbox) {
    return;
  } else if (key === "ArrowDown") {
    e.preventDefault();
    if (ae == sInput) {
      // if the currently focused element is the search input, focus the <a> of first <li>
      activeToggle(resList.firstChild.lastChild);
    } else if (ae.parentElement != last) {
      // if the currently focused element's parent is last, do nothing
      // otherwise select the next search result
      activeToggle(ae.parentElement.nextSibling.lastChild);
    }
  } else if (key === "ArrowUp") {
    e.preventDefault();
    if (ae.parentElement == first) {
      // if the currently focused element is first item, go to input box
      activeToggle(sInput);
    } else if (ae != sInput) {
      // if the currently focused element is input box, do nothing
      // otherwise select the previous search result
      activeToggle(ae.parentElement.previousSibling.lastChild);
    }
  } else if (key === "ArrowRight") {
    ae.click(); // click on active link
  }
};
